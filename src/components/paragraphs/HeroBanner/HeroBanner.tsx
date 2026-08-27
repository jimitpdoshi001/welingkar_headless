"use client";

import { Children, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { A11y, Thumbs, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import type { DrupalResponsiveMedia, HeroBannerAttributes, JsonApiResource } from "@/lib/drupal";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import styles from "./HeroBanner.module.scss";

import { ArrowRight } from "@/assets/svg/Arrows";

type HeroBannerProps = {
  paragraph: JsonApiResource<"paragraph--hero_banner", HeroBannerAttributes>;
  responsiveMedia?: DrupalResponsiveMedia | null;
  children?: React.ReactNode;
};

export type HeroBannerThumb = {
  id: string;
  heading: string;
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  } | null;
};

type HeroBannerGroupProps = {
  thumbs: HeroBannerThumb[];
  children: React.ReactNode;
};

export function HeroBanner({ responsiveMedia, children }: HeroBannerProps) {
  return (
    <article className={styles.hero}>
      {responsiveMedia && (
        <ResponsiveMedia
          media={responsiveMedia}
          fill
          className={styles.background}
        />
      )}
      <div className={styles.content}>{children}</div>
    </article>
  );
}

export function HeroBannerGroup({ thumbs, children }: HeroBannerGroupProps) {
  const slides = Children.toArray(children);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  if (slides.length < 2) {
    return <>{slides}</>;
  }

  const progress = ((activeIndex + 1) / slides.length) * 100;

  const handleNextSlide = () => {
    mainSwiper?.slideNext();
  };

  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Thumbs, A11y, Autoplay]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={setMainSwiper}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className={styles.mainSwiper}
        allowTouchMove>
        {slides.map((slide, index) => (
          <SwiperSlide key={thumbs[index]?.id ?? index}>{slide}</SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.thumbsWrap}>
        <Swiper
          modules={[Thumbs, A11y, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView="auto"
          loop={true}
          spaceBetween={16}
          className={styles.thumbsSwiper}>
          {thumbs.map((thumb, index) => (
            <SwiperSlide
              key={thumb.id}
              className={styles.thumbSlide}>
              <button
                type="button"
                className={clsx(styles.thumb, index === activeIndex && styles.thumbActive)}
                onClick={() => mainSwiper?.slideTo(index)}
                aria-label={thumb.heading || `Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}>
                {thumb.image && (
                  <Image
                    src={thumb.image.url}
                    alt={thumb.image.alt || thumb.heading}
                    width={thumb.image.width ?? 320}
                    height={thumb.image.height ?? 180}
                    className={styles.thumbImage}
                  />
                )}

                {thumb.heading ? <span className={styles.thumbTitle}>{thumb.heading}</span> : null}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.thumbControls}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <button
            type="button"
            className={styles.nextButton}
            onClick={handleNextSlide}
            aria-label="Next thumbnail">
            <span aria-hidden="true">
              <ArrowRight
                height={10}
                width={13}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
