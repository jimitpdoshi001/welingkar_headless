import type { Metadata } from "next";
import { CampusListingPage } from "@/components/campus/CampusListingPage";
import { getCampusRows } from "@/lib/drupal/pages/campus-listing";

export const metadata: Metadata = {
  title: "Campuses — Welingkar",
  description: "Explore the WeSchool Mumbai and Bengaluru campuses.",
};

export default async function CampusesPage() {
  return <CampusListingPage rows={await getCampusRows()} />;
}
