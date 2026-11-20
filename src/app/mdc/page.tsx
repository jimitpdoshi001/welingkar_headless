import type { Metadata } from "next";
import { MdcPage } from "@/components/mdc/MdcPage";
import { getMdcMumbai } from "@/lib/drupal/pages/mdc";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/mdc");

export default async function Page() {
  return <MdcPage data={await getMdcMumbai()} />;
}
