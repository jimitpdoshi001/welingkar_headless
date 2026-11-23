import type { Metadata } from "next";
import { ConferencePage } from "@/components/conference/ConferencePage";
import { getConference } from "@/lib/drupal/pages/conference";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/we-conference");

export default async function Page() {
  return <ConferencePage data={await getConference()} />;
}
