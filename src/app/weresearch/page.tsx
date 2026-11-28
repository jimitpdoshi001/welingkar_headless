import type { Metadata } from "next";
import { WeResearchPage } from "@/components/weresearch/WeResearchPage";
import { WERESEARCH } from "@/lib/weresearch/weresearch-data";
import { WERESEARCH_NIDS, withWeResearchContent } from "@/lib/drupal/pages/weresearch";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/we-research-mumbai");

// Drupal node 5804; refreshed with the other Drupal content.
export const revalidate = 300;

export default async function Page() {
  return <WeResearchPage data={await withWeResearchContent(WERESEARCH_NIDS.mumbai, WERESEARCH)} />;
}
