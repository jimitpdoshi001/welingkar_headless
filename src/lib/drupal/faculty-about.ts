import { cache } from "react";

import type { DirectorMessage } from "./faculty";
import { absoluteDrupalUrl, fetchJsonApi } from "./jsonapi";
import type { JsonApiResource } from "./types";

/** Drupal `faculty_about_us` node per campus (banner + director's desk). */
const NODE_IDS = { mumbai: 4897, bengaluru: 4898 } as const;

export type FacultyAbout = {
  hero: { title: string; image: string };
  /** Only the fields Drupal filled; the page merges them over its defaults. */
  director: Partial<DirectorMessage>;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Rich text -> plain paragraphs text (the director card renders plain text). */
const plain = (html: string) =>
  html
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .trim();

/** Faculty page banner + director from Drupal. Null on fetch error or missing node. */
export const getFacultyAbout = cache(async (campus: keyof typeof NODE_IDS): Promise<FacultyAbout | null> => {
  let node: JsonApiResource | undefined;
  let included: JsonApiResource[] = [];
  try {
    const doc = await fetchJsonApi<JsonApiResource>("/node/faculty_about_us", {
      "filter[status]": "1",
      "filter[drupal_internal__nid]": String(NODE_IDS[campus]),
      include: "field_banner,field_banner.field_desktop,field_banner.field_desktop.field_media_image,field_director_desk,field_director_desk.field_thumbnail",
    });
    node = (Array.isArray(doc.data) ? doc.data[0] : doc.data) as JsonApiResource | undefined;
    included = doc.included ?? [];
  } catch (error) {
    console.error("faculty_about_us fetch failed", campus, error instanceof Error ? error.message : error);
    return null;
  }
  if (!node) return null;

  const byId = new Map(included.map((r) => [r.id, r]));
  const ref = (entity: JsonApiResource | undefined, field: string) => {
    const data = entity?.relationships?.[field]?.data;
    const first = Array.isArray(data) ? data[0] : data;
    return first ? byId.get(first.id) : undefined;
  };
  const at = (entity: JsonApiResource | undefined) => (entity?.attributes ?? {}) as Record<string, unknown>;
  const fileUrl = (file: JsonApiResource | undefined) =>
    absoluteDrupalUrl((file?.attributes.uri as { url?: string } | undefined)?.url) ?? "";

  const banner = ref(node, "field_banner");
  const desk = ref(node, "field_director_desk");
  const d = at(desk);
  const name = str(d.field_main_title);

  // Keep only filled fields so empty Drupal values never blank the defaults.
  const director = Object.fromEntries(
    Object.entries({
      heading: str(d.field_subtitle),
      name,
      designation: str(d.field_director_designation),
      body: plain(str((d.field_description as { value?: string } | null)?.value)),
      image: fileUrl(ref(desk, "field_thumbnail")),
      imageAlt: name,
    }).filter(([, v]) => v),
  ) as Partial<DirectorMessage>;

  return {
    hero: {
      title: str(at(banner).field_main_title),
      image: fileUrl(ref(ref(banner, "field_desktop"), "field_media_image")),
    },
    director,
  };
});
