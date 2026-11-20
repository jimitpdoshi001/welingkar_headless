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

// Mumbai photos supplied for this section (1000x667). The desktop grid needs 6
// images, so these fill slots 1-5 and Drupal's 6th image stays in the last slot.
const MUMBAI_IMAGES: DrupalImage[] = [
  // Tall first slot: keep the two students (right side of the photo) in frame.
  { alt: "Students talking by the Create Collaborate Innovate wall", position: "78% center" },
  { alt: "Students sharing tea in the canteen" },
  { alt: "Students laughing together on the campus steps" },
  { alt: "Students reading in the library" },
  { alt: "Students working on a project in the innovation lab" },
].map((img, i) => ({ ...img, url: `/home/moments/mumbai-${i + 1}.webp`, width: 1000, height: 667 }));

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
    { id: "mumbai", label: "Mumbai", images: [...MUMBAI_IMAGES, ...images.slice(MUMBAI_IMAGES.length)], cta: { label: "Life at Mumbai", href: "/life-at-weschool" } },
    { id: "bengaluru", label: "Bengaluru", images: bengaluru, cta: { label: "Life at Bengaluru", href: "/life-at-weschool/bengaluru" } },
  ].filter((t) => t.images.length > 0);

  return <GalleryGridClient paragraph={paragraph} images={images} tabs={tabs} />;
}
