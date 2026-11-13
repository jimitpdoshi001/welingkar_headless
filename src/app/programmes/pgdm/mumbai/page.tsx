import type { Metadata } from "next";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { PGDM_MUMBAI } from "@/lib/pgdm/pgdm-data";
import { withProgramFaculty } from "@/lib/programmes/program-faculty";
import { PROGRAM_LISTING_NIDS, applyProgramListing, getProgramListing } from "@/lib/drupal/program-listing";

export const metadata: Metadata = {
  title: "PGDM — Welingkar Mumbai",
  description: "Post Graduate Diploma in Management — Welingkar Mumbai",
};

export default async function PgdmMumbaiCampusPage() {
  const doc = await getProgramListing(PROGRAM_LISTING_NIDS.pgdmMumbai);

  return (
    <PgdmPage
      data={await withProgramFaculty(applyProgramListing(PGDM_MUMBAI, doc), "mumbai", "pgdm")}
      accent="orange"
    />
  );
}
