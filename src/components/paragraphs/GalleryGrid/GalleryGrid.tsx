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

// Mumbai photos supplied for this section (1000x667), one per desktop grid slot.
const MUMBAI_IMAGES: DrupalImage[] = [
  // Tall first slot: keep the two students (right side of the photo) in frame.
  { alt: "Students talking by the Create Collaborate Innovate wall", position: "78% center" },
  { alt: "Students sharing tea in the canteen" },
  { alt: "Students laughing together on the campus steps" },
  { alt: "Students reading in the library" },
  { alt: "Students working on a project in the innovation lab" },
  { alt: "Two students sharing a handshake by the WeSchool sign" },
].map((img, i) => ({ ...img, url: `/home/moments/mumbai-${i + 1}.webp`, width: 1000, height: 667 }));

// Bengaluru photos supplied for this section (1000x750): slots 1-5; Drupal's 6th image keeps the last slot.
const BENGALURU_IMAGES: DrupalImage[] = [
  // Tall first slot: keep the reading students (left of centre) in frame.
  { alt: "Students reading in the library", position: "40% center" },
  { alt: "Students celebrating outside the Bengaluru campus" },
  { alt: "Students in a classroom session with laptops" },
  { alt: "Three students talking in the campus courtyard" },
  { alt: "Students presenting a project model" },
].map((img, i) => ({ ...img, url: `/home/moments/bengaluru-${i + 1}.webp`, width: 1000, height: 750 }));

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
    { id: "bengaluru", label: "Bengaluru", images: [...BENGALURU_IMAGES, ...bengaluru.slice(BENGALURU_IMAGES.length)], cta: { label: "Life at Bengaluru", href: "/life-at-weschool/bengaluru" } },
  ].filter((t) => t.images.length > 0);

  return <GalleryGridClient paragraph={paragraph} images={images} tabs={tabs} />;
}
