import type { Metadata } from "next";

import { facultyPerson, getCampusFacultyGrid } from "@/lib/drupal/faculty-api";
import { CampusPage } from "@/components/campus/CampusPage";
import { CAMPUS_BENGALURU } from "@/lib/campus/campus-data";

export const metadata: Metadata = {
  title: "Bengaluru Campus — Welingkar",
  description: "WeSchool Bengaluru Campus — Prin. L. N. Welingkar Institute of Management Development & Research",
};

export default async function BengaluruCampusPage() {
  // Director photo: current Drupal faculty photo when the person is found.
  const person = await facultyPerson(CAMPUS_BENGALURU.director.name);
  const data = { ...CAMPUS_BENGALURU, director: { ...CAMPUS_BENGALURU.director, image: person.image || CAMPUS_BENGALURU.director.image } };
  return (
    <CampusPage
      data={data}
      mentors={await getCampusFacultyGrid("bengaluru")}
    />
  );
}
