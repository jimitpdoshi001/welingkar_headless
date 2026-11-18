import type { Metadata } from "next";
import { WeFactorDetailPage } from "@/components/wefactor/WeFactorDetailPage";
import { WEINNOVATE } from "@/lib/wefactor/weinnovate-data";

export const metadata: Metadata = {
  title: "WeInnovate — WeFactor",
  description: WEINNOVATE.intro,
};

export default function Page() {
  return <WeFactorDetailPage data={WEINNOVATE} />;
}
