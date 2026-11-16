import { cache } from "react";

import type { AboutData, AboutPerson } from "@/lib/about/about-data";
import { sanitizeCmsHtml } from "@/lib/security/sanitize-html";
import { absoluteDrupalUrl, fetchJsonApi } from "./jsonapi";
import type { JsonApiResource } from "./types";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const rich = (v: unknown) => str((v as { value?: string } | null)?.value);

/** Sanitized HTML, or "" when it has no visible text. */
function cleanHtml(source: string): string {
  const html = sanitizeCmsHtml(source).trim();
  return html.replace(/<[^>]*>|&nbsp;|\s/g, "") ? html : "";
}

/** <p> blocks as plain-text paragraphs (for the large watermark sections). */
function paragraphs(source: string): string[] {
  const text = (s: string) =>
    s
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&rsquo;|&lsquo;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();
  const found = [...source.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => text(m[1])).filter(Boolean);
  return found.length ? found : [text(source)].filter(Boolean);
}

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_our_vision_image",
  "field_our_mission_image",
  "field_words_our_director_image",
  "field_director_desk",
  "field_director_desk.field_thumbnail",
  "field_managing_council",
  "field_managing_council.field_image",
  "field_academic_advisory_board",
  "field_industry_advisory_board",
  "field_accreditations",
  "field_accreditations.field_image",
].join(",");

/** About Us page built only from Drupal. Null when Drupal is unreachable. */
export const getAboutData = cache(async (): Promise<Omit<AboutData, "honours"> | null> => {
  let node: JsonApiResource | undefined;
  let included: JsonApiResource[] = [];
  try {
    const doc = await fetchJsonApi<JsonApiResource>("/node/about_us", {
      "filter[status]": "1",
      include: INCLUDE,
      "page[limit]": "1",
    });
    node = (Array.isArray(doc.data) ? doc.data[0] : doc.data) as JsonApiResource | undefined;
    included = doc.included ?? [];
  } catch (error) {
    console.error("about_us fetch failed", error instanceof Error ? error.message : error);
    return null;
  }
  if (!node) return null;

  const byId = new Map(included.map((r) => [r.id, r]));
  const refs = (entity: JsonApiResource | undefined, field: string): JsonApiResource[] => {
    const data = entity?.relationships?.[field]?.data;
    const list = Array.isArray(data) ? data : data ? [data] : [];
    return list.map((ref) => byId.get(ref.id)).filter((r): r is JsonApiResource => Boolean(r));
  };
  const fileUrl = (file: JsonApiResource | undefined) =>
    absoluteDrupalUrl((file?.attributes.uri as { url?: string } | undefined)?.url) ?? "";
  const imageOf = (entity: JsonApiResource | undefined, field: string) => fileUrl(refs(entity, field)[0]);
  const at = (entity: JsonApiResource | undefined) => (entity?.attributes ?? {}) as Record<string, unknown>;
  const a = at(node);

  const people = (field: string): AboutPerson[] =>
    refs(node, field)
      .map((p) => ({
        id: p.id,
        name: str(at(p).field_main_title),
        title: str(at(p).field_designation),
        image: imageOf(p, "field_image") || undefined,
      }))
      .filter((p) => p.name);

  const banner = refs(node, "field_banner")[0];
  const bannerMedia = refs(banner, "field_desktop")[0];

  const directorHtml = cleanHtml(rich(a.field_words_our_director_descrip));

  return {
    hero: {
      title: str(at(banner).field_main_title),
      subtitle: str(at(banner).field_sub_title),
      image: imageOf(bannerMedia, "field_media_image"),
    },
    vision: {
      heading: str(a.field_our_vision_title),
      html: cleanHtml(rich(a.field_our_vision_description)),
      image: imageOf(node, "field_our_vision_image"),
    },
    mission: {
      heading: str(a.field_our_mission_title),
      html: cleanHtml(rich(a.field_our_mission_description)),
      image: imageOf(node, "field_our_mission_image"),
    },
    spMandali: { watermark: str(a.field_about_us_main_header), paragraphs: paragraphs(rich(a.field_about_us_main_description)) },
    whoWeAre: { watermark: str(a.field_weschool_title), paragraphs: paragraphs(rich(a.field_weschool_description)) },
    desks: refs(node, "field_director_desk")
      .map((d) => ({
        heading: str(at(d).field_main_title),
        html: cleanHtml(rich(at(d).field_description)),
        name: str(at(d).field_subtitle),
        title: str(at(d).field_director_designation),
        image: imageOf(d, "field_thumbnail"),
      }))
      .filter((d) => d.heading && (d.html || d.name)),
    director:
      str(a.field_words_our_director_title) && directorHtml
        ? {
            heading: str(a.field_words_our_director_title),
            html: directorHtml,
            sign: str(a.field_words_our_director_subtitl),
            image: imageOf(node, "field_words_our_director_image"),
          }
        : null,
    accreditationsHeading: str(a.field_accreditations_title),
    accreditations: refs(node, "field_accreditations")
      .map((r) => ({
        id: r.id,
        logo: imageOf(r, "field_image"),
        // Design: the label before the first colon ("ACBSP Accredited:") is bold.
        html: cleanHtml(rich(at(r).field_description)).replace(/^<p>([^<:]{2,80}:)/, "<p><strong>$1</strong>"),
      }))
      .filter((r) => r.html),
    boards: [
      { id: "academic-advisory-board", heading: str(a.field_academic_advisory_board_ti), people: people("field_academic_advisory_board") },
      { id: "industry-advisory-board", heading: str(a.field_industry_advisory_board_ti), people: people("field_industry_advisory_board") },
    ].filter((b) => b.heading && b.people.length),
    council: {
      heading: str(a.field_managing_council_title),
      html: cleanHtml(rich(a.field_managing_council_descripti)),
      people: people("field_managing_council"),
    },
  };
});
