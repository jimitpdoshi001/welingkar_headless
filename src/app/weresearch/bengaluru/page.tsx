import type { Metadata } from "next";
import { WeResearchPage } from "@/components/weresearch/WeResearchPage";
import { WERESEARCH_BENGALURU } from "@/lib/weresearch/weresearch-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

// Public URL /we-research-bengaluru (rewrite in src/lib/seo/public-paths.ts).
export const metadata: Metadata = sitePageMetadata("/weresearch/bengaluru");

export default function Page() {
  return (
    <WeResearchPage
      data={WERESEARCH_BENGALURU}
      campus="bengaluru"
    />
  );
}
