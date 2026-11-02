"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { PgdmStudentInitiatives as PgdmStudentInitiativesData } from "@/lib/pgdm/pgdm-data";
import { useSwiperLock } from "@/util/useSwiperLock";
import styles from "./PgdmStudentInitiatives.module.scss";

// Student Initiatives: heading + intro, then one slide per initiative (photo
// left, title + text right) with prev/next arrows bottom-right.
export function PgdmStudentInitiatives({ data }: { data: PgdmStudentInitiativesData }) {
  const swiperRef = useRef<SwiperClass | null>(null);
  // Arrows hide when there is only one slide, and dim at the first/last slide.
  const { locked, atStart, atEnd, lockEvents } = useSwiperLock();

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      {data.description ? <p className={styles.description}>{data.description}</p> : null}

      <div className={styles.sliderWrap}>
        <Swiper
          {...lockEvents}
          slidesPerView={1}
          spaceBetween={24}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}>
          {data.items.map((item) => (
            <SwiperSlide key={item.id}>
              <article className={styles.slide}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.slideText}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.body}>{item.body}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {locked ? null : (
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.prev}
              data-slider-arrow
              disabled={atStart}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous initiative">
              <ArrowLeft width={7} height={10} />
            </button>
            <button
              type="button"
              className={styles.next}
              data-slider-arrow
              disabled={atEnd}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next initiative">
              <ArrowRight width={7} height={10} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PgdmStudentInitiatives;
