import type { Metadata } from "next";
import { MediaGridPage } from "@/components/medialist/MediaGridPage";
import { EVENTS_PAGE } from "@/lib/medialist/media-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/events");

export default function Page() {
  return <MediaGridPage data={EVENTS_PAGE} />;
}
