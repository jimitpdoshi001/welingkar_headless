import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { ABOUT } from "@/lib/about/about-data";

export const metadata: Metadata = {
  title: "About Us — WeSchool",
  description: "Prin. L. N. Welingkar Institute of Management Development and Research — a legacy of learning and leadership.",
};

export default function Page() {
  return <AboutPage data={ABOUT} />;
}
