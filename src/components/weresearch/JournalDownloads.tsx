"use client";

import { useId, useState } from "react";
import Link from "next/link";

import type { JournalYear } from "@/lib/weresearch/weresearch-data";
import styles from "./JournalDownloads.module.scss";

type Props = { heading: string; years: JournalYear[] };

// Figma 2549:1677: year dropdown (white pill, green caret) and one download link per issue.
export function JournalDownloads({ heading, years }: Props) {
  const [year, setYear] = useState(years[0]?.year ?? "");
  const selectId = useId();
  const current = years.find((y) => y.year === year) ?? years[0];

  if (!current) return null;

  return (
    <div className={styles.root}>
      <label htmlFor={selectId} className={styles.heading}>
        {heading}
      </label>

      <div className={styles.selectWrap}>
        <select
          id={selectId}
          className={styles.select}
          value={current.year}
          onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y.year} value={y.year}>
              {y.year}
            </option>
          ))}
        </select>
        {/* Figma "Polygon 8": green caret pointing down. */}
        <svg className={styles.caret} width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
          <path d="M7 10 0 0h14L7 10Z" fill="#3A9030" />
        </svg>
      </div>

      <ul className={styles.issues}>
        {current.issues.map((issue) => (
          <li key={issue.label}>
            <Link href={issue.href} className={styles.issue}>
              {issue.label}
              <svg width="10" height="10" viewBox="0 0 10.0024 9.97807" aria-hidden="true">
                <path
                  d="M5.004 0a.377.377 0 0 0-.378.377v6.425L1.898 4.074a.377.377 0 1 0-.534.533l3.373 3.373a.377.377 0 0 0 .534 0l3.373-3.373a.377.377 0 1 0-.534-.533L5.381 6.802V.377A.377.377 0 0 0 5.004 0ZM.377 9.223a.377.377 0 1 0 0 .755h9.248a.377.377 0 1 0 0-.755H.377Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JournalDownloads;
