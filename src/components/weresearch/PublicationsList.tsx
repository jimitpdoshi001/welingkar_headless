"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { Publication } from "@/lib/weresearch/publications-data";
import styles from "./PublicationsPage.module.scss";

type Props = {
  years: string[];
  defaultYear: string;
  perPage: number;
  publications: Publication[];
};

// Figma 2549:1783: year filter (left) + paginated paper list in a cream panel.
export function PublicationsList({ years, defaultYear, perPage, publications }: Props) {
  const [year, setYear] = useState(defaultYear);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => publications.filter((p) => p.year === year), [publications, year]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const items = filtered.slice((page - 1) * perPage, page * perPage);

  const selectYear = (y: string) => {
    setYear(y);
    setPage(1);
  };

  const goTo = (p: number) => setPage(Math.min(pageCount, Math.max(1, p)));

  return (
    <div className={styles.layout}>
      <ul className={styles.years} aria-label="Filter by year">
        {years.map((y) => (
          <li key={y}>
            <button
              type="button"
              className={`${styles.year} ${y === year ? styles.yearActive : ""}`}
              aria-pressed={y === year}
              onClick={() => selectYear(y)}>
              {y}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.panel}>
        {items.length === 0 ? (
          <p className={styles.empty}>No publications for {year} yet.</p>
        ) : (
          <ul className={styles.list}>
            {items.map((p) => (
              <li key={p.id} className={styles.item}>
                <div className={styles.meta}>
                  <span className={styles.tag}>{p.area}</span>
                  <span className={styles.itemYear}>{p.year}</span>
                </div>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.authors}>{p.authors}</p>
                <p className={styles.journal}>{p.journal}</p>
                <p className={styles.abstract}>{p.abstract}</p>
                <Link href={p.href} className={`btn accent-outline ${styles.readBtn}`}>
                  Read Paper
                </Link>
              </li>
            ))}
          </ul>
        )}

        {pageCount > 1 ? (
          <nav className={styles.pager} aria-label="Publications pages">
            <button
              type="button"
              className={styles.pagePrev}
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              aria-label="Previous page">
              <ArrowLeft height={10} width={7} />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.pageNum} ${n === page ? styles.pageNumActive : ""}`}
                aria-current={n === page ? "page" : undefined}
                onClick={() => goTo(n)}>
                {n}
              </button>
            ))}
            <button
              type="button"
              className={styles.pageNext}
              onClick={() => goTo(page + 1)}
              disabled={page === pageCount}
              aria-label="Next page">
              <ArrowRight height={10} width={7} />
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

export default PublicationsList;
