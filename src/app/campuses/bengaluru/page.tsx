import type { Metadata } from "next";

import { CampusPage } from "@/components/campus/CampusPage";
import { CAMPUS_BENGALURU } from "@/lib/campus/campus-data";

export const metadata: Metadata = {
  title: "Bengaluru Campus — Welingkar",
  description: "WeSchool Bengaluru Campus — Prin. L. N. Welingkar Institute of Management Development & Research",
};

export default function BengaluruCampusPage() {
  return <CampusPage data={CAMPUS_BENGALURU} />;
}
