import type { Metadata } from "next";
import { canonical } from "@/lib/seo/public-paths";

import { PgpEntrepreneurshipPage } from "@/components/pgp/PgpEntrepreneurshipPage";
import { PGP_ENTREPRENEURSHIP } from "@/lib/pgp/pgp-entrepreneurship-data";
import { withPgpEntrepreneurshipContent } from "@/lib/drupal/pages/pgp-entrepreneurship";

// Same cache window as the Drupal fetches.
export const revalidate = 300;

export const metadata: Metadata = {
  ...canonical("/programs/pgp-entrepreneurship"),
  title: "PGP in Entrepreneurship and Family Managed Business (EFMB) — Welingkar Mumbai",
  description:
    "Mentoring business owners to ideate, innovate, execute & prosper — WeSchool Mumbai's 11-month PGP in Entrepreneurship and Family Managed Business.",
};

export default async function PgpEntrepreneurshipRoute() {
  return <PgpEntrepreneurshipPage data={await withPgpEntrepreneurshipContent(PGP_ENTREPRENEURSHIP)} />;
}
