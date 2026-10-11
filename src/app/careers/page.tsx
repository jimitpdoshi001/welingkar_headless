import type { Metadata } from "next";
import { PageShell } from "@/components/shell/PageShell";
import { CareersContent } from "@/components/statutory/Statutory";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/careers");

export default function Page() {
  return (
    <PageShell
      variant="tall"
      title="Careers"
      image="/statutory/careers.webp"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}>
      <CareersContent />
    </PageShell>
  );
}
