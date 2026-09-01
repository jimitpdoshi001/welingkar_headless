"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { HomeCommunitySectionAttributes, JsonApiResource } from "@/lib/drupal";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./HomeCommunitySection.module.scss";
import clsx from "clsx";

export type CommunityTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
};

type HomeCommunitySectionProps = {
  paragraph?: JsonApiResource<"paragraph--home_community_section", HomeCommunitySectionAttributes>;
  testimonials?: CommunityTestimonial[];
  children?: React.ReactNode;
};

const CARD_HEIGHT = 380;
const GAP = 30;
const STEP_SIZE = CARD_HEIGHT + GAP;
const HALF_STEP = STEP_SIZE / 2;
const TRACK_SLOTS = Array.from({ length: 11 }, (_, i) => i - 5);
const ZERO_SLOT_OFFSET = 5;
const COL1_BASE_Y = -(ZERO_SLOT_OFFSET * STEP_SIZE) - CARD_HEIGHT / 2;
const COL2_BASE_Y = COL1_BASE_Y - HALF_STEP;
const COL3_BASE_Y = COL1_BASE_Y;

function TestimonialBody({ item }: { item: CommunityTestimonial }) {
  return (
    <>
      <p className={styles.quote}>{item.quote}</p>
      <div className={styles.author}>
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.avatarAlt || item.name}
            width={50}
            height={50}
            className={styles.avatar}
          />
        ) : null}
        <div>
          {item.name ? <h4 className={styles.name}>{item.name}</h4> : null}
          {item.role ? <span className={styles.role}>{item.role}</span> : null}
        </div>
      </div>
    </>
  );
}

function TestimonialCard({ item, opacity, transitioning }: { item: CommunityTestimonial; opacity: number; transitioning: boolean }) {
  return (
    <div
      className={styles.activeCardOverlay}
      style={{
        opacity,
        transition: transitioning ? "opacity 0.75s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
      }}>
      <TestimonialBody item={item} />
    </div>
  );
}

export function HomeCommunitySection({ testimonials = [], children }: HomeCommunitySectionProps) {
  const count = testimonials.length;
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (count === 0 || isMobile) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [count, isMobile]);

  useEffect(() => {
    if (!isTransitioning || count === 0 || isMobile) return;

    const resetTimer = setTimeout(() => {
      setIsTransitioning(false);
      setStep((prev) => (prev + 1) % count);
    }, 750);

    return () => clearTimeout(resetTimer);
  }, [isTransitioning, count, isMobile]);

  const transitionStyle = isTransitioning ? "transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)" : "none";
  const col1TranslateY = COL1_BASE_Y + (isTransitioning ? STEP_SIZE : 0);
  const col2TranslateY = COL2_BASE_Y - (isTransitioning ? STEP_SIZE : 0);
  const col3TranslateY = COL3_BASE_Y + (isTransitioning ? STEP_SIZE : 0);

  const itemAt = (offset: number) => (count ? testimonials[(step + offset) % count] : null);

  return (
    <div className={clsx(styles.root, isMobile ? styles.mobile : "")}>
      {children ? <div className={styles.header}>{children}</div> : null}

      <div className={styles.rightSide}>
        <div className={styles.columnContainer}>
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${col1TranslateY}px)`,
              transition: transitionStyle,
            }}>
            {TRACK_SLOTS.map((idx) => {
              const isCurrentSlot = idx === 0;
              const isIncomingSlot = idx === -1;
              const item = isCurrentSlot ? itemAt(0) : itemAt(1);
              const cardOpacity = isCurrentSlot ? (isTransitioning ? 0 : 1) : isTransitioning ? 1 : 0;

              return (
                <div
                  key={`col1-slot-${idx}`}
                  className={styles.placeholderCard}>
                  {item && (isCurrentSlot || isIncomingSlot) ? (
                    <TestimonialCard
                      item={item}
                      opacity={cardOpacity}
                      transitioning={isTransitioning}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.columnContainer}>
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${col2TranslateY}px)`,
              transition: transitionStyle,
            }}>
            {TRACK_SLOTS.map((idx) => {
              const isTopSlot = idx === 0;
              const isBottomSlot = idx === 1;
              const isIncomingSlot = idx === 2;
              let item = itemAt(1);
              let cardOpacity = 1;

              if (isTopSlot) {
                item = itemAt(1);
                cardOpacity = isTransitioning ? 0 : 1;
              } else if (isBottomSlot) {
                item = itemAt(2);
                cardOpacity = 1;
              } else if (isIncomingSlot) {
                item = itemAt(3);
                cardOpacity = isTransitioning ? 1 : 0;
              }

              return (
                <div
                  key={`col2-slot-${idx}`}
                  className={styles.placeholderCard}>
                  {item && (isTopSlot || isBottomSlot || isIncomingSlot) ? (
                    <TestimonialCard
                      item={item}
                      opacity={cardOpacity}
                      transitioning={isTransitioning}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.columnContainer}>
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${col3TranslateY}px)`,
              transition: transitionStyle,
            }}>
            {TRACK_SLOTS.map((idx) => (
              <div
                key={`col3-slot-${idx}`}
                className={styles.placeholderCard}
              />
            ))}
          </div>
        </div>
      </div>

      {count > 0 ? (
        <div className={styles.slider}>
          {count < 2 ? (
            <div className={styles.slideCard}>
              <TestimonialBody item={testimonials[0]} />
            </div>
          ) : (
            <Swiper
              modules={[Navigation]}
              slidesPerView={1.15}
              spaceBetween={20}
              navigation={{
                prevEl: `.${styles.prev}`,
                nextEl: `.${styles.next}`,
              }}
              className={styles.swiper}
              watchOverflow>
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={styles.slideCard}>
                    <TestimonialBody item={item} />
                  </div>
                </SwiperSlide>
              ))}
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
            </Swiper>
          )}
        </div>
      ) : null}
    </div>
  );
}
