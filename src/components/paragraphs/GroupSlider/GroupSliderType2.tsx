"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight, ArrowRight2 } from "@/assets/svg/Arrows";
import { getGroupSliderConfig, type GroupSliderProps } from "./group-slider-config";
import { ResponsiveMedia } from "@/components/paragraphs/ResponsiveMedia/ResponsiveMedia";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./GroupSliderType2.module.scss";
import Link from "next/link";

export default function GroupSliderType2({ paragraph, items = [] }: GroupSliderProps) {
  const { showArrows, showPaginations, autoplay } = getGroupSliderConfig(paragraph);

  if (items.length === 0) return null;

  return (
    <div className={styles.root}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={2.5}
        spaceBetween={30}
        watchOverflow
        autoplay={autoplay}
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
                {item.subtitle ? <p className="bold mb-1">{item.subtitle}</p> : null}
                {item.shortText1 ? <p className="italic mb-3">{item.shortText1}</p> : null}
                {item.description ? (
                  <div className="mb-2">
                    <SafeHtml
                      className="semibold"
                      html={item.description}
                    />
                  </div>
                ) : null}

                {item.shortText2 ? <p className="bold big">{item.shortText2}</p> : null}
                {item.field_url ? (
                  <Link
                    className="btn link"
                    href={item.field_url.uri}>
                    {item.field_url.title}
                    <ArrowRight2
                      height={12}
                      width={13}
                    />
                  </Link>
                ) : null}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

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

      {showPaginations ? <div className={styles.pagination} /> : null}
    </div>
  );
}
