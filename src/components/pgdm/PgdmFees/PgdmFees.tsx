"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { PgdmFees as PgdmFeesData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmFees.module.scss";

export function PgdmFees({ data }: { data: PgdmFeesData }) {
  // Direct handle so the arrows control the fee-card slides reliably.
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>

      {/* Sub heading and the carousel arrows share one row. */}
      <div className={styles.subRow}>
        <p className={styles.description}>{data.description}</p>
        <div className={styles.navBtns}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous">
            <ArrowLeft
              height={10}
              width={7}
            />
          </button>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next">
            <ArrowRight
              height={10}
              width={7}
            />
          </button>
        </div>
      </div>

      <Swiper
        className={styles.feesSwiper}
        slidesPerView={1.1}
        spaceBetween={24}
        grabCursor
        breakpoints={{ 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } }}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}>
        {data.cards.map((card) => (
          <SwiperSlide key={card.label}>
            <article className={styles.card}>
              <img
                src={card.image}
                alt=""
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardLabel}>{card.label}</h3>
                <p className={styles.cardValue}>{card.value}</p>
                {card.note ? <p className={styles.cardNote}>{card.note}</p> : null}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.lists}>
        {[data.waiver, data.eligibility].map((block) => (
          <div
            key={block.heading}
            className={styles.listBlock}>
            <h3 className={styles.listHeading}>{block.heading}</h3>
            <ul className={styles.bullets}>
              {block.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PgdmFees;
