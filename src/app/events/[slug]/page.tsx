import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetail } from "@/components/events/EventDetail";
import { getEventBySlug, getEvents } from "@/lib/drupal/events";

// ISR, same window as the Drupal fetches; events added later render on first request.
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

/** Plain-text excerpt of the description for the meta description. */
function excerpt(html: string): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug);
  if (!event) return { title: "Event not found" };
  const description = excerpt(event.descriptionHtml) || `${event.title}, ${event.date}`;
  return {
    title: `${event.title} | Events`,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: { title: event.title, description, images: event.image ? [{ url: event.image, alt: event.imageAlt }] : undefined },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const event = await getEventBySlug((await params).slug);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
