import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { getProgramme, programmeData, PROGRAMMES } from "@/lib/programmes/programmes";

export function generateStaticParams() {
  return PROGRAMMES.filter((p) => p.slug !== "pgdm").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getProgramme(slug);
  return meta ? { title: `${meta.title} — Welingkar`, description: meta.summary } : { title: "Program not found" };
}

export default async function ProgrammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getProgramme(slug);
  if (!meta) notFound();

  return (
    <PgdmPage
      data={programmeData(meta)}
      accent="orange"
    />
  );
}
