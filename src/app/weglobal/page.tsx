import type { Metadata } from "next";
import { WeGlobalPage } from "@/components/weglobal/WeGlobalPage";
import { getWeGlobal } from "@/lib/drupal/pages/weglobal";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/weglobal");

export default async function Page() {
  return <WeGlobalPage data={await getWeGlobal()} />;
}
