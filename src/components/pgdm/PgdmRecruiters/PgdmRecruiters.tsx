"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import type { PgdmRecruiters as PgdmRecruitersData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmRecruiters.module.scss";

// Continuous marquee (same behaviour as the campus recruiter logos): no pause
// between slides and a long linear transition, so the row glides. Hover pauses.
const AUTOPLAY = { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true };
// Milliseconds per logo; higher is slower.
const SPEED = 6000;

// Heading, logo slider in the white card, then the description as a small
// disclaimer under the logos.
export function PgdmRecruiters({ data }: { data: PgdmRecruitersData }) {
  // Loop needs more slides than are visible, so the set is repeated.
  const slides = data.logos.length > 0 ? [...data.logos, ...data.logos, ...data.logos] : [];

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>

      {slides.length > 0 ? (
        <div className={styles.strip}>
          <Swiper
            modules={[Autoplay]}
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
                className={`${styles.logo} ${logo.padded ? styles.logoPadded : ""}`}>
                <img
                  src={logo.image}
                  alt={i < data.logos.length ? logo.name : ""}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}

      {data.description ? <p className={styles.disclaimer}>{data.description}</p> : null}
    </div>
  );
}

export default PgdmRecruiters;
