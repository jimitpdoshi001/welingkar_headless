import { absoluteDrupalUrl, fetchJsonApi } from "./jsonapi";
import {
  PROGRAM_LISTING_NIDS,
  PROGRAM_SLUG_NIDS_BENGALURU,
  getProgramListing,
  programBannerImage,
} from "./program-listing";
import type { JsonApiResource } from "./types";

export type WhatWeOfferItem = {
  id: string;
  name: string;
  location: string;
  url: string;
  image: string | null;
  imageAlt: string;
};

// Drupal program paths -> the Next.js routes that render those programs.
const ROUTES: Record<string, string> = {
  "/programmes/full-time-programme-in-mumbai/pgdm": "/programmes/pgdm",
  "/programmes/full-time-programme-in-mumbai/pgdm-business-design": "/programmes/pgdm-business-design",
  "/programmes/full-time-programme-in-mumbai/pgdm-e-business": "/programmes/pgdm-e-business",
  "/programmes/full-time-programme-in-mumbai/pgdm-healthcare-management": "/programmes/pgdm-healthcare",
  "/programmes/full-time-programme-in-mumbai/pgdm-media-and-entertainment": "/programmes/pgdm-media",
  "/programmes/full-time-programme-in-mumbai/pgdm-research-and-business-analytics": "/programmes/pgdm-research-analytics",
  "/programmes/full-time-programme-in-mumbai/pgdm-retail-management": "/programmes/pgdm-retail",
  "/programmes/full-time-programme-in-mumbai/pgdm-rural-management": "/programmes/pgdm-rural",
  "/programmes/full-time-programme-in-bengaluru": "/programmes/bengaluru",
};

/** Map a Drupal path (absolute or relative, trailing slash ignored) to its site route. */
function siteRoute(url: string): string {
  // Links typed with this site's own domain become relative (in-app navigation).
  const local = url.replace(/^https?:\/\/welingkar-headless\.vercel\.app(?=\/)/i, "");
  const path = local.replace(/^https?:\/\/[^/]+/i, "").replace(/\/+$/, "");
  return ROUTES[path] ?? local;
}

/** Bengaluru card route -> its program page's Drupal node (for the banner image). */
function bengaluruNid(url: string): number | undefined {
  if (url === "/programmes/pgdm/bengaluru") return PROGRAM_LISTING_NIDS.pgdmBengaluru;
  const m = url.match(/^\/programmes\/([a-z-]+)\?campus=bengaluru$/);
  return m ? PROGRAM_SLUG_NIDS_BENGALURU[m[1]] : undefined;
}

export async function getWhatWeOfferTerms(): Promise<WhatWeOfferItem[]> {
  try {
    const document = await fetchJsonApi<JsonApiResource>("/taxonomy_term/what_we_offer", {
      include: "field_thumbnail",
      "filter[status]": "1",
      sort: "weight,name",
    });

    const items = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
    const included = document.included ?? [];

    const terms = items.map((item) => {
      const attributes = item.attributes ?? {};
      const name = (attributes.name as string) || "";
      const location = ((attributes.field_location as string) || "").trim().toLowerCase();

      const pageUrl = attributes.field_page_url as { resolvable_uri?: string; uri?: string } | undefined;
      let url = pageUrl?.resolvable_uri || pageUrl?.uri || "#";
      if (url.startsWith("internal:")) {
        url = url.replace(/^internal:/, "");
      }
      url = siteRoute(url);

      let image: string | null = null;
      let imageAlt = name;

      const thumbnailRel = item.relationships?.field_thumbnail?.data;
      if (thumbnailRel && !Array.isArray(thumbnailRel)) {
        const fileResource = included.find((res) => res.id === thumbnailRel.id);
        if (fileResource) {
          const uriObj = fileResource.attributes?.uri as { url?: string } | undefined;
          if (uriObj?.url) {
            image = absoluteDrupalUrl(uriObj.url);
          }
          if (thumbnailRel.meta?.alt) {
            imageAlt = String(thumbnailRel.meta.alt);
          }
        }
      }

      return {
        id: item.id,
        name,
        location,
        url,
        image,
        imageAlt,
      };
    });

    // Bengaluru cards show their own program page's banner image (cached fetch).
    return Promise.all(
      terms.map(async (term) => {
        const nid = term.location === "bangalore" ? bengaluruNid(term.url) : undefined;
        const banner = nid ? programBannerImage(await getProgramListing(nid)) : null;
        return banner ? { ...term, image: banner } : term;
      }),
    );
  } catch (error) {
    console.error("Failed to fetch What We Offer taxonomy terms:", error);
    return [];
  }
}
