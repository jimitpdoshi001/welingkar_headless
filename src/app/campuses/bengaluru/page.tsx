import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";

import { facultyPerson, getCampusFacultyGrid } from "@/lib/drupal/faculty-api";
import { CampusPage } from "@/components/campus/CampusPage";
import { withCampusContent } from "@/lib/drupal/pages/campus";
import { CAMPUS_BENGALURU } from "@/lib/campus/campus-data";

export const metadata: Metadata = {
  ...canonical("/campuses/bengaluru"),
  title: "Bengaluru Campus — Welingkar",
  description: "WeSchool Bengaluru Campus — Prin. L. N. Welingkar Institute of Management Development & Research",
};

export default async function BengaluruCampusPage() {
  // Faculty profile lookup for the director's Read More link.
  const person = await facultyPerson(CAMPUS_BENGALURU.director.name);
  // Read More opens the director's faculty profile.
  const { director } = CAMPUS_BENGALURU;
  const data = {
    ...CAMPUS_BENGALURU,
    director: {
      ...director,
      // Supplied 536x387 photo sized for this card (not the square faculty photo).
      image: "/campus/madhavi-lokhande-director.webp",
      cta: person.href ? { ...director.cta, href: person.href } : director.cta,
    },
  };
  return (
    <CampusPage
      data={await withCampusContent(5766, data)}
      mentors={await getCampusFacultyGrid("bengaluru", { roleTabs: true })}
    />
  );
}
