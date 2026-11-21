import type { CampusData } from "@/lib/campus/campus-data";
import { absoluteDrupalUrl } from "../jsonapi";
import { getNodeReader, or, type NodeReader } from "../node-page";

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_banner_bottom_description",
  "field_about_campus_desktop_image",
  "field_accreditations_logo",
  "field_director_desk",
  "field_our_network_desktop_image",
  "field_our_network_links",
  "field_our_recruiters_logos",
  "field_weresearch_desktop_image",
  "field_world_of_weschool_image",
  "field_state_of_the_art_data",
  "field_state_of_the_art_data.field_image",
  "field_campus_moments_data",
  "field_campus_moments_data.field_image",
  "field_whats_new_at_weschool_data",
  "field_whats_new_at_weschool_data.field_image",
];

type Entity = Parameters<NodeReader["refs"]>[0];

/** Files of a multi-value file field, with a readable name from the file name. */
const fileList = (r: NodeReader, e: Entity, f: string) =>
  r
    .refs(e, f)
    .map((x) => ({
      name: String(x.attributes.filename ?? "").replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim(),
      image: absoluteDrupalUrl((x.attributes.uri as { url?: string } | undefined)?.url) ?? "",
    }))
    .filter((l) => l.image);

/** "https://youtu.be/<id>" or a watch URL → the privacy-friendly autoplay embed the page uses. */
function youtubeEmbed(url: string): string {
  const id = url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([\w-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1` : "";
}

/** "2026-07-31" → "31 July 2026" (the card's existing date format). */
function longDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Campus pages from Drupal (campuses 5765 Mumbai, 5766 Bengaluru). Each value falls
 * back to the built-in page while its field is empty. Built-in only: page nav, director
 * photo, mentors (Faculty API), accommodation, phone, map and the research image crop.
 */
export async function withCampusContent(nid: number, base: CampusData): Promise<CampusData> {
  const r = await getNodeReader("campuses", nid, INCLUDE);
  if (!r) return base;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];
  const cta = r.link(banner, "field_apply_now");
  const desk = r.refs(n, "field_director_desk")[0];
  const deskLink = r.link(desk, "field_link");

  const stats = r.refs(n, "field_banner_bottom_description").map((p) => ({ value: r.text(p, "field_main_title"), label: r.text(p, "field_sub_title") })).filter((s) => s.value);
  const networkLinks = r
    .refs(n, "field_our_network_links")
    .map((p) => ({ label: r.text(p, "field_main_title"), href: r.text(p, "field_url_link") }))
    .filter((l) => l.label && l.href);
  // Infrastructure cards: Drupal has title + image; the built-in line under each title stays when titles match.
  const infra: CampusData["infrastructure"]["cards"] = r.refs(n, "field_state_of_the_art_data").map((p, i) => {
    const title = r.text(p, "field_main_title");
    const match = base.infrastructure.cards.find((c) => c.title.toLowerCase() === title.toLowerCase());
    return { id: p.id, title, image: r.image(p, "field_image") || base.infrastructure.cards[i]?.image || "", meta: match?.meta };
  }).filter((c) => c.title);
  const moments = r
    .refs(n, "field_campus_moments_data")
    .map((p) => ({ id: p.id, image: r.image(p, "field_image"), video: r.text(p, "field_category") === "video" || undefined }))
    .filter((m) => m.image);
  const news = r
    .refs(n, "field_whats_new_at_weschool_data")
    .map((p) => ({
      id: p.id,
      title: r.text(p, "field_main_title"),
      date: longDate(r.text(p, "field_date")),
      image: r.image(p, "field_image"),
      href: r.link(p, "field_field_video_url").href || base.news.cta.href,
    }))
    .filter((i) => i.title && i.image);
  const moreLink = (f: string, fallback: CampusData["news"]["cta"]) => {
    const l = r.link(n, f);
    return l.href ? { label: or(l.title, fallback.label), href: l.href } : fallback;
  };
  const videoUrl = youtubeEmbed(r.text(n, "field_world_of_weschool_video_ur"));

  return {
    ...base,
    hero: {
      title: or(r.text(banner, "field_main_title"), base.hero.title),
      subtitle: or(r.text(banner, "field_sub_title"), base.hero.subtitle),
      cta: cta.href ? { label: or(cta.title, base.hero.cta.label), href: cta.href } : base.hero.cta,
      image: or(r.image(banner, "field_desktop"), base.hero.image),
    },
    about: {
      heading: or(r.text(n, "field_about_campus_heading"), base.about.heading),
      paragraphs: or(r.paras(n, "field_about_campus_description"), base.about.paragraphs),
      image: or(r.image(n, "field_about_campus_desktop_image"), base.about.image),
      stats: or(stats, base.about.stats),
    },
    accreditations: {
      heading: or(r.text(n, "field_accreditations_heading"), base.accreditations.heading),
      logos: or(fileList(r, n, "field_accreditations_logo"), base.accreditations.logos),
      points: or(r.paras(n, "field_accreditations_description"), base.accreditations.points),
    },
    director: {
      ...base.director,
      heading: or(r.text(desk, "field_main_title"), base.director.heading),
      name: or(r.text(desk, "field_subtitle"), base.director.name),
      title: or(r.text(desk, "field_director_designation"), base.director.title),
      body: or(r.paras(desk, "field_description").join(" "), base.director.body),
      cta: deskLink.href ? { label: or(deskLink.title, base.director.cta.label), href: deskLink.href } : base.director.cta,
    },
    mentors: { ...base.mentors, heading: or(r.text(n, "field_mentors_heading"), base.mentors.heading) },
    faculty: {
      ...base.faculty,
      heading: or(r.text(n, "field_our_network_title"), base.faculty.heading),
      description: or(r.paras(n, "field_our_network_description").join(" "), base.faculty.description),
      categories: or(networkLinks, base.faculty.categories),
      image: or(r.image(n, "field_our_network_desktop_image"), base.faculty.image),
    },
    programmes: {
      ...base.programmes,
      heading: or(r.text(n, "field_programs_built_title"), base.programmes.heading),
      description: or(r.paras(n, "field_programs_built_description").join(" "), base.programmes.description),
    },
    recruiters: {
      ...base.recruiters,
      heading: or(r.text(n, "field_our_recruiters_title"), base.recruiters.heading),
      description: or(r.paras(n, "field_our_recruiters_desc").join(" "), base.recruiters.description),
      logos: or(fileList(r, n, "field_our_recruiters_logos"), base.recruiters.logos),
    },
    weresearch: {
      ...base.weresearch,
      heading: or(r.text(n, "field_weresearch_commitment_titl"), base.weresearch.heading),
      description: or(r.paras(n, "field_weresearch_commitment_desc").join(" "), base.weresearch.description),
      cta: moreLink("field_weresearch_commitment_link", base.weresearch.cta),
    },
    world: {
      heading: or(r.text(n, "field_world_of_weschool_title"), base.world.heading),
      image: or(r.image(n, "field_world_of_weschool_image"), base.world.image),
      caption: or(r.paras(n, "field_world_of_weschool_descript").join(" "), base.world.caption),
      videoUrl: or(videoUrl, base.world.videoUrl),
    },
    life: {
      ...base.life,
      heading: or(r.text(n, "field_life_at_weschool_title"), base.life.heading),
      body: or(r.paras(n, "field_life_at_weschool_descripti").join(" "), base.life.body),
      cta: moreLink("field_external_url", base.life.cta),
    },
    infrastructure: {
      heading: or(r.text(n, "field_state_of_the_art_title"), base.infrastructure.heading),
      description: or(r.paras(n, "field_state_of_the_art_descripti").join(" "), base.infrastructure.description),
      cards: or(infra, base.infrastructure.cards),
    },
    moments: {
      heading: or(r.text(n, "field_campus_moments_title"), base.moments.heading),
      cta: moreLink("field_campus_moments_link", base.moments.cta),
      images: or(moments, base.moments.images),
    },
    news: {
      heading: or(r.text(n, "field_whats_new_at_weschool_titl"), base.news.heading),
      cta: moreLink("field_whats_new_at_weschool_link", base.news.cta),
      items: or(news, base.news.items),
    },
    connect: {
      ...base.connect,
      heading: or(r.text(n, "field_connect_with_us_title"), base.connect.heading),
      address: or(r.paras(n, "field_connect_with_us_address").join(" ").replace(/^Address:\s*/i, ""), base.connect.address),
    },
  };
}
