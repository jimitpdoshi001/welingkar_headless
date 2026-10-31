import { cache } from "react";

import { drupalConfig } from "./config";
import { absoluteDrupalUrl } from "./jsonapi";
import { toHref } from "./link";
import { fixProgramsSpelling } from "@/lib/content-overrides";
import type { PgdmData } from "@/lib/pgdm/pgdm-data";

/**
 * Drupal REST `/api/program-listing/{nid}` → PGDM page content.
 *
 * Only fields that are filled in Drupal replace the page content; every empty
 * field keeps the current (Figma) content, so the page stays complete while
 * the CMS is being populated.
 */

/** A Drupal entity as returned by the program-listing REST endpoint. */
type RestEntity = {
  entity_type?: string;
  bundle?: string;
  id?: string;
  fields?: RestFields | unknown[];
  // File entities expose their URL directly.
  url?: string;
  alt?: string;
};

/** Every field is an array of items: `{ value }`, `{ uri, title }`, or a nested entity. */
type RestFields = Record<string, Array<Record<string, unknown>>>;

type RestResponse = {
  status?: boolean;
  data?: RestEntity;
};

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

const fieldsOf = (entity: RestEntity | undefined): RestFields =>
  entity?.fields && !Array.isArray(entity.fields) ? entity.fields : {};

/** First `value` of a field, e.g. field_main_title[0].value. */
const value = (entity: RestEntity | undefined, field: string): string => str(fieldsOf(entity)[field]?.[0]?.value);

/** Nested entities of a field (paragraphs, media, files). */
const entities = (entity: RestEntity | undefined, field: string): RestEntity[] =>
  (fieldsOf(entity)[field] ?? []) as RestEntity[];

/** Decode HTML entities; Drupal sometimes double-escapes (e.g. `&amp;amp;`). */
function decodeEntities(input: string): string {
  let out = input;
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
  return [...decoded.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => htmlToText(m[1])).filter(Boolean);
}

/**
 * Drupal file URL → absolute https URL on the CMS host.
 * The API reports `http://` URLs; only the path is kept so assets load over https.
 */
function fileUrl(file: RestEntity | undefined): string | null {
  const raw = str(file?.url);
  if (!raw) return null;
  try {
    const parsed = new URL(raw, drupalConfig.baseUrl);
    const drupalHost = new URL(drupalConfig.baseUrl).hostname;
    if (parsed.hostname !== drupalHost) return null;
    return absoluteDrupalUrl(parsed.pathname);
  } catch {
    return null;
  }
}

/** media (image) field → file URL, e.g. field_desktop[0].fields.field_media_image[0].url. */
const mediaUrl = (entity: RestEntity | undefined, field: string): string | null =>
  fileUrl(entities(entities(entity, field)[0], "field_media_image")[0]);

/** Link field → safe href; Drupal-hosted files point at the CMS host. */
function linkHref(entity: RestEntity | undefined, field: string): { href: string; title: string } | null {
  const item = fieldsOf(entity)[field]?.[0];
  const href = toHref(str(item?.uri));
  if (!href) return null;
  return { href: href.startsWith("/sites/") ? (absoluteDrupalUrl(href) ?? href) : href, title: str(item?.title) };
}

/** Fetch one program_listing node by its Drupal node ID (cached per request, revalidated hourly). */
export const getProgramListing = cache(async (nid: number): Promise<RestEntity | null> => {
  if (!Number.isInteger(nid) || nid <= 0) return null;

  try {
    const response = await fetch(`${drupalConfig.baseUrl}/api/program-listing/${nid}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    // Display-text spelling fix (Programmes -> Programs); links are untouched.
    const result = fixProgramsSpelling((await response.json()) as RestResponse);
    return result?.status && result.data?.bundle === "program_listing" ? result.data : null;
  } catch (error) {
    // Fall back to the built-in content rather than failing the page.
    console.error("program-listing fetch failed", nid, error instanceof Error ? error.message : error);
    return null;
  }
});

/** Overlay filled Drupal fields onto the base page content. */
export function applyProgramListing(base: PgdmData, node: RestEntity | null): PgdmData {
  if (!node) return base;
  const data: PgdmData = structuredClone(base);

  // Banner: title, subtitle, CTAs, image.
  const banner = entities(node, "field_banner")[0];
  if (banner) {
    // The CMS title currently carries the breadcrumb ("Home – Programs – PGDM …");
    // strip that prefix so it is not shown twice.
    const crumbPrefix = data.hero.breadcrumb.join(" – ");
    let title = value(banner, "field_main_title");
    if (title.startsWith(crumbPrefix)) title = title.slice(crumbPrefix.length).trim();
    if (title) data.hero.title = title;

    const subtitle = value(banner, "field_sub_title");
    if (subtitle) data.hero.subtitle = subtitle;

    const apply = linkHref(banner, "field_apply_now");
    if (apply) data.hero.primaryCta = { label: apply.title || data.hero.primaryCta.label, href: apply.href };

    const brochure = linkHref(banner, "field_brochure");
    if (brochure) data.hero.secondaryCta = { label: brochure.title || data.hero.secondaryCta.label, href: brochure.href };

    const desktop = mediaUrl(banner, "field_desktop");
    if (desktop) data.hero.image = desktop;
  }

  // Stats strip under the hero.
  const stats = entities(node, "field_banner_bottom_description")
    .map((p) => ({ value: value(p, "field_main_title"), label: value(p, "field_sub_title") }))
    .filter((s) => s.value && s.label);
  if (stats.length) data.bandStats = stats;

  // Why this Program.
  const overview = entities(node, "field_programme_overview")[0];
  if (overview) {
    const heading = value(overview, "field_main_title");
    const body = htmlToText(value(overview, "field_desc"));
    const image = mediaUrl(overview, "field_desktop");
    if (heading) data.whyProgram.heading = heading;
    if (body) data.whyProgram.body = body;
    if (image) data.whyProgram.videoThumb = image;
  }

  // Vision / Mission.
  const visionTitle = value(node, "field_our_vision_title");
  const visionBody = htmlToText(value(node, "field_our_vision_description"));
  const visionImages = entities(node, "field_our_vision_image").map(fileUrl).filter((u): u is string => Boolean(u));
  if (visionTitle) data.visionMission.vision.heading = visionTitle;
  if (visionBody) data.visionMission.vision.body = visionBody;
  if (visionImages.length) data.visionMission.vision.images = visionImages;

  const missionTitle = value(node, "field_our_mission_title");
  const missionLines = htmlToListItems(value(node, "field_our_mission_description"));
  const missionImages = entities(node, "field_our_mission_image").map(fileUrl).filter((u): u is string => Boolean(u));
  if (missionTitle) data.visionMission.mission.heading = missionTitle;
  if (missionLines.length) data.visionMission.mission.lines = missionLines;
  if (missionImages.length) data.visionMission.mission.images = missionImages;

  // FAQs: the CMS list replaces the built-in list once it has any complete item.
  const faqs = entities(node, "field_faq")
    .map((p, i) => ({ id: p.id ?? `faq-${i}`, q: value(p, "field_question"), a: htmlToText(value(p, "field_anwser")) }))
    .filter((f) => f.q && f.a);
  if (faqs.length) data.faqs.items = faqs;

  return data;
}

/** Drupal node IDs of the program_listing pages. */
export const PROGRAM_LISTING_NIDS = {
  pgdmMumbai: 4653,
} as const;
