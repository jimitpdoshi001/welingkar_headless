import type { Metadata } from "next";
import { AccreditationPage } from "@/components/accreditation/AccreditationPage";
import { canonical } from "@/lib/seo/public-paths";

export const metadata: Metadata = {
  ...canonical("/accreditation/mumbai"),
  title: "Accreditations - Mumbai | WeSchool",
  description: "Approvals and accreditations of WeSchool Mumbai.",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ section?: string | string[] }> }) {
  const { section } = await searchParams;
  return <AccreditationPage campus="mumbai" section={typeof section === "string" ? section : undefined} />;
}
