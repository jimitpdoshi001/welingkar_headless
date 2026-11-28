import type { JournalYear, WeResearchData } from "@/lib/weresearch/weresearch-data";
import { getNodeReader, or, type NodeReader } from "../node-page";

/** Drupal node--weresearch: 5804 Mumbai, 5960 Bengaluru. */
export const WERESEARCH_NIDS = { mumbai: 5804, bengaluru: 5960 } as const;

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_desktop_image",
  "field_governance_data",
  "field_research_publications_data",
  "field_research_publications_data.field_image",
  "field_research_activities_image",
  "field_area_of_research_data",
  "field_center_of_excellence_image",
  "field_seminars_image",
  "field_aweshkar_journal_data",
  "field_aweshkar_journal_data.field_pdf",
  "field_aweshkar_journal_image",
];

type Entity = Parameters<NodeReader["text"]>[0];

/** Link field -> { label, href } (label falls back to the built-in one). */
const cta = (r: NodeReader, e: Entity, f: string, base: { label: string; href: string }) => {
  const l = r.link(e, f);
  return l.href ? { label: or(l.title, base.label), href: l.href } : base;
};

/**
 * WeResearch page from Drupal. Each value falls back to the built-in page while its Drupal
 * field is empty (both nodes are new), so editors can fill the page field by field.
 * Built-in only: research-area icons (no Drupal field), CECD link label.
 */
export async function withWeResearchContent(nid: number, base: WeResearchData): Promise<WeResearchData> {
  const r = await getNodeReader("weresearch", nid, INCLUDE);
  if (!r) return base;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];

  const governance = r
    .refs(n, "field_governance_data")
    .map((p) => ({ title: r.text(p, "field_main_title"), body: r.paras(p, "field_description").join(" "), href: r.link(p, "field_link").href || "#" }))
    .filter((g) => g.title);
  const publications = r
    .refs(n, "field_research_publications_data")
    .map((p, i) => ({
      title: r.text(p, "field_main_title"),
      image: or(r.image(p, "field_image"), base.publications.cards[i]?.image ?? ""),
      href: r.link(p, "field_link").href || "#",
    }))
    .filter((c) => c.title);
  // Area titles from Drupal; icons stay built-in, matched by label, else by position.
  const areas = r
    .refs(n, "field_area_of_research_data")
    .map((p) => r.text(p, "field_main_title"))
    .filter(Boolean)
    .map((label, i) => ({
      label,
      icon: base.areas.items.find((a) => a.label.toLowerCase() === label.toLowerCase())?.icon ?? base.areas.items[i % base.areas.items.length].icon,
    }));
  // Journal issues grouped by year, newest first; each issue links to its PDF.
  const byYear = new Map<string, JournalYear["issues"]>();
  for (const p of r.refs(n, "field_aweshkar_journal_data")) {
    const year = r.text(p, "field_journal_year");
    const label = r.text(p, "field_main_title");
    const href = r.image(p, "field_pdf"); // file field: same URL reader as images
    if (!year || !label || !href) continue;
    byYear.set(year, [...(byYear.get(year) ?? []), { label, href }]);
  }
  const years = [...byYear.entries()].sort(([a], [b]) => Number(b) - Number(a)).map(([year, issues]) => ({ year, issues }));
  const cecdTitle = r.text(n, "field_center_of_excellence_title");
  const [pdf, apply] = r.links(n, "field_doctoral_research_link");

  return {
    hero: {
      title: or(r.text(banner, "field_main_title"), base.hero.title),
      body: or(r.paras(banner, "field_sub_title").join(" "), base.hero.body),
      image: or(r.image(banner, "field_desktop"), base.hero.image),
    },
    about: {
      heading: or(r.text(n, "field_intro_title"), base.about.heading),
      paragraphs: or(r.paras(n, "field_intro_description"), base.about.paragraphs),
      image: or(r.image(n, "field_desktop_image"), base.about.image),
    },
    governance: { heading: or(r.text(n, "field_governance_title"), base.governance.heading), items: or(governance, base.governance.items) },
    publications: {
      heading: or(r.text(n, "field_research_publications_titl"), base.publications.heading),
      description: or(r.paras(n, "field_research_publications_desc").join(" "), base.publications.description),
      cards: or(publications, base.publications.cards),
    },
    projects: {
      ...base.projects,
      heading: or(r.text(n, "field_research_project_title"), base.projects.heading),
      body: or(r.paras(n, "field_research_project_descripti").join(" "), base.projects.body),
    },
    activities: {
      heading: or(r.text(n, "field_research_activities_title"), base.activities.heading),
      body: or(r.paras(n, "field_research_activities_descri").join(" "), base.activities.body),
      image: or(r.image(n, "field_research_activities_image"), base.activities.image),
      cta: cta(r, n, "field_research_activities_link", base.activities.cta),
    },
    areas: { heading: or(r.text(n, "field_area_of_research_title"), base.areas.heading), items: or(areas, base.areas.items) },
    cecd: {
      ...base.cecd,
      headingLines: cecdTitle ? [cecdTitle] : base.cecd.headingLines,
      body: or(r.paras(n, "field_center_of_excellence_descr").join(" "), base.cecd.body),
      image: or(r.image(n, "field_center_of_excellence_image"), base.cecd.image),
    },
    seminars: {
      heading: or(r.text(n, "field_seminars_title"), base.seminars.heading),
      body: or(r.paras(n, "field_seminars_description").join(" "), base.seminars.body),
      image: or(r.image(n, "field_seminars_image"), base.seminars.image),
      cta: cta(r, n, "field_seminars_link", base.seminars.cta),
    },
    doctoral: {
      ...base.doctoral,
      heading: or(r.text(n, "field_doctoral_research_title"), base.doctoral.heading),
      paragraphs: or(r.paras(n, "field_doctoral_research_descript"), base.doctoral.paragraphs),
      // Two links in Drupal: the PDF, then Apply.
      pdf: pdf?.href ? { label: or(pdf.title, base.doctoral.pdf.label), href: pdf.href } : base.doctoral.pdf,
      apply: apply?.href ? { label: or(apply.title, base.doctoral.apply.label), href: apply.href } : base.doctoral.apply,
    },
    journal: {
      ...base.journal,
      heading: or(r.text(n, "field_aweshkar_journal_title"), base.journal.heading),
      body: or(r.paras(n, "field_aweshkar_journal_descripti").join(" "), base.journal.body),
      years: or(years, base.journal.years),
      image: or(r.image(n, "field_aweshkar_journal_image"), base.journal.image),
    },
  };
}
