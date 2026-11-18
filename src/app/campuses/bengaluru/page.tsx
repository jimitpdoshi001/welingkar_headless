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
  // Read More opens the director's faculty profile.
  const { director } = CAMPUS_BENGALURU;
  const data = {
    ...CAMPUS_BENGALURU,
    director: {
      ...director,
      image: person.image || director.image,
      cta: person.href ? { ...director.cta, href: person.href } : director.cta,
    },
  };
  return (
    <CampusPage
      data={data}
      mentors={await getCampusFacultyGrid("bengaluru")}
    />
  );
}
