import type { Metadata } from "next";
import { WeFactorDetailPage } from "@/components/wefactor/WeFactorDetailPage";
import { getWeFactorDetail } from "@/lib/drupal/pages/wefactor-detail";
import { WEENTREPRENEURSHIP } from "@/lib/wefactor/weentrepreneurship-data";

export const metadata: Metadata = {
  title: "WeEntrepreneurship — WeFactor",
  description: WEENTREPRENEURSHIP.intro,
};

export default async function Page() {
  return <WeFactorDetailPage data={await getWeFactorDetail("weentrepreneurship")} />;
}
