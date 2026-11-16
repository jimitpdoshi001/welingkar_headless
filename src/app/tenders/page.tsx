import type { Metadata } from "next";
import { TendersPage } from "@/components/tenders/TendersPage";
import { TENDERS } from "@/lib/tenders/tenders-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/tenders");

export default function Page() {
  return <TendersPage data={TENDERS} />;
}
