"use client";

import { useState } from "react";

import type { PgdmCurriculum as PgdmCurriculumData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmCurriculum.module.scss";

const YEAR_LABELS = ["Year I", "Year II"];

// Figma 1012:6177: heading + description with Year I / Year II pills top-right,
// then the three trimester cards of the selected year (middle card tinted).
export function PgdmCurriculum({ data }: { data: PgdmCurriculumData }) {
  // Three trimesters per academic year.
  const years = YEAR_LABELS.map((label, i) => ({
    label,
    trimesters: data.trimesters.slice(i * 3, i * 3 + 3),
  })).filter((y) => y.trimesters.length > 0);
  const [active, setActive] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={styles.description}>{data.description}</p>
        </div>
        <div
          className={styles.years}
          role="tablist"
          aria-label="Academic year">
          {years.map((y, i) => (
            <button
              key={y.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`${styles.year} ${i === active ? styles.yearActive : ""}`}
              onClick={() => setActive(i)}>
              {y.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.track}>
        {years[active]?.trimesters.map((t, i) => (
          <article
            key={t.id}
            className={`${styles.card} ${i === 1 ? styles.cardAlt : ""}`}>
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
