"use client";

import { useRef } from "react";

import type { PgdmCurriculum as PgdmCurriculumData } from "@/lib/pgdm/pgdm-data";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./PgdmCurriculum.module.scss";

// Figma 644:472: heading + description with scroll arrows top-right, then a row
// of trimester subject cards (the middle card tinted lavender).
export function PgdmCurriculum({ data }: { data: PgdmCurriculumData }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={styles.description}>{data.description}</p>
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.prev}
            onClick={() => scroll(-1)}
            aria-label="Previous">
            <ArrowLeft width={8} height={12} />
          </button>
          <button
            type="button"
            className={styles.next}
            onClick={() => scroll(1)}
            aria-label="Next">
            <ArrowRight width={8} height={12} />
          </button>
        </div>
      </div>

      <div
        className={styles.track}
        ref={trackRef}>
        {data.trimesters.map((t, i) => (
          <article
            key={t.id}
            className={`${styles.card} ${i % 2 === 1 ? styles.cardAlt : ""}`}>
            <h3 className={styles.cardHeading}>{t.label}</h3>
            <ul className={styles.list}>
              {t.subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export default PgdmCurriculum;
