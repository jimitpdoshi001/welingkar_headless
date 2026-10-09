import type { Metadata } from "next";
import { LifePage } from "@/components/life/LifePage";
import { LIFE } from "@/lib/life/life-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/life-at-weschool");

export default function Page() {
  return <LifePage data={LIFE} />;
}
