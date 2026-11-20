import type { Metadata } from "next";
import { CorporatePage } from "@/components/corporate/CorporatePage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/corporate-interface");

export default function Page() {
  return <CorporatePage />;
}
