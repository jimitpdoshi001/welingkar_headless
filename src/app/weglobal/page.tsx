import type { Metadata } from "next";
import { WeGlobalPage } from "@/components/weglobal/WeGlobalPage";
import { WEGLOBAL } from "@/lib/weglobal/weglobal-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/weglobal");

export default function Page() {
  return <WeGlobalPage data={WEGLOBAL} />;
}
