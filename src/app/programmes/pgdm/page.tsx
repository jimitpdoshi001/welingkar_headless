import type { Metadata } from "next";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { PGDM_MUMBAI } from "@/lib/pgdm/pgdm-data";
import { withProgramFaculty } from "@/lib/programmes/program-faculty";
import { PROGRAM_LISTING_NIDS, applyProgramListing, getProgramListing } from "@/lib/drupal/program-listing";

export const metadata: Metadata = {
  title: "PGDM — Welingkar Mumbai",
  description: "Post Graduate Diploma in Management — Welingkar Mumbai",
};

export default async function PgdmMumbaiPage() {
  const doc = await getProgramListing(PROGRAM_LISTING_NIDS.pgdmMumbai);
  const data = applyProgramListing(PGDM_MUMBAI, doc);
  // Hidden on this page (requested): Program Strengths and Student-Centric Pedagogy.
  // PgdmPage skips a section when its content is empty.
  data.strengths = { ...data.strengths, cards: [] };
  data.studentPedagogy = { ...data.studentPedagogy, intro: "", bullets: [] };

  return (
    <PgdmPage
      data={await withProgramFaculty(data, "mumbai", "pgdm")}
      accent="orange"
    />
  );
}
