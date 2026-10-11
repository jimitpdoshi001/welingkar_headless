/**
 * TEMPORARY frontend content overrides.
 *
 * These force specific homepage content that currently lives (with the wrong
 * values) in the Drupal backend, per the client's instructions. They are a
 * stop-gap until the content is corrected in Drupal — once that happens these
 * entries should be removed and the real Drupal content will flow through.
 */

/** Section headings that should be hidden entirely. */
const HIDDEN_HEADINGS = new Set<string>([]);

/** CMS paragraphs containing any of these phrases are stripped. */
const REMOVE_PARAGRAPH_SNIPPETS = ["Beyond our core management programmes"];

export function overrideHeading(heading: string | null | undefined): string | null {
  if (!heading) return heading ?? null;
  return HIDDEN_HEADINGS.has(heading.trim().toLowerCase()) ? null : heading;
}

export function overrideCmsHtml(html: string | null | undefined): string | null {
  if (!html) return html ?? null;
  let out = html;
  for (const snippet of REMOVE_PARAGRAPH_SNIPPETS) {
    const escaped = snippet.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Remove any <p>…snippet…</p> block that contains the phrase.
    const re = new RegExp(`<p\\b[^>]*>(?:(?!</p>)[\\s\\S])*?${escaped}(?:(?!</p>)[\\s\\S])*?</p>`, "gi");
    out = out.replace(re, "");
  }
  return out;
}

/** YouTube URLs for the "Our Campus Experience" popups, keyed by campus. */
const CAMPUS_VIDEO_OVERRIDES: Record<string, string> = {
  mumbai: "https://www.youtube.com/watch?v=rccOv-AUaxM",
  bengaluru: "https://www.youtube.com/watch?v=nFDbvqGkWSg",
  bangalore: "https://www.youtube.com/watch?v=nFDbvqGkWSg",
  banglore: "https://www.youtube.com/watch?v=nFDbvqGkWSg",
};

export function campusVideoOverride(heading: string | null | undefined): string | null {
  if (!heading) return null;
  return CAMPUS_VIDEO_OVERRIDES[heading.trim().toLowerCase()] ?? null;
}

/** "What We Offer" card headings per campus (in order). */
const WHAT_WE_OFFER_HEADINGS: Record<string, string[]> = {
  mumbai: [
    "Full-Time Programmes",
    "Executive",
    "Post Graduate Program (Autonomous)",
    "PGDM Hybrid Program",
    "PGP & 6 months Certificate Programmes",
    "Post Graduate Program in Temple Management (PGPTM)",
  ],
  bengaluru: ["Full-Time Programmes", "Executive"],
  bangalore: ["Full-Time Programmes", "Executive"],
  banglore: ["Full-Time Programmes", "Executive"],
};

export function whatWeOfferHeadings(location: string | null | undefined): string[] | null {
  if (!location) return null;
  return WHAT_WE_OFFER_HEADINGS[location.trim().toLowerCase()] ?? null;
}
