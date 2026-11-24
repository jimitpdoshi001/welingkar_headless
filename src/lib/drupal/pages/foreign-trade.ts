import { FOREIGN_TRADE, type ForeignTradeData, type FtmFeeGroup } from "@/lib/programmes/foreign-trade-data";
import type { JsonApiResource } from "../types";
import { getNodeReader, htmlParas } from "../node-page";

const NID = 5958;

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_rankings_data",
  "field_director_desk",
  "field_director_desk.field_thumbnail",
  "field_pgpftm_data",
  "field_pgpftm_image",
  "field_course_structure_data",
  "field_course_structure_image",
  "field_enquire_image",
];

/** Raw HTML of a formatted text field ("" when empty). */
function raw(e: JsonApiResource | undefined, f: string): string {
  const v = (e?.attributes as Record<string, unknown> | undefined)?.[f];
  return typeof v === "string" ? v : ((v as { value?: string } | null)?.value ?? "");
}

type Block = { kind: "p" | "ul"; html: string };
type Section = { title: string; blocks: Block[] };

/**
 * "<h3>Title</h3><p>…</p><ul>…</ul><h3>…" -> sections of text blocks. The rich fields are
 * parsed into the page's existing plain-text structure (no HTML is injected), so the
 * current design is kept exactly.
 */
