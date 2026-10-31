"use client";

import { useRef } from "react";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./PgdmMobileRow.module.scss";

type PgdmMobileRowProps = {
  // Desktop layout class for the row (grid etc.). On mobile the row becomes a
  // horizontal swipe track with prev/next arrows (Figma mobile 2551:3275).
  className?: string;
  // Share of the viewport each item takes on mobile; the rest shows the next item.
  itemWidth?: string;
  arrowsClassName?: string;
  children: React.ReactNode;
};

export function PgdmMobileRow({ className, itemWidth = "86%", arrowsClassName, children }: PgdmMobileRowProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Scroll by one item (first child width + gap).
  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={trackRef}
        className={`${className ?? ""} ${styles.track}`}
        style={{ "--row-item": itemWidth } as React.CSSProperties}>
        {children}
      </div>
      <div className={`${styles.arrows} ${arrowsClassName ?? ""}`}>
        <button
          type="button"
          className={styles.prev}
          onClick={() => scroll(-1)}
          aria-label="Previous">
          <ArrowLeft width={7} height={10} />
        </button>
        <button
          type="button"
          className={styles.next}
          onClick={() => scroll(1)}
          aria-label="Next">
          <ArrowRight width={7} height={10} />
        </button>
      </div>
    </>
  );
}

export default PgdmMobileRow;
