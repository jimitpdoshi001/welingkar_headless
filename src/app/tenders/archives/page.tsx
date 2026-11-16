import type { Metadata } from "next";
import { TendersPage } from "@/components/tenders/TendersPage";
import { TENDERS_ARCHIVE } from "@/lib/tenders/tenders-data";

export const metadata: Metadata = {
  title: "Tenders Archives — Welingkar",
  description: "Archived tenders and procurement notices from WeSchool.",
};

export default function Page() {
  return <TendersPage data={TENDERS_ARCHIVE} variant="archive" />;
}
