import { LISTING_BENGALURU, LISTING_MUMBAI, type ProgrammeListingData } from "@/lib/programmes/listing-data";
import { getNodeReader, or } from "../node-page";

const NIDS = { mumbai: 5773, bengaluru: 5774 } as const;
const BASE = { mumbai: LISTING_MUMBAI, bengaluru: LISTING_BENGALURU } as const;
const INCLUDE = [
  "field_banner.field_desktop.field_media_image",
  "field_full_time_program_data.field_image",
  "field_full_time_program_first_ta",
  "field_full_time_program_second_t",
];

/** Full-Time Programs listing from Drupal (nodes 5773 / 5774); built-in values fill gaps. */
export async function getProgrammeListing(campus: keyof typeof NIDS): Promise<ProgrammeListingData> {
  const base = BASE[campus];
  const r = await getNodeReader("full_time_program_listing", NIDS[campus], INCLUDE);
  if (!r) return base;
  const n = r.node;
  const banner = r.refs(n, "field_banner")[0];

  // Category pills: first-tab links, then second-tab links.
  const pills = [
    ...r.links(r.refs(n, "field_full_time_program_first_ta")[0], "field_link"),
    ...r.links(r.refs(n, "field_full_time_program_second_t")[0], "field_url"),
  ]
    .filter((l) => l.title && l.href)
    .map((l) => ({ label: l.title, href: l.href }));

  const programmes = r.refs(n, "field_full_time_program_data").map((p) => {
    const [knowMore] = r.links(p, "field_link");
    const href = knowMore?.href ?? "";
    // Slug keeps the built-in photo/layout hooks (last path segment, query dropped).
    const slug = href.split("?")[0].replace(/\/(mumbai|bengaluru)$/, "").split("/").pop() || p.id;
    const intakeTitle = r.text(p, "field_present_intake_title");
    const intakeCount = r.text(p, "field_present_intake_count");
    return {
      slug,
      title: r.text(p, "field_main_title"),
      description: r.paras(p, "field_description").join(" "),
      intake: intakeCount ? `${intakeTitle || "Present Intake"}: ${intakeCount}` : "",
      href: href || base.programmes.find((b) => b.slug === slug)?.href || "#",
      image: r.image(p, "field_image") || undefined,
    };
  }).filter((p) => p.title);

  return {
    ...base,
    hero: {
      title: or(r.text(banner, "field_main_title"), base.hero.title),
      subtitle: or(r.text(banner, "field_sub_title"), base.hero.subtitle),
      image: or(r.image(banner, "field_desktop"), base.hero.image),
    },
    pills: pills.length ? pills : base.pills,
    intro: {
      heading: or(r.text(n, "field_title"), base.intro.heading),
      body: or(r.paras(n, "field_description").join(" "), base.intro.body),
    },
    programmes: programmes.length ? programmes : base.programmes,
  };
}
