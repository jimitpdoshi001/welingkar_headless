import type { DrupalImage, GalleryGridAttributes, JsonApiResource } from "@/lib/drupal";
import { getGalleryImages } from "@/lib/drupal/gallery";
import { GalleryGridClient, type GalleryTab } from "./GalleryGridClient";

type GalleryGridProps = {
  paragraph: JsonApiResource<"paragraph--gallery_grid", GalleryGridAttributes>;
  images?: DrupalImage[];
  children?: React.ReactNode;
};

// Home "Moments from the Campus": Mumbai = this paragraph's images; Bengaluru =
// the gallery on the Drupal "Campus Bengaluru" page (editors update it there).
const BENGALURU_GALLERY_ID = "e7482f09-2288-417e-90f6-e4ec1393ed7f";

export async function GalleryGrid({ paragraph, images = [], children }: GalleryGridProps) {
  const isMoments = /moments from the campus/i.test(paragraph.attributes.field_header ?? "");
  if (!isMoments) {
    return (
      <GalleryGridClient paragraph={paragraph} images={images}>
        {children}
      </GalleryGridClient>
    );
  }

  const bengaluru = await getGalleryImages(BENGALURU_GALLERY_ID);
  const tabs: GalleryTab[] = [
    { id: "mumbai", label: "Mumbai", images, cta: { label: "Life at Mumbai", href: "/life-at-weschool" } },
    { id: "bengaluru", label: "Bengaluru", images: bengaluru, cta: { label: "Life at Bengaluru", href: "/life-at-weschool/bengaluru" } },
  ].filter((t) => t.images.length > 0);

  return <GalleryGridClient paragraph={paragraph} images={images} tabs={tabs} />;
}
