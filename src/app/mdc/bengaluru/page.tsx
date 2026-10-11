import type { Metadata } from "next";
import { MdcPage } from "@/components/mdc/MdcPage";
import { MDC_BENGALURU } from "@/lib/mdc/mdc-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/mdc/bengaluru");

export default function Page() {
  return <MdcPage data={MDC_BENGALURU} />;
}
