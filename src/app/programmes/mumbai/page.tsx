import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";

import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { getProgrammeListing } from "@/lib/drupal/pages/programme-listing";

export const metadata: Metadata = {
  ...canonical("/programmes/mumbai"),
  title: "Full-Time Programs in Mumbai — Welingkar",
  description: "Explore WeSchool Mumbai's full-time PGDM and MMS programs.",
};

export default async function ProgrammesMumbaiPage() {
  return <ProgrammeListing data={await getProgrammeListing("mumbai")} />;
}
