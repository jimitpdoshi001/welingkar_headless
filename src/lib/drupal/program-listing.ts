import { absoluteDrupalUrl, fetchJsonApi } from "./jsonapi";
import { toHref } from "./link";
import { resolveMedia } from "./media";
import type { JsonApiDocument, JsonApiResource } from "./types";
import type { PgdmData } from "@/lib/pgdm/pgdm-data";

/**
 * Drupal `program_listing` node → PGDM page content.
 *
 * Only fields that are filled in Drupal replace the page content; every empty
 * field keeps the current (Figma) content, so the page stays complete while
 * the CMS is being populated.
 */

// Include list from the CMS team, plus the nested media → file paths needed to
// resolve the banner and overview images.
const PROGRAM_INCLUDES = [
  "field_admission_and_course_fees",
  "field_banner",
  "field_banner.field_desktop.field_media_image",
  "field_banner.field_mobile.field_media_image",
  "field_banner_bottom_description",
  "field_career_opportunities",
  "field_class_profile_data",
  "field_curriculum_data",
  "field_faq",
  "field_innovative_data",
  "field_innovative_teaching_and_le",
  "field_innovative_teaching_mobile",
  "field_our_mission_image",
  "field_our_recruiters_logo",
  "field_our_vision_image",
  "field_placement_desktop_image",
  "field_placement_mobile_image",
  "field_placement_opportunities",
  "field_program_educational_object",
  "field_program_faculty_data",
  "field_program_outcomes",
  "field_program_strengths_data",
  "field_program_strengths_desktop",
  "field_program_strengths_mobile_i",
  "field_program_usp_desktop_image",
  "field_program_usp_mobile_image",
  "field_program_usps",
  "field_programme_overview",
  "field_programme_overview.field_desktop.field_media_image",
  "field_recruiters_data",
].join(",");

type TextField = { value?: string; processed?: string } | null | undefined;
type LinkField = { uri?: string; title?: string } | null | undefined;

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/** Decode HTML entities; Drupal sometimes double-escapes (e.g. `&amp;amp;`). */
function decodeEntities(value: string): string {
  let out = value;
  for (let pass = 0; pass < 3; pass += 1) {
    const next = out
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&");
    if (next === out) break;
    out = next;
  }
  return out;
}

/** HTML → plain text (React escapes it on render, so no markup reaches the DOM). */
function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|h[1-6])>/gi, "\n")
      .replace(/<[^>]*>/g, ""),
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

/** Extract `<li>` items; handles lists that were stored as escaped text. */
function htmlToListItems(html: string): string[] {
  const decoded = decodeEntities(html);
  const items = [...decoded.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => htmlToText(m[1]));
  return items.filter(Boolean);
}

const richText = (field: TextField): string => str(field?.processed ?? field?.value);

function rel(resource: JsonApiResource | undefined, field: string) {
  const data = resource?.relationships?.[field]?.data;
  return Array.isArray(data) ? data : data ? [data] : [];
}

function findIncluded(doc: JsonApiDocument, ref: { type: string; id: string }) {
  return doc.included?.find((r) => r.type === ref.type && r.id === ref.id);
}

const relResources = (doc: JsonApiDocument, resource: JsonApiResource | undefined, field: string) =>
  rel(resource, field)
    .map((ref) => findIncluded(doc, ref))
    .filter((r): r is JsonApiResource => Boolean(r));

/** media--image relationship → absolute URL. */
function mediaUrl(doc: JsonApiDocument, resource: JsonApiResource | undefined, field: string): string | null {
  const ref = rel(resource, field)[0];
  const media = ref ? resolveMedia(ref, doc) : null;
  return media?.kind === "image" ? media.url : null;
}

/** Direct file--file relationship (multi-value) → absolute URLs. */
function fileUrls(doc: JsonApiDocument, resource: JsonApiResource | undefined, field: string): string[] {
  return relResources(doc, resource, field)
    .map((file) => absoluteDrupalUrl((file.attributes.uri as { url?: string } | undefined)?.url))
    .filter((u): u is string => Boolean(u));
}

/** Drupal link field → safe href; Drupal-hosted files point at the CMS host. */
function linkHref(field: LinkField): string | null {
  const href = toHref(field?.uri);
  if (!href) return null;
  return href.startsWith("/sites/") ? absoluteDrupalUrl(href) : href;
}

