"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./SectionCarousel.module.scss";

type Props = { images: string[]; alt: string; className?: string };

/** Section photo slider (live site carousel): autoplay, arrows and dots over the photo. */
export function SectionCarousel({ images, alt, className = "" }: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [index, setIndex] = useState(0);

  return (
    <div className={`${styles.wrap} ${className}`}>
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        onSlideChange={(s) => setIndex(s.realIndex)}
        className={styles.swiper}>
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <img
              src={src}
              alt={`${alt} ${i + 1} of ${images.length}`}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Previous photo"
          onClick={() => swiperRef.current?.slidePrev()}>
          <ArrowLeft width={7} height={10} />
        </button>
        <div className={styles.dots}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Next photo"
          onClick={() => swiperRef.current?.slideNext()}>
          <ArrowRight width={7} height={10} />
        </button>
      </div>
    </div>
  );
}

export default SectionCarousel;
