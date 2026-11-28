import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";

import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { getProgrammeListing } from "@/lib/drupal/pages/programme-listing";

export const metadata: Metadata = {
  ...canonical("/programs/bengaluru"),
  title: "Full-Time Programs in Bengaluru — Welingkar",
  description: "Explore WeSchool Bengaluru's full-time PGDM and MMS programs.",
};

export default async function ProgrammesBengaluruPage() {
  return <ProgrammeListing data={await getProgrammeListing("bengaluru")} />;
}
