"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type {
  HomeWhatWeOfferAttributes,
  JsonApiResource,
} from "@/lib/drupal";
import type { WhatWeOfferItem } from "@/lib/drupal/what-we-offer";

import "swiper/css";
import styles from "./HomeWhatWeOffer.module.scss";
import clsx from "clsx";

type HomeWhatWeOfferClientProps = {
  paragraph?: JsonApiResource<
    "paragraph--home_what_we_offer",
    HomeWhatWeOfferAttributes
  >;
  items?: WhatWeOfferItem[];
  children?: React.ReactNode;
};

export function HomeWhatWeOfferClient({
  paragraph,
  items = [],
}: HomeWhatWeOfferClientProps) {
  const swiperRef = useRef<SwiperClass | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const displayItems = items;

  const showTabs = paragraph?.attributes?.field_show_tabs ?? true;

  // Extract unique locations from Drupal data
  const locations = Array.from(
    new Set(
      displayItems
        .map((item) => item.location)
        .filter((location): location is string => Boolean(location))
    )
  );

  const [activeLocation, setActiveLocation] = useState<string>(
    locations[0] || ""
  );

  const filteredItems = showTabs
    ? displayItems.filter(
        (item) => !item.location || item.location === activeLocation
      )
    : displayItems;

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className={styles.root}>
      <div className={styles.headerRow}>
        <div className={styles.controlsRight}>
          {showTabs && locations.length > 1 ? (
            <ul className={styles.tabsList} role="tablist">
              {locations.map((loc) => {
                const label = loc.charAt(0).toUpperCase() + loc.slice(1);
                const isActive = activeLocation === loc;

                return (
                  <li key={loc} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={clsx(
                        styles.tabItem,
                        isActive && styles.active
                      )}
                      onClick={() => {
                        setActiveLocation(loc);
                        swiperRef.current?.slideTo(0);
                      }}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}

          <div className={styles.navButtons}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrev}
              disabled={isBeginning}
              aria-label="Previous slide"
            >
              <ArrowLeft width={7} height={9} />
            </button>

            <button
              type="button"
              className={clsx(styles.navBtn, styles.navNext)}
              onClick={handleNext}
              disabled={isEnd}
              aria-label="Next slide"
            >
              <ArrowRight width={7} height={9} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.swiperWrapper}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          spaceBetween={24}
          slidesPerView={1.15}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          watchOverflow
        >
          {filteredItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={styles.card}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.name}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  />
                ) : (
                  <div className={styles.cardImagePlaceholder} />
                )}

                <div className={styles.glassOverlay}>
                  <h5>{item.name}</h5>

                  {item.url ? (
                    <Link href={item.url} className="btn btn-primary">
                      Know More
                    </Link>
                  ) : (
                    <span className="btn btn-primary">Know More</span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
