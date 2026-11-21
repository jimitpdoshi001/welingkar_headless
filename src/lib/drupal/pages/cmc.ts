import { CORPORATE, type CorporateData, type CorporatePanel } from "@/lib/corporate/corporate-data";
import { getNodeReader, or } from "../node-page";

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_desktop_image",
  "field_overview_image",
  "field_our_recruiters_logo",
  "field_placements_data",
  "field_student_profile_data",
  "field_student_profile_data.field_data",
  "field_placement_stats_data",
];

/**
 * Career Management Centre pages from Drupal (career_management_centre 5782 Mumbai,
 * 5783 Bengaluru). Each value falls back to the built-in page while its field is empty.
 */
async function getCmc(nid: number, base: CorporateData): Promise<CorporateData> {
  const r = await getNodeReader("career_management_centre", nid, INCLUDE);
  if (!r) return base;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];

  // Accordion panels; keep the built-in contact card on the panel with the same title.
  const panels: CorporatePanel[] = r
    .refs(n, "field_placements_data")
    .map((p) => {
      const title = r.text(p, "field_main_title");
      const paras = r.paras(p, "field_description");
      const match = base.placements.panels.find((b) => b.title.toLowerCase() === title.toLowerCase());
      return { id: p.id, title, paragraphs: paras.length ? paras : undefined, contact: match?.contact };
    })
    .filter((p) => p.title);

  // Profile groups: each holds value/label pairs (class_profile: main = value, sub = label).
  const groups = r
    .refs(n, "field_student_profile_data")
    .map((p) => ({
      id: p.id,
      title: r.text(p, "field_main_title"),
      stats: r.refs(p, "field_data").map((s) => ({ value: r.text(s, "field_main_title"), label: r.text(s, "field_sub_title") })).filter((s) => s.value),
    }))
    .filter((g) => g.title);

  // Stat items share a card when their title matches (e.g. two "Domestic" rows).
  const cards: CorporateData["stats"]["cards"] = [];
  for (const p of r.refs(n, "field_placement_stats_data")) {
    const title = r.text(p, "field_main_title");
    const value = r.text(p, "field_package");
    if (!title || !value) continue;
    const item = { value, label: r.text(p, "field_package_type") };
    const card = cards.find((c) => c.title === title);
    if (card) card.items.push(item);
    else cards.push({ title, items: [item] });
  }

  return {
    hero: {
      image: or(r.image(banner, "field_desktop"), base.hero.image),
      title: or(r.text(banner, "field_main_title"), base.hero.title),
      body: or(r.paras(banner, "field_sub_title").join("\n") || r.text(banner, "field_sub_title"), base.hero.body),
    },
    overview: {
      heading: or(r.text(n, "field_overview_title"), base.overview.heading),
      paragraphs: or(r.paras(n, "field_overview_description"), base.overview.paragraphs),
      image: or(r.image(n, "field_overview_image"), base.overview.image),
    },
    placements: {
      heading: or(r.text(n, "field_placements_title"), base.placements.heading),
      body: or(r.paras(n, "field_placements_description").join(" "), base.placements.body),
      panels: or(panels, base.placements.panels),
    },
    recruiters: {
      ...base.recruiters,
      heading: or(r.text(n, "field_recruiters_list_tile"), base.recruiters.heading),
      body: or(r.paras(n, "field_recruiters_list_descriptio").join(" "), base.recruiters.body),
      disclaimer: or(r.paras(n, "field_recruiters_list_disclaimer").join(" "), base.recruiters.disclaimer),
      image: or(r.image(n, "field_our_recruiters_logo"), base.recruiters.image),
    },
    batch: {
      heading: or(r.text(n, "field_student_profile_title"), base.batch.heading),
      body: or(r.paras(n, "field_student_profile_descriptio").join(" "), base.batch.body),
      groups: or(groups, base.batch.groups),
    },
    studentProfile: {
      image: or(r.image(n, "field_desktop_image"), base.studentProfile.image),
      heading: or(r.text(n, "field_student_profile_banner_tit"), base.studentProfile.heading),
      body: or(r.paras(n, "field_student_profile_banner_des").join(" "), base.studentProfile.body),
    },
    stats: {
      heading: or(r.text(n, "field_placement_opportunities_ti"), base.stats.heading),
      body: or(r.paras(n, "field_placement_opportunities_de").join(" "), base.stats.body),
      cards: or(cards, base.stats.cards),
    },
  };
}

export const getCmcMumbai = () => getCmc(5782, CORPORATE);
export const getCmcBengaluru = () => getCmc(5783, CORPORATE);
