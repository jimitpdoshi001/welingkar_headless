import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/testimonial");

export default function Page() {
  return <TestimonialsPage />;
}
