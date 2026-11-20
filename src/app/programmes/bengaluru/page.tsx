import type { Metadata } from "next";

import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { getProgrammeListing } from "@/lib/drupal/pages/programme-listing";

export const metadata: Metadata = {
  title: "Full-Time Programs in Bengaluru — Welingkar",
  description: "Explore WeSchool Bengaluru's full-time PGDM and MMS programs.",
};

export default async function ProgrammesBengaluruPage() {
  return <ProgrammeListing data={await getProgrammeListing("bengaluru")} />;
}
