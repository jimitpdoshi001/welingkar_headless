import { cache } from "react";

import { drupalConfig } from "./config";
import { absoluteDrupalUrl } from "./jsonapi";
import { toHref } from "./link";
import { fixProgramsSpelling } from "@/lib/content-overrides";
import type { PgdmCurriculumSubject, PgdmData } from "@/lib/pgdm/pgdm-data";
import { fixCity } from "@/util/city";
import sanitizeHtml from "sanitize-html";

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
/**
 * Drupal rich text that contains bullet lists -> sanitized HTML (paragraphs,
 * lists, emphasis and links only). Returns "" for text without lists, so those
 * sections keep their plain-text rendering.
 */
function listHtml(html: string): string {
  if (!/<(ul|ol)\b/i.test(html)) return "";
  return sanitizeHtml(html, {
    allowedTags: ["p", "ul", "ol", "li", "strong", "b", "em", "i", "br", "a"],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
  }).trim();
}

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

/** Fetch one program_listing node by its Drupal node ID (cached per request, revalidated every 5 minutes). */
export const getProgramListing = cache(async (nid: number): Promise<RestEntity | null> => {
  if (!Number.isInteger(nid) || nid <= 0) return null;

  try {
    const response = await fetch(`${drupalConfig.baseUrl}/api/program-listing/${nid}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
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

/**
 * Empty every Drupal-managed section. Fixed design labels with no Drupal field
 * (e.g. "Our Recruiters", "Tuition Fee Waiver Scheme") are kept; the page hides
 * a label when its section has no data. The hero keeps its content as a safety net.
 */
function clearCmsContent(data: PgdmData): PgdmData {
  data.bandStats = [];
  data.whyProgram = { heading: "", body: "", videoThumb: "", videoHref: undefined };
  data.visionMission = { vision: { heading: "", body: "", images: [] }, mission: { heading: "", lines: [], images: [] } };
  data.educationalObjectives = { heading: "", items: [] };
  data.outcomes = { heading: "", items: [] };
  data.strengths = { heading: "", subheading: "", image: "", cards: [] };
  data.studentPedagogy = { heading: "", intro: "", image: "", bullets: [] };
  data.uspBand = { heading: "", image: "", cards: [] };
  data.innovativePedagogy = { heading: "", image: "", links: [], hrefs: [] };
  data.programFaculty = { ...data.programFaculty, people: [] };
  data.curriculum = { heading: "", description: "", trimesters: [] };
  data.classProfile = { heading: "", description: "", items: [] };
  data.career = { ...data.career, heading: "", description: "", tabs: [] };
  data.placement = {
    ...data.placement,
    heading: "",
    paragraphs: [],
    image: "",
    imageMobile: undefined,
    years: [],
    whyRecruit: { heading: "", paragraphs: [], cta: { label: "", href: "" } },
    steps: [],
  };
  data.recruiters = { ...data.recruiters, description: "", logos: [] };
  data.fees = {
    ...data.fees,
    description: "",
    cards: [],
    waiver: { ...data.fees.waiver, bullets: [] },
    eligibility: { ...data.fees.eligibility, bullets: [] },
    admissions: undefined,
    loan: undefined,
  };
  data.whoApply = {
    heading: "",
    subtitle: "",
    cards: data.whoApply.cards.map((c) => ({ heading: c.heading, body: "" })),
  };
  data.shortlisting = { ...data.shortlisting, title: "", columns: [], rows: [] };
  data.achievements = { heading: "", description: "", items: [] };
  data.community = { ...data.community, testimonials: [] };
  data.faqs = { ...data.faqs, items: [], brochureCta: { label: "", href: "" } };
  return data;
}

/** Deep-copy with "Bangalore" -> "Bengaluru" in display text; URLs and paths are left untouched. */
function normalizeCities<T>(value: T): T {
  if (typeof value === "string") {
    return (/^(https?:|\/|#|mailto:|tel:)/i.test(value) ? value : fixCity(value)) as T;
  }
  if (Array.isArray(value)) return value.map(normalizeCities) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalizeCities(v)])) as T;
  }
  return value;
}

/** Overlay filled Drupal fields onto the base page content. */
export function applyProgramListing(base: PgdmData, node: RestEntity | null): PgdmData {
  if (!node) return base;
  // Drupal drives this page: start from empty sections so anything the API does
  // not supply is hidden instead of showing built-in content.
  const data: PgdmData = clearCmsContent(structuredClone(base));

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
    const mobile = mediaUrl(banner, "field_mobile");
    if (mobile) data.hero.imageMobile = mobile;
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
    const bodyHtml = listHtml(value(overview, "field_desc"));
    if (bodyHtml) data.whyProgram.html = bodyHtml;
    if (image) data.whyProgram.videoThumb = image;
    // field_type "video": the photo links to the YouTube video.
    const video = value(overview, "field_type") === "video" ? toHref(value(overview, "field_youtube_id")) : null;
    if (video) data.whyProgram.videoHref = video;
  }

  // Vision / Mission.
  const visionTitle = value(node, "field_our_vision_title");
  const visionBody = htmlToText(value(node, "field_our_vision_description"));
  const visionImages = entities(node, "field_our_vision_image").map(fileUrl).filter((u): u is string => Boolean(u));
  if (visionTitle) data.visionMission.vision.heading = visionTitle;
  if (visionBody) data.visionMission.vision.body = visionBody;
  const visionHtml = listHtml(value(node, "field_our_vision_description"));
  if (visionHtml) data.visionMission.vision.html = visionHtml;
  if (visionImages.length) data.visionMission.vision.images = visionImages;

  const missionTitle = value(node, "field_our_mission_title");
  const missionLines = htmlToListItems(value(node, "field_our_mission_description"));
  const missionImages = entities(node, "field_our_mission_image").map(fileUrl).filter((u): u is string => Boolean(u));
  if (missionTitle) data.visionMission.mission.heading = missionTitle;
  if (missionLines.length) data.visionMission.mission.lines = missionLines;
  if (missionImages.length) data.visionMission.mission.images = missionImages;

  applyProgramSections(data, node);

  // FAQs: the CMS list replaces the built-in list once it has any complete item.
  const faqs = entities(node, "field_faq")
    .map((p, i) => ({ id: p.id ?? `faq-${i}`, q: value(p, "field_question"), a: htmlToText(value(p, "field_anwser")) }))
    .filter((f) => f.q && f.a);
  if (faqs.length) data.faqs.items = faqs;
  const brochure = linkHref(node, "field_download_brochure");
  if (brochure) data.faqs.brochureCta = { label: brochure.title || "Download Brochure", href: brochure.href };

  // Server-side city spelling fix, so the client CityNormalizer has nothing to change (no hydration mismatch).
  return normalizeCities(data);
}

type ListNode = { text: string; children: ListNode[] };
type Subject = PgdmCurriculumSubject;

/** Parse `<ul>/<ol>/<li>` HTML into a tree (any depth); text is converted to plain text. */
function parseListTree(html: string): ListNode[] {
  const root: ListNode[] = [];
  const lists: ListNode[][] = []; // open lists, innermost last
  const items: ListNode[] = []; // open <li>, innermost last
  for (const token of decodeEntities(html).split(/(<\/?(?:li|ul|ol)\b[^>]*>)/i)) {
    const tag = token.match(/^<(\/?)(li|ul|ol)\b/i);
    if (!tag) {
      // Text belongs to the innermost open item (inline tags like <strong> are kept for htmlToText).
      if (items.length) items[items.length - 1].text += token;
      continue;
    }
    const closing = tag[1] === "/";
    if (tag[2].toLowerCase() === "li") {
      if (closing) items.pop();
      else if (lists.length) {
        const node: ListNode = { text: "", children: [] };
        lists[lists.length - 1].push(node);
        items.push(node);
      }
    } else if (closing) {
      lists.pop();
    } else {
      // A nested list attaches to the open item; a top-level list to the root.
      lists.push(items.length ? items[items.length - 1].children : root);
    }
  }
  const clean = (nodes: ListNode[]): ListNode[] =>
    nodes.map((n) => ({ text: htmlToText(n.text), children: clean(n.children) })).filter((n) => n.text || n.children.length);
  return clean(root);
}

/**
 * Curriculum subjects (up to three levels):
 *   "Subject"                                  plain item
 *   { label, children: ["Item", …] }           expandable sub-menu
 *   { label, children: [{ label, children }] } sub-menu with a sub-heading group
 * Anything deeper is flattened into its group.
 */
function htmlToNestedList(html: string): Subject[] {
  const flatten = (n: ListNode): string[] => [n.text, ...n.children.flatMap(flatten)].filter(Boolean);
  return parseListTree(html).map((top): Subject => {
    if (!top.children.length) return top.text;
    return {
      label: top.text,
      children: top.children.map((mid) =>
        mid.children.length ? { label: mid.text, children: mid.children.flatMap(flatten) } : mid.text,
      ),
    };
  });
}

/** Text of each `<p>` block, e.g. "Position: 1st Prize". */
const paragraphs = (html: string): string[] =>
  [...decodeEntities(html).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => htmlToText(m[1])).filter(Boolean);

/** "₹12.01 lakhs p.a" → { value: "₹12.01L", unit: "LPA" } (Figma stat style); other text is kept as is. */
function packageStat(raw: string): { value: string; unit?: string } {
  const m = raw.match(/^(₹\s?[\d.,]+)\s*lakhs?\s*p\.?\s*a\.?$/i);
  return m ? { value: `${m[1].replace(/\s/g, "")}L`, unit: "LPA" } : { value: raw };
}

/** Parse the first `<table>` of the shortlisting HTML into columns and rows. */
function parseShortlistTable(html: string): { columns: string[]; rows: { program: string; values: string[]; span?: boolean }[] } | null {
  const table = decodeEntities(html).match(/<table[\s\S]*?<\/table>/i)?.[0];
  if (!table) return null;
  const columns = [...(table.match(/<thead[\s\S]*?<\/thead>/i)?.[0] ?? "").matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((m) => htmlToText(m[1]));
  const body = table.match(/<tbody[\s\S]*?<\/tbody>/i)?.[0] ?? "";
  const rows = [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((tr) => {
      const program = htmlToText(tr[1].match(/<th[^>]*>([\s\S]*?)<\/th>/i)?.[1] ?? "");
      const cells = [...tr[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/gi)];
      const values = cells.map((c) => htmlToText(c[2]));
      const span = cells.length === 1 && /colspan\s*=\s*"?\d/i.test(cells[0][1]);
      return { program, values, ...(span ? { span: true } : {}) };
    })
    .filter((r) => r.program && r.values.length);
  return columns.length && rows.length ? { columns, rows } : null;
}

/** Sections added to Drupal after the first release (objectives → recruiters). */
function applyProgramSections(data: PgdmData, node: RestEntity): void {
  const text = (field: string) => htmlToText(value(node, field));

  // Program Educational Objectives.
  const objTitle = value(node, "field_program_educational_title");
  const objectives = entities(node, "field_program_educational_object")
    .map((p, i) => ({ id: p.id ?? `peo-${i}`, icon: fileUrl(entities(p, "field_icon")[0]) ?? undefined, text: htmlToText(value(p, "field_desc")) }))
    .filter((o) => o.text);
  if (objTitle) data.educationalObjectives.heading = objTitle;
  if (objectives.length) data.educationalObjectives.items = objectives;

  // Program Outcomes.
  const outTitle = value(node, "field_program_outcomes_title");
  const outcomes = entities(node, "field_program_outcomes")
    .map((p, i) => ({ id: p.id ?? `po-${i}`, title: value(p, "field_main_title"), description: htmlToText(value(p, "field_sub_title")) }))
    .filter((o) => o.title);
  if (outTitle) data.outcomes.heading = outTitle;
  if (outcomes.length) data.outcomes.items = outcomes;

  // Program Strengths.
  const strengths = entities(node, "field_program_strengths_data").map((p) => value(p, "field_main_title")).filter(Boolean);
  const strengthsImage = fileUrl(entities(node, "field_program_strengths_desktop")[0]);
  if (value(node, "field_program_strengths_title")) data.strengths.heading = value(node, "field_program_strengths_title");
  if (value(node, "field_program_strengths_sub_titl")) data.strengths.subheading = value(node, "field_program_strengths_sub_titl");
  if (strengthsImage) data.strengths.image = strengthsImage;
  const strengthsMobile = fileUrl(entities(node, "field_program_strengths_mobile_i")[0]);
  if (strengthsMobile) data.strengths.imageMobile = strengthsMobile;
  if (strengths.length) data.strengths.cards = strengths;

  // Student-Centric Pedagogy: first list item is the intro, the rest are bullets.
  const pedagogy = entities(node, "field_student_centric_pedagogy")[0];
  if (pedagogy) {
    const items = htmlToListItems(value(pedagogy, "field_desc"));
    const image = fileUrl(entities(pedagogy, "field_image")[0]);
    // Every Drupal list item is a bullet; the intro is only used for plain paragraphs.
    const intro = htmlToText(value(pedagogy, "field_desc").replace(/<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>/gi, ""));
    if (items.length) data.studentPedagogy.bullets = items;
    if (intro) data.studentPedagogy.intro = intro;
    if (image) data.studentPedagogy.image = image;
  }
  if (value(node, "field_student_centric_pedagogy_t")) data.studentPedagogy.heading = value(node, "field_student_centric_pedagogy_t");

  // Program USPs.
  const usps = entities(node, "field_program_usps").map((p) => value(p, "field_main_title")).filter(Boolean);
  const uspImage = fileUrl(entities(node, "field_program_usp_desktop_image")[0]);
  if (value(node, "field_program_usp_title")) data.uspBand.heading = value(node, "field_program_usp_title");
  if (uspImage) data.uspBand.image = uspImage;
  const uspMobile = fileUrl(entities(node, "field_program_usp_mobile_image")[0]);
  if (uspMobile) data.uspBand.imageMobile = uspMobile;
  if (usps.length) data.uspBand.cards = usps;

  // Innovative Teaching and Learning: rows link to a PDF or an external URL.
  const innovative = entities(node, "field_innovative_data")
    .map((p) => {
      const pdf = fileUrl(entities(entities(p, "field_pdf")[0], "field_media_document")[0]);
      const external = toHref(value(p, "field_external_url"));
      return { label: value(p, "field_main_title"), href: pdf ?? external ?? null };
    })
    .filter((l) => l.label);
  const innovativeImage = fileUrl(entities(node, "field_innovative_teaching_and_le")[0]);
  if (value(node, "field_innovative_teaching_title")) data.innovativePedagogy.heading = value(node, "field_innovative_teaching_title");
  if (innovativeImage) data.innovativePedagogy.image = innovativeImage;
  const innovativeMobile = fileUrl(entities(node, "field_innovative_teaching_mobile")[0]);
  if (innovativeMobile) data.innovativePedagogy.imageMobile = innovativeMobile;
  if (innovative.length) {
    data.innovativePedagogy.links = innovative.map((l) => l.label);
    data.innovativePedagogy.hrefs = innovative.map((l) => l.href);
  }

  // Curriculum: Year I trimesters first, then Year II (the page shows three per year).
  const terms = entities(node, "field_curriculum_data")
    .map((p, i) => ({
      year: value(p, "field_curriculum_year"),
      trimester: {
        id: p.id ?? `t${i}`,
        label: value(p, "field_main_title"),
        subjects: htmlToNestedList(value(p, "field_desc")),
        objectives: [] as string[],
        year: value(p, "field_curriculum_year") || undefined,
      },
    }))
    .filter((t) => t.trimester.label && t.trimester.subjects.length);
  if (value(node, "field_curriculum_title")) data.curriculum.heading = value(node, "field_curriculum_title");
  if (text("field_curriculum_description")) data.curriculum.description = text("field_curriculum_description");
  if (terms.length) {
    const yearOne = terms.filter((t) => t.year === "year_i").map((t) => t.trimester);
    const later = terms.filter((t) => t.year !== "year_i").map((t) => t.trimester);
    data.curriculum.trimesters = [...yearOne, ...later];
  }

  // Class profile.
  const profile = entities(node, "field_class_profile_data")
    .map((p, i) => ({
      id: p.id ?? `cp-${i}`,
      label: value(p, "field_main_title"),
      stats: entities(p, "field_data").map((s) => ({ value: value(s, "field_main_title"), label: value(s, "field_sub_title") })).filter((s) => s.value && s.label),
    }))
    .filter((g) => g.label && g.stats.length);
  if (value(node, "field_class_profile_heading")) data.classProfile.heading = value(node, "field_class_profile_heading");
  if (value(node, "field_class_profile_description")) data.classProfile.description = value(node, "field_class_profile_description");
  if (profile.length) data.classProfile.items = profile;

  // Career opportunities (role tabs are not filled in Drupal yet).
  if (value(node, "field_career_opportunities_title")) data.career.heading = value(node, "field_career_opportunities_title");
  if (value(node, "field_career_opportunities_desc")) data.career.description = value(node, "field_career_opportunities_desc");
  const careerTabs = entities(node, "field_career_opportunities")
    .map((p, i) => ({
      id: p.id ?? `career-${i}`,
      label: value(p, "field_main_title"),
      roles: entities(p, "field_career_opportunities_data").map((r) => value(r, "field_main_title")).filter(Boolean),
    }))
    .filter((t) => t.label && t.roles.length);
  if (careerTabs.length) data.career.tabs = careerTabs;

  // Placement.
  const placementParas = text("field_placement_opportunities_de").split("\n").filter(Boolean);
  const placementImage = fileUrl(entities(node, "field_placement_desktop_image")[0]);
  const years = entities(node, "field_placement_opportunities")
    .map((p, i) => {
      const label = value(p, "field_year").replace(/_/g, "-");
      const rows = entities(p, "field_placement_opportunities_da");
      const types = [...new Set(rows.map((r) => value(r, "field_package_type")).filter(Boolean))];
      const type = types.length === 1 ? types[0] : "";
      const titleCase = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
      const stats = rows
        .map((r) => {
          const rowType = value(r, "field_package_type");
          const label = value(r, "field_main_title");
          return { ...packageStat(value(r, "field_package")), label: types.length > 1 && rowType ? `${label} (${titleCase(rowType)})` : label };
        })
        .filter((s) => s.value && s.label);
      return {
        id: label || `year-${i}`,
        label,
        caption: `Year ${label}${type ? `\n${titleCase(type)}` : ""}`,
        stats,
      };
    })
    .filter((y) => y.label && y.stats.length);
  if (value(node, "field_placement_opportunities_ti")) data.placement.heading = value(node, "field_placement_opportunities_ti");
  if (placementParas.length) data.placement.paragraphs = placementParas;
  if (placementImage) data.placement.image = placementImage;
  const placementMobile = fileUrl(entities(node, "field_placement_mobile_image")[0]);
  if (placementMobile) data.placement.imageMobile = placementMobile;
  if (years.length) data.placement.years = years;

  // Recruiters card (placement band) and Our Recruiters section.
  const recruitersCard = entities(node, "field_recruiters_data")[0];
  const recruitersTitle = value(recruitersCard, "field_main_title");
  const recruitersParas = (text("field_recruiters_description") || htmlToText(value(recruitersCard, "field_recruiters_sub_title")))
    .split("\n")
    .filter(Boolean);
  const recruitersLink = linkHref(node, "field_recruiters_link");
  if (recruitersLink) data.placement.whyRecruit.cta = { label: recruitersLink.title || data.placement.whyRecruit.cta.label, href: recruitersLink.href };
  const logos = entities(node, "field_our_recruiters_logo")
    .map((f) => {
      const meta = f as { filename?: string; width?: string | number; height?: string | number };
      return {
        image: fileUrl(f) ?? "",
        name: str(f.alt) || str(meta.filename).replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " "),
        // Drupal's recruiter logo style pads each logo into a 250x40 canvas.
        padded: Number(meta.width) === 250 && Number(meta.height) === 40,
      };
    })
    .filter((l) => l.image && l.name);
  if (logos.length) data.recruiters.logos = logos;
  if (recruitersTitle) data.placement.whyRecruit.heading = recruitersTitle;
  if (recruitersParas.length) data.placement.whyRecruit.paragraphs = recruitersParas;
  if (value(node, "field_our_recruiters_description")) data.recruiters.description = value(node, "field_our_recruiters_description");

  // Admission and course fees.
  const fees = entities(node, "field_admission_and_course_fees")
    .map((p) => ({
      image: fileUrl(entities(p, "field_image")[0]) ?? "",
      label: value(p, "field_main_title"),
      value: value(p, "field_sub_title"),
      ...(value(p, "field_note") ? { note: value(p, "field_note") } : {}),
    }))
    .filter((c) => c.label && c.value && c.image);
  const waiver = htmlToListItems(value(node, "field_tuition_fee_waiver_scheme"));
  if (value(node, "field_admission_course_descripti")) data.fees.description = value(node, "field_admission_course_descripti");
  if (fees.length) data.fees.cards = fees;
  if (waiver.length) data.fees.waiver.bullets = waiver;

  // Admissions / Education loan: shown only when Drupal has content.
  const admissionsText = text("field_admissions_description").split("\n").filter(Boolean);
  if (admissionsText.length) {
    data.fees.admissions = { heading: value(node, "field_admissions_heading") || "Admissions", paragraphs: admissionsText };
  }
  const loanText = text("field_education_loan_description").split("\n").filter(Boolean);
  const bankLogo = entities(node, "field_education_loan_bank_logo")[0];
  const bankLogoUrl = fileUrl(bankLogo);
  const loanCta = linkHref(node, "field_education_loan_cta");
  const loanPartners = bankLogoUrl
    ? [{ name: str(bankLogo?.alt) || "Bank", logo: bankLogoUrl, href: loanCta?.href ?? "", label: loanCta?.title || "Know More" }]
    : [];
  if (loanText.length || loanPartners.length) {
    data.fees.loan = {
      heading: value(node, "field_education_loan_heading") || "Education Loan",
      paragraphs: loanText,
      partners: loanPartners,
    };
  }

  // Who should apply / eligibility cards.
  if (value(node, "field_who_should_apply_desc")) data.whoApply.heading = value(node, "field_who_should_apply_desc");
  const [whoCard, eligibilityCard] = data.whoApply.cards;
  if (whoCard && value(node, "field_who_should_apply_sub_title")) whoCard.body = value(node, "field_who_should_apply_sub_title");
  if (eligibilityCard) {
    if (text("field_eligibility_criteria")) eligibilityCard.heading = text("field_eligibility_criteria");
    if (text("field_eligibility_criteria_descr")) eligibilityCard.body = text("field_eligibility_criteria_descr");
    const eligibilityHtml = listHtml(value(node, "field_eligibility_criteria_descr"));
    if (eligibilityHtml) eligibilityCard.html = eligibilityHtml;
    if (value(node, "field_eligibility_criteria_note")) eligibilityCard.note = value(node, "field_eligibility_criteria_note");
    const eligibilityLink = linkHref(node, "field_eligibility_criteria_link");
    if (eligibilityLink) eligibilityCard.cta = { label: eligibilityLink.title || eligibilityCard.cta?.label || "Apply Now", href: eligibilityLink.href };
  }

  // Shortlisting criteria table.
  if (value(node, "field_shortlisting_criteria_titl")) data.shortlisting.title = value(node, "field_shortlisting_criteria_titl").replace(/\s{2,}/g, " ");
  const shortlistHtml = value(node, "field_shortlisting_criteria");
  // Sub-heading: paragraph text placed before the first table.
  const intro = paragraphs(shortlistHtml.split(/<table/i)[0] ?? "").join("\n");
  if (intro) data.shortlisting.description = intro;
  const table = parseShortlistTable(shortlistHtml);
  if (table) {
    data.shortlisting.columns = table.columns;
    data.shortlisting.rows = table.rows;
  }

  // Program faculty. No items exist in Drupal yet, so the field names below are
  // the conventions used by the other paragraphs here; confirm once data is added.
  const faculty = entities(node, "field_program_faculty_data")
    .map((p, i) => ({
      id: p.id ?? `pf-${i}`,
      name: value(p, "field_main_title") || value(p, "field_name"),
      title: value(p, "field_sub_title") || value(p, "field_designation"),
      image: fileUrl(entities(p, "field_image")[0]) ?? mediaUrl(p, "field_image") ?? "",
    }))
    .filter((f) => f.name && f.image);
  if (faculty.length) data.programFaculty.people = faculty;

  // Student achievements: "Position" line, bullet list, then "Team members" names.
  const achievements = entities(node, "field_student_achievements")
    .map((p, i) => {
      const html = value(p, "field_desc");
      const paras = paragraphs(html);
      const teamAt = paras.findIndex((t) => /^team members$/i.test(t));
      const extra = paras.filter((t, idx) => idx !== teamAt && !/^position/i.test(t) && (teamAt < 0 || idx < teamAt));
      return {
        id: p.id ?? `ach-${i}`,
        image: fileUrl(entities(p, "field_image")[0]) ?? "",
        title: value(p, "field_main_title"),
        position: paras.find((t) => /^position/i.test(t)) ?? "",
        bullets: [...htmlToListItems(html), ...extra],
        team: teamAt >= 0 ? paras.slice(teamAt + 1).join(", ") : "",
      };
    })
    .filter((a) => a.title && a.image);
  if (achievements.length) data.achievements.items = achievements;
  if (value(node, "field_student_achievements_title")) data.achievements.heading = value(node, "field_student_achievements_title");
  if (value(node, "field_student_achievements_descr")) data.achievements.description = htmlToText(value(node, "field_student_achievements_descr"));

  // Straight from our community: quote cards. An item with a YouTube URL gets a
  // "Watch Video" link; one without is a plain quote card.
  // Drupal: field_main_title = name, field_recruiters_sub_title = role,
  // field_description = quote, field_icon = avatar (field_image is the older photo).
  const community = entities(node, "field_straight_from_our_communit")
    .map((p, i) => {
      const youtube = value(p, "field_youtube_id");
      const watch = value(p, "field_type") === "video" || youtube ? toHref(youtube) : null;
      return {
        id: p.id ?? `cm-${i}`,
        quote: htmlToText(value(p, "field_description")),
        name: value(p, "field_main_title"),
        role: value(p, "field_recruiters_sub_title"),
        avatar: fileUrl(entities(p, "field_icon")[0]) ?? fileUrl(entities(p, "field_image")[0]) ?? "",
        ...(watch ? { watchUrl: watch } : {}),
      };
    })
    .filter((t) => t.quote && t.name);
  if (community.length) data.community.testimonials = community;
}

/** Drupal node IDs of the program_listing pages. */
export const PROGRAM_LISTING_NIDS = {
  pgdmMumbai: 4653,
  pgdmBengaluru: 4654,
  pgdmResearchAnalytics: 4655,
  pgdmBusinessDesignMumbai: 4657,
  pgdmHealthcareMumbai: 4658,
  pgdmMediaMumbai: 4661,
  pgdmRetailMumbai: 4659,
  pgdmRuralMumbai: 4660,
  pgdmBusinessDesignBengaluru: 4663,
  pgdmEBusinessMumbai: 4656,
  pgdmEBusinessBengaluru: 4662,
  pgdmResearchAnalyticsBengaluru: 4664,
} as const;

/** Program slugs (/programmes/[slug]) whose content comes from Drupal. */
export const PROGRAM_SLUG_NIDS: Record<string, number> = {
  "pgdm-research-analytics": PROGRAM_LISTING_NIDS.pgdmResearchAnalytics,
  "pgdm-business-design": PROGRAM_LISTING_NIDS.pgdmBusinessDesignMumbai,
  "pgdm-healthcare": PROGRAM_LISTING_NIDS.pgdmHealthcareMumbai,
  "pgdm-media": PROGRAM_LISTING_NIDS.pgdmMediaMumbai,
  "pgdm-retail": PROGRAM_LISTING_NIDS.pgdmRetailMumbai,
  "pgdm-rural": PROGRAM_LISTING_NIDS.pgdmRuralMumbai,
  "pgdm-e-business": PROGRAM_LISTING_NIDS.pgdmEBusinessMumbai,
};

/** Bengaluru versions (/programmes/[slug]?campus=bengaluru): Drupal node per slug. */
export const PROGRAM_SLUG_NIDS_BENGALURU: Record<string, number> = {
  "pgdm-business-design": PROGRAM_LISTING_NIDS.pgdmBusinessDesignBengaluru,
  "pgdm-e-business": PROGRAM_LISTING_NIDS.pgdmEBusinessBengaluru,
  "pgdm-research-analytics": PROGRAM_LISTING_NIDS.pgdmResearchAnalyticsBengaluru,
};
