import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/contact-us");

export default function Page() {
  return <ContactPage />;
}
