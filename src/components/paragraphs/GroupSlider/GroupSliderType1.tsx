"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import { getGroupSliderConfig, type GroupSliderProps } from "./group-slider-config";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./GroupSliderType1.module.scss";

export default function GroupSliderType1({ paragraph, items = [] }: GroupSliderProps) {
  const { showArrows, showPaginations, autoplay } = getGroupSliderConfig(paragraph);

  if (items.length === 0) return null;

  return (
    <div className={styles.root}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1.3}
        spaceBetween={40}
        watchOverflow
        autoplay={autoplay}
        loop={true}
        pagination={showPaginations ? { clickable: true, el: `.${styles.pagination}` } : false}
        navigation={showArrows ? { prevEl: `.${styles.prev}`, nextEl: `.${styles.next}` } : false}
        className={styles.swiper}>
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className={styles.slide}>
            <article className={styles.card}>
              {item.media?.desktop || item.media?.mobile ? (
                <div className={styles.media}>
                  <ResponsiveMedia
                    media={item.media}
                    fill
                    className={styles.mediaFill}
                  />
                </div>
              ) : null}

              <div className={styles.content}>
                {item.title ? <h4 className="bold mb-2">{item.title}</h4> : null}
                {item.subtitle ? <h4 className="bold mb-2">{item.subtitle}</h4> : null}
                {item.description ? (
                  <div className="mb-2">
                    <SafeHtml html={item.description} />
                  </div>
                ) : null}
                {item.shortText1 ? <p className="bold mb-1">{item.shortText1}</p> : null}
                {item.shortText2 ? <p className="bold big">{item.shortText2}</p> : null}
              </div>
            </article>
          </SwiperSlide>
        ))}

        {showArrows ? (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.prev}`}
              aria-label="Previous">
              <ArrowLeft
                height={7}
                width={9}
              />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.next}`}
              aria-label="Next">
              <ArrowRight
                height={7}
                width={9}
              />
            </button>
          </>
        ) : null}
      </Swiper>

      {showPaginations ? <div className={styles.pagination} /> : null}
    </div>
  );
}
