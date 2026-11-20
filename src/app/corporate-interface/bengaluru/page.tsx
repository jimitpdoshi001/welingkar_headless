import type { Metadata } from "next";
import { CorporatePage } from "@/components/corporate/CorporatePage";

export const metadata: Metadata = {
  title: "Corporate - Bengaluru | WeSchool",
  description: "Industry-academia engagement, placements and recruiting at WeSchool Bengaluru.",
};

export default function Page() {
  return <CorporatePage campus="bengaluru" />;
}
