import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";
import { CorporatePage } from "@/components/corporate/CorporatePage";
import { getCmcMumbai } from "@/lib/drupal/pages/cmc";

export const metadata: Metadata = {
  ...canonical("/corporate-interface/mumbai"),
  title: "Corporate - Mumbai | WeSchool",
  description: "Industry-academia engagement, placements and recruiting at WeSchool Mumbai.",
};

export default async function Page() {
  return <CorporatePage campus="mumbai" data={await getCmcMumbai()} />;
}