function sections(html: string): Section[] {
  return html
    .split(/<h3[^>]*>/i)
    .slice(1)
    .map((part) => {
      const [title, rest = ""] = part.split(/<\/h3>/i);
      const blocks = [...rest.matchAll(/<(p|ul)[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({ kind: m[1].toLowerCase() as Block["kind"], html: m[2] }));
      return { title: htmlParas(title).join(" "), blocks };
    })
    .filter((s) => s.title);
}

/** <li> texts of a list (plain). */
const items = (html: string) => [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => htmlParas(m[1]).join(" ")).filter(Boolean);

/** One <p> -> its lines (split on <br>). */
const lines = (html: string) => htmlParas(html.replace(/<br\s*\/?>/gi, "</p><p>"));

/** A paragraph that is only bold text (e.g. "<strong>Two Separate Cheque…</strong>"). */
const isBoldOnly = (html: string) => /^\s*<(strong|b)>[\s\S]*<\/\1>\s*$/i.test(html);

/**
 * PGP-FTM page from Drupal (node--pgpftm 5958). Drupal-only: an empty field hides its element.
 * The built-in page is used only when Drupal cannot be reached. The 4-icon feature row,
 * the enquiry heading and the form options stay built-in.
 */
export async function getForeignTrade(): Promise<ForeignTradeData> {
  const r = await getNodeReader("pgpftm", NID, INCLUDE);
  if (!r) return FOREIGN_TRADE;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];
  const apply = r.link(banner, "field_apply_now");
  const joined = (f: string, e: JsonApiResource | undefined = n) => r.paras(e, f).join(" ");

  const ranks = r.refs(n, "field_rankings_data").map((p) => ({ value: r.text(p, "field_number"), unit: r.text(p, "field_main_title"), text: joined("field_description", p) }));

  // Features: left = duration + batch (h3 + p, batch times in <strong> after a <br>); right = h3 + p blocks.
  const left = sections(raw(n, "field_program_features_left_desc"));
  const [durationSec, batchSec] = left;
  const right = sections(raw(n, "field_program_features_right_des"));

  // Course fee: h3 groups -> plain lines, a bold-only line as the sub-heading, list items as bullets.
  const feeGroups: FtmFeeGroup[] = sections(raw(n, "field_course_fee_description")).map((s) => {
    const group: FtmFeeGroup = { title: s.title, lines: [] };
    for (const b of s.blocks) {
      if (b.kind === "ul") group.bullets = [...(group.bullets ?? []), ...items(b.html)];
      else if (isBoldOnly(b.html)) group.subheading = htmlParas(b.html).join(" ");
      else group.lines.push(...lines(b.html));
    }
    return group;
  });

  // Admissions: text + the application link found in the HTML.
  const admissionHtml = raw(n, "field_admission_description");
  const admissionLink = admissionHtml.match(/<a[^>]+href="([^"]+)"/i)?.[1] ?? "";
  const admissionText = htmlParas(admissionHtml.replace(/<a[\s\S]*?<\/a>/gi, "")).join(" ");

  const contactCol = (f: string) => htmlParas(raw(n, f));

  return {
    hero: {
      title: r.text(banner, "field_main_title"),
      subtitle: r.text(banner, "field_sub_title"),
      cta: apply.href ? { label: apply.title, href: apply.href.replace(/^\/programmes\/foreign-trade-management(?=#)/, "") } : { label: "", href: "" },
      image: r.image(banner, "field_desktop"),
    },
    about: { heading: r.text(n, "field_intro_title"), text: joined("field_intro_description") },
    intro: { lead: r.text(n, "field_institutions_title"), paragraphs: r.paras(n, "field_institutions_description") },
    rankings: { heading: r.text(n, "field_rankings_title"), accreditation: ranks[0], nirf: ranks[1] },
    fieo: { heading: r.text(n, "field_about_fieo_title"), text: joined("field_about_fieo_description") },
    messages: r
      .refs(n, "field_director_desk")
      .map((p) => ({ name: r.text(p, "field_main_title"), role: r.text(p, "field_director_designation"), message: joined("field_description", p), image: r.image(p, "field_thumbnail") }))
      .filter((m) => m.name && m.message),
    programme: {
      heading: r.text(n, "field_pgpftm_title"),
      paragraphs: r.paras(n, "field_pgpftm_description"),
      image: r.image(n, "field_pgpftm_image"),
      encompassHeading: r.text(n, "field_pgpftm_sub_title"),
      encompass: r.refs(n, "field_pgpftm_data").map((p) => r.text(p, "field_main_title")).filter(Boolean),
    },
    features: {
      ...FOREIGN_TRADE.features, // the 4-icon row stays built-in
      heading: r.text(n, "field_program_features_title"),
      duration: durationSec ? { title: durationSec.title, text: durationSec.blocks.flatMap((b) => lines(b.html)).join(" ") } : undefined,
      batch: batchSec
        ? {
            title: batchSec.title,
            // "Evening Batch<br><strong>Mon–Fri …</strong>" -> label + time (further lines kept under the time).
            slots: batchSec.blocks.map((b) => {
              const [label = "", ...time] = lines(b.html);
              return { label, time: time.join("\n") };
            }),
          }
        : undefined,
      details: right.map((s) => ({ title: s.title, text: s.blocks.flatMap((b) => lines(b.html)).join(" ") })),
      objectives: { heading: r.text(n, "field_course_objectives_title"), items: items(raw(n, "field_course_objectives_descript")) },
      faculty: { heading: r.text(n, "field_faculty_title"), items: items(raw(n, "field_faculty_description")) },
    },
    structure: {
      heading: r.text(n, "field_course_structure_title"),
      image: r.image(n, "field_course_structure_image"),
      semesters: r
        .refs(n, "field_course_structure_data")
        .map((p) => ({ title: r.text(p, "field_main_title"), items: items(raw(p, "field_description")) }))
        .filter((s) => s.title || s.items.length),
    },
    fee: { heading: r.text(n, "field_course_fee_title"), groups: feeGroups },
    admissions: { heading: r.text(n, "field_admissions_title"), text: admissionText, link: admissionLink },
    contact: {
      heading: r.text(n, "field_contact_us_heading"),
      addresses: [contactCol("field_contact_us_left_descriptio"), contactCol("field_contact_us_right_descripti")].filter((c) => c.length),
    },
    enquire: { ...FOREIGN_TRADE.enquire, image: r.image(n, "field_enquire_image") },
  };
}
