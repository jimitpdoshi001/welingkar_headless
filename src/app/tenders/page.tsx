import type { Metadata } from "next";
import { TendersPage } from "@/components/tenders/TendersPage";
import { getTenders } from "@/lib/drupal/pages/tenders";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/tenders");

export default async function Page() {
  return <TendersPage data={await getTenders()} />;
}
