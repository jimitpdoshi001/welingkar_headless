"use client";

import { useEffect, useRef } from "react";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import { useScrollEdges } from "@/util/useScrollEdges";
import styles from "./ScrollArrows.module.scss";

type ScrollArrowsProps = {
  /** id of the horizontally scrollable element these arrows control. */
  targetId: string;
};

// Prev/next arrows (Figma "Up" icons) that scroll a row by ~80% of its width.
export function ScrollArrows({ targetId }: ScrollArrowsProps) {
  // Resolve the target row first (this effect runs before the hook's), then track its edges.
  const targetRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    targetRef.current = document.getElementById(targetId);
  }, [targetId]);
  const { overflows, atStart, atEnd } = useScrollEdges(targetRef, targetId);

  const scroll = (dir: 1 | -1) => {
    const el = document.getElementById(targetId);
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={styles.arrows} hidden={!overflows}>
      <button
        type="button"
        className={styles.prev}
        data-slider-arrow
        disabled={atStart}
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
        data-slider-arrow
        disabled={atEnd}
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
