import type { Metadata } from "next";
import { LibraryPage } from "@/components/library/LibraryPage";
import { LIBRARY_BENGALURU } from "@/lib/library/library-data";

export const metadata: Metadata = {
  title: "Bengaluru Library — Welingkar",
  description: "Learning Resource Centre (LRC) at WeSchool Bengaluru.",
};

export default function Page() {
  return <LibraryPage data={LIBRARY_BENGALURU} />;
}
