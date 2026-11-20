import type { Metadata } from "next";
import { WeFactorDetailPage } from "@/components/wefactor/WeFactorDetailPage";
import { getWeFactorDetail } from "@/lib/drupal/pages/wefactor-detail";
import { WELEARNING } from "@/lib/wefactor/welearning-data";

export const metadata: Metadata = {
  title: "WeLearning Experience — WeFactor",
  description: "WeLearning Experience at WeSchool: Acquisition, Application and Assimilation, NEEV induction, internships, industry roundtables and student initiatives.",
};

export default async function Page() {
  return <WeFactorDetailPage data={await getWeFactorDetail("welearning")} />;
}
