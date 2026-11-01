import type { Metadata } from "next";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { PGDM_BENGALURU } from "@/lib/pgdm/pgdm-data";
import { PROGRAM_LISTING_NIDS, applyProgramListing, getProgramListing } from "@/lib/drupal/program-listing";

export const metadata: Metadata = {
  title: "PGDM — Welingkar Bengaluru",
  description: "Post Graduate Diploma in Management — Welingkar Bengaluru",
};

export default async function PgdmBengaluruPage() {
  // Returns null (built-in content) until a Bengaluru node ID is configured.
  const node = await getProgramListing(PROGRAM_LISTING_NIDS.pgdmBengaluru);

  return (
    <PgdmPage
      data={applyProgramListing(PGDM_BENGALURU, node)}
      accent="green"
    />
  );
}
