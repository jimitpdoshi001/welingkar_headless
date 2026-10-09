import type { Metadata } from "next";
import { WeResearchPage } from "@/components/weresearch/WeResearchPage";
import { WERESEARCH } from "@/lib/weresearch/weresearch-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/weresearch");

export default function Page() {
  return <WeResearchPage data={WERESEARCH} />;
}
