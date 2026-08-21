import { drupalConfig } from "./config";

export type DrupalSession = {
  cookie: string;
  csrfToken: string;
};

let sessionPromise: Promise<DrupalSession | null> | null = null;

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
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Drupal login failed (${response.status}): ${details.slice(0, 200)}`,
    );
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

  if (!sessionPromise) {
    sessionPromise = login().catch((error) => {
      sessionPromise = null;
      throw error;
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
