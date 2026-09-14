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
import type { FacultyCategory, FacultyMember } from "@/lib/drupal/faculty";
import { DEFAULT_FACULTY_CATEGORIES, DEFAULT_FACULTY_MEMBERS } from "@/lib/drupal/faculty";
import type { FacultyListingAttributes, JsonApiResource } from "@/lib/drupal";
import { useHasMounted } from "@/util/useMediaQuery";
import styles from "./FacultyListing.module.scss";

type FacultyListingProps = {
  paragraph: JsonApiResource<"paragraph--faculty_listing", FacultyListingAttributes>;
  categories?: FacultyCategory[];
  members?: FacultyMember[];
  children?: React.ReactNode;
};

export function FacultyListing({
  categories = DEFAULT_FACULTY_CATEGORIES,
  members = DEFAULT_FACULTY_MEMBERS,
}: FacultyListingProps) {
  const [activeTab, setActiveTab] = useState<string>("faculty");
  const mounted = useHasMounted();
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, mounted]);

  const filteredMembers = members.filter((member) => member.categorySlug === activeTab);
  const displayMembers = filteredMembers.length > 0 ? filteredMembers : members;

  return (
    <div className={styles.root}>
      {/* Top Bar: Taxonomy Tabs & Right Controls */}
      <div className={styles.topBar}>
        <div className={styles.tabsList}>
          {categories.map((cat) => {
            const isActive = cat.slug === activeTab;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.slug)}
                className={clsx(styles.tabBtn, isActive && styles.activeTab)}>
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className={styles.rightControls}>
          <Link
            href="/faculty"
            className="btn btn-primary">
            View All
          </Link>

          <div className={styles.navBtns}>
            <button
              ref={prevRef}
              type="button"
              className={clsx(styles.arrowBtn, styles.prevBtn)}
              aria-label="Previous faculty">
              <ArrowLeft
                height={10}
                width={7}
              />
            </button>

            <button
              ref={nextRef}
              type="button"
              className={clsx(styles.arrowBtn, styles.nextBtn)}
              aria-label="Next faculty">
              <ArrowRight
                height={10}
                width={7}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Faculty Members Swiper Carousel */}
      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={6}
          spaceBetween={24}
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
              slidesPerView: 1.3,
              spaceBetween: 16,
            },
            576: {
              slidesPerView: 2.3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.8,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className={styles.swiperContainer}>
          {displayMembers.map((member) => (
            <SwiperSlide key={member.id}>
              <article className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={member.image}
                    alt={member.imageAlt || member.name}
                    className={styles.cardImage}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h4 className={styles.name}>{member.name}</h4>

                  <p className={styles.designation}>
                    {member.designation}
                    {member.department ? ` – ${member.department}` : ""}
                  </p>

                  <Link
                    href={member.link || "#"}
                    className={styles.readMore}>
                    Read More
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
