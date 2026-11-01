import { cache } from "react";

import { absoluteDrupalUrl, fetchPaginatedJsonApi } from "./jsonapi";
import type { JsonApiDocument, JsonApiResource } from "./types";
import { sanitizeCmsHtml } from "@/lib/security/sanitize-html";
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
        include: "field_faculty_category,field_thumbnail,field_location",
        "fields[taxonomy_term--faculty_category]": "name,weight",
        "fields[taxonomy_term--faculty_location]": "name",
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

    const categories = relIds(node, "field_faculty_category")
      .map((ref) => included.get(`${ref.type}:${ref.id}`))
      .filter((t): t is JsonApiResource => Boolean(t))
      .map((t) => ({ id: t.id, name: str(t.attributes.name), slug: slugify(str(t.attributes.name)) }))
      .filter((c) => c.name);

    const location = relIds(node, "field_location").map((ref) => included.get(`${ref.type}:${ref.id}`))[0];
    const thumb = relIds(node, "field_thumbnail").map((ref) => included.get(`${ref.type}:${ref.id}`))[0];
    const thumbUrl = (thumb?.attributes.uri as { url?: string } | undefined)?.url;

    return {
      id: node.id,
      slug,
      name,
      designation: str(a.field_designation),
      image: absoluteDrupalUrl(thumbUrl) ?? "",
      categories,
      campus: campusOf(str(location?.attributes.name)),
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

/** Category order: Drupal taxonomy weight, then leadership tabs first, then name. */
function categoryOrder(records: FacultyRecord[], weights: Map<string, number>): FacultyCategory[] {
  const seen = new Map<string, FacultyCategory>();
  for (const r of records) for (const c of r.categories) if (!seen.has(c.slug)) seen.set(c.slug, c);
  return [...seen.values()].sort(
    (x, y) =>
      (weights.get(x.id) ?? 0) - (weights.get(y.id) ?? 0) ||
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

  const records = all.filter((r) => r.campus === campus);
  const weights = await getCategoryWeights();
  const categories = categoryOrder(records, weights);
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

/** Taxonomy weights for tab ordering (empty map on error). */
const getCategoryWeights = cache(async (): Promise<Map<string, number>> => {
  try {
    const doc = await fetchPaginatedJsonApi("/taxonomy_term/faculty_category", { "fields[taxonomy_term--faculty_category]": "name,weight" }, 50);
    const terms = (Array.isArray(doc.data) ? doc.data : []) as JsonApiResource[];
    return new Map(terms.map((t) => [t.id, Number(t.attributes.weight) || 0]));
  } catch {
    return new Map();
  }
});
