import { notFound } from "next/navigation";

// The all-programs listing at /programmes was removed (per request); the address
// now shows "Page not found". Campus listings and program pages are unaffected.
export default function ProgrammesPage() {
  notFound();
}
