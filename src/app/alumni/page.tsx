import type { Metadata } from "next";
import { AlumniPage } from "@/components/alumni/AlumniPage";
import { getAlumni } from "@/lib/drupal/pages/alumni";
import { facultyPerson } from "@/lib/drupal/faculty-api";
import { ALUMNI_DIRECTORS } from "@/lib/alumni/alumni-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/alumni");

export default async function Page() {
  // Each director card links to their faculty profile (hidden when not in the Faculty directory).
  const directors = await Promise.all(ALUMNI_DIRECTORS.map(async (d) => ({ ...d, profileHref: (await facultyPerson(d.name)).href })));
  return (
    <AlumniPage
      data={await getAlumni()}
      directors={directors}
    />
  );
}
