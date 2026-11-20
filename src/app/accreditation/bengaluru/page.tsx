import type { Metadata } from "next";
import { AccreditationPage } from "@/components/accreditation/AccreditationPage";
import { canonical } from "@/lib/seo/public-paths";

export const metadata: Metadata = {
  ...canonical("/accreditation/bengaluru"),
  title: "Accreditations - Bengaluru | WeSchool",
  description: "Approvals and accreditations of WeSchool Bengaluru.",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ section?: string | string[] }> }) {
  const { section } = await searchParams;
  return <AccreditationPage campus="bengaluru" section={typeof section === "string" ? section : undefined} />;
}
