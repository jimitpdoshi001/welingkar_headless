import { ALUMNI, type AlumniData } from "@/lib/alumni/alumni-data";
import { getNodeReader, or } from "../node-page";

const NID = 5764;
const INCLUDE = [
  "field_banner.field_desktop.field_media_image",
  "field_alumni_experience_image",
  "field_alumni_story_image",
  "field_alumni_learning_data.field_icon",
];

/** Two-line headings: CMS line breaks, else split after the first comma. */
function lines(text: string, fallback: string[]): string[] {
  const parts = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (parts.length > 1) return parts;
  const m = text.match(/^(.+?,)\s*(.+)$/);
  return m ? [m[1], m[2]] : text ? [text] : fallback;
}

/** /alumni content from Drupal node 5764; built-in values fill empty fields. */
export async function getAlumni(): Promise<AlumniData> {
  const r = await getNodeReader("alumni", NID, INCLUDE);
  if (!r) return ALUMNI;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];
  const cta = r.link(n, "field_external_url");
  const items = r.refs(n, "field_alumni_learning_data").map((p, i) => ({
    id: p.id,
    icon: r.image(p, "field_icon") || ALUMNI.programs.items[i]?.icon || "",
    title: r.text(p, "field_main_title"),
    text: r.paras(p, "field_description").join(" "),
  }));

  return {
    ...ALUMNI,
    hero: {
      image: or(r.image(banner, "field_desktop"), ALUMNI.hero.image),
      heading: or(r.text(banner, "field_main_title"), ALUMNI.hero.heading),
      body: or(r.text(banner, "field_sub_title"), ALUMNI.hero.body),
    },
    intro: {
      headingLines: lines(r.text(n, "field_alumni_heading"), ALUMNI.intro.headingLines),
      paragraphs: or(r.paras(n, "field_alumni_description"), ALUMNI.intro.paragraphs),
    },
    experience: {
      heading: or(r.text(n, "field_alumni_experience_heading"), ALUMNI.experience.heading),
      body: or(r.paras(n, "field_alumni_experience_descript").join(" "), ALUMNI.experience.body),
      image: or(r.image(n, "field_alumni_experience_image"), ALUMNI.experience.image),
    },
    programs: {
      heading: or(r.text(n, "field_alumni_learning_title"), ALUMNI.programs.heading),
      body: or(r.paras(n, "field_alumni_learning_descriptio").join(" "), ALUMNI.programs.body),
      items: items.length ? items : ALUMNI.programs.items,
    },
    quote: {
      text: or(r.text(n, "field_our_alumni_title"), ALUMNI.quote.text),
      caption: or(r.text(n, "field_our_alumni_description"), ALUMNI.quote.caption),
    },
    reconnect: {
      headingLines: lines(r.text(n, "field_alumni_story_title"), ALUMNI.reconnect.headingLines),
      body: or(r.paras(n, "field_alumni_story_description").join(" "), ALUMNI.reconnect.body),
      image: or(r.image(n, "field_alumni_story_image"), ALUMNI.reconnect.image),
      cta: cta.href ? { label: cta.title || ALUMNI.reconnect.cta.label, href: cta.href } : ALUMNI.reconnect.cta,
    },
  };
}
