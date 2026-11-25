import type { Metadata } from "next";
import { AlumniPage } from "@/components/alumni/AlumniPage";
import { getAlumni } from "@/lib/drupal/pages/alumni";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/alumni");

export default async function Page() {
  return <AlumniPage data={await getAlumni()} />;
}
