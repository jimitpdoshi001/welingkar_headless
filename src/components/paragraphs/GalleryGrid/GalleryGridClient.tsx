"use client";
import type { DrupalImage, GalleryGridAttributes, JsonApiResource } from "@/lib/drupal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./GalleryGrid.module.scss";
import clsx from "clsx";
import { useIsMobile } from "@/util/useMediaQuery";
import { getAnimationClass } from "@/components/animations/registry";


/** Campus tab: its own gallery and a "Life at …" button. */
export type GalleryTab = { id: string; label: string; images: DrupalImage[]; cta: { label: string; href: string } };

type GalleryGridProps = {
  paragraph: JsonApiResource<"paragraph--gallery_grid", GalleryGridAttributes>;
  images?: DrupalImage[];
  /** When set, campus tabs replace the single gallery and the Drupal button. */
  tabs?: GalleryTab[];
  children?: React.ReactNode;
};

export function GalleryGridClient({ paragraph, images = [], tabs, children }: GalleryGridProps) {
  const heading = paragraph.attributes.field_header || null;
  const [active, setActive] = useState(0);
  const tab = tabs?.[active];
  const galleryImages = tab ? tab.images : images;
  // Tabs mode: the active campus button; otherwise the Drupal button (children).
  const action = tab ? (
    <Link href={tab.cta.href} className="btn primary">
      {tab.cta.label}
    </Link>
  ) : (
    children
  );

  const isMobile = useIsMobile();

  const animationClass = getAnimationClass(paragraph?.attributes?.field_animation || "");


  const campusTabs =
    tabs && tabs.length > 1 ? (
      <div className={styles.tabs} role="tablist" aria-label="Campus">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={clsx(styles.tab, i === active && styles.tabActive)}
            onClick={() => setActive(i)}>
            {t.label}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <>
      <div className={clsx(styles.content, "mb-6")}>
        {heading ? <h3>{heading}</h3> : null}

        {/* Tabs mode: campus tabs, then the "Life at …" button, on the heading row. */}
        {tabs ? (
          <div className={styles.headerActions}>
            {campusTabs}
            {action}
          </div>
        ) : (
          !isMobile && action && <div className={styles.secButton}>{action}</div>
        )}
      </div>

      {galleryImages.length >= 6 && !isMobile && (
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

      {galleryImages.length >= 4 && isMobile && (
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

      {!tabs && isMobile && action && <div className={clsx(styles.secButton, "mt-4 text-center")}>{action}</div>}
    </>
  );
}
