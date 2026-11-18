import type { Metadata } from "next";

import { facultyPerson, getCampusFacultyGrid } from "@/lib/drupal/faculty-api";
import { CampusPage } from "@/components/campus/CampusPage";
import { CAMPUS_MUMBAI } from "@/lib/campus/campus-data";

export const metadata: Metadata = {
  title: "Mumbai Campus — Welingkar",
  description: "WeSchool Mumbai Campus — Prin. L. N. Welingkar Institute of Management Development & Research",
};

export default async function MumbaiCampusPage() {
  // Director photo: current Drupal faculty photo when the person is found.
  const person = await facultyPerson(CAMPUS_MUMBAI.director.name);
  const data = { ...CAMPUS_MUMBAI, director: { ...CAMPUS_MUMBAI.director, image: person.image || CAMPUS_MUMBAI.director.image } };
  return (
    <CampusPage
      data={data}
      mentors={await getCampusFacultyGrid("mumbai")}
    />
  );
}
