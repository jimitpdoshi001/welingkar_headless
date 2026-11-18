/**
 * Site-wide link rule: only PDFs and third-party (other-domain) links open in a
 * new tab; every page of this site opens in the same tab.
 */
export function opensInNewTab(anchor: HTMLAnchorElement): boolean {
  const raw = anchor.getAttribute("href") ?? "";
  // Page anchors, email, phone and JS links never open a tab.
  if (!raw || raw.startsWith("#") || /^(mailto|tel|javascript):/i.test(raw)) return false;
  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return false;
  }
  if (!/^https?:$/.test(url.protocol)) return false;
  // PDF by file extension (query/hash ignored), on any domain.
  if (/\.pdf$/i.test(url.pathname)) return true;
  return url.origin !== window.location.origin;
}
