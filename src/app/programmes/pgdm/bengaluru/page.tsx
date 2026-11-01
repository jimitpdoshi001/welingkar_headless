import type { Metadata } from "next";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { PGDM_BENGALURU } from "@/lib/pgdm/pgdm-data";
import { PROGRAM_LISTING_NIDS, applyProgramListing, getProgramListing } from "@/lib/drupal/program-listing";

export const metadata: Metadata = {
  title: "PGDM — Welingkar Bengaluru",
  description: "Post Graduate Diploma in Management — Welingkar Bengaluru",
};

export default async function PgdmBengaluruPage() {
  const doc = await getProgramListing(PROGRAM_LISTING_NIDS.pgdmBengaluru);

  return (
    <PgdmPage
      data={applyProgramListing(PGDM_BENGALURU, doc)}
      accent="green"
    />
  );
}
