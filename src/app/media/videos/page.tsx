import type { Metadata } from "next";
import { RegistryPage } from "@/components/shell/RegistryPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/media/videos");

export default function Page() {
  return <RegistryPage path="/media/videos" />;
}
