/**
 * Inline SVG placeholder helpers (data: URIs).
 * Used for recruiter/partner logos until real brand assets are supplied —
 * self-contained so they load under the site CSP without any external request.
 */

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** A simple rounded "logo" box with the brand name as text. */
export function logoPlaceholder(name: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="64" viewBox="0 0 220 64"><rect x="1" y="1" width="218" height="62" rx="10" fill="#ffffff" stroke="#e9ebef"/><text x="110" y="38" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#493460">${escapeXml(name)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
