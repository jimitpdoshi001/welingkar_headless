"use client";

import { Children, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import arrowStyles from "@/components/campus/ScrollArrows/ScrollArrows.module.scss";
import styles from "./LifeCarousel.module.scss";

type LifeCarouselProps = {
  /** Heading + subtitle, shown in a row with the prev/next arrows. */
  header: React.ReactNode;
  /** Fixed slide width class (Figma card width); slides use `slidesPerView: "auto"`. */
  slideClassName: string;
  label: string;
  children: React.ReactNode;
};

/** Card row with prev/next arrows (Figma "Up" icons) beside the section heading. */
export function LifeCarousel({ header, slideClassName, label, children }: LifeCarouselProps) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <>
      <div className={styles.head}>
        {header}
        <div className={arrowStyles.arrows}>
          <button
            type="button"
            className={arrowStyles.prev}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={`Previous ${label}`}>
            <ArrowLeft
              height={10}
              width={7}
            />
          </button>
          <button
            type="button"
            className={arrowStyles.next}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={`Next ${label}`}>
            <ArrowRight
              height={10}
              width={7}
            />
          </button>
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView="auto"
        spaceBetween={20}
        className={styles.swiper}>
        {Children.toArray(children).map((child, i) => (
          <SwiperSlide
            key={i}
            className={slideClassName}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
