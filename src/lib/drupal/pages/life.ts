import { LIFE, LIFE_BENGALURU, type LifeData } from "@/lib/life/life-data";
import { absoluteDrupalUrl } from "../jsonapi";
import { getNodeReader, or, type NodeReader } from "../node-page";

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_campus_data",
  "field_campus_data.field_image",
  "field_campus_facilities_data",
  "field_current_students_data",
  "field_happening_now_data",
  "field_ideas_from_the_people_data",
  "field_ideas_from_the_people_data.field_image",
  "field_our_vision_image",
  "field_run_by_students_data",
  "field_two_years_in_pictures_data",
  "field_two_years_in_pictures_data.field_image",
];

/** URLs of a multi-value file field (the image reader only returns the first). */
const files = (r: NodeReader, e: Parameters<NodeReader["refs"]>[0], f: string) =>
  r
    .refs(e, f)
    .map((x) => absoluteDrupalUrl((x.attributes.uri as { url?: string } | undefined)?.url) ?? "")
    .filter(Boolean);

/** Split text into sentences ("campus.24×7" has no space in Drupal, so split after any period before a non-space). */
const sentences = (s: string) => s.split(/(?<=\.)\s*(?=\S)/).map((x) => x.trim()).filter(Boolean);

/**
 * Life @ WeSchool pages from Drupal (life_at_weschool 5780 Mumbai, 5781 Bengaluru).
 * Each value falls back to the built-in page; address, tabs and visit stay built-in.
 */
async function getLife(nid: number, base: LifeData): Promise<LifeData> {
  const r = await getNodeReader("life_at_weschool", nid, INCLUDE);
  if (!r) return base;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];

  // Intro: the last paragraph is the highlighted line.
  const intro = r.paras(n, "field_description");
  const highlight = intro.length > 1 ? intro[intro.length - 1] : "";
  const introParas = highlight ? intro.slice(0, -1) : intro;

  const cards = r.refs(n, "field_campus_data").map((p, i) => ({
    id: p.id,
    image: r.image(p, "field_image") || base.campus.cards[i]?.image || "",
    title: r.text(p, "field_main_title"),
    body: r.paras(p, "field_description").join(" "),
  }));

  // Facilities data: [0] Campus Facilities, [1] Hostel.
  const [fac, hostel] = r.refs(n, "field_campus_facilities_data");
  const hostelLines = hostel ? sentences(r.paras(hostel, "field_description").join(" ")) : [];

  const cells = r.refs(n, "field_run_by_students_data").map((p) => ({ title: r.text(p, "field_main_title"), text: r.text(p, "field_sub_title") }));

  // Gallery subtitle renders on two rows: last sentence goes on the second.
  const galSub = sentences(r.paras(n, "field_two_years_pictures_descrip").join(" "));
  const galImages = r.refs(n, "field_two_years_in_pictures_data").map((p) => r.image(p, "field_image")).filter(Boolean);
  const viewAll = r.link(n, "field_view_all_link");

  const events = r.refs(n, "field_happening_now_data").map((p) => ({
    id: p.id,
    title: r.text(p, "field_main_title"),
    when: r.text(p, "field_time"),
    host: r.text(p, "field_hosted_by"),
    desc: r.paras(p, "field_description").join(" "),
    href: r.link(p, "field_link").href || "/events",
  }));

  const stories = r.refs(n, "field_ideas_from_the_people_data").map((p, i) => {
    const mins = r.text(p, "field_read_time");
    return {
      id: p.id,
      image: r.image(p, "field_image") || base.ideas.stories[i]?.image || "",
      tag: r.text(p, "field_type_data"),
      title: r.text(p, "field_main_title"),
      meta: [r.text(p, "field_subtitle"), r.text(p, "field_date_year"), mins && `${mins} min read`].filter(Boolean).join(" · "),
    };
  });

  const students = r.refs(n, "field_current_students_data").map((p) => ({ title: r.text(p, "field_main_title"), text: r.text(p, "field_sub_title") }));

  return {
    ...base,
    hero: {
      title: or(r.text(banner, "field_main_title"), base.hero.title),
      subtitle: or(r.text(banner, "field_sub_title"), base.hero.subtitle),
      image: or(r.image(banner, "field_desktop"), base.hero.image),
    },
    intro: {
      paragraphs: or(introParas, base.intro.paragraphs),
      highlight: or(highlight, base.intro.highlight),
      images: or(files(r, n, "field_our_vision_image"), base.intro.images),
    },
    campus: {
      heading: or(r.text(n, "field_campus_title"), base.campus.heading),
      subtitle: or(r.paras(n, "field_campus_description").join(" "), base.campus.subtitle),
      cards: or(cards, base.campus.cards),
    },
    facilities: {
      heading: or(r.text(fac, "field_main_title"), base.facilities.heading),
      text: or(r.paras(fac, "field_description").join(" "), base.facilities.text),
    },
    hostel: { heading: or(r.text(hostel, "field_main_title"), base.hostel.heading), lines: or(hostelLines, base.hostel.lines) },
    cells: {
      ...base.cells,
      heading: or(r.text(n, "field_run_by_students_title"), base.cells.heading),
      body: or(r.paras(n, "field_run_by_students_descriptio").join("\n"), base.cells.body),
      items: or(cells, base.cells.items),
    },
    gallery: {
      ...base.gallery,
      heading: or(r.text(n, "field_two_years_pictures_title"), base.gallery.heading),
      subtitle: galSub.length > 1 ? [galSub.slice(0, -1).join(" "), galSub[galSub.length - 1]] : base.gallery.subtitle,
      cta: viewAll.href ? { label: or(viewAll.title, base.gallery.cta.label), href: viewAll.href } : base.gallery.cta,
      images: or(galImages, base.gallery.images),
    },
    happening: {
      ...base.happening,
      heading: or(r.text(n, "field_happening_now_title"), base.happening.heading),
      subtitle: or(r.paras(n, "field_happening_now_description").join(" "), base.happening.subtitle),
      events: or(events, base.happening.events),
    },
    ideas: {
      heading: or(r.text(n, "field_ideas_from_the_people_titl"), base.ideas.heading),
      subtitle: or(r.paras(n, "field_ideas_from_the_people_desc").join(" "), base.ideas.subtitle),
      note: or(r.paras(n, "field_contact_details").join(" "), base.ideas.note),
      stories: or(stories, base.ideas.stories),
    },
    students: { heading: or(r.text(n, "field_current_students_title"), base.students.heading), items: or(students, base.students.items) },
  };
}

export const getLifeMumbai = () => getLife(5780, LIFE);
export const getLifeBengaluru = () => getLife(5781, LIFE_BENGALURU);
