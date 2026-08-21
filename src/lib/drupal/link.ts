/**
 * Drupal Link field `uri` values:
 *   internal:/about-us  → /about-us
 *   internal:#section   → #section
 *   internal:#          → #
 *   entity:node/7       → /about-us (via nodePaths from getNodePathMap)
 *   https://…           → unchanged
 */
export function toHref(uri?: string | null, nodePaths?: Record<number, string>): string | null {
  if (!uri?.trim()) return null;

  const value = uri.trim();

  const entityNode = value.match(/^entity:node\/(\d+)/i);
  if (entityNode) {
    const nid = Number(entityNode[1]);
    return nodePaths?.[nid] ?? null;
  }

  if (value.startsWith("entity:")) return null;

  if (value.startsWith("internal:")) {
    const path = value.slice("internal:".length).trim();
    if (!path) return "/";
    if (path.startsWith("#")) return path;
    if (path.startsWith("/")) return path;
    return `/${path}`;
  }

  if (value.startsWith("base:")) {
    const path = value.slice("base:".length).trim();
    if (!path) return "/";
    return path.startsWith("/") ? path : `/${path}`;
  }

  if (value.startsWith("route:")) return null;

  return value;
}

export const resolveDrupalHref = toHref;

export function isAppPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function isHashHref(href: string): boolean {
  return href.startsWith("#");
}

export function drupalLinkTarget(target?: string | null): string | undefined {
  if (!target || target === "self") return undefined;
  if (target === "blank") return "_blank";
  return target;
}
