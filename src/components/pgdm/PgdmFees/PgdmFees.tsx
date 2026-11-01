"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { PgdmFees as PgdmFeesData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmFees.module.scss";

export function PgdmFees({ data }: { data: PgdmFeesData }) {
  // Direct handle so the arrows control the fee-card slides reliably.
  const swiperRef = useRef<SwiperClass | null>(null);
  // Mobile: Waiver / Eligibility become tabs (Figma mobile); desktop shows both.
  const [listTab, setListTab] = useState(0);
  const blocks = [data.waiver, data.eligibility].filter(
    (b) => b.bullets.length > 0,
  );

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>

      {/* Sub heading and the carousel arrows share one row. */}
      <div className={styles.subRow}>
        <p className={styles.description}>{data.description}</p>
        {data.cards.length > 0 ? (
          <div className={styles.navBtns}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
            >
              <ArrowLeft height={10} width={7} />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
            >
              <ArrowRight height={10} width={7} />
            </button>
          </div>
        ) : null}
      </div>

      {data.cards.length > 0 ? (
        <Swiper
          className={styles.feesSwiper}
          slidesPerView={1.25}
          spaceBetween={24}
          grabCursor
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
        >
          {data.cards.map((card) => (
            <SwiperSlide key={card.label}>
              <article className={styles.card}>
                <img src={card.image} alt="" className={styles.cardImage} />
                <div className={styles.cardOverlay}>
                  <h3 className={styles.cardLabel}>{card.label}</h3>
                  <p className={styles.cardValue}>{card.value}</p>
                  {card.note ? (
                    <p className={styles.cardNote}>{card.note}</p>
                  ) : null}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}

      {blocks.length > 1 ? (
        <div className={styles.listTabs} role="tablist">
          {blocks.map((block, bi) => (
            <button
              key={block.heading}
              type="button"
              role="tab"
              aria-selected={bi === listTab}
              className={`${styles.listTab} ${bi === listTab ? styles.listTabActive : ""}`}
              onClick={() => setListTab(bi)}
            >
              {block.heading}
            </button>
          ))}
        </div>
      ) : null}

      <div
        className={`${styles.lists} ${blocks.length === 1 ? styles.listsSingle : ""}`}
      >
        {blocks.map((block, bi) => (
          <div
            key={block.heading}
            className={`${styles.listBlock} ${bi === listTab ? "" : styles.listBlockHidden}`}
          >
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
