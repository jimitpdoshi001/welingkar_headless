import type { Metadata } from "next";

import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { LISTING_MUMBAI } from "@/lib/programmes/listing-data";

export const metadata: Metadata = {
  title: "Full-Time Programs in Mumbai — Welingkar",
  description: "Explore WeSchool Mumbai's full-time PGDM and MMS programmes.",
};

export default function ProgrammesPage() {
  return <ProgrammeListing data={LISTING_MUMBAI} />;
}
