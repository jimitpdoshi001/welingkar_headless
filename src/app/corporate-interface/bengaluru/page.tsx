import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";
import { CorporatePage } from "@/components/corporate/CorporatePage";
import { getCmcBengaluru } from "@/lib/drupal/pages/cmc";

export const metadata: Metadata = {
  ...canonical("/corporate-interface/bengaluru"),
  title: "Corporate - Bengaluru | WeSchool",
  description: "Industry-academia engagement, placements and recruiting at WeSchool Bengaluru.",
};

export default async function Page() {
  return <CorporatePage campus="bengaluru" data={await getCmcBengaluru()} />;
}
