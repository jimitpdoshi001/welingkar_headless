"use client";

import type { DrupalImage, JsonApiResource, PlacementPartnersAttributes } from "@/lib/drupal";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import { LogoMarquee } from "@/components/LogoMarquee/LogoMarquee";

import styles from "./PlacementPartners.module.scss";
import { overridePlacementHeading, overridePlacementDescription } from "@/lib/content-overrides";

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
        // Scrolling logo carousel with arrows (shared with the MDP pages).
        <LogoMarquee logos={images.map((image) => ({ name: image.alt, image: image.url ?? "" }))} />
      )}

      {children}
    </div>
  );
}
