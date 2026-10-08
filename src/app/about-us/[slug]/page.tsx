import type { Metadata } from "next";
import { RegistryPage } from "@/components/shell/RegistryPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

const SLUGS = ["spm","managing-council","chairman-message","directors-message","academic-advisory-board","industry-advisory-board","awards","vision-mission"];
export function generateStaticParams() { return SLUGS.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return sitePageMetadata("/about-us/" + slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RegistryPage path={"/about-us/" + slug} />;
}
