import { drupalConfig } from "./config";

export type DrupalSession = {
  cookie: string;
  csrfToken: string;
};

let sessionPromise: Promise<DrupalSession | null> | null = null;

// Wait before retrying a failed login, so a slow Drupal is not hit on every request.
const LOGIN_RETRY_MS = 60_000;
let loginFailedAt = 0;

function readSetCookies(response: Response): string[] {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };

  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  const raw = response.headers.get("set-cookie");
  return raw ? [raw] : [];
}

async function login(): Promise<DrupalSession | null> {
  if (!drupalConfig.username || !drupalConfig.password) {
    return null;
  }

  const response = await fetch(
    `${drupalConfig.baseUrl}/user/login?_format=json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: drupalConfig.username,
        pass: drupalConfig.password,
      }),
      // No `cache: "no-store"`: it forces request-time rendering, which crashes
      // static pages during their timed (ISR) refresh with DYNAMIC_SERVER_USAGE.
      // POST requests are never cached, so the login still runs fresh.
    },
  );

  if (!response.ok) {
    console.error("Drupal login failed", response.status);
    throw new Error("Drupal login failed.");
  }

  const payload = (await response.json()) as {
    csrf_token?: string;
    current_user?: { uid: string; name: string };
  };

  const cookie = readSetCookies(response)
    .map((value) => value.split(";")[0])
    .filter(Boolean)
    .join("; ");

  if (!cookie || !payload.csrf_token) {
    throw new Error("Drupal login did not return a session cookie/CSRF token.");
  }

  return {
    cookie,
    csrfToken: payload.csrf_token,
  };
}

/** Cookie session auth — Drupal Basic Auth is not enabled on this site. */
export async function getDrupalSession(): Promise<DrupalSession | null> {
  if (!drupalConfig.username || !drupalConfig.password) {
    return null;
  }

  // After a failed login, allow a fresh attempt once the pause has passed.
  if (sessionPromise && loginFailedAt && Date.now() - loginFailedAt > LOGIN_RETRY_MS) {
    sessionPromise = null;
    loginFailedAt = 0;
  }

  if (!sessionPromise) {
    // A failed login (e.g. Drupal timing out with 504) must not break the build or
    // a page: published content is public, so carry on without a session and
    // retry the login after a short pause.
    sessionPromise = login().catch((error) => {
      console.warn("Drupal login unavailable, continuing without session:", error instanceof Error ? error.message : error);
      loginFailedAt = Date.now();
      return null;
    });
  }

  return sessionPromise;
}

export function clearDrupalSession(): void {
  sessionPromise = null;
}

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const session = await getDrupalSession();
  if (!session) return {};

  return {
    Cookie: session.cookie,
    "X-CSRF-Token": session.csrfToken,
  };
}
