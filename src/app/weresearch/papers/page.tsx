import type { Metadata } from "next";
import { PublicationsPage } from "@/components/weresearch/PublicationsPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/weresearch/papers");

export default function Page() {
  return <PublicationsPage />;
}
