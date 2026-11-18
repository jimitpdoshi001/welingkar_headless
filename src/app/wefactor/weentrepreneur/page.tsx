import type { Metadata } from "next";
import { WeFactorDetailPage } from "@/components/wefactor/WeFactorDetailPage";
import { WEENTREPRENEURSHIP } from "@/lib/wefactor/weentrepreneurship-data";

export const metadata: Metadata = {
  title: "WeEntrepreneurship — WeFactor",
  description: WEENTREPRENEURSHIP.intro,
};

export default function Page() {
  return <WeFactorDetailPage data={WEENTREPRENEURSHIP} />;
}
