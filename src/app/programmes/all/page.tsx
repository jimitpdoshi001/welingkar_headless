import type { Metadata } from "next";

import { PageShell } from "@/components/shell/PageShell";
import { LinkCardGrid, type LinkCard } from "@/components/shell/ContentBlocks";
import { PROGRAMMES } from "@/lib/programmes/programmes";

export const metadata: Metadata = {
  // Previous "all programs" grid, kept for later use; hidden from search engines.
  title: "All Programs — Welingkar",
  robots: { index: false, follow: true },
  description: "Explore WeSchool's full-time PGDM, post-graduate, executive and certificate programs.",
};

const CATEGORIES = ["Full-Time PGDM", "Post Graduate", "Executive & Certificate"] as const;

const IMAGES = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=1000&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&auto=format&fit=crop&q=80",
];

export default function ProgrammesPage() {
  return (
    <PageShell
      title="Programs Built for Every Ambition"
      subtitle="A wide range of curated programs designed to challenge, engage and shape the business leaders of tomorrow."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programmes" }, { label: "All Programs" }]}
      accent="orange">
      {CATEGORIES.map((category, ci) => {
        const cards: LinkCard[] = PROGRAMMES.filter((p) => p.category === category).map((p, i) => ({
          title: p.title,
          text: p.summary,
          href: `/programmes/${p.slug}`,
          image: IMAGES[(ci + i) % IMAGES.length],
          meta: `${p.duration} · ${p.intake}`,
        }));
        return (
          <LinkCardGrid
            key={category}
            heading={category}
            cards={cards}
            columns={3}
            tint={ci % 2 === 1 ? "cream" : undefined}
          />
        );
      })}
    </PageShell>
  );
}
