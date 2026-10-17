"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import clsx from "clsx";

import "swiper/css";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { CampusCard } from "@/lib/campus/campus-data";
import styles from "./CardCarousel.module.scss";

type CardCarouselProps = {
  heading: string;
  description?: string;
  cards: CampusCard[];
  cta?: { label: string; href: string };
  theme?: "light" | "onDark";
  overlayCaption?: boolean;
  /** Wrap the description to the heading's width (Figma Programs block). */
  fitDescriptionToHeading?: boolean;
};

export function CardCarousel({ heading, description, cards, cta, theme = "light", overlayCaption = false, fitDescriptionToHeading = false }: CardCarouselProps) {
  // Direct Swiper handle: arrows call slidePrev/slideNext. Deterministic per
  // instance, so every carousel on the page controls its own slides reliably.
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className={clsx(styles.root, theme === "onDark" && styles.onDark)}>
      <div className={styles.head}>
        <div className={clsx(styles.headText, fitDescriptionToHeading && styles.fitText)}>
          <h2 className={styles.heading}>{heading}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
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
        slidesPerView={1.1}
        spaceBetween={20}
        grabCursor
        breakpoints={{ 576: { slidesPerView: 1.6 }, 768: { slidesPerView: 2.3 }, 1024: { slidesPerView: 3.1 } }}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}>
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <article className={clsx(styles.card, overlayCaption && styles.overlayCard)}>
              <div className={styles.imageWrap}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{card.title}</h3>
                {card.meta ? <p className={styles.meta}>{card.meta}</p> : null}
                {card.cta ? (
                  <Link
                    href={card.cta.href}
                    className="btn accent">
                    {card.cta.label}
                  </Link>
                ) : null}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {cta ? (
        <div className={styles.ctaWrap}>
          <Link
            href={cta.href}
            className="btn accent">
            {cta.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default CardCarousel;
