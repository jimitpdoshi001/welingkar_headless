import type { Metadata } from "next";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { PGDM_MUMBAI } from "@/lib/pgdm/pgdm-data";

export const metadata: Metadata = {
  title: "PGDM — Welingkar Mumbai",
  description: "Post Graduate Diploma in Management — Welingkar Mumbai",
};

export default function PgdmMumbaiCampusPage() {
  return (
    <PgdmPage
      data={PGDM_MUMBAI}
      accent="orange"
    />
  );
}
