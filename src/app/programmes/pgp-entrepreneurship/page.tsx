import type { Metadata } from "next";

import { PgpEntrepreneurshipPage } from "@/components/pgp/PgpEntrepreneurshipPage";
import { PGP_ENTREPRENEURSHIP } from "@/lib/pgp/pgp-entrepreneurship-data";

export const metadata: Metadata = {
  title: "PGP in Entrepreneurship and Family Managed Business (EFMB) — Welingkar Mumbai",
  description:
    "Mentoring business owners to ideate, innovate, execute & prosper — WeSchool Mumbai's 11-month PGP in Entrepreneurship and Family Managed Business.",
};

export default function PgpEntrepreneurshipRoute() {
  return <PgpEntrepreneurshipPage data={PGP_ENTREPRENEURSHIP} />;
}
