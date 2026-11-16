"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import type { TendersPageData } from "@/lib/tenders/tenders-data";
import styles from "./TendersListing.module.scss";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "DD/MM/YYYY" -> [month (1-12), year]
const monthYear = (d: string) => {
  const [, m, y] = d.split("/");
  return [Number(m), Number(y)] as const;
};

type Props = { data: TendersPageData; footerAction: ReactNode };

export function TendersListing({ data, footerAction }: Props) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const { columns: col, items, pageSize } = data;

  const years = useMemo(
    () => [...new Set(items.map((t) => monthYear(t.startDate)[1]))].sort((a, b) => b - a),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((t) => {
      const [m, y] = monthYear(t.startDate);
      return (
        (!q || t.title.toLowerCase().includes(q)) &&
        (!month || m === Number(month)) &&
        (!year || y === Number(year))
      );
    });
  }, [items, query, month, year]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * pageSize, current * pageSize);

  // Any filter change returns to page 1.
  const onFilter = (set: (v: string) => void) => (v: string) => {
    set(v);
    setPage(1);
  };

  return (
    <section aria-label={data.heading}>
      <div className={styles.filters}>
        <label className={styles.search}>
          <input
            type="search"
            aria-label={data.searchPlaceholder}
            placeholder={data.searchPlaceholder}
            value={query}
            onChange={(e) => onFilter(setQuery)(e.target.value)}
          />
          <Image src="/tenders/icon-search.svg" alt="" width={18} height={18} />
        </label>
        <div className={styles.selects}>
          <select aria-label={data.monthLabel} value={month} onChange={(e) => onFilter(setMonth)(e.target.value)}>
            <option value="">{data.monthLabel}</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
          <select aria-label={data.yearLabel} value={year} onChange={(e) => onFilter(setYear)(e.target.value)}>
            <option value="">{data.yearLabel}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{col.particulars}</th>
            <th scope="col">{col.status}</th>
            <th scope="col">{col.startDate}</th>
            <th scope="col">{col.endDate}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id}>
              <td className={styles.particulars}>
                <h2 className={styles.title}>{t.title}</h2>
                <a href={t.documentUrl} className={styles.doc} download>
                  <Image src="/tenders/icon-download.svg" alt="" width={16} height={16} />
                  {t.documentLabel}
                </a>
              </td>
              <td data-label={col.status}>{t.status}</td>
              <td data-label={col.startDate}>{t.startDate}</td>
              <td data-label={col.endDate}>
                {t.endDate}
                <br />
                {t.endTime}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>{data.emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.footer}>
        {pages > 1 && (
          <nav className={styles.pager} aria-label="Pagination">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className={styles.prev}>
              <Image src="/tenders/icon-pager-prev.svg" alt="" width={50} height={50} />
            </button>
            <ol>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <button
                    type="button"
                    aria-current={n === current ? "page" : undefined}
                    onClick={() => setPage(n)}>
                    {n}
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === pages}
              onClick={() => setPage(current + 1)}
              className={styles.next}>
              <Image src="/tenders/icon-pager-next.svg" alt="" width={50} height={50} />
            </button>
          </nav>
        )}
        {footerAction && <div className={styles.action}>{footerAction}</div>}
      </div>
    </section>
  );
}
