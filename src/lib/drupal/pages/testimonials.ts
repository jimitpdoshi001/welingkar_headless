import {
  TESTIMONIAL_TABS,
  TESTIMONIALS_INTRO,
  type Testimonial,
  type TestimonialTab,
} from "@/lib/testimonials/testimonials-data";
import { getNodeReader, or } from "../node-page";

const NID = 5776;
const TAB_LABEL: Record<string, string> = { alumni: "Alumni", corporate: "Corporate" };

export type TestimonialsContent = { title: string; intro: string; tabs: TestimonialTab[] };

/** Built-in entry by name: fills a photo or quote Drupal does not have yet. */
const key = (name: string) => name.toLowerCase().replace(/[^a-z]/g, "");
const BUILT_IN = new Map(TESTIMONIAL_TABS.flatMap((t) => t.items).map((i) => [key(i.name), i]));

/** /testimonial from Drupal node 5776: one tab per testimonial type, in Drupal order. */
export async function getTestimonials(): Promise<TestimonialsContent> {
  const fallback = { title: "Testimonials", intro: TESTIMONIALS_INTRO, tabs: TESTIMONIAL_TABS };
  const r = await getNodeReader("testimonials", NID, ["field_testimonials_data.field_single_image"]);
  if (!r) return fallback;
  const n = r.node;

  const byType = new Map<string, Testimonial[]>();
  for (const p of r.refs(n, "field_testimonials_data")) {
    const name = r.text(p, "field_name");
    if (!name) continue;
    const local = BUILT_IN.get(key(name));
    const quote = r.paras(p, "field_description").join(" ");
    const item: Testimonial = {
      name,
      role: r.text(p, "field_designation") || local?.role || undefined,
      // Ignore placeholder text such as "$44" left in a description.
      quote: (quote && !/^\$?\d+$/.test(quote) ? quote : local?.quote) || undefined,
      image: r.image(p, "field_single_image") || local?.image || "placeholder.png",
      video: r.link(p, "field_field_video_url").href || local?.video || undefined,
    };
    const type = r.text(p, "field_testimonials_type") || "alumni";
    byType.set(type, [...(byType.get(type) ?? []), item]);
  }
  const tabs = ["alumni", "corporate", ...[...byType.keys()].filter((t) => t !== "alumni" && t !== "corporate")]
    .filter((t) => byType.has(t))
    .map((t) => ({ id: t, label: TAB_LABEL[t] ?? t.charAt(0).toUpperCase() + t.slice(1), items: byType.get(t)! }));

  return {
    title: or(r.text(n, "field_testimonials_title"), fallback.title),
    intro: or(r.paras(n, "field_testimonials_description").join(" "), fallback.intro),
    tabs: tabs.length ? tabs : fallback.tabs,
  };
}
