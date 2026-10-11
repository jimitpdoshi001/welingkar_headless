"use client";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./ScrollArrows.module.scss";

type ScrollArrowsProps = {
  /** id of the horizontally scrollable element these arrows control. */
  targetId: string;
};

// Prev/next arrows (Figma "Up" icons) that scroll a row by ~80% of its width.
export function ScrollArrows({ targetId }: ScrollArrowsProps) {
  const scroll = (dir: 1 | -1) => {
    const el = document.getElementById(targetId);
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={styles.arrows}>
      <button
        type="button"
        className={styles.prev}
        onClick={() => scroll(-1)}
        aria-controls={targetId}
        aria-label="Previous">
        <ArrowLeft
          height={10}
          width={7}
        />
      </button>
      <button
        type="button"
        className={styles.next}
        onClick={() => scroll(1)}
        aria-controls={targetId}
        aria-label="Next">
        <ArrowRight
          height={10}
          width={7}
        />
      </button>
    </div>
  );
}
