import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";

import { facultyPerson, getCampusFacultyGrid } from "@/lib/drupal/faculty-api";
import { CampusPage } from "@/components/campus/CampusPage";
import { CAMPUS_MUMBAI } from "@/lib/campus/campus-data";

export const metadata: Metadata = {
  ...canonical("/campuses/mumbai"),
  title: "Mumbai Campus — Welingkar",
  description: "WeSchool Mumbai Campus — Prin. L. N. Welingkar Institute of Management Development & Research",
};

// Director photo stays the original campus image (requested); Read More opens
// the director's faculty profile.
export default async function MumbaiCampusPage() {
  const { director } = CAMPUS_MUMBAI;
  const person = await facultyPerson(director.name);
  const data = person.href ? { ...CAMPUS_MUMBAI, director: { ...director, cta: { ...director.cta, href: person.href } } } : CAMPUS_MUMBAI;
  return (
    <CampusPage
      data={data}
      mentors={await getCampusFacultyGrid("mumbai", { roleTabs: true })}
    />
  );
}
