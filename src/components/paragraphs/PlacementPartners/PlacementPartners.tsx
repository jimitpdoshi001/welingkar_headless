"use client";

import type { DrupalImage, JsonApiResource, PlacementPartnersAttributes } from "@/lib/drupal";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import Image from "next/image";

import styles from "./PlacementPartners.module.scss";
import { overridePlacementHeading, overridePlacementDescription } from "@/lib/content-overrides";

/** One marquee list: logos repeated until at least 12, so it is wider than the screen. */
const loopList = (images: DrupalImage[]) =>
  Array.from({ length: Math.ceil(12 / images.length) }, () => images).flat();

type PlacementPartnersProps = {
  paragraph: JsonApiResource<"paragraph--placement_partners", PlacementPartnersAttributes>;
  images?: DrupalImage[];
  children?: React.ReactNode;
};

export function PlacementPartners({ paragraph, images = [], children }: PlacementPartnersProps) {
  const heading = overridePlacementHeading(paragraph.attributes.field_header);
  const description = overridePlacementDescription(paragraph.attributes.field_description?.processed);
  return (
    <div className={styles.root}>
      {(heading || description) && (
        <div className={styles.intro}>
          {heading ? <h3 className="mb-2">{heading}</h3> : null}

          {description ? (
            <SafeHtml
              className="mb-4"
              html={description}
            />
          ) : null}
        </div>
      )}

      {images.length > 0 && (
        // Continuous marquee: the logo list is rendered twice and the track
        // moves left by one list width, so the loop is seamless. CSS pauses it
        // only while a logo itself is hovered.
        <div className={styles.marquee}>
          <ul
            className={styles.track}
            style={{ ["--marquee-duration" as string]: `${Math.max(20, images.length * 3)}s` }}>
            {[...loopList(images), ...loopList(images)].map((image, i) => (
              <li
                key={`${image.url}-${i}`}
                className={styles.logo}
                aria-hidden={i >= images.length ? true : undefined}>
                <Image
                  src={image.url}
                  alt={i >= images.length ? "" : image.alt}
                  width={image.width ?? 160}
                  height={image.height ?? 80}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {children}
    </div>
  );
}
