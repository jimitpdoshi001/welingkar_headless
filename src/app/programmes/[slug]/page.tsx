import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PgdmPage } from "@/components/pgdm/PgdmPage";
import { getProgramme, programmeData, PROGRAMMES } from "@/lib/programmes/programmes";
import { PROGRAM_SLUG_NIDS, PROGRAM_SLUG_NIDS_BENGALURU, applyProgramListing, getProgramListing } from "@/lib/drupal/program-listing";

export function generateStaticParams() {
  return PROGRAMMES.filter((p) => p.slug !== "pgdm").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getProgramme(slug);
  return meta ? { title: `${meta.title} — Welingkar`, description: meta.summary } : { title: "Program not found" };
}

export default async function ProgrammeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ campus?: string | string[] }>;
}) {
  const { slug } = await params;
  // ?campus=bengaluru: Bengaluru version (own Drupal node, green campus theme).
  const bengaluru = (await searchParams).campus === "bengaluru" && slug in PROGRAM_SLUG_NIDS_BENGALURU;
  const meta = getProgramme(slug);
  if (!meta) notFound();

  // Programs with a Drupal node use its content (same rules as PGDM Mumbai/Bengaluru).
  const nid = bengaluru ? PROGRAM_SLUG_NIDS_BENGALURU[slug] : PROGRAM_SLUG_NIDS[slug];
  const doc = nid ? await getProgramListing(nid) : null;

  return (
    <PgdmPage
      data={applyProgramListing(programmeData(meta), doc)}
      accent={bengaluru ? "green" : "orange"}
    />
  );
}
