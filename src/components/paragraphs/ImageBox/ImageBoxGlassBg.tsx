"use client";

import { Children } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import type { ImageBoxProps } from "./ImageBox";
import styles from "./ImageBoxGlassBg.module.scss";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";

export default function ImageBoxGlassBg({ paragraph, image, responsiveMedia, children }: ImageBoxProps) {
  const heading = paragraph.attributes.field_header || null;
  const description =
    paragraph.attributes.field_description?.processed || null;

    const hasMedia = Boolean(responsiveMedia || image);

  return (
      <div className={styles.body}>
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
      <div className={styles.content}>
        {heading ? <h4 className="mb-2">{heading}</h4> : null}

        {description ? (
          <SafeHtml
            className={styles.description}
            html={description}
          />
        ) : null}
        {children}
        </div>
      </div>
  );
}

export function ImageBoxGlassBgGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const slides = Children.toArray(children);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className={styles.group}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={30}
        navigation={{
          prevEl: `.${styles.prev}`,
          nextEl: `.${styles.next}`,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className={styles.swiper}
        watchOverflow
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}

        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="Previous"
        >
          <ArrowLeft height={7} width={9} />
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          aria-label="Next"
        >
          <ArrowRight height={7} width={9} />
        </button>
      </Swiper>
    </div>
  );
}
