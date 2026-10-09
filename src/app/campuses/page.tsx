import type { Metadata } from "next";
import { CampusListingPage } from "@/components/campus/CampusListingPage";

export const metadata: Metadata = {
  title: "Campuses — Welingkar",
  description: "Explore the WeSchool Mumbai and Bengaluru campuses.",
};

export default function CampusesPage() {
  return <CampusListingPage />;
}
