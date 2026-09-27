const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/** Reject javascript:, data:, protocol-relative, and other non-navigation URLs. */
export function isSafeHref(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || /[\u0000-\u001F\u007F]/.test(trimmed)) return false;
  if (trimmed.startsWith("#")) return !/javascript\s*:/i.test(trimmed);
  if (trimmed.startsWith("//") || trimmed.startsWith("\\\\") || trimmed.startsWith("/\\")) return false;

  if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return !trimmed.includes("\\");
  }

  try {
    const url = new URL(trimmed);
    return SAFE_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

function safe(href: string | null): string | null {
  if (!href || !isSafeHref(href)) return null;
  return href;
}

/**
 * Drupal Link field `uri` values:
 *   internal:/about-us  → /about-us
 *   internal:#section   → #section
 *   internal:#          → #
 *   entity:node/7       → /about-us (via nodePaths from getNodePathMap)
 *   https://…           → unchanged when the protocol is http(s), mailto, or tel
 */
export function toHref(uri?: string | null, nodePaths?: Record<number, string>): string | null {
  if (!uri?.trim()) return null;

  const value = uri.trim();

  const entityNode = value.match(/^entity:node\/(\d+)/i);
  if (entityNode) {
    const nid = Number(entityNode[1]);
    return safe(nodePaths?.[nid] ?? null);
  }

  if (value.startsWith("entity:")) return null;

  if (value.startsWith("internal:")) {
    const path = value.slice("internal:".length).trim();
    if (!path) return "/";
    if (path.startsWith("#")) return safe(path);
    if (path.startsWith("/")) return safe(path);
    return safe(`/${path}`);
  }

  if (value.startsWith("base:")) {
    const path = value.slice("base:".length).trim();
    if (!path) return "/";
    return safe(path.startsWith("/") ? path : `/${path}`);
  }

  if (value.startsWith("route:")) return null;

  return safe(value);
}

export const resolveDrupalHref = toHref;

export function isAppPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function isHashHref(href: string): boolean {
  return href.startsWith("#");
}

export function drupalLinkTarget(target?: string | null): "_blank" | "_parent" | "_top" | undefined {
  if (!target || target === "self" || target === "_self") return undefined;
  if (target === "blank" || target === "_blank") return "_blank";
  if (target === "_parent" || target === "_top") return target;
  return undefined;
}
