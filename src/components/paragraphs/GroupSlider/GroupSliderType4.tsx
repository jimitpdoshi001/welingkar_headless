"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import { ContentField } from "../ContentField/ContentField";
import { getGroupSliderConfig, type GroupSliderProps } from "./group-slider-config";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./GroupSliderType4.module.scss";

export default function GroupSliderType4({ paragraph, items = [] }: GroupSliderProps) {
  const { showArrows, showPaginations, autoplay } = getGroupSliderConfig(paragraph);

  if (items.length === 0) return null;

  return (
    <div className={styles.root}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1.2}
        spaceBetween={16}
        watchOverflow
        autoplay={autoplay}
        pagination={showPaginations ? { clickable: true, el: `.${styles.pagination}` } : false}
        navigation={showArrows ? { prevEl: `.${styles.prev}`, nextEl: `.${styles.next}` } : false}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className={styles.swiper}>
        {items.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <ContentField paragraph={item.paragraph} responsiveMedia={item.media} />
          </SwiperSlide>
        ))}
      </Swiper>

      {showArrows ? (
        <>
          <button type="button" className={`${styles.arrow} ${styles.prev}`} aria-label="Previous">
            <ArrowLeft height={7} width={9} />
          </button>
          <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next">
            <ArrowRight height={7} width={9} />
          </button>
        </>
      ) : null}

      {showPaginations ? <div className={styles.pagination} /> : null}
    </div>
  );
}
