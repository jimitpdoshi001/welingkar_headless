import type { Metadata } from "next";
import { PageShell } from "@/components/shell/PageShell";
import { MandatoryDisclosure } from "@/components/statutory/Statutory";

import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/mandatory-disclosure");

export default function Page() {
  return (
    <PageShell
      variant="tall"
      title="Mandatory Disclosures"
      image="/statutory/mandatory-disclosure.webp"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Mandatory Disclosures" },
      ]}
    >
      <MandatoryDisclosure />
    </PageShell>
  );
}
