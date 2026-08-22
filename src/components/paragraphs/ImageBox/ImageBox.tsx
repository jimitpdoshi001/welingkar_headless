import type { DrupalImage, DrupalResponsiveMedia, ImageBoxAttributes, JsonApiResource } from "@/lib/drupal";
import Image from "next/image";
import styles from "./ImageBox.module.scss";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";

type ImageBoxProps = {
  paragraph: JsonApiResource<"paragraph--image_box", ImageBoxAttributes>;
  image?: DrupalImage | null;
  responsiveMedia?: DrupalResponsiveMedia | null;
  children: React.ReactNode;
};

export function ImageBox({ paragraph, image, responsiveMedia, children }: ImageBoxProps) {
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;
  const hasMedia = Boolean(responsiveMedia || image);

  return (
    <article className={styles.imageBox}>
      {hasMedia && (
        <div className={styles.media}>
          {responsiveMedia && (
            <ResponsiveMedia
              media={responsiveMedia}
              fill
              className={styles.mediaFill}
            />
          )}
          {image && !responsiveMedia && (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className={styles.mediaFill}
              sizes="(max-width: 767px) 85vw, 33vw"
            />
          )}
        </div>
      )}
      {(heading || description || children) && (
        <div className={styles.body}>
          {heading ? <h1 className={styles.heading}>{heading}</h1> : null}
          {description ? (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
          {children}
        </div>
      )}
    </article>
  );
}
