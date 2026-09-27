import { clearDrupalSession, getAuthHeaders } from "./auth";
import { drupalConfig } from "./config";
import type { JsonApiDocument, JsonApiResource } from "./types";

export function jsonApiUrl(path: string, params?: Record<string, string>): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${drupalConfig.jsonApiPrefix}${normalized}`, drupalConfig.baseUrl);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

async function requestJsonApi(url: string, init?: FetchOptions, retry = true): Promise<Response> {
  const authHeaders = await getAuthHeaders();
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.api+json",
      ...authHeaders,
      ...init?.headers,
    },
    next: {
      revalidate: 60,
      ...init?.next,
    },
  });

  if (retry && (response.status === 401 || response.status === 403)) {
    clearDrupalSession();
    return requestJsonApi(url, init, false);
  }

  return response;
}

export async function fetchJsonApi<T extends JsonApiResource>(path: string, params?: Record<string, string>, init?: FetchOptions): Promise<JsonApiDocument<T>> {
  const url = jsonApiUrl(path, params);
  const response = await requestJsonApi(url, init);

  if (!response.ok) {
    console.error("JSON:API request failed", response.status);

    throw new Error(`JSON:API request failed (${response.status}).`);
  }

  return (await response.json()) as JsonApiDocument<T>;
}

export function getIncludedResources(document: JsonApiDocument, type?: string): JsonApiResource[] {
  const included = document.included ?? [];
  if (!type) return included;
  return included.filter((resource) => resource.type === type);
}

export function absoluteDrupalUrl(pathOrUrl: string | null | undefined): string | null {
  if (!pathOrUrl) return null;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${drupalConfig.baseUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}
