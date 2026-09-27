"use client";

import { Children } from "react";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import Image from "next/image";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import type { ImageBoxProps } from "./ImageBox";
import styles from "./ImageBoxDefault.module.scss";

export default function ImageBoxDefault({ paragraph, image, responsiveMedia, children }: ImageBoxProps) {
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;
  const hasMedia = Boolean(responsiveMedia || image);

  return (
    <article className={`${styles.imageBox}`}>
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
        <div className={`${styles.body}`}>
          {heading ? <h1 className={styles.heading}>{heading}</h1> : null}

          {description ? (
            <SafeHtml
              className={styles.description}
              html={description}
            />
          ) : null}

          {children}
        </div>
      )}
    </article>
  );
}

export function ImageBoxDefaultGroup({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);

  return <div className={`${styles.grid} animate-stagger`}>{slides}</div>;
}
