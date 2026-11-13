import { cache } from "react";

import { absoluteDrupalUrl, fetchPaginatedJsonApi } from "./jsonapi";
import type { JsonApiResource } from "./types";

/** One award for the About Us "Honours & Achievements" section. */
export type AwardCard = { id: string; year: string; text: string; image: string };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Capitalise the first letter (Drupal titles are often entered in lower case). */
const sentence = (text: string) => (text ? text[0].toUpperCase() + text.slice(1) : text);

/**
 * Published "Who We Are – Awards" nodes from Drupal, newest year first and by
 * sort order within a year. Null on a fetch error so the page keeps its built-in content.
 */
export const getAwards = cache(async (): Promise<AwardCard[] | null> => {
  try {
    const doc = await fetchPaginatedJsonApi(
      "/node/who_we_are_page_awards",
      { "filter[status]": "1", include: "field_award_icon" },
      50,
    );
    const icons = new Map((doc.included ?? []).map((r) => [r.id, r]));
    const nodes = (Array.isArray(doc.data) ? doc.data : []) as JsonApiResource[];
    return nodes
      .map((node) => {
        const a = node.attributes as Record<string, unknown>;
        const iconRef = node.relationships?.field_award_icon?.data;
        const icon = iconRef && !Array.isArray(iconRef) ? icons.get(iconRef.id) : undefined;
        const url = (icon?.attributes.uri as { url?: string } | undefined)?.url;
        return {
          id: node.id,
          year: str(a.field_award_year),
          text: sentence(str(a.field_award_title) || str(a.title)),
          image: absoluteDrupalUrl(url) ?? "",
          sort: Number(a.field_award_sort_order) || 0,
        };
      })
      .filter((award) => award.year && award.text)
      .sort((x, y) => Number(y.year) - Number(x.year) || x.sort - y.sort)
      .map(({ sort: _sort, ...award }) => award);
  } catch (error) {
    console.error("awards fetch failed", error instanceof Error ? error.message : error);
    return null;
  }
});
