"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import { DEFAULT_FACULTY_GRID_CATEGORIES, DEFAULT_FACULTY_GRID_MEMBERS } from "@/lib/drupal/faculty";
import type { CampusCta } from "@/lib/campus/campus-data";
import arrowStyles from "../ScrollArrows/ScrollArrows.module.scss";
import styles from "../CampusPage.module.scss";

type MentorsCarouselProps = {
  /** Tab labels in display order; matched to the faculty categories by position. */
  tabs: string[];
  cta: CampusCta;
  /** Local campus photos (Figma exports), used instead of the faculty image when the name matches. */
  photos: Record<string, string>;
};

/**
 * Campus "Mentors" block: tabs filter the same mentor list as the faculty page,
 * and the prev/next arrows page through the filtered cards.
 */
export function MentorsCarousel({ tabs, cta, photos }: MentorsCarouselProps) {
  const categories = DEFAULT_FACULTY_GRID_CATEGORIES;
  // Figma opens on "Faculty".
  const [active, setActive] = useState(categories.find((c) => c.slug === "faculty")?.slug ?? categories[0].slug);
  const swiperRef = useRef<SwiperClass | null>(null);

  const people = useMemo(
    () => DEFAULT_FACULTY_GRID_MEMBERS.filter((member) => member.categorySlug === active),
    [active],
  );

  return (
    <>
      <div className={styles.mentorsBar}>
        <div
          className={styles.mentorTabs}
          role="tablist">
          {categories.map((cat, i) => (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={cat.slug === active}
              onClick={() => setActive(cat.slug)}
              className={`${styles.mentorTab} ${cat.slug === active ? styles.mentorTabActive : ""}`}>
              {tabs[i] ?? cat.name}
            </button>
          ))}
        </div>
        <div className={styles.barActions}>
          <Link
            href={cta.href}
            className={`btn accent ${styles.smallBtn}`}>
            {cta.label}
          </Link>
          <div className={arrowStyles.arrows}>
            <button
              type="button"
              className={arrowStyles.prev}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous mentors">
              <ArrowLeft
                height={10}
                width={7}
              />
            </button>
            <button
              type="button"
              className={arrowStyles.next}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next mentors">
              <ArrowRight
                height={10}
                width={7}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Keyed by tab so the carousel restarts at the first card on each switch. */}
      <Swiper
        key={active}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={2.2}
        spaceBetween={16}
        breakpoints={{ 768: { slidesPerView: 3.3, spaceBetween: 20 }, 1024: { slidesPerView: 6, spaceBetween: 20 } }}>
        {people.map((person) => (
          <SwiperSlide key={person.id}>
            <article className={styles.mentorCard}>
              <img
                src={photos[person.name] ?? person.image}
                alt={person.imageAlt || person.name}
                className={styles.mentorImage}
              />
              <h4 className={styles.mentorName}>{person.name}</h4>
              <p className={styles.mentorRole}>
                {person.department ? `${person.designation} – ${person.department}` : person.designation}
              </p>
              {/* Faculty profile routes are not built yet, so this opens the faculty page. */}
              <Link
                href={cta.href}
                className={styles.mentorLink}>
                Read More
              </Link>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
