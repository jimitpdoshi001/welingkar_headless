"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import arrowStyles from "../ScrollArrows/ScrollArrows.module.scss";
import styles from "./RecruiterLogos.module.scss";

type Logo = { name: string; image: string };

type RecruiterLogosProps = {
  logos: Logo[];
  /** Heading + description; rendered in a row with the prev/next arrows. */
  header: React.ReactNode;
  headClassName: string;
};

// Continuous marquee: no pause between slides, long linear transition (see scss),
// so the row glides instead of stepping. Hover pauses; arrows still step.
const AUTOPLAY = { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true };
const SPEED = 3000;

export function RecruiterLogos({ logos, header, headClassName }: RecruiterLogosProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  // Loop needs more slides than are visible (6), so the set is repeated.
  const slides = logos.length > 0 ? [...logos, ...logos] : [];

  const arrows = (
    <div className={arrowStyles.arrows}>
      <button
        type="button"
        className={arrowStyles.prev}
        onClick={() => swiperRef.current?.slidePrev(500)}
        aria-label="Previous recruiter">
        <ArrowLeft
          height={10}
          width={7}
        />
      </button>
      <button
        type="button"
        className={arrowStyles.next}
        onClick={() => swiperRef.current?.slideNext(500)}
        aria-label="Next recruiter">
        <ArrowRight
          height={10}
          width={7}
        />
      </button>
    </div>
  );

  return (
    <>
      <div className={headClassName}>
        {header}
        {arrows}
      </div>
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={AUTOPLAY}
        speed={SPEED}
        loop
        allowTouchMove={false}
        slidesPerView={2.5}
        spaceBetween={24}
        breakpoints={{ 576: { slidesPerView: 3.5 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6, spaceBetween: 40 } }}
        className={styles.swiper}>
        {slides.map((logo, i) => (
          <SwiperSlide
            key={`${logo.name}-${i}`}
            className={styles.slide}>
            <img
              src={logo.image}
              alt={i < logos.length ? logo.name : ""}
              className={styles.logo}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
