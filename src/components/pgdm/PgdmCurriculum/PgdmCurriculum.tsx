"use client";

import { useState } from "react";

import type { PgdmCurriculum as PgdmCurriculumData } from "@/lib/pgdm/pgdm-data";
import { PgdmMobileRow } from "../common/PgdmMobileRow";
import styles from "./PgdmCurriculum.module.scss";

const YEAR_LABELS = ["Year I", "Year II"];
// Drupal year keys → pill labels.
const YEAR_KEY_LABELS: Record<string, string> = { year_i: "Year I", year_ii: "Year II" };

// Figma 1012:6177: heading + description with Year I / Year II pills top-right,
// then the three trimester cards of the selected year (middle card tinted).
export function PgdmCurriculum({ data }: { data: PgdmCurriculumData }) {
  const [active, setActive] = useState(0);

  // Group by the Drupal year when present (any number of trimesters per year);
  // otherwise three trimesters per academic year.
  const hasYears = data.trimesters.some((t) => t.year);
  const years = hasYears
    ? Object.keys(YEAR_KEY_LABELS)
        .concat([...new Set(data.trimesters.map((t) => t.year ?? ""))].filter((k) => k && !(k in YEAR_KEY_LABELS)))
        .map((key) => ({ label: YEAR_KEY_LABELS[key] ?? key, trimesters: data.trimesters.filter((t) => t.year === key) }))
        .filter((y) => y.trimesters.length > 0)
    : YEAR_LABELS.map((label, i) => ({
        label,
        trimesters: data.trimesters.slice(i * 3, i * 3 + 3),
      })).filter((y) => y.trimesters.length > 0);
  const cardCount = years[active]?.trimesters.length ?? 0;

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      {/* Figma: Year pills sit on the description line, right-aligned. */}
      <div className={styles.head}>
        <p className={styles.description}>{data.description}</p>
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

      {/* Cards share the row evenly (1–4 per year); a single card spans the full width. */}
      <PgdmMobileRow
        className={`${styles.track} ${cardCount === 1 ? styles.trackSingle : ""}`}
        itemWidth={cardCount === 1 ? "100%" : "86%"}
        arrowsClassName={cardCount === 1 ? styles.arrowsHidden : undefined}>
        {years[active]?.trimesters.map((t, i) => (
          <article
            key={t.id}
            className={`${styles.card} ${i === 1 ? styles.cardAlt : ""}`}>
            <h3 className={styles.cardHeading}>{t.label}</h3>
            <ul className={styles.list}>
              {t.subjects.map((subject) =>
                typeof subject === "string" ? (
                  <li key={subject}>{subject}</li>
                ) : (
                  // Subject with sub-items: expandable sub-menu.
                  <li key={subject.label}>
                    <details className={styles.sub}>
                      <summary className={styles.subToggle}>{subject.label}</summary>
                      <ul className={styles.subList}>
                        {subject.children.map((c) =>
                          typeof c === "string" ? (
                            <li key={c}>{c}</li>
                          ) : (
                            // Third level: sub-heading with its own items.
                            <li
                              key={c.label}
                              className={styles.subGroup}>
                              <span className={styles.subGroupLabel}>{c.label}</span>
                              <ul className={styles.subGroupList}>
                                {c.children.map((g) => (
                                  <li key={g}>{g}</li>
                                ))}
                              </ul>
                            </li>
                          ),
                        )}
                      </ul>
                    </details>
                  </li>
                ),
              )}
            </ul>
          </article>
        ))}
      </PgdmMobileRow>
    </div>
  );
}

export default PgdmCurriculum;
