import { WEFACTOR, type WeFactorData } from "@/lib/wefactor/wefactor-data";
import { getNodeReader, or } from "../node-page";

const NID = 4901;

/** /wefactor content from Drupal node 4901; built-in values fill empty fields. */
export async function getWeFactor(): Promise<WeFactorData> {
  const r = await getNodeReader("wefactor", NID, ["field_banner.field_desktop.field_media_image", "field_wefactor_data.field_image"]);
  if (!r) return WEFACTOR;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];
  const pillars = r.refs(n, "field_wefactor_data").map((p, i) => {
    const fallback = WEFACTOR.pillars[i];
    return {
      id: p.id,
      title: or(r.text(p, "field_main_title"), fallback?.title ?? ""),
      body: or(r.paras(p, "field_description").join(" "), fallback?.body ?? ""),
      image: or(r.image(p, "field_image"), fallback?.image ?? ""),
      href: or(r.link(p, "field_link").href, fallback?.href ?? "/wefactor"),
    };
  });

  return {
    hero: {
      title: or(r.text(banner, "field_main_title"), WEFACTOR.hero.title),
      subtitle: or(r.text(banner, "field_sub_title"), WEFACTOR.hero.subtitle),
      image: or(r.image(banner, "field_desktop"), WEFACTOR.hero.image),
    },
    about: {
      heading: or(r.text(n, "field_wefactor_heading"), WEFACTOR.about.heading),
      body: or(r.paras(n, "field_wefactor_description").join(" "), WEFACTOR.about.body),
    },
    pillars: pillars.length ? pillars : WEFACTOR.pillars,
  };
}
