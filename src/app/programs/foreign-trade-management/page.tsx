import type { Metadata } from "next";
import { ForeignTradePage } from "@/components/programmes/ForeignTrade/ForeignTradePage";
import { getForeignTrade } from "@/lib/drupal/pages/foreign-trade";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/foreign-trade-management" },
  title: "Post Graduate Program in Foreign Trade Management (PGP-FTM) — Welingkar",
  description:
    "An 11-month program by WeSchool and FIEO that trains aspirants for careers in exports and international trade management.",
};

// Same cache window as the Drupal fetches.
export const revalidate = 300;

export default async function Page() {
  return <ForeignTradePage data={await getForeignTrade()} />;
}
