import { CONFERENCE, type ConferenceData } from "@/lib/conference/conference-data";
import { getNodeReader } from "../node-page";

const NID = 5806;
const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_conference_data",
  "field_conference_tracks_data",
  "field_key_dates_and_deadlines_da",
  "field_submission_guidelines_data",
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "25.11.2026" → "November 25, 2026"; anything else is shown as entered. */
function longDate(value: string): string {
  const m = value.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  return m && +m[2] >= 1 && +m[2] <= 12 ? `${MONTHS[+m[2] - 1]} ${+m[1]}, ${m[3]}` : value;
}

/**
 * WeConference page from Drupal (weconference node 5806). Content is Drupal-only;
 * the built-in page is used only when Drupal cannot be reached. Rich text that has
 * lists or links (guidelines, publication) is passed as HTML and sanitized when shown.
 */
export async function getConference(): Promise<ConferenceData> {
  const r = await getNodeReader("weconference", NID, INCLUDE);
  if (!r) return CONFERENCE;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];
  // Raw HTML of a rich-text field (for sanitized rendering).
  const html = (e: Parameters<typeof r.text>[0], f: string) => {
    const v = (e?.attributes as Record<string, unknown> | undefined)?.[f] as { value?: string } | string | undefined;
    return (typeof v === "string" ? v : v?.value ?? "").trim();
  };
  const contactParas = r.paras(n, "field_contact_us_description");

  return {
    ...CONFERENCE,
    hero: {
      title: r.text(banner, "field_main_title"),
      subtitle: r.text(banner, "field_sub_title"),
      // No Drupal field for the date/venue line: hidden rather than showing old built-in text.
      meta: "",
      image: r.image(banner, "field_desktop") || CONFERENCE.hero.image,
    },
    about: { heading: r.text(n, "field_intro_title"), paragraphs: r.paras(n, "field_intro_description") },
    info: r
      .refs(n, "field_conference_data")
      .map((p) => ({ title: r.text(p, "field_main_title"), text: r.paras(p, "field_description").join(" ") }))
      .filter((i) => i.title),
    tracks: {
      heading: r.text(n, "field_conference_tracks_title"),
      description: r.paras(n, "field_conference_tracks_descript").join(" "),
      items: r
        .refs(n, "field_conference_tracks_data")
        .map((p) => ({ id: p.id, title: r.text(p, "field_main_title"), points: r.paras(p, "field_description") }))
        .filter((t) => t.title),
    },
    guidelines: {
      heading: r.text(n, "field_submission_guidelines_titl"),
      items: [],
      html: r.refs(n, "field_submission_guidelines_data").map((p) => html(p, "field_description")).filter(Boolean),
    },
    publication: {
      heading: r.text(n, "field_publication_opp_title"),
      intro: "",
      points: [],
      html: html(n, "field_publication_opp_descriptio"),
    },
    keyDates: {
      heading: r.text(n, "field_key_dates_deadlines_title"),
      items: r
        .refs(n, "field_key_dates_and_deadlines_da")
        .map((p) => ({ label: r.text(p, "field_main_title"), date: longDate(r.text(p, "field_date_year")) }))
        .filter((d) => d.label),
    },
    contact: {
      heading: r.text(n, "field_contact_us_title"),
      email: r.text(n, "field_contact_us_email"),
      // Description: first paragraph = organisation line, the rest = address.
      org: contactParas[0] ?? "",
      address: contactParas.slice(1).join(" "),
    },
    reachOut: {
      heading: r.text(n, "field_reach_out_title"),
      phone: r.text(n, "field_reach_out_contact_number"),
      people: r.paras(n, "field_reach_out_description"),
    },
  };
}
