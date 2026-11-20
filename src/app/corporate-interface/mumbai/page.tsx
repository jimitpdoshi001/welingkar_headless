import type { Metadata } from "next";
import { CorporatePage } from "@/components/corporate/CorporatePage";

export const metadata: Metadata = {
  title: "Corporate - Mumbai | WeSchool",
  description: "Industry-academia engagement, placements and recruiting at WeSchool Mumbai.",
};

export default function Page() {
  return <CorporatePage campus="mumbai" />;
}
