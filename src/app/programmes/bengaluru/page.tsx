import type { Metadata } from "next";

import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { LISTING_BENGALURU } from "@/lib/programmes/listing-data";

export const metadata: Metadata = {
  title: "Full-Time Programmes in Bengaluru — Welingkar",
  description: "Explore WeSchool Bengaluru's full-time PGDM and MMS programmes.",
};

export default function ProgrammesBengaluruPage() {
  return <ProgrammeListing data={LISTING_BENGALURU} />;
}
