"use client";

import { useEffect, useRef, useState } from "react";

import type { PgdmUspBand as PgdmUspBandData } from "@/lib/pgdm/pgdm-data";
import { PgdmImage } from "../common/PgdmImage";
import styles from "./PgdmUspBand.module.scss";

type PgdmUspBandProps = {
  data: PgdmUspBandData;
};

// Program USPs: rounded card, photo + heading on the left, USP list on the
// campus band colour on the right with its own scroller (thin track, green thumb).
export function PgdmUspBand({ data }: PgdmUspBandProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  // Thumb size/position as % of the track; null = list fits, no scroller.
  const [thumb, setThumb] = useState<{ size: number; top: number } | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // Custom scrollbar (native ones can't be styled in Safari): mirror scroll position.
    const update = () => {
      const { scrollHeight, clientHeight, scrollTop } = el;
      if (scrollHeight <= clientHeight + 1) {
        setThumb(null);
        return;
      }
      const size = (clientHeight / scrollHeight) * 100;
      const top = (scrollTop / (scrollHeight - clientHeight)) * (100 - size);
      setThumb({ size, top });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [data.cards.length]);

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.card}>
        <div className={styles.media}>
          <PgdmImage
            src={data.image}
            mobileSrc={data.imageMobile}
            alt=""
            className={styles.photo}
          />
          <div className={styles.overlay} aria-hidden="true" />
          <h2 className={styles.heading}>{data.heading}</h2>
        </div>

        <div className={styles.panel}>
          <ul
            ref={listRef}
            className={styles.list}
            // Keyboard users can scroll the list too.
            tabIndex={thumb ? 0 : undefined}
            aria-label={data.heading}>
            {data.cards.map((card) => (
              <li key={card} className={styles.item}>
                {card}
              </li>
            ))}
          </ul>

          {thumb ? (
            <div className={styles.track} aria-hidden="true">
              <div
                className={styles.thumb}
                style={{ height: `${thumb.size}%`, top: `${thumb.top}%` }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default PgdmUspBand;
