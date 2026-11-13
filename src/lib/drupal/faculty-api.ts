import { cache } from "react";

import { absoluteDrupalUrl, fetchPaginatedJsonApi } from "./jsonapi";
import type { JsonApiDocument, JsonApiResource } from "./types";
import { sanitizeCmsHtml } from "@/lib/security/sanitize-html";
import { BENGALURU_FACULTY, BENGALURU_PROGRAMS } from "@/lib/faculty/bengaluru-faculty";
import type { FacultyCategory, FacultyMember, FacultyProfile } from "./faculty";

/**
 * Drupal `faculty` nodes (JSON:API) for the faculty listing and profile pages.
 * Only Drupal data is shown; on a fetch error the pages keep their built-in content.
 */

export type FacultyCampus = "mumbai" | "bengaluru";

export type FacultyRecord = {
  id: string;
  slug: string;
  name: string;
  designation: string;
  image: string;
  categories: FacultyCategory[];
  campus: FacultyCampus | "";
  sortOrder: number;
  /** Profile tabs with sanitized HTML; empty sections are dropped. */
  sections: { id: string; title: string; html: string }[];
};

// Profile tabs, in display order.
const SECTION_FIELDS: { field: string; id: string; title: string }[] = [
  { field: "field_about", id: "about", title: "About Faculty" },
  { field: "field_teaching_and_research", id: "teaching-research", title: "Teaching & Research" },
  { field: "field_publications", id: "publications", title: "Publications" },
  { field: "field_awards_and_honor", id: "awards-honors", title: "Awards & Honors" },
  { field: "field_consulting", id: "consulting", title: "Consulting" },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * Faculty rich text was pasted as HTML source into the editor, so it arrives
 * double-encoded (`<p>&lt;p&gt;…`). Drop the editor's own <p>/<br> wrappers,
 * decode once to recover the real markup, unwrap layout tables, then sanitize.
 */
function decodeFacultyHtml(raw: string): string {
  if (!raw.trim()) return "";
  const wasEscaped = /&lt;[a-z/]/i.test(raw);
  let html = raw;
  if (wasEscaped) {
    html = html
      .replace(/<\/?p[^>]*>|<br\s*\/?>/gi, "\n")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&amp;/g, "&");
  }
  html = html
    // Pasted markup is sometimes broken: "<pMBA- …" (missing ">") would swallow
    // the text, and "<!-- … -->" hides it. Repair/unwrap so all content shows.
    .replace(/<p(?=[A-Z0-9•(“"'])/g, "<p>")
    .replace(/<!--|-->/g, "")
    // Word-style layout tables: keep the content, drop the grid.
    .replace(/<\/?(?:table|tbody|thead|tr|td|th|colgroup|col)\b[^>]*>/gi, "")
    .replace(/(&nbsp;\s*){2,}/g, " ");
  // Whole section wrapped in one bullet (<ul><li>…</li></ul>): drop the wrapper.
  const wrapped = html.match(/^\s*<ul[^>]*>\s*<li[^>]*>([\s\S]*)<\/li>\s*<\/ul>\s*$/i);
  if (wrapped && !/<li\b/i.test(wrapped[1]) && /<p\b/i.test(wrapped[1])) html = wrapped[1];
  const clean = sanitizeCmsHtml(html).trim();
  // Nothing readable left (e.g. only empty tags).
  return clean.replace(/<[^>]*>|&nbsp;|\s/g, "") ? clean : "";
}

function relIds(node: JsonApiResource, field: string): { type: string; id: string }[] {
  const data = node.relationships?.[field]?.data;
  return Array.isArray(data) ? data : data ? [data] : [];
}

// Drupal list keys whose label is not a plain title-case of the key.
const CATEGORY_LABELS: Record<string, string> = { pgdm: "PGDM", pgdlp: "PGDLP", e_business: "E-Business" };

/** List key -> display label, e.g. "media_and_entertainment" -> "Media and Entertainment". */
function categoryLabel(key: string): string {
  if (CATEGORY_LABELS[key]) return CATEGORY_LABELS[key];
  return key
    .split("_")
    .filter(Boolean)
    .map((word) => (word === "and" ? word : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
}

function campusOf(name: string): FacultyCampus | "" {
  if (/mumbai/i.test(name)) return "mumbai";
  if (/beng|banga/i.test(name)) return "bengaluru";
  return "";
}

/** All published faculty, sorted by field_sort_order then name. Null on fetch error. */
export const getFacultyDirectory = cache(async (): Promise<FacultyRecord[] | null> => {
  let doc: JsonApiDocument;
  try {
    doc = await fetchPaginatedJsonApi(
      "/node/faculty",
      {
        "filter[status]": "1",
        // Category and location are list fields on the node (not taxonomy terms).
        include: "field_thumbnail",
      },
      50,
    );
  } catch (error) {
    console.error("faculty fetch failed", error instanceof Error ? error.message : error);
    return null;
  }

  const included = new Map((doc.included ?? []).map((r) => [`${r.type}:${r.id}`, r]));
  const nodes = (Array.isArray(doc.data) ? doc.data : doc.data ? [doc.data] : []) as JsonApiResource[];
  const used = new Set<string>();

  const records = nodes.map((node): FacultyRecord => {
    const a = node.attributes as Record<string, unknown>;
    const name = str(a.title);
    let slug = slugify(name) || node.id;
    for (let n = 2; used.has(slug); n += 1) slug = `${slugify(name)}-${n}`;
    used.add(slug);

    const categoryKeys = Array.isArray(a.field_faculty_category) ? a.field_faculty_category : [];
    const categories = categoryKeys
      .map((key) => str(key))
      .filter(Boolean)
      .map((key) => ({ id: key, name: categoryLabel(key), slug: slugify(key) }));
    const thumb = relIds(node, "field_thumbnail").map((ref) => included.get(`${ref.type}:${ref.id}`))[0];
    const thumbUrl = (thumb?.attributes.uri as { url?: string } | undefined)?.url;

    return {
      id: node.id,
      slug,
      name,
      designation: str(a.field_designation),
      image: absoluteDrupalUrl(thumbUrl) ?? "",
      categories,
      campus: campusOf(str(a.field_location)),
      sortOrder: Number.isFinite(Number(a.field_sort_order)) && a.field_sort_order !== null ? Number(a.field_sort_order) : Number.MAX_SAFE_INTEGER,
      sections: SECTION_FIELDS.map((s) => ({
        id: s.id,
        title: s.title,
        html: decodeFacultyHtml(str((a[s.field] as { value?: string } | null)?.value)),
      })).filter((s) => s.html),
    };
  });

  return records
    .filter((r) => r.name)
    .sort((x, y) => x.sortOrder - y.sortOrder || x.name.localeCompare(y.name));
});

// Leadership tabs first (as on the original page); other categories follow.
const PRIORITY = ["deans", "associate-deans", "faculty"];
const priority = (slug: string) => (PRIORITY.includes(slug) ? PRIORITY.indexOf(slug) : PRIORITY.length);

/** Category order: leadership tabs first, then name. */
function categoryOrder(records: FacultyRecord[]): FacultyCategory[] {
  const seen = new Map<string, FacultyCategory>();
  for (const r of records) for (const c of r.categories) if (!seen.has(c.slug)) seen.set(c.slug, c);
  return [...seen.values()].sort(
    (x, y) =>
      priority(x.slug) - priority(y.slug) ||
      x.name.localeCompare(y.name),
  );
}

/**
 * Grid data for one campus: tabs (only categories with members) and members.
 * Returns null on fetch error so the page can keep its built-in content.
 */
export async function getCampusFacultyGrid(
  campus: FacultyCampus,
): Promise<{ categories: FacultyCategory[]; members: FacultyMember[] } | null> {
  const all = await getFacultyDirectory();
  if (!all) return null;

  if (campus === "bengaluru") return bengaluruGrid(all);

  const records = all.filter((r) => r.campus === campus);
  const categories = categoryOrder(records);
  const members: FacultyMember[] = records.map((r) => ({
    id: r.id,
    name: r.name,
    designation: r.designation,
    categorySlug: r.categories[0]?.slug ?? "",
    categorySlugs: r.categories.map((c) => c.slug),
    image: r.image,
    imageAlt: r.name,
    link: `/about-us/faculty/${r.slug}`,
  }));
  return { categories, members };
}

/** Deans / Associate Deans / Faculty from a designation (Bengaluru sheet rule). */
function roleTab(designation: string): "deans" | "associate-deans" | "faculty" {
  if (/associate\s+dean/i.test(designation)) return "associate-deans";
  if (/\bdean\b/i.test(designation)) return "deans";
  return "faculty";
}

/**
 * Bengaluru grid from the approved sheet: only listed people, in sheet order.
 * Tabs: Deans / Associate Deans / Faculty by designation (the Librarian sits only
 * in the Librarian entry); Specialization dropdown = the person's program.
 */
function bengaluruGrid(all: FacultyRecord[]): { categories: FacultyCategory[]; members: FacultyMember[] } {
  // Match on letters only, so editor fixes like "Dr.X" -> "Dr. X" keep matching.
  const nameKey = (name: string) => name.toLowerCase().replace(/[^a-z]/g, "");
  const byTitle = new Map(all.filter((r) => r.campus === "bengaluru").map((r) => [nameKey(r.name), r]));
  const members: FacultyMember[] = [];
  for (const row of BENGALURU_FACULTY) {
    const r = byTitle.get(nameKey(row.drupalTitle));
    if (!r) continue; // entry unpublished / renamed in Drupal
    const slugs = row.program === "librarian" ? ["librarian"] : [roleTab(row.designation), row.program];
    members.push({
      id: r.id,
      name: r.name,
      designation: r.designation,
      categorySlug: slugs[0],
      categorySlugs: slugs,
      image: r.image,
      imageAlt: r.name,
      link: `/about-us/faculty/${r.slug}`,
    });
  }
  const used = new Set(members.flatMap((m) => m.categorySlugs ?? []));
  const categories: FacultyCategory[] = [
    { id: "deans", name: "Deans", slug: "deans" },
    { id: "associate-deans", name: "Associate Deans", slug: "associate-deans" },
    { id: "faculty", name: "Faculty", slug: "faculty" },
    ...BENGALURU_PROGRAMS.map((p) => ({ id: p.slug, name: p.name, slug: p.slug })),
  ].filter((c) => used.has(c.slug)); // no empty tabs
  return { categories, members };
}

/** Profile page data for one faculty slug. */
export async function getFacultyProfile(slug: string): Promise<FacultyProfile | null> {
  const all = await getFacultyDirectory();
  const r = all?.find((f) => f.slug === slug);
  if (!r) return null;
  return {
    name: r.name,
    designation: r.designation,
    body: "",
    image: r.image,
    imageAlt: r.name,
    backHref: r.campus === "bengaluru" ? "/about-us/faculty/bengaluru" : "/about-us/faculty",
    tabs: r.sections.map((s) => ({ id: s.id, title: s.title, blocks: [], html: s.html })),
  };
}

/**
 * Program page "Program Faculty" from the Faculty API (same data as the faculty
 * listing pages), for the given campus and faculty category / Bengaluru program.
 * Faculty without a photo are skipped (the card is a portrait).
 */
export async function getProgramFacultyPeople(
  campus: FacultyCampus,
  category: string,
): Promise<{ id: string; name: string; title: string; image: string }[]> {
  const grid = await getCampusFacultyGrid(campus);
  if (!grid) return [];
  return grid.members
    .filter((m) => (m.categorySlugs ?? [m.categorySlug]).includes(category) && m.image)
    .map((m) => ({ id: m.id, name: m.name, title: m.designation, image: m.image }));
}
