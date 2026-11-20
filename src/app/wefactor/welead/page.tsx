import type { Metadata } from "next";
import { WeFactorDetailPage } from "@/components/wefactor/WeFactorDetailPage";
import { getWeFactorDetail } from "@/lib/drupal/pages/wefactor-detail";
import { WELEAD } from "@/lib/wefactor/welead-data";

export const metadata: Metadata = {
  title: "WeLead — WeFactor",
  description: WELEAD.intro,
};

export default async function Page() {
  return <WeFactorDetailPage data={await getWeFactorDetail("welead")} />;
}