/** Fetch one program_listing node by its Drupal node ID. */
export async function getProgramListing(nid: number): Promise<JsonApiDocument | null> {
  if (!Number.isInteger(nid) || nid <= 0) return null;

  try {
    const doc = await fetchJsonApi("/node/program_listing", {
      "filter[drupal_internal__nid]": String(nid),
      include: PROGRAM_INCLUDES,
    });
    const nodes = Array.isArray(doc.data) ? doc.data : doc.data ? [doc.data] : [];
    return nodes.length ? { ...doc, data: nodes[0] } : null;
  } catch (error) {
    // Fall back to the built-in content rather than failing the page.
    console.error("program_listing fetch failed", nid, error instanceof Error ? error.message : error);
    return null;
  }
}

/** Overlay filled Drupal fields onto the base page content. */
export function applyProgramListing(base: PgdmData, doc: JsonApiDocument | null): PgdmData {
  const node = doc && !Array.isArray(doc.data) ? doc.data : null;
  if (!doc || !node) return base;

  const a = node.attributes as Record<string, unknown>;
  const data: PgdmData = structuredClone(base);

  // Banner: title, subtitle, CTAs, image.
  const banner = relResources(doc, node, "field_banner")[0];
  if (banner) {
    const b = banner.attributes as Record<string, unknown>;
    // The CMS title currently carries the breadcrumb ("Home – Programs – PGDM …");
    // strip that prefix so it is not shown twice.
    const crumbPrefix = data.hero.breadcrumb.join(" – ");
    let title = str(b.field_main_title);
    if (title.startsWith(crumbPrefix)) title = title.slice(crumbPrefix.length).trim();
    if (title) data.hero.title = title;

    const subtitle = str(b.field_sub_title);
    if (subtitle) data.hero.subtitle = subtitle;

    const apply = b.field_apply_now as LinkField;
    const applyHref = linkHref(apply);
    if (applyHref) data.hero.primaryCta = { label: str(apply?.title) || data.hero.primaryCta.label, href: applyHref };

    const brochure = b.field_brochure as LinkField;
    const brochureHref = linkHref(brochure);
    if (brochureHref) data.hero.secondaryCta = { label: str(brochure?.title) || data.hero.secondaryCta.label, href: brochureHref };

    const desktop = mediaUrl(doc, banner, "field_desktop");
    if (desktop) data.hero.image = desktop;
  }

  // Stats strip under the hero.
  const stats = relResources(doc, node, "field_banner_bottom_description")
    .map((p) => ({ value: str(p.attributes.field_main_title), label: str(p.attributes.field_sub_title) }))
    .filter((s) => s.value && s.label);
  if (stats.length) data.bandStats = stats;

  // Why this Program.
  const overview = relResources(doc, node, "field_programme_overview")[0];
  if (overview) {
    const heading = str(overview.attributes.field_main_title);
    const body = htmlToText(richText(overview.attributes.field_desc as TextField));
    const image = mediaUrl(doc, overview, "field_desktop");
    if (heading) data.whyProgram.heading = heading;
    if (body) data.whyProgram.body = body;
    if (image) data.whyProgram.videoThumb = image;
  }

  // Vision / Mission.
  const visionTitle = str(a.field_our_vision_title);
  const visionBody = htmlToText(richText(a.field_our_vision_description as TextField));
  const visionImages = fileUrls(doc, node, "field_our_vision_image");
  if (visionTitle) data.visionMission.vision.heading = visionTitle;
  if (visionBody) data.visionMission.vision.body = visionBody;
  if (visionImages.length) data.visionMission.vision.images = visionImages;

  const missionTitle = str(a.field_our_mission_title);
  const missionLines = htmlToListItems(richText(a.field_our_mission_description as TextField));
  const missionImages = fileUrls(doc, node, "field_our_mission_image");
  if (missionTitle) data.visionMission.mission.heading = missionTitle;
  if (missionLines.length) data.visionMission.mission.lines = missionLines;
  if (missionImages.length) data.visionMission.mission.images = missionImages;

  return data;
}

/** Drupal node IDs of the program_listing pages. */
export const PROGRAM_LISTING_NIDS = {
  pgdmMumbai: 4653,
} as const;
