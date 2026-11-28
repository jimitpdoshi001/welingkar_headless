import type { Metadata } from "next";
import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { getExecutiveListing } from "@/lib/drupal/pages/executive-listing";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/executive-program-in-mumbai" },
  title: "Executive Programs in Mumbai — Welingkar",
  description: "Explore WeSchool Mumbai's executive programs for working professionals.",
};

export default async function ExecutiveProgrammesMumbaiPage() {
  return <ProgrammeListing data={await getExecutiveListing()} />;
}
