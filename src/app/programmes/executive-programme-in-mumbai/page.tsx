import type { Metadata } from "next";
import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { getExecutiveListing } from "@/lib/drupal/pages/executive-listing";

export const metadata: Metadata = {
  alternates: { canonical: "/programmes/executive-programme-in-mumbai" },
  title: "Executive Programmes in Mumbai — Welingkar",
  description: "Explore WeSchool Mumbai's executive programmes for working professionals.",
};

export default async function ExecutiveProgrammesMumbaiPage() {
  return <ProgrammeListing data={await getExecutiveListing()} />;
}
