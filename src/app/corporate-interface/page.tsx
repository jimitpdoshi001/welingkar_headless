import type { Metadata } from "next";
import { RegistryPage } from "@/components/shell/RegistryPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/corporate-interface");

export default function Page() {
  return <RegistryPage path="/corporate-interface" />;
}
