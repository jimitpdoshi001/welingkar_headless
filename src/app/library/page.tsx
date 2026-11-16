import type { Metadata } from "next";
import { LibraryPage } from "@/components/library/LibraryPage";
import { LIBRARY_MUMBAI } from "@/lib/library/library-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/library");

export default function Page() {
  return <LibraryPage data={LIBRARY_MUMBAI} />;
}
