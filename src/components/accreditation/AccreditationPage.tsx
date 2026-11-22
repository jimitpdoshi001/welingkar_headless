import { PageShell } from "@/components/shell/PageShell";
import { DisclosureLayout } from "@/components/statutory/Statutory";
import { ACCREDITATION_SECTIONS, accreditationNav, campusGroups, type AccreditationCampus } from "@/lib/statutory/accreditation-data";

/** Per-campus accreditation page; `section` (from ?section=) picks the side-menu entry. */
export function AccreditationPage({ campus, section }: { campus: AccreditationCampus; section?: string }) {
  const current = ACCREDITATION_SECTIONS.find((s) => s.id === section) ?? ACCREDITATION_SECTIONS[0];
  const label = campus === "mumbai" ? "Mumbai" : "Bengaluru";
  return (
    <PageShell
      variant="tall"
      title={`Accreditations - ${label}`}
      image="/statutory/mandatory-disclosure.webp"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: `Accreditations - ${label}` }]}
    >
      <DisclosureLayout active={current.title} groups={campusGroups(current, campus)} nav={accreditationNav(campus)} grid />
    </PageShell>
  );
}
