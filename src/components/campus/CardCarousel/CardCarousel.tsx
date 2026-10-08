"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import clsx from "clsx";

import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { CampusCard } from "@/lib/campus/campus-data";
import { useHasMounted } from "@/util/useMediaQuery";
import styles from "./CardCarousel.module.scss";

type CardCarouselProps = {
  heading: string;
  description?: string;
  cards: CampusCard[];
  cta?: { label: string; href: string };
  theme?: "light" | "onDark";
  overlayCaption?: boolean;
};

export function CardCarousel({ heading, description, cards, cta, theme = "light", overlayCaption = false }: CardCarouselProps) {
  const mounted = useHasMounted();
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (swiper?.navigation) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper, mounted]);

  return (
    <div className={clsx(styles.root, theme === "onDark" && styles.onDark)}>
      <div className={styles.head}>
        <div className={styles.headText}>
          <h2 className={styles.heading}>{heading}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
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
        slidesPerView={1.1}
        spaceBetween={24}
        grabCursor
        breakpoints={{ 576: { slidesPerView: 1.6 }, 768: { slidesPerView: 2.3 }, 1024: { slidesPerView: 3.2 } }}
        onBeforeInit={(s) => {
          if (s.params.navigation && typeof s.params.navigation !== "boolean") {
            s.params.navigation.prevEl = prevRef.current;
            s.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSwiper={setSwiper}>
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
