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

// Photos supplied for this section, one per desktop grid slot, matched to slot
// shape: 2 is wide; 1 and 4 are tall; 3, 5 and 6 are near-square.
// `position` keeps the people in frame where the slot crops the photo.
const local = (file: string, alt: string, width: number, height: number, position?: string): DrupalImage => ({
  url: `/home/moments/${file}.webp`,
  alt,
  width,
  height,
  position,
});

const MUMBAI_IMAGES: DrupalImage[] = [
  local("mumbai-1", "Students talking by the Create Collaborate Innovate wall", 1000, 667, "78% center"),
  local("mumbai-6", "Two students sharing a handshake by the WeSchool sign", 1000, 667),
  local("mumbai-2", "Students sharing tea in the canteen", 1000, 667, "60% center"),
  local("mumbai-5", "Students working on a project in the innovation lab", 1000, 667, "48% center"),
  local("mumbai-3", "Students laughing together on the campus steps", 1000, 667),
  local("mumbai-4", "Students reading in the library", 1000, 667),
];

const BENGALURU_IMAGES: DrupalImage[] = [
  local("bengaluru-5", "Students presenting a project model", 1000, 750, "38% center"),
  local("bengaluru-2", "Students celebrating outside the Bengaluru campus", 1000, 750),
  local("bengaluru-4", "Three students talking in the campus courtyard", 1000, 750),
  local("bengaluru-6", "Students chatting by the staircase", 1600, 1200, "45% center"),
  local("bengaluru-1", "Students reading in the library", 1000, 750),
  local("bengaluru-3", "Students in a classroom session with laptops", 1000, 750),
];

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
