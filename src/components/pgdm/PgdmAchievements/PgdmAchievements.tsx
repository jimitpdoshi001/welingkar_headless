"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import clsx from "clsx";

import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { PgdmAchievements as PgdmAchievementsData } from "@/lib/pgdm/pgdm-data";
import { useHasMounted } from "@/util/useMediaQuery";
import styles from "./PgdmAchievements.module.scss";

export function PgdmAchievements({ data }: { data: PgdmAchievementsData }) {
  const mounted = useHasMounted();
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperInstance?.navigation) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, mounted]);

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={styles.description}>{data.description}</p>
        </div>
        <div className={styles.navBtns}>
          <button
            ref={prevRef}
            type="button"
            className={clsx(styles.arrowBtn, styles.outline)}
            aria-label="Previous">
            <ArrowLeft
              height={10}
              width={7}
            />
          </button>
          <button
            ref={nextRef}
            type="button"
            className={clsx(styles.arrowBtn, styles.filled)}
            aria-label="Next">
            <ArrowRight
              height={10}
              width={7}
            />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={24}
        // Figma: the next achievement peeks in from the right on desktop.
        breakpoints={{ 1024: { slidesPerView: 1.12, spaceBetween: 50 } }}
        grabCursor
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSwiper={setSwiperInstance}>
        {data.items.map((item) => (
          <SwiperSlide key={item.id}>
            <article className={styles.card}>
              <div className={styles.imageWrap}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.position}>{item.position}</p>
                <ul className={styles.bullets}>
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <p className={styles.teamLabel}>Team members</p>
                <p className={styles.team}>{item.team}</p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PgdmAchievements;
