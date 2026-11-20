import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";
import { WeFactorDetailPage } from "@/components/wefactor/WeFactorDetailPage";
import { getWeFactorDetail } from "@/lib/drupal/pages/wefactor-detail";
import { WEINNOVATE } from "@/lib/wefactor/weinnovate-data";

export const metadata: Metadata = {
  ...canonical("/wefactor/weinnovate"),
  title: "WeInnovate — WeFactor",
  description: WEINNOVATE.intro,
};

export default async function Page() {
  return <WeFactorDetailPage data={await getWeFactorDetail("weinnovate")} />;
}
