import type { Metadata } from "next";

import { PageShell } from "@/components/shell/PageShell";
import { LinkCardGrid } from "@/components/shell/ContentBlocks";

export const metadata: Metadata = {
  title: "Campuses — Welingkar",
  description: "Explore the WeSchool Mumbai and Bengaluru campuses.",
};

export default function CampusesPage() {
  return (
    <PageShell
      title="Our Campuses"
      subtitle="Two vibrant campuses, one shared commitment to progressive, industry-ready management education."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Campuses" }]}>
      <LinkCardGrid
        columns={2}
        cards={[
          {
            title: "Mumbai Campus",
            text: "Prin. L. N. Welingkar Institute of Management Development & Research, Mumbai (Matunga).",
            href: "/campuses/mumbai",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1000&auto=format&fit=crop&q=80",
            meta: "AICTE Approved Standalone Institute",
          },
          {
            title: "Bengaluru Campus",
            text: "WeSchool Bengaluru — a hub of innovation, design thinking and experiential learning.",
            href: "/campuses/bengaluru",
            image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1000&auto=format&fit=crop&q=80",
            meta: "AICTE Approved Standalone Institute",
          },
        ]}
      />
    </PageShell>
  );
}
