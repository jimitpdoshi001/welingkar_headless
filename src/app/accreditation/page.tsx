import type { Metadata } from "next";
import { AccreditationPage } from "@/components/accreditation/AccreditationPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/accreditation");

export default function Page() {
  return <AccreditationPage />;
}
