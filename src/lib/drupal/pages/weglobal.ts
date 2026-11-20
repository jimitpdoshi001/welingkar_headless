import { WEGLOBAL, type WeGlobalData, type WgCard } from "@/lib/weglobal/weglobal-data";
import { getNodeReader, or, type NodeReader } from "../node-page";

const NID = 5775;

const cards = (r: NodeReader, field: string, fallback: WgCard[]): WgCard[] => {
  const items = r.refs(r.node, field).map((p, i) => ({
    id: p.id,
    image: r.image(p, "field_image") || fallback[i]?.image || "",
    title: r.text(p, "field_main_title"),
    text: r.paras(p, "field_description").join(" "),
  }));
  return items.length ? items : fallback;
};

/** /weglobal from Drupal node 5775. The partner-university map stays built-in (no Drupal fields). */
export async function getWeGlobal(): Promise<WeGlobalData> {
  const r = await getNodeReader("weglobal", NID, [
    "field_desktop_image",
    "field_international_alliances_at",
    "field_international_engage_data.field_image",
    "field_international_learning_dat.field_image",
  ]);
  if (!r) return WEGLOBAL;
  const n = r.node;
  const contacts = r.refs(n, "field_international_alliances_at").map((p) => ({
    id: p.id,
    name: r.text(p, "field_main_title"),
    contact: r.text(p, "field_contact_details"),
    email: r.text(p, "field_email_address"),
  }));

  return {
    hero: {
      image: or(r.image(n, "field_desktop_image"), WEGLOBAL.hero.image),
      intro: or(r.paras(n, "field_bottom_description").join(" "), WEGLOBAL.hero.intro),
    },
    alliances: {
      heading: or(r.text(n, "field_international_weschool_tit"), WEGLOBAL.alliances.heading),
      paragraphs: or(r.paras(n, "field_international_weschool_des"), WEGLOBAL.alliances.paragraphs),
      contacts: contacts.length ? contacts : WEGLOBAL.alliances.contacts,
    },
    partners: { ...WEGLOBAL.partners, heading: or(r.text(n, "field_partner_universities_title"), WEGLOBAL.partners.heading) },
    engagements: {
      heading: or(r.text(n, "field_international_engage_title"), WEGLOBAL.engagements.heading),
      body: or(r.paras(n, "field_international_engage_descr").join(" "), WEGLOBAL.engagements.body),
      items: cards(r, "field_international_engage_data", WEGLOBAL.engagements.items),
    },
    learning: {
      heading: or(r.text(n, "field_international_learning_tit"), WEGLOBAL.learning.heading),
      body: or(r.paras(n, "field_international_learning_des").join(" "), WEGLOBAL.learning.body),
      items: cards(r, "field_international_learning_dat", WEGLOBAL.learning.items),
    },
    buddy: {
      heading: or(r.text(n, "field_student_buddy_title"), WEGLOBAL.buddy.heading),
      body: or(r.paras(n, "field_student_buddy_description").join(" "), WEGLOBAL.buddy.body),
    },
  };
}
