"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { PgdmFees as PgdmFeesData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmFees.module.scss";
import { useSwiperLock } from "@/util/useSwiperLock";

export function PgdmFees({ data }: { data: PgdmFeesData }) {
  // Direct handle so the arrows control the fee-card slides reliably.
  const swiperRef = useRef<SwiperClass | null>(null);
  // Arrows only when there are more cards than fit.
  const { locked, lockEvents } = useSwiperLock();
  // Desktop: waiver list left; Admissions and Education loan stacked right.
  // Mobile: every panel becomes an underline tab (one shown at a time).
  const [listTab, setListTab] = useState(0);
  const panels: { id: string; heading: string; body: React.ReactNode; right: boolean }[] = [];
  if (data.waiver.bullets.length > 0) {
    panels.push({
      id: "waiver",
      heading: data.waiver.heading,
      right: false,
      body: (
        <ul className={styles.bullets}>
          {data.waiver.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      ),
    });
  }
  if (data.admissions && data.admissions.paragraphs.length > 0) {
    panels.push({
      id: "admissions",
      heading: data.admissions.heading,
      right: true,
      body: data.admissions.paragraphs.map((p, i) => (
        <p key={i} className={styles.panelText}>
          {p}
        </p>
      )),
    });
  }
  if (data.loan && (data.loan.paragraphs.length > 0 || data.loan.partners.length > 0)) {
    panels.push({
      id: "loan",
      heading: data.loan.heading,
      right: true,
      body: (
        <>
          {data.loan.paragraphs.map((p, i) => (
            <p key={i} className={styles.panelText}>
              {p}
            </p>
          ))}
          {data.loan.partners.map((partner) => (
            // Partner pill: logo, plus "Know More" when a link is set.
            <div key={partner.name} className={styles.partner}>
              <img src={partner.logo} alt={partner.name} className={styles.partnerLogo} />
              {partner.href ? (
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${styles.partnerBtn}`}>
                  {partner.label || "Know More"}
                </a>
              ) : null}
            </div>
          ))}
        </>
      ),
    });
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>

      {/* Sub heading and the carousel arrows share one row. */}
      <div className={styles.subRow}>
        <p className={styles.description}>{data.description}</p>
        {data.cards.length > 0 && !locked ? (
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
          {...lockEvents}
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

      {panels.length > 1 ? (
        <div className={styles.listTabs} role="tablist">
          {panels.map((panel, i) => (
            <button
              key={panel.id}
              type="button"
              role="tab"
              aria-selected={i === listTab}
              className={`${styles.listTab} ${i === listTab ? styles.listTabActive : ""}`}
              onClick={() => setListTab(i)}>
              {panel.heading}
            </button>
          ))}
        </div>
      ) : null}

      {panels.length > 0 ? (
        <div className={`${styles.lists} ${panels.every((p) => p.right) || panels.every((p) => !p.right) ? styles.listsSingle : ""}`}>
          {[false, true].map((right) => {
            const column = panels.filter((p) => p.right === right);
            if (!column.length) return null;
            return (
              <div key={String(right)} className={styles.column}>
                {column.map((panel) => (
                  <div
                    key={panel.id}
                    className={`${styles.listBlock} ${panels.indexOf(panel) === listTab ? "" : styles.listBlockHidden}`}>
                    <h3 className={styles.listHeading}>{panel.heading}</h3>
                    {panel.body}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default PgdmFees;
