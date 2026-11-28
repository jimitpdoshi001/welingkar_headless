import { LISTING_MUMBAI, type ProgrammeListingData } from "@/lib/programmes/listing-data";
import { getProgramListing, programOverviewListing } from "../program-listing";

const NID = 5798;

/**
 * Executive Programmes in Mumbai (/programs/executive-programme-in-mumbai):
 * the Full-Time listing design with the "Executive" pill active, content from
 * Drupal node 5798. The built-in hero photo is used only while Drupal has none.
 */
export async function getExecutiveListing(): Promise<ProgrammeListingData> {
  const base = LISTING_MUMBAI;
  const data = programOverviewListing(await getProgramListing(NID));
  return {
    ...base,
    activePill: "Executive",
    hero: {
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      image: data.hero.image || base.hero.image,
    },
    intro: { heading: data.heading, body: "" },
    programmes: data.cards.map((c) => ({
      // Slug from the Know More link (last path segment).
      slug: c.href.split("/").pop() || c.title,
      title: c.title,
      description: c.description,
      intake: "",
      href: c.href,
      // Drupal has one illustration for the section, used on every card.
      image: data.image || undefined,
    })),
  };
}
