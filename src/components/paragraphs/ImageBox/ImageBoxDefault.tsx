"use client";

import { Children } from "react";
import Image from "next/image";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import type { ImageBoxProps } from "./ImageBox";
import styles from "./ImageBoxDefault.module.scss";

export default function ImageBoxDefault({ paragraph, image, responsiveMedia, children }: ImageBoxProps) {
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

export function ImageBoxDefaultGroup({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);

  if (slides.length < 2) {
    return <div className={styles.group}>{slides}</div>;
  }

  return (
    <div className={styles.group}>
      <div className={styles.grid}>{slides}</div>
      <div className={styles.slider}>
        <Swiper
          modules={[Pagination, A11y]}
          slidesPerView={1.15}
          spaceBetween={16}
          pagination={{ clickable: true }}
          watchOverflow>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
