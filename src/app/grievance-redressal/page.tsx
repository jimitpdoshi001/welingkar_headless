import type { Metadata } from "next";
import { PageShell } from "@/components/shell/PageShell";
import { GrievanceForm } from "@/components/statutory/Statutory";
import { GRIEVANCE_INTRO } from "@/lib/statutory/statutory-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/grievance-redressal");

export default function Page() {
  return (
    <PageShell
      variant="tall"
      title="Grievance Redressal"
      subtitle={GRIEVANCE_INTRO}
      image="/statutory/grievance-redressal.webp"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Grievance Redressal" },
      ]}
    >
      <GrievanceForm />
    </PageShell>
  );
}
