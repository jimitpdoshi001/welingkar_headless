import type { Metadata } from "next";
import { PageShell } from "@/components/shell/PageShell";
import { DisclosureLayout } from "@/components/statutory/Statutory";
import { ACCREDITATION_SECTIONS } from "@/lib/statutory/accreditation-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/accreditation");

/** Mandatory Disclosure template: ?section= picks the side-menu entry (default: first). */
export default async function Page({ searchParams }: { searchParams: Promise<{ section?: string | string[] }> }) {
  const { section } = await searchParams;
  const current = ACCREDITATION_SECTIONS.find((s) => s.id === section) ?? ACCREDITATION_SECTIONS[0];
  return (
    <PageShell
      variant="tall"
      title="Accreditations"
      image="/statutory/mandatory-disclosure.webp"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accreditations" }]}
    >
      <DisclosureLayout active={current.title} groups={current.groups} />
    </PageShell>
  );
}
