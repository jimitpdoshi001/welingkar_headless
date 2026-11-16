import type { Metadata } from "next";
import { AlumniPage } from "@/components/alumni/AlumniPage";
import { ALUMNI } from "@/lib/alumni/alumni-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/alumni");

export default function Page() {
  return <AlumniPage data={ALUMNI} />;
}
