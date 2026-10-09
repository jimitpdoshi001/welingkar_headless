import type { Metadata } from "next";
import { MdcPage } from "@/components/mdc/MdcPage";
import { MDC } from "@/lib/mdc/mdc-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/mdc");

export default function Page() {
  return <MdcPage data={MDC} />;
}
