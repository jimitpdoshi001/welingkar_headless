import type { Metadata } from "next";
import { MediaGridPage } from "@/components/medialist/MediaGridPage";
import { MEDIA_PAGE } from "@/lib/medialist/media-data";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/media");

export default function Page() {
  return <MediaGridPage data={MEDIA_PAGE} />;
}
