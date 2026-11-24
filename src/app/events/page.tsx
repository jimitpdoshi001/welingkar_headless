import type { Metadata } from "next";
import { MediaGridPage } from "@/components/medialist/MediaGridPage";
import { EventsGrid } from "@/components/medialist/EventsGrid";
import { getEvents } from "@/lib/drupal/events";
import { EVENTS_PAGE } from "@/lib/medialist/media-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/events");

// Same cache window as the Drupal fetches (fetchJsonApi revalidates every 300s).
export const revalidate = 300;

export default async function Page() {
  // Cards only: the description HTML stays on the server (detail page).
  const events = (await getEvents()).map(({ id, slug, title, date, year, city, image, imageAlt }) => ({ id, slug, title, date, year, city, image, imageAlt }));
  return (
    <MediaGridPage
      data={EVENTS_PAGE}
      body={<EventsGrid events={events} />}
    />
  );
}
