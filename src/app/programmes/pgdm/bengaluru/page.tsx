import type { Metadata } from "next";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { PGDM_BENGALURU } from "@/lib/pgdm/pgdm-data";

export const metadata: Metadata = {
  title: "PGDM — Welingkar Bengaluru",
  description: "Post Graduate Diploma in Management — Welingkar Bengaluru",
};

export default function PgdmBengaluruPage() {
  return (
    <PgdmPage
      data={PGDM_BENGALURU}
      accent="green"
    />
  );
}
