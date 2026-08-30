"use client";

import React, { useEffect, useState } from "react";
import type { HomeCommunitySectionAttributes, JsonApiResource } from "@/lib/drupal";
import styles from "./HomeCommunitySection.module.scss";

type HomeCommunitySectionProps = {
  paragraph?: JsonApiResource<"paragraph--home_community_section", HomeCommunitySectionAttributes>;
  children?: React.ReactNode;
};

const testimonials = [
  {
    id: 1,
    quote: "1 I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "BigBasket DC - Manager",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    quote: "2 I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    quote: "3 I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Alumni",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    quote: "4 I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Researcher",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    quote: "5 I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Graduate",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: 6,
    quote: "6 I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Graduate",
    avatar: "https://i.pravatar.cc/150?u=6",
  },
  {
    id: 7,
    quote: "7 I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Graduate",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
];

const CARD_HEIGHT = 380;
const GAP = 30;
const STEP_SIZE = CARD_HEIGHT + GAP; // 410px
const HALF_STEP = STEP_SIZE / 2;     // 205px
const N = testimonials.length;

// Range of slot indices rendered in each column track (-5 to +5, where slot 0 is the center slot)
const TRACK_SLOTS = Array.from({ length: 11 }, (_, i) => i - 5);
const ZERO_SLOT_OFFSET = 5; // 5 slots before slot 0 inside the flex column track

// Base translateY offsets to center slot 0 at top: 50%
const COL1_BASE_Y = -(ZERO_SLOT_OFFSET * STEP_SIZE) - CARD_HEIGHT / 2; // -2240px
const COL2_BASE_Y = COL1_BASE_Y - HALF_STEP;                           // -2445px
const COL3_BASE_Y = COL1_BASE_Y;                                        // -2240px

export function HomeCommunitySection({ children }: HomeCommunitySectionProps) {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Stepped cycle timer (~3.0s total: 0.75s slide transition + 2.25s rest phase)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Seamless silent step reset when transition finishes (0.75s)
  useEffect(() => {
    if (isTransitioning) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setStep((prev) => (prev + 1) % N);
      }, 750); // Match CSS transition duration (0.75s)
      return () => clearTimeout(resetTimer);
    }
  }, [isTransitioning]);

  const transitionStyle = isTransitioning
    ? "transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)"
    : "none";

  // Column 1 (Top -> Bottom): translateY moves downward (+STEP_SIZE) during transition
  const col1TranslateY = COL1_BASE_Y + (isTransitioning ? STEP_SIZE : 0);

  // Column 2 (Bottom -> Top): translateY moves upward (-STEP_SIZE) during transition
  const col2TranslateY = COL2_BASE_Y - (isTransitioning ? STEP_SIZE : 0);

  // Column 3 (Top -> Bottom): translateY moves downward (+STEP_SIZE) during transition in sync with Column 1
  const col3TranslateY = COL3_BASE_Y + (isTransitioning ? STEP_SIZE : 0);

  return (
    <div className={styles.root}>
      {children && <div className={styles.header}>{children}</div>}

      <div className={styles.rightSide}>
        {/* ================= COLUMN 1 ================= */}
        {/* Moves Top -> Bottom. Simultaneous cross-fade revealing blank placeholder underneath. */}
        <div className={styles.columnContainer}>
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${col1TranslateY}px)`,
              transition: transitionStyle,
            }}
          >
            {TRACK_SLOTS.map((idx) => {
              const isCurrentSlot = idx === 0;
              const isIncomingSlot = idx === -1;
              const hasActiveOverlay = isCurrentSlot || isIncomingSlot;

              const item = isCurrentSlot
                ? testimonials[step % N]
                : testimonials[(step + 1) % N];

              const cardOpacity = isCurrentSlot
                ? (isTransitioning ? 0 : 1)
                : (isTransitioning ? 1 : 0);

              return (
                <div key={`col1-slot-${idx}`} className={styles.placeholderCard}>
                  {hasActiveOverlay && (
                    <div
                      className={styles.activeCardOverlay}
                      style={{
                        opacity: cardOpacity,
                        transition: isTransitioning
                          ? "opacity 0.75s cubic-bezier(0.25, 1, 0.5, 1)"
                          : "none",
                      }}
                    >
                      <p className={styles.quote}>{item.quote}</p>
                      <div className={styles.author}>
                        <img src={item.avatar} alt={item.name} className={styles.avatar} />
                        <div>
                          <h4 className={styles.name}>{item.name}</h4>
                          <span className={styles.role}>{item.role}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= COLUMN 2 ================= */}
        {/* Moves Bottom -> Top. Simultaneous cross-fade revealing blank placeholders underneath. */}
        <div className={styles.columnContainer}>
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${col2TranslateY}px)`,
              transition: transitionStyle,
            }}
          >
            {TRACK_SLOTS.map((idx) => {
              const isTopSlot = idx === 0;
              const isBottomSlot = idx === 1;
              const isIncomingSlot = idx === 2;
              const hasActiveOverlay = isTopSlot || isBottomSlot || isIncomingSlot;

              let item = testimonials[(step + 1) % N];
              let cardOpacity = 1;

              if (isTopSlot) {
                item = testimonials[(step + 1) % N];
                cardOpacity = isTransitioning ? 0 : 1;
              } else if (isBottomSlot) {
                item = testimonials[(step + 2) % N];
                cardOpacity = 1;
              } else if (isIncomingSlot) {
                item = testimonials[(step + 3) % N];
                cardOpacity = isTransitioning ? 1 : 0;
              }

              return (
                <div key={`col2-slot-${idx}`} className={styles.placeholderCard}>
                  {hasActiveOverlay && (
                    <div
                      className={styles.activeCardOverlay}
                      style={{
                        opacity: cardOpacity,
                        transition: isTransitioning
                          ? "opacity 0.75s cubic-bezier(0.25, 1, 0.5, 1)"
                          : "none",
                      }}
                    >
                      <p className={styles.quote}>{item.quote}</p>
                      <div className={styles.author}>
                        <img src={item.avatar} alt={item.name} className={styles.avatar} />
                        <div>
                          <h4 className={styles.name}>{item.name}</h4>
                          <span className={styles.role}>{item.role}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= COLUMN 3 ================= */}
        {/* Moves Top -> Bottom in sync with Column 1. Dark blank placeholder cards only. */}
        <div className={styles.columnContainer}>
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${col3TranslateY}px)`,
              transition: transitionStyle,
            }}
          >
            {TRACK_SLOTS.map((idx) => (
              <div key={`col3-slot-${idx}`} className={styles.placeholderCard} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}