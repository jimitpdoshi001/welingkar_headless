import type { Metadata } from "next";
import { ForeignTradePage } from "@/components/programmes/ForeignTrade/ForeignTradePage";

export const metadata: Metadata = {
  alternates: { canonical: "/programmes/foreign-trade-management" },
  title: "Post Graduate Program in Foreign Trade Management (PGP-FTM) — Welingkar",
  description:
    "An 11-month programme by WeSchool and FIEO that trains aspirants for careers in exports and international trade management.",
};

export default function Page() {
  return <ForeignTradePage />;
}
