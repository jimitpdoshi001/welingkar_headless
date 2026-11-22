import { MDC, MDC_BENGALURU, type MdcData } from "@/lib/mdc/mdc-data";
import { absoluteDrupalUrl } from "../jsonapi";
import { getNodeReader, or } from "../node-page";

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_banner_bottom_description",
  "field_hear_our_participants_data",
  "field_mdc_bottom_data",
  "field_our_areas_of_expertise_dat",
  "field_our_flagship_offerings_dat",
  "field_our_flagship_offerings_dat.field_image",
  "field_what_we_offer_data",
  "field_why_organizations_mdc_data",
  "field_mdp_team_data",
  "field_our_vision_image",
  "field_desktop_image",
  "field_client_logos",
  "field_trusted_organizations_logo",
];

/** Drop a trailing label ("Office", "Mobile") from a contact line. */
const strip = (s: string, label: string) => s.replace(new RegExp(`\\s*${label}\\s*$`, "i"), "").trim();

/**
 * MDC pages from Drupal (mdc_listing 5777 Mumbai, 5778 Bengaluru). Each value
 * falls back to the built-in page; icons, logos, nav and theme stay built-in.
 */
async function getMdc(nid: number, base: MdcData): Promise<MdcData> {
  const r = await getNodeReader("mdc_listing", nid, INCLUDE);
  if (!r) return base;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];
  const cta = r.link(banner, "field_apply_now");

  const stats = r.refs(n, "field_banner_bottom_description").map((p) => ({ value: r.text(p, "field_main_title"), label: r.text(p, "field_sub_title") }));
  const features = r.refs(n, "field_mdc_bottom_data").map((p) => ({ title: r.text(p, "field_sub_title"), text: "" }));
  const offers = r.refs(n, "field_what_we_offer_data").map((p) => r.text(p, "field_main_title")).filter(Boolean);
  const why = r.refs(n, "field_why_organizations_mdc_data").map((p) => ({ title: r.text(p, "field_main_title"), text: r.paras(p, "field_description").join(" ") }));
  const expertise = r.refs(n, "field_our_areas_of_expertise_dat").map((p) => r.text(p, "field_main_title")).filter(Boolean);
  const flagship = r.refs(n, "field_our_flagship_offerings_dat").map((p, i) => ({
    id: p.id,
    image: r.image(p, "field_image") || base.flagship.cards[i]?.image || "",
    title: r.text(p, "field_main_title"),
    text: r.paras(p, "field_description").join(" "),
  }));
  const testimonials = r.refs(n, "field_hear_our_participants_data").map((p) => ({
    id: p.id,
    text: r.paras(p, "field_description").join(" "),
    name: r.text(p, "field_main_title"),
    role: r.text(p, "field_designation"),
  }));
  // Team description lines: department, "<number> Office", "<number> Mobile", email.
  const contacts = r.refs(n, "field_mdp_team_data").map((p) => {
    const lines = r.paras(p, "field_description");
    const find = (re: RegExp) => lines.find((l) => re.test(l)) ?? "";
    return {
      id: p.id,
      name: r.text(p, "field_main_title"),
      title: r.text(p, "field_designation"),
      dept: lines[0] ?? "",
      office: strip(find(/office\s*$/i), "Office"),
      mobile: strip(find(/mobile\s*$/i), "Mobile"),
      email: find(/@/),
    };
  });
  // Vision images: a multi-value file field (the image reader only returns the first).
  const learnImages = r
    .refs(n, "field_our_vision_image")
    .map((f) => absoluteDrupalUrl((f.attributes.uri as { url?: string } | undefined)?.url) ?? "")
    .filter(Boolean);

  // Logo strip: client logos when uploaded, else the trusted-organisation logos.
  const logoFiles = (field: string) =>
    r
      .refs(n, field)
      .map((f) => ({
        name: String(f.attributes.filename ?? "").replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " "),
        image: absoluteDrupalUrl((f.attributes.uri as { url?: string } | undefined)?.url) ?? "",
      }))
      .filter((l) => l.image);
  const clientLogos = logoFiles("field_client_logos");
  const logos = clientLogos.length ? clientLogos : logoFiles("field_trusted_organizations_logo");

  return {
    ...base,
    hero: {
      ...base.hero,
      title: or(r.text(banner, "field_main_title"), base.hero.title),
      subtitle: or(r.text(banner, "field_sub_title"), base.hero.subtitle),
      // Drupal stores "/mdc#team" on both nodes; keep it an in-page anchor so Bengaluru stays on its own page.
      cta: cta.href ? { label: or(cta.title, base.hero.cta.label), href: cta.href.replace(/^\/mdc(?=#)/, "") } : base.hero.cta,
      image: or(r.image(banner, "field_desktop"), base.hero.image),
    },
    stats: or(stats, base.stats),
    learning: {
      heading: or(r.text(n, "field_our_vision_title"), base.learning.heading),
      paragraphs: or(r.paras(n, "field_our_vision_description"), base.learning.paragraphs),
      images: or(learnImages, base.learning.images),
      features: or(features, base.learning.features),
    },
    about: {
      ...base.about,
      heading: or(r.text(n, "field_about_weschool_title"), base.about.heading),
      paragraphs: or(r.paras(n, "field_about_weschool_description"), base.about.paragraphs),
      image: or(r.image(n, "field_desktop_image"), base.about.image),
      offers: or(offers, base.about.offers),
    },
    why: { heading: or(r.text(n, "field_why_organizations_title"), base.why.heading), cards: or(why, base.why.cards) },
    expertise: { heading: or(r.text(n, "field_our_areas_title"), base.expertise.heading), items: or(expertise, base.expertise.items) },
    flagship: { heading: or(r.text(n, "field_our_flagship_offerings_tit"), base.flagship.heading), cards: or(flagship, base.flagship.cards) },
    trusted: { heading: or(r.text(n, "field_trusted_organizations_titl"), base.trusted.heading), logos: or(logos, base.trusted.logos) },
    testimonials: { heading: or(r.text(n, "field_hear_participants_title"), base.testimonials.heading), items: or(testimonials, base.testimonials.items) },
    team: {
      heading: or(r.text(n, "field_mdp_team_title"), base.team.heading),
      subtitle: or(r.paras(n, "field_mdp_team_description").join(" "), base.team.subtitle),
      contacts: or(contacts, base.team.contacts),
    },
  };
}

export const getMdcMumbai = () => getMdc(5777, MDC);
export const getMdcBengaluru = () => getMdc(5778, MDC_BENGALURU);
