import { ADMISSIONS, type AdmissionsData } from "@/lib/admissions/admissions-data";
import { getNodeReader, type NodeReader } from "../node-page";

const NID = 5957;
const INCLUDE = [
  "field_desktop_image",
  "field_eligibility_criteria_data",
  "field_how_to_apply_steps_data",
  "field_eligibility_cut_offs_data",
  "field_admission_and_course_fees",
  "field_admission_and_course_fees.field_image",
  "field_education_loan_bank_logo",
  "field_scholarships_image",
];

type Entity = Parameters<NodeReader["text"]>[0];

/** Raw HTML of a basic_html field ("" when empty). Rendered only through SafeHtml. */
function html(e: Entity, field: string): string {
  const v = (e?.attributes as Record<string, unknown> | undefined)?.[field];
  const raw = typeof v === "string" ? v : ((v as { value?: string } | null)?.value ?? "");
  // A field holding only empty tags counts as empty.
  return raw.replace(/<[^>]+>|&nbsp;|\s/g, "") ? raw.trim() : "";
}

/** Plain multi-line text -> lines (CRLF safe, blanks dropped). */
const lines = (s: string) => s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
/** Plain text -> paragraphs split by a blank line. */
const blocks = (s: string) => s.split(/\r?\n\s*\r?\n/).map((b) => b.replace(/\s*\r?\n\s*/g, " ").trim()).filter(Boolean);

/**
 * Admissions page from Drupal (node--admissions 5957). Drupal-only once the node loads:
 * an empty field leaves that element empty (the page hides it). The built-in ADMISSIONS
 * copy is used only when Drupal can't be reached. In code: page layout, decor, step numbers
 * fallback, photo crops and the hostel overlay photo (no Drupal field for them).
 */
export async function getAdmissions(): Promise<AdmissionsData> {
  const r = await getNodeReader("admissions", NID, INCLUDE);
  if (!r) return ADMISSIONS;
  const n = r.node;
  // Raw text keeping line breaks (r.text collapses nothing, but strip tags just in case).
  const plain = (e: Entity, f: string) => {
    const v = (e?.attributes as Record<string, unknown> | undefined)?.[f];
    return typeof v === "string" ? v.replace(/<[^>]+>/g, "").trim() : r.text(e, f);
  };
  const cta = r.link(n, "field_how_to_apply");
  const loanCta = r.link(n, "field_education_loan_cta");
  const logoRel = n.relationships?.field_education_loan_bank_logo?.data as { meta?: { alt?: string } } | null | undefined;

  return {
    intro: {
      title: r.text(n, "field_intro_title"),
      subtitle: r.text(n, "field_intro_sub_title"),
      textHtml: html(n, "field_intro_description"),
      // On-page anchor stays relative to this page ("/admissions#how-to-apply" -> "#how-to-apply").
      cta: cta.href ? { label: cta.title || "How to Apply", href: cta.href.replace(/^\/admissions(?=#)/, "") } : { label: "", href: "" },
    },
    eligibility: {
      heading: r.text(n, "field_eligibility_criteria_title"),
      image: r.image(n, "field_desktop_image"),
      itemsHtml: r.refs(n, "field_eligibility_criteria_data").map((p) => html(p, "field_description")).filter(Boolean),
    },
    exams: { heading: r.text(n, "field_entrance_exams_title"), textHtml: html(n, "field_entrance_exams_description") },
    howToApply: {
      heading: r.text(n, "field_how_to_apply_title"),
      textHtml: html(n, "field_how_to_apply_description"),
      steps: r
        .refs(n, "field_how_to_apply_steps_data")
        .map((p, i) => ({
          // field_steps is "step_1".."step_3"; fall back to the position.
          step: Number(r.text(p, "field_steps").match(/\d+/)?.[0] ?? i + 1),
          title: r.text(p, "field_main_title"),
          html: html(p, "field_description"),
        }))
        .filter((s) => s.title || s.html),
    },
    cutoffs: {
      heading: r.text(n, "field_eligibility_cut_offs_title"),
      textHtml: html(n, "field_eligibility_cut_offs_descr"),
      cards: r
        .refs(n, "field_eligibility_cut_offs_data")
        .map((p) => ({ title: r.text(p, "field_main_title"), html: html(p, "field_description"), href: r.link(p, "field_link").href }))
        .filter((c) => c.title || c.html),
    },
    fees: {
      heading: r.text(n, "field_fees_support_title"),
      textHtml: html(n, "field_fees_support_description"),
      cards: r
        .refs(n, "field_admission_and_course_fees")
        .map((p) => {
          const title = r.text(p, "field_main_title");
          // Photo crop + hostel overlay stay in code, matched to the built-in card by title.
          const built = ADMISSIONS.fees.cards.find((c) => c.title.toLowerCase() === title.toLowerCase());
          return {
            title,
            lines: lines(plain(p, "field_sub_title")),
            note: r.text(p, "field_note") || undefined,
            image: r.image(p, "field_image"),
            position: built?.position,
            overlay: built?.overlay,
          };
        })
        .filter((c) => c.title && c.image),
      waiver: { heading: r.text(n, "field_tuition_fee_waiver_title"), html: html(n, "field_tuition_fee_waiver_scheme") },
      admissions: { heading: r.text(n, "field_admissions_heading"), text: r.text(n, "field_admissions_description") },
      loan: {
        heading: r.text(n, "field_education_loan_heading"),
        paragraphs: blocks(plain(n, "field_education_loan_description")),
        logo: r.image(n, "field_education_loan_bank_logo"),
        logoAlt: (logoRel?.meta?.alt ?? "").trim(),
        cta: loanCta.href ? { label: loanCta.title || "Know More", href: loanCta.href } : { label: "", href: "" },
      },
    },
    scholarships: {
      heading: r.text(n, "field_scholarships_title"),
      html: html(n, "field_scholarships_description"),
      image: r.image(n, "field_scholarships_image"),
    },
  };
}
