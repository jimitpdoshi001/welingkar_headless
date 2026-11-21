import type { Metadata } from "next";
import { LifePage } from "@/components/life/LifePage";
import { getLifeMumbai } from "@/lib/drupal/pages/life";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/life-at-weschool");

export default async function Page() {
  return <LifePage data={await getLifeMumbai()} />;
}
