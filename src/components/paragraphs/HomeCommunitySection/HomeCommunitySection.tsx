"use client";

import React, { useEffect, useState } from "react";
import type { HomeCommunitySectionAttributes, JsonApiResource } from "@/lib/drupal";
import clsx from "clsx";
import styles from "./HomeCommunitySection.module.scss";

type HomeCommunitySectionProps = {
  paragraph?: JsonApiResource<"paragraph--home_community_section", HomeCommunitySectionAttributes>;
  children?: React.ReactNode;
};

const testimonials = [
  {
    id: 1,
    quote: "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "BigBasket DC - Manager",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    quote: "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    quote: "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Alumni",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    quote: "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Researcher",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    quote: "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
    name: "Rajesh ramineni",
    role: "Graduate",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
];

const CARD_HEIGHT = 380;
const GAP = 30;
const STEP_SIZE = CARD_HEIGHT + GAP; // 238px
const CYCLE_COUNT = 4; // Number of steps before silent wrap

export function HomeCommunitySection({ children }: HomeCommunitySectionProps) {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setStep((prev) => prev + 1);
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, []);

  // Seamless reset for background blank tracks
  useEffect(() => {
    if (step >= CYCLE_COUNT) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setStep(0);
      }, 1000); // Trigger after the CSS transition finishes
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Current active testimonials for the 3 fixed slots
  const cardCol1 = testimonials[step % testimonials.length];
  const cardCol2Top = testimonials[(step + 1) % testimonials.length];
  const cardCol2Bottom = testimonials[(step + 2) % testimonials.length];

  // Placeholder array for the background moving track
  const blanks = Array.from({ length: 12 });

  return (
    <div className={styles.root}>
      {children && <div className={styles.header}>{children}</div>}

      <div className={styles.rightSide}>
        {/* ================= COLUMN 1 ================= */}
        <div className={styles.columnContainer}>
          {/* Moving Blank Track (Top -> Bottom) */}
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${(step - CYCLE_COUNT) * STEP_SIZE}px)`,
              transition: isTransitioning
                ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {blanks.map((_, idx) => (
              <div key={`col1-blank-${idx}`} className={styles.placeholderCard} />
            ))}
          </div>

          {/* Fixed Center Slot: Slides in from TOP */}
          <div className={styles.col1FixedOverlay}>
            <div key={`col1-card-${step}`} className={clsx(styles.activeCard, styles.slideFromTop)}>
              <p className={styles.quote}>{cardCol1.quote}</p>
              <div className={styles.author}>
                <img src={cardCol1.avatar} alt={cardCol1.name} className={styles.avatar} />
                <div>
                  <h4 className={styles.name}>{cardCol1.name}</h4>
                  <span className={styles.role}>{cardCol1.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2 ================= */}
        <div className={styles.columnContainer}>
          {/* Moving Blank Track (Bottom -> Top) */}
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(-${step * STEP_SIZE}px)`,
              transition: isTransitioning
                ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {blanks.map((_, idx) => (
              <div key={`col2-blank-${idx}`} className={styles.placeholderCard} />
            ))}
          </div>

          {/* Fixed Double Slot: Slides in from BOTTOM */}
          <div className={styles.col2FixedOverlay}>
            <div key={`col2-top-${step}`} className={clsx(styles.activeCard, styles.slideFromBottom)}>
              <p className={styles.quote}>{cardCol2Top.quote}</p>
              <div className={styles.author}>
                <img src={cardCol2Top.avatar} alt={cardCol2Top.name} className={styles.avatar} />
                <div>
                  <h4 className={styles.name}>{cardCol2Top.name}</h4>
                  <span className={styles.role}>{cardCol2Top.role}</span>
                </div>
              </div>
            </div>

            <div key={`col2-bot-${step}`} className={clsx(styles.activeCard, styles.slideFromBottom)}>
              <p className={styles.quote}>{cardCol2Bottom.quote}</p>
              <div className={styles.author}>
                <img src={cardCol2Bottom.avatar} alt={cardCol2Bottom.name} className={styles.avatar} />
                <div>
                  <h4 className={styles.name}>{cardCol2Bottom.name}</h4>
                  <span className={styles.role}>{cardCol2Bottom.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 3 ================= */}
        <div className={styles.columnContainer}>
          {/* Moving Blank Track Only (Top -> Bottom) */}
          <div
            className={styles.columnTrack}
            style={{
              transform: `translateY(${(step - CYCLE_COUNT) * STEP_SIZE}px)`,
              transition: isTransitioning
                ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {blanks.map((_, idx) => (
              <div key={`col3-blank-${idx}`} className={styles.placeholderCard} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}