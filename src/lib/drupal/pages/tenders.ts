import { TENDERS, type Tender, type TendersPageData } from "@/lib/tenders/tenders-data";
import { absoluteDrupalUrl } from "../jsonapi";
import { getNodeReader } from "../node-page";

const NID = 5802;

/** "2026-11-22" → "22/11/2026" (the listing's date format, also used by its month/year filters). */
const toDmy = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
};

/**
 * /tenders from Drupal (tender node 5802): intro and tender rows. Drupal has no
 * status, end date or end time fields, so those cells stay empty. The built-in
 * page is used only when Drupal cannot be reached.
 */
export async function getTenders(): Promise<TendersPageData> {
  const r = await getNodeReader("tender", NID, ["field_tender", "field_tender.field_pdf", "field_tender.field_pdf.field_media_document"]);
  if (!r) return TENDERS;
  const n = r.node;
  const items: Tender[] = r
    .refs(n, "field_tender")
    .map((p) => {
      // field_pdf is a Document media item; its file sits in field_media_document.
      const file = r.refs(r.refs(p, "field_pdf")[0], "field_media_document")[0];
      const pdf = absoluteDrupalUrl((file?.attributes.uri as { url?: string } | undefined)?.url) ?? "";
      return {
        id: p.id,
        title: r.text(p, "field_main_title"),
        status: "",
        startDate: toDmy(r.text(p, "field_date")),
        endDate: "",
        endTime: "",
        documentLabel: pdf ? "Download" : "",
        documentUrl: pdf,
      };
    })
    .filter((t) => t.title);
  return {
    ...TENDERS,
    heading: r.text(n, "field_intro_title") || TENDERS.heading,
    intro: r.paras(n, "field_intro_description"),
    items,
  };
}
