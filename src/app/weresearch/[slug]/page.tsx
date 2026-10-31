import type { Metadata } from "next";
import { RegistryPage } from "@/components/shell/RegistryPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

const SLUGS = ["recognised","areas","cases","aweshkar","articles","conferences","mumbai","bengaluru"];
export function generateStaticParams() { return SLUGS.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return sitePageMetadata("/weresearch/" + slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RegistryPage path={"/weresearch/" + slug} />;
}
