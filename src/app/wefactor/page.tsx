import type { Metadata } from "next";
import { WeFactorPage } from "@/components/wefactor/WeFactorPage";
import { getWeFactor } from "@/lib/drupal/pages/wefactor";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/wefactor");

export default async function Page() {
  return <WeFactorPage data={await getWeFactor()} />;
}
