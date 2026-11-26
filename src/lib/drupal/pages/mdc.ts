import { MDC, MDC_BENGALURU, type MdcData } from "@/lib/mdc/mdc-data";
import { absoluteDrupalUrl } from "../jsonapi";
import { getNodeReader } from "../node-page";

const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_banner_bottom_description",
  "field_hear_our_participants_data",
  "field_mdc_bottom_data",
  "field_mdc_bottom_data.field_icon",
  "field_our_areas_of_expertise_dat",
  "field_our_areas_of_expertise_dat.field_icon",
  "field_our_flagship_offerings_dat",
  "field_our_flagship_offerings_dat.field_image",
  "field_what_we_offer_data",
  "field_why_organizations_mdc_data",
  "field_why_organizations_mdc_data.field_icon",
  "field_mdp_team_data",
  "field_our_vision_image",
  "field_desktop_image",
  "field_client_logos",
  "field_trusted_organizations_logo",
  "field_mdc_gallery",
];

/**
 * MDP pages from Drupal (mdc_listing 5777 Mumbai, 5778 Bengaluru). Content is
 * Drupal-only: an empty field leaves that part empty (the page hides it). The
 * built-in page is used only when Drupal cannot be reached. Nav, icons and
 * campus colours stay built-in.
 */
async function getMdc(nid: number, base: MdcData): Promise<MdcData> {
  const r = await getNodeReader("mdc_listing", nid, INCLUDE);
  if (!r) return base;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];
  const cta = r.link(banner, "field_apply_now");

  const stats = r.refs(n, "field_banner_bottom_description").map((p) => ({ value: r.text(p, "field_main_title"), label: r.text(p, "field_sub_title") }));
  const features = r.refs(n, "field_mdc_bottom_data").map((p) => ({ title: r.text(p, "field_sub_title"), text: "", icon: r.image(p, "field_icon") }));
  const offers = r.refs(n, "field_what_we_offer_data").map((p) => r.text(p, "field_main_title")).filter(Boolean);
  const why = r.refs(n, "field_why_organizations_mdc_data").map((p) => ({ title: r.text(p, "field_main_title"), text: r.paras(p, "field_description").join(" "), icon: r.image(p, "field_icon") }));
  // Expertise titles + matching Drupal icons (kept in step: items without a title are dropped from both).
  const expertiseRows = r
    .refs(n, "field_our_areas_of_expertise_dat")
    .map((p) => ({ title: r.text(p, "field_main_title"), icon: r.image(p, "field_icon") }))
    .filter((e) => e.title);
  const expertise = expertiseRows.map((e) => e.title);
  const flagship = r.refs(n, "field_our_flagship_offerings_dat").map((p) => ({
    id: p.id,
    image: r.image(p, "field_image"),
    title: r.text(p, "field_main_title"),
    text: r.paras(p, "field_description").join(" "),
  }));
  const testimonials = r.refs(n, "field_hear_our_participants_data").map((p) => ({
    id: p.id,
    text: r.paras(p, "field_description").join(" "),
    name: r.text(p, "field_main_title"),
    role: r.text(p, "field_designation"),
  }));
  // Team description lines, in any order: a phone ("91-22-… (extn: 8144)" or "… Office"),
  // "Cell : …" / "… Mobile", "Email : x@y", and optionally a department line (no digits, no @).
  const contacts = r.refs(n, "field_mdp_team_data").map((p) => {
    const lines = r.paras(p, "field_description").map((l) => l.replace(/\u00a0/g, " ").trim()).filter(Boolean);
    const email = lines.join(" ").match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/)?.[0] ?? "";
    const isMobile = (l: string) => /^(cell|mobile)\b|mobile\s*$/i.test(l);
    const phones = lines.filter((l) => !l.includes("@") && /\d{6}/.test(l.replace(/[\s-]/g, "")));
    const clean = (l: string) => l.replace(/^(cell|mobile|office|tel|phone)\s*:?\s*/i, "").replace(/\s*(office|mobile)\s*$/i, "").trim();
    return {
      id: p.id,
      name: r.text(p, "field_main_title"),
      title: r.text(p, "field_designation"),
      dept: lines.find((l) => !l.includes("@") && !/\d/.test(l)) ?? "",
      office: clean(phones.find((l) => !isMobile(l)) ?? ""),
      mobile: clean(phones.find(isMobile) ?? ""),
      email,
    };
  });
  // Vision images: a multi-value file field (the image reader only returns the first).
  const learnImages = r
    .refs(n, "field_our_vision_image")
    .map((f) => absoluteDrupalUrl((f.attributes.uri as { url?: string } | undefined)?.url) ?? "")
    .filter(Boolean);

  // Logo strip: client logos when uploaded, else the trusted-organisation logos.
  const logoFiles = (field: string) => {
    // Alt text sits on the relationship; a generic alt ("Client logo") is ignored.
    const rel = n.relationships?.[field]?.data;
    const alts = new Map((Array.isArray(rel) ? rel : []).map((d) => [d.id, String((d.meta as { alt?: string } | undefined)?.alt ?? "")]));
    return r
      .refs(n, field)
      .map((f) => {
        const file = String(f.attributes.filename ?? "").replace(/\.[a-z0-9]+$/i, "");
        const alt = alts.get(f.id) ?? "";
        return {
          // Name: the alt text if it names the company, else the code after the last "_" (e.g. "..._jsw" → "jsw").
          name: alt && !/^client logo$/i.test(alt) ? alt : (file.split("_").pop() ?? file).replace(/[-_]+/g, " "),
          image: absoluteDrupalUrl((f.attributes.uri as { url?: string } | undefined)?.url) ?? "",
        };
      })
      .filter((l) => l.image);
  };
  // Gallery photos with the image title (set in Drupal) as caption.
  const galleryImages = () => {
    const rel = n.relationships?.field_mdc_gallery?.data;
    const titles = new Map((Array.isArray(rel) ? rel : []).map((d) => [d.id, String((d.meta as { title?: string } | undefined)?.title ?? "").trim()]));
    return r
      .refs(n, "field_mdc_gallery")
      .map((f) => ({ image: absoluteDrupalUrl((f.attributes.uri as { url?: string } | undefined)?.url) ?? "", caption: titles.get(f.id) ?? "" }))
      .filter((g) => g.image);
  };
  const clientLogos = logoFiles("field_client_logos");
  const logos = clientLogos.length ? clientLogos : logoFiles("field_trusted_organizations_logo");
  // Mumbai: logos in alphabetical order (by company name).
  if (nid === 5777) logos.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

  return {
    ...base,
    hero: {
      ...base.hero,
      title: r.text(banner, "field_main_title"),
      subtitle: r.text(banner, "field_sub_title"),
      // Drupal stores "/mdc#team" on both nodes; keep it an in-page anchor so Bengaluru stays on its own page.
      cta: cta.href ? { label: cta.title, href: cta.href.replace(/^\/mdc(?=#)/, "") } : { label: "", href: "" },
      image: r.image(banner, "field_desktop"),
    },
    stats: stats,
    learning: {
      heading: r.text(n, "field_our_vision_title"),
      paragraphs: r.paras(n, "field_our_vision_description"),
      images: learnImages,
      features: features,
    },
    about: {
      ...base.about,
      heading: r.text(n, "field_about_weschool_title"),
      paragraphs: r.paras(n, "field_about_weschool_description"),
      image: r.image(n, "field_desktop_image"),
      offers: offers,
    },
    why: { heading: r.text(n, "field_why_organizations_title"), cards: why },
    expertise: { heading: r.text(n, "field_our_areas_title"), items: expertise, icons: expertiseRows.map((e) => e.icon) },
    flagship: { heading: r.text(n, "field_our_flagship_offerings_tit"), cards: flagship },
    // Logos fixed in code (approved brochure list) win over Drupal's.
    trusted: { heading: r.text(n, "field_trusted_organizations_titl"), logos: base.fixedLogos ?? logos },
    gallery: { heading: r.text(n, "field_mdc_gallery_title"), images: galleryImages() },
    testimonials: { heading: r.text(n, "field_hear_participants_title"), items: testimonials },
    team: {
      heading: r.text(n, "field_mdp_team_title"),
      subtitle: r.paras(n, "field_mdp_team_description").join(" "),
      contacts: contacts,
    },
  };
}

export const getMdcMumbai = () => getMdc(5777, MDC);
export const getMdcBengaluru = () => getMdc(5778, MDC_BENGALURU);
