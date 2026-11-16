import type { Metadata } from "next";

import { getCampusFacultyGrid } from "@/lib/drupal/faculty-api";
import { CampusPage } from "@/components/campus/CampusPage";
import { CAMPUS_MUMBAI } from "@/lib/campus/campus-data";

export const metadata: Metadata = {
  title: "Mumbai Campus — Welingkar",
  description: "WeSchool Mumbai Campus — Prin. L. N. Welingkar Institute of Management Development & Research",
};

export default async function MumbaiCampusPage() {
  return (
    <CampusPage
      data={CAMPUS_MUMBAI}
      mentors={await getCampusFacultyGrid("mumbai")}
    />
  );
}
