import { cache } from "react";

import type { AboutData } from "@/lib/about/about-data";
import { fetchJsonApi } from "./jsonapi";
import type { JsonApiResource } from "./types";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const html = (v: unknown) => str((v as { value?: string } | null)?.value);

/** HTML -> plain text: entities decoded, <br> kept as a line break, tags removed. */
function toText(source: string): string {
  return source
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

/** <p> blocks (or <li> items) as plain-text paragraphs. */
function blocks(source: string, tag: "p" | "li"): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const found = [...source.matchAll(re)].map((m) => toText(m[1])).filter(Boolean);
  return found.length ? found : source ? [toText(source)].filter(Boolean) : [];
}

/**
 * About Us node from Drupal (JSON:API node--about_us). Texts replace the built-in
 * ones where Drupal has them; photos stay built-in (the node's image fields are
 * empty). Null on a fetch error.
 */
const getAboutNode = cache(async (): Promise<{ node: JsonApiResource; included: JsonApiResource[] } | null> => {
  try {
    const doc = await fetchJsonApi<JsonApiResource>("/node/about_us", {
      "filter[status]": "1",
      include: "field_banner,field_director_desk",
      "page[limit]": "1",
    });
    const node = (Array.isArray(doc.data) ? doc.data[0] : doc.data) as JsonApiResource | undefined;
    return node ? { node, included: doc.included ?? [] } : null;
  } catch (error) {
    console.error("about_us fetch failed", error instanceof Error ? error.message : error);
    return null;
  }
});

/** Built-in About data with every Drupal-provided text applied. */
export async function applyAboutFromDrupal(base: AboutData): Promise<AboutData> {
  const result = await getAboutNode();
  if (!result) return base;
  const { node, included } = result;
  const a = node.attributes as Record<string, unknown>;
  const rel = (field: string) => {
    const ref = node.relationships?.[field]?.data;
    const first = Array.isArray(ref) ? ref[0] : ref;
    return first ? included.find((r) => r.id === first.id) : undefined;
  };
  const data: AboutData = structuredClone(base);
  const set = <T,>(value: T | "" | undefined, apply: (v: T) => void) => {
    if (value !== "" && value !== undefined && !(Array.isArray(value) && value.length === 0)) apply(value as T);
  };

  const banner = rel("field_banner")?.attributes as Record<string, unknown> | undefined;
  set(str(banner?.field_main_title), (v) => (data.hero.title = v));
  set(toText(str(banner?.field_sub_title)), (v) => (data.hero.subtitle = v));

  set(str(a.field_our_vision_title), (v) => (data.vision.heading = v));
  set(toText(html(a.field_our_vision_description)), (v) => (data.vision.body = v));
  set(str(a.field_our_mission_title), (v) => (data.mission.heading = v));
  set(blocks(html(a.field_our_mission_description), "li"), (v) => (data.mission.paragraphs = v));

  set(str(a.field_about_us_main_header), (v) => (data.spMandali.watermark = v));
  set(blocks(html(a.field_about_us_main_description), "p"), (v) => (data.spMandali.paragraphs = v));
  set(str(a.field_weschool_title), (v) => (data.whoWeAre.watermark = v));
  set(blocks(html(a.field_weschool_description), "p").join("\n\n"), (v) => (data.whoWeAre.body = v));

  set(str(a.field_words_our_director_title), (v) => (data.director.heading = v));
  set(blocks(html(a.field_words_our_director_descrip), "p"), (v) => (data.director.paragraphs = v));
  set(str(a.field_words_our_director_subtitl), (v) => (data.director.sign = v));

  const desk = rel("field_director_desk")?.attributes as Record<string, unknown> | undefined;
  set(str(desk?.field_main_title), (v) => (data.chairman.heading = v));
  set(str(desk?.field_subtitle), (v) => (data.chairman.name = v));
  set(str(desk?.field_director_designation), (v) => (data.chairman.title = v));
  set(toText(html(desk?.field_description)), (v) => (data.chairman.body = v));

  set(str(a.field_managing_council_title), (v) => (data.faculty.heading = v));
  set(toText(html(a.field_managing_council_descripti)), (v) => (data.faculty.body = v));
  set(str(a.field_academic_advisory_board_ti), (v) => (data.academicBoard.heading = v));
  set(str(a.field_industry_advisory_board_ti), (v) => (data.industryBoard.heading = v));

  return data;
}
