import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";
import { sitePageMetadata } from "@/lib/pages/page-metadata";
import { getTestimonials } from "@/lib/drupal/pages/testimonials";

export const metadata: Metadata = sitePageMetadata("/testimonial");

export default async function Page() {
  return <TestimonialsPage {...await getTestimonials()} />;
}
