import { absoluteDrupalUrl, fetchJsonApi } from "./jsonapi";
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
  const path = url.replace(/^https?:\/\/[^/]+/i, "").replace(/\/+$/, "");
  return ROUTES[path] ?? url;
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

    return items.map((item) => {
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
  } catch (error) {
    console.error("Failed to fetch What We Offer taxonomy terms:", error);
    return [];
  }
}
