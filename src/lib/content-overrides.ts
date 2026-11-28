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
// Prefix matches both "programmes" (Drupal) and "programs" (after fixProgramsSpelling).
const REMOVE_PARAGRAPH_SNIPPETS = ["Beyond our core management program"];

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
  // Phrases removed from inline text (e.g. hero tagline "Learn Your Way. Full-time, Online, or Executive").
  for (const phrase of REMOVE_INLINE_PHRASES) out = out.replace(phrase, "");
  return out;
}

const REMOVE_INLINE_PHRASES = [/\s*Full-time,\s*Online,?\s*(?:or|&amp;|&)\s*Executive\.?/gi];

/** Stat headings to correct (Drupal value -> display), e.g. legacy years "47" -> "47+". */
const STAT_OVERRIDES: Record<string, string> = { "47": "47+" };

export function overrideStatHeading(heading: string | null): string | null {
  return heading ? (STAT_OVERRIDES[heading.trim()] ?? heading) : heading;
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

/**
 * The placement-partners section currently carries the intro section's text
 * ("We are WeSchool" / "There's a future…") in Drupal. Force the correct
 * heading + description until the backend is corrected.
 */
const PLACEMENT_DESCRIPTION =
  "Our network of over 358 recruiters across diverse industries, profiles, and continents ensure that our students are prepared to meet the evolving industry expectations. We believe that our partnership with the right recruiters create meaningful career opportunities and support our students at every step of the way.";

export function overridePlacementHeading(heading: string | null | undefined): string {
  if (heading && heading.trim().toLowerCase() !== "we are weschool") return heading;
  return "Our Placement Partners";
}

export function overridePlacementDescription(html: string | null | undefined): string {
  if (html && !/there'?s a future we believe in/i.test(html)) return html;
  return `<p>${PLACEMENT_DESCRIPTION}</p>`;
}

/**
 * Site copy uses "Programs"; Drupal content still says "Programmes". Rewrites
 * display text only: keys that hold links and any URL or path value are left
 * alone, and inside HTML only the text between tags changes, so hrefs such as
 * /programs/... keep working.
 */
const LINK_KEYS = new Set(["uri", "url", "href", "path", "alias", "src", "link", "langcode"]);
const isUrlLike = (value: string) => /^(https?:)?\/\/|^\//.test(value.trim());
const spellPrograms = (text: string) =>
  // Plural and singular, all cases (Programme -> Program).
  text.replace(/\b(P|p)rogramme(s?)\b/g, "$1rogram$2").replace(/\bPROGRAMME(S?)\b/g, "PROGRAM$1");

export function fixProgramsSpelling<T>(value: T, key = ""): T {
  if (typeof value === "string") {
    if (LINK_KEYS.has(key) || isUrlLike(value) || !/programme/i.test(value)) return value;
    // HTML: replace only text outside tags (attribute values stay untouched).
    const out = value.includes("<")
      ? value.replace(/>([^<]+)</g, (_, text: string) => `>${spellPrograms(text)}<`).replace(/^[^<]+/, spellPrograms).replace(/[^>]+$/, spellPrograms)
      : spellPrograms(value);
    return out as T;
  }
  if (Array.isArray(value)) return value.map((item) => fixProgramsSpelling(item, key)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = fixProgramsSpelling(v, k);
    return out as T;
  }
  return value;
}

/** Homepage Drupal buttons whose label or link is wrong in the CMS, keyed by paragraph id. */
const BUTTON_OVERRIDES: Record<string, { title?: string; uri?: string }> = {
  // "We are WeSchool" -> About Us page.
  "7ebbb44b-be33-4214-ab40-db5b7f0d9f11": { uri: "internal:/about-us" },
  // News & Events section button.
  "caca1488-e93d-4372-9a43-2534fa888b9b": { title: "View All" },
  // WeFactor section "Know more" -> WeFactor page.
  "bd6ed729-9578-42d7-9d0a-8faa4e905b58": { uri: "internal:/wefactor" },
  // "Straight from Our Community" View All -> Testimonials page.
  "f76e1bb6-cb2b-4242-a385-9a7eefc73f38": { uri: "internal:/testimonials" },
};

export function overrideButtonLink<T extends { uri: string; title: string }>(id: string, link: T | null): T | null {
  const override = BUTTON_OVERRIDES[id];
  return link && override ? { ...link, ...override } : link;
}
