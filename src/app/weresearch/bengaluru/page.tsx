import type { Metadata } from "next";
import { WeResearchPage } from "@/components/weresearch/WeResearchPage";
import { WERESEARCH_BENGALURU } from "@/lib/weresearch/weresearch-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";
import { WERESEARCH_NIDS, withWeResearchContent } from "@/lib/drupal/pages/weresearch";

// Public URL /we-research-bengaluru (rewrite in src/lib/seo/public-paths.ts).
export const metadata: Metadata = sitePageMetadata("/weresearch/bengaluru");

// Drupal node 5960; refreshed with the other Drupal content.
export const revalidate = 300;

export default async function Page() {
  return (
    <WeResearchPage
      data={await withWeResearchContent(WERESEARCH_NIDS.bengaluru, WERESEARCH_BENGALURU)}
      campus="bengaluru"
    />
  );
}
