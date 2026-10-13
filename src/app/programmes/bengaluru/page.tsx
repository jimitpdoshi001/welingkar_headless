import type { Metadata } from "next";

import { ProgrammeListing } from "@/components/programmes/ProgrammeListing";
import { LISTING_BENGALURU } from "@/lib/programmes/listing-data";

export const metadata: Metadata = {
  title: "Full-Time Programs in Bengaluru — Welingkar",
  description: "Explore WeSchool Bengaluru's full-time PGDM and MMS programs.",
};

export default function ProgrammesBengaluruPage() {
  return <ProgrammeListing data={LISTING_BENGALURU} />;
}
