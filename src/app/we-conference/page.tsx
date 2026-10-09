import type { Metadata } from "next";
import { ConferencePage } from "@/components/conference/ConferencePage";
import { CONFERENCE } from "@/lib/conference/conference-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/we-conference");

export default function Page() {
  return <ConferencePage data={CONFERENCE} />;
}
