"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import type { NewsItem } from "@/lib/drupal/news";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./NewsItems.module.scss";

type NewsItemsSwiperProps = {
  items: NewsItem[];
};

export function NewsItemsSwiper({ items }: NewsItemsSwiperProps) {
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, mounted]);

  if (!items || items.length === 0) return null;

  if (!mounted) {
    return (
      <div className={styles.swiperWrapper}>
        <div className={styles.flatGrid}>
          {items.slice(0, 3).map((item) => (
            <article key={item.id} className={`${styles.card} ${styles.swiperCard}`}>
              {item.image && (
                <div className={styles.cardImageContainer}>
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    className={styles.cardImage}
                  />
                </div>
              )}
              <div className={styles.swiperCardBody}>
                <h6 className={styles.cardTitle}>{item.title}</h6>
                {item.description && (
                  <p className={styles.cardExcerpt}>{item.description}</p>
                )}
                <div className={styles.cardFooter}>
                  <span className={styles.date}>{item.date}</span>
                  <Link className="btn" href={item.href || "#"}>
                    Know More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.swiperWrapper}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        slidesPerGroup={1}
        spaceBetween={24}
        loop={items.length > 3}
        grabCursor={true}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 24,
          },
        }}
        className={styles.swiperContainer}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <article className={`${styles.card} ${styles.swiperCard}`}>
              {item.image && (
                <div className={styles.cardImageContainer}>
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    className={styles.cardImage}
                  />
                </div>
              )}
              <div className={styles.swiperCardBody}>
                <h6 className={styles.cardTitle}>{item.title}</h6>
                {item.description && (
                  <p className={styles.cardExcerpt}>{item.description}</p>
                )}
                <div className={styles.cardFooter}>
                  <span className={styles.date}>{item.date}</span>
                  <Link className="btn" href={item.href || "#"}>
                    Know More
                  </Link>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}

        <div className={styles.navigationControls}>
          <button
            ref={prevRef}
            type="button"
            className={`${styles.arrowBtn} ${styles.prevArrow}`}
            aria-label="Previous slide"
          >
            <ArrowLeft height={12} width={10} />
          </button>

          <button
            ref={nextRef}
            type="button"
            className={`${styles.arrowBtn} ${styles.nextArrow}`}
            aria-label="Next slide"
          >
            <ArrowRight height={12} width={10} />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
