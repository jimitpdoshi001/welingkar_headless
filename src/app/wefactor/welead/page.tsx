import type { Metadata } from "next";
import { WeFactorDetailPage } from "@/components/wefactor/WeFactorDetailPage";
import { WELEAD } from "@/lib/wefactor/welead-data";

export const metadata: Metadata = {
  title: "WeLead — WeFactor",
  description: WELEAD.intro,
};

export default function Page() {
  return <WeFactorDetailPage data={WELEAD} />;
}
