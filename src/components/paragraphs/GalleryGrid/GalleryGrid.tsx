"use client";
import type { DrupalImage, GalleryGridAttributes, JsonApiResource } from "@/lib/drupal";
import Image from "next/image";
import styles from "./GalleryGrid.module.scss";
import clsx from "clsx";
import { useIsMobile } from "@/util/useMediaQuery";
import { getAnimationClass } from "@/components/animations/registry";


type GalleryGridProps = {
  paragraph: JsonApiResource<"paragraph--gallery_grid", GalleryGridAttributes>;
  images?: DrupalImage[];
  children?: React.ReactNode;
};

export function GalleryGrid({ paragraph, images = [], children }: GalleryGridProps) {
  const heading = paragraph.attributes.field_header || null;
  const galleryImages = images;

  const isMobile = useIsMobile();

  const animationClass = getAnimationClass(paragraph?.attributes?.field_animation || "");


  return (
    <>
      <div className={clsx(styles.content, "mb-6")}>
        {heading ? <h3>{heading}</h3> : null}

        {!isMobile && children && <div className={styles.secButton}>{children}</div>}
      </div>

      {galleryImages.length > 0 && !isMobile && (
        <div className={clsx(styles.grid, animationClass)}>
          <div className={clsx(styles.item, styles.item1)}>
            <Image
              src={galleryImages[0].url ?? ""}
              alt={galleryImages[0].alt}
              width={galleryImages[0].width ?? 800}
              height={galleryImages[0].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
          <div className={clsx(styles.item, styles.item2)}>
            <Image
              src={galleryImages[1].url ?? ""}
              alt={galleryImages[1].alt}
              width={galleryImages[1].width ?? 800}
              height={galleryImages[1].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
          <div className={clsx(styles.item, styles.item3)}>
            <Image
              src={galleryImages[2].url ?? ""}
              alt={galleryImages[2].alt}
              width={galleryImages[2].width ?? 800}
              height={galleryImages[2].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
          <div className={clsx(styles.item, styles.item4)}>
            <Image
              src={galleryImages[3].url ?? ""}
              alt={galleryImages[3].alt}
              width={galleryImages[3].width ?? 800}
              height={galleryImages[3].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
          <div className={clsx(styles.item, styles.item5)}>
            <Image
              src={galleryImages[4].url ?? ""}
              alt={galleryImages[4].alt}
              width={galleryImages[4].width ?? 800}
              height={galleryImages[4].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
          <div className={clsx(styles.item, styles.item6)}>
            <Image
              src={galleryImages[5].url ?? ""}
              alt={galleryImages[5].alt}
              width={galleryImages[5].width ?? 800}
              height={galleryImages[5].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
          {/* {galleryImages.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className={styles.item}>
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width ?? 800}
                height={image.height ?? 600}
                className="img-fluid w-100"
              />
            </div>
          ))} */}
        </div>
      )}

      {galleryImages.length > 0 && isMobile && (
        <div className={styles.gridMobile}>
          <div className={clsx(styles.item, styles.item1)}>
            <Image
              src={galleryImages[0].url ?? ""}
              alt={galleryImages[0].alt}
              width={galleryImages[0].width ?? 800}
              height={galleryImages[0].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
          <div className="g gm2 mgap2">
            <div className={clsx(styles.item, styles.item2)}>
              <Image
                src={galleryImages[2].url ?? ""}
                alt={galleryImages[2].alt}
                width={galleryImages[2].width ?? 800}
                height={galleryImages[2].height ?? 600}
                className="img-fluid w-100"
              />
            </div>
            <div className={clsx(styles.item, styles.item3)}>
              <Image
                src={galleryImages[3].url ?? ""}
                alt={galleryImages[3].alt}
                width={galleryImages[3].width ?? 800}
                height={galleryImages[3].height ?? 600}
                className="img-fluid w-100"
              />
            </div>
          </div>
          <div className={clsx(styles.item, styles.item4)}>
            <Image
              src={galleryImages[1].url ?? ""}
              alt={galleryImages[1].alt}
              width={galleryImages[1].width ?? 800}
              height={galleryImages[1].height ?? 600}
              className="img-fluid w-100"
            />
          </div>
        </div>
      )}

      {isMobile && children && <div className={clsx(styles.secButton, "mt-4 text-center")}>{children}</div>}
    </>
  );
}
