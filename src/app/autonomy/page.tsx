import type { Metadata } from "next";
import { PageShell } from "@/components/shell/PageShell";
import { AutonomyDocs } from "@/components/statutory/Statutory";
import { AUTONOMY_DOCS } from "@/lib/statutory/statutory-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/autonomy");

export default function Page() {
  return (
    <PageShell
      variant="tall"
      title="Autonomy"
      image="/statutory/autonomy.webp"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Autonomy" }]}
    >
      <AutonomyDocs links={AUTONOMY_DOCS} />
    </PageShell>
  );
}
