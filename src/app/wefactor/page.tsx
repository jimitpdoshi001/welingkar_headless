import type { Metadata } from "next";
import { WeFactorPage } from "@/components/wefactor/WeFactorPage";
import { WEFACTOR } from "@/lib/wefactor/wefactor-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/wefactor");

export default function Page() {
  return <WeFactorPage data={WEFACTOR} />;
}
