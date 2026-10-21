"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./MdcTestimonials.module.scss";

type Item = { id: string; text: string; name: string; role: string };

// Heading on the left, testimonial carousel on the right with arrows below-right.
export function MdcTestimonials({ heading, items }: { heading: string; items: Item[] }) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className={styles.layout}>
      {/* Each word on its own line (Figma): "What / Participants / Say". */}
      <h2 className={styles.heading}>
        {heading.split("<br>").map((word, i, arr) => (
          <span key={i}>
            {word}
            {i < arr.length - 1 ? <br /> : null}
          </span>
        ))}
      </h2>

      <div className={styles.right}>
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous">
            <ArrowLeft
              height={10}
              width={7}
            />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next">
            <ArrowRight
              height={10}
              width={7}
            />
          </button>
        </div>
        
        <Swiper
          slidesPerView={1.05}
          spaceBetween={24}
          grabCursor
          breakpoints={{ 768: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2.4 } }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}>
          {items.map((t) => (
            <SwiperSlide key={t.id}>
              <article className={styles.card}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.text}>{t.text}</p>
                <p className={styles.name}>{t.name}</p>
                <p className={styles.role}>{t.role}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}

export default MdcTestimonials;
