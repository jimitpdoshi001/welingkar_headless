import { CAMPUS_ROWS, type CampusRow } from "@/components/campus/CampusListingPage";
import { getNodeReader, or } from "../node-page";

const NID = 5763;

/** /campuses rows from Drupal node 5763; odd rows (2nd, 4th) use the tinted reverse layout. */
export async function getCampusRows(): Promise<CampusRow[]> {
  const r = await getNodeReader("campus_listing", NID, ["field_campus_listing_data.field_image"]);
  const items = r?.refs(r.node, "field_campus_listing_data") ?? [];
  if (!r || !items.length) return CAMPUS_ROWS;

  return items.map((p, i) => {
    const fallback = CAMPUS_ROWS[i];
    // Sub title: first line is the eyebrow "(…)", the rest is the body.
    const [first = "", ...rest] = r.text(p, "field_sub_title").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    const hasEyebrow = first.startsWith("(");
    return {
      id: p.id,
      title: or(r.text(p, "field_main_title"), fallback?.title ?? ""),
      eyebrow: hasEyebrow ? first : (fallback?.eyebrow ?? ""),
      body: or((hasEyebrow ? rest : [first, ...rest]).join(" "), fallback?.body ?? ""),
      image: or(r.image(p, "field_image"), fallback?.image ?? ""),
      href: or(r.link(p, "field_link").href, fallback?.href ?? "/campuses"),
      reverse: i % 2 === 1,
    };
  });
}
