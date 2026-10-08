import { notFound } from "next/navigation";

import { PageShell } from "./PageShell";
import { ContentSection, LinkCardGrid, FilterBar } from "./ContentBlocks";
import { SiteForm } from "./SiteForm";
import { getSitePage } from "@/lib/pages/site-pages";

export function RegistryPage({ path }: { path: string }) {
  const page = getSitePage(path);
  if (!page) notFound();

  return (
    <PageShell
      title={page.title}
      subtitle={page.subtitle}
      breadcrumbs={page.breadcrumbs}
      image={page.image}
      accent={page.accent}>
      {page.sections.map((section, i) =>
        section.filters ? (
          <FilterBar
            key={i}
            search={section.filters.search}
            selects={section.filters.selects}
          />
        ) : section.form ? (
          <SiteForm
            key={i}
            config={section.form}
          />
        ) : section.cards ? (
          <LinkCardGrid
            key={i}
            heading={section.heading}
            cards={section.cards}
            columns={section.cardColumns ?? 3}
            tint={section.tint}
          />
        ) : (
          <ContentSection
            key={i}
            heading={section.heading}
            lead={section.lead}
            paragraphs={section.paragraphs}
            tint={section.tint}
            align={section.align}
          />
        ),
      )}
    </PageShell>
  );
}

export default RegistryPage;
