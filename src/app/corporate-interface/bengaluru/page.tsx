import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";
import { CorporatePage } from "@/components/corporate/CorporatePage";

export const metadata: Metadata = {
  ...canonical("/corporate-interface/bengaluru"),
  title: "Corporate - Bengaluru | WeSchool",
  description: "Industry-academia engagement, placements and recruiting at WeSchool Bengaluru.",
};

export default function Page() {
  return <CorporatePage campus="bengaluru" />;
}
