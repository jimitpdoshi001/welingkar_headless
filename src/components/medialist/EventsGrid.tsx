"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import type { EventCity } from "@/lib/drupal/events";
import styles from "./MediaGridPage.module.scss";

/** Card data only (no description HTML) to keep the client payload small. */
export type EventCard = { id: string; slug: string; title: string; date: string; year: string; city: EventCity | null; image: string | null; imageAlt: string };

const PAGE = 12;
/** Years up to this one are grouped under the "Archives" button. */
const ARCHIVE_UNTIL = 2020;
const noopSubscribe = () => () => {};
const readUrlCampus = (): EventCity | "" => {
  const c = new URLSearchParams(window.location.search).get("campus");
  return c === "mumbai" || c === "bengaluru" ? c : "";
};
const FALLBACK_IMAGE = "/campus/mumbai/life-at-weschool.webp"; // events without a featured image
const CAMPUSES: { value: EventCity; label: string }[] = [
  { value: "mumbai", label: "Mumbai" },
  { value: "bengaluru", label: "Bengaluru" },
];

/** Events listing: year list (vertical, older years under Archives), campus select, card grid and Load More. */
export function EventsGrid({ events }: { events: EventCard[] }) {
  // "?campus=mumbai|bengaluru" (old /events/<campus> URLs redirect here) picks the campus; default Mumbai.
  // Read from the URL on the client only (server snapshot ""), so the listing stays statically cached.
  const urlCampus = useSyncExternalStore(noopSubscribe, readUrlCampus, () => "" as const);
  const [campusPick, setCampusPick] = useState<EventCity | null>(null);
  const [yearPick, setYearPick] = useState<string | null>(null);
  const [count, setCount] = useState(PAGE);
  const campus: EventCity = campusPick ?? (urlCampus || "mumbai");

  // Year tabs: only years that have events for the selected campus, newest first.
  const years = useMemo(
    () => [...new Set(events.filter((e) => e.city === campus).map((e) => e.year).filter(Boolean))].sort((a, b) => Number(b) - Number(a)),
    [events, campus],
  );
  // A picked year that this campus has no events for falls back to the campus's newest year.
  const year = yearPick && years.includes(yearPick) ? yearPick : (years[0] ?? "");
  const recentYears = years.filter((y) => Number(y) > ARCHIVE_UNTIL);
  const archiveYears = years.filter((y) => Number(y) <= ARCHIVE_UNTIL);
  const [archiveOpen, setArchiveOpen] = useState(false);
  // Archive list stays open while an archived year is selected.
  const showArchive = archiveOpen || archiveYears.includes(year);

  const filtered = events.filter((e) => e.year === year && e.city === campus);
  const shown = filtered.slice(0, count);

  // Any filter change starts the list again from the first page.
  const pickYear = (y: string) => {
    setYearPick(y);
    setCount(PAGE);
  };

  if (!events.length) {
    return <p className={styles.empty}>No events to show right now. Please check back soon.</p>;
  }

  return (
    <>
      <div className={styles.filterBar}>
        {/* Visible "Campus" label + green pill so the selected location is obvious. */}
        <label className={styles.campusField}>
          <span className={styles.campusLabel}>Campus</span>
          <select
            aria-label="Select Campus"
            className={`${styles.select} ${styles.campusSelect}`}
            value={campus}
            onChange={(e) => {
              setCampusPick(e.target.value as EventCity);
              setCount(PAGE);
            }}>
            {CAMPUSES.map((c) => (
              <option
                key={c.value}
                value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.eventsLayout}>
        {/* Years stacked vertically: 2021+ as tabs, older years under "Archives". */}
        <nav
          className={styles.yearRail}
          aria-label="Year">
          {recentYears.map((y) => (
            <button
              key={y}
              type="button"
              aria-pressed={y === year}
              className={`${styles.railYear} ${y === year ? styles.railYearActive : ""}`}
              onClick={() => pickYear(y)}>
              {y}
            </button>
          ))}
          {archiveYears.length ? (
            <>
              <button
                type="button"
                aria-expanded={showArchive}
                className={`${styles.railYear} ${styles.archiveBtn} ${archiveYears.includes(year) ? styles.railYearActive : ""}`}
                onClick={() => setArchiveOpen((o) => !o)}>
                Archives
                <span className={`${styles.archiveCaret} ${showArchive ? styles.archiveCaretOpen : ""}`} aria-hidden="true" />
              </button>
              {showArchive
                ? archiveYears.map((y) => (
                    <button
                      key={y}
                      type="button"
                      aria-pressed={y === year}
                      className={`${styles.railYear} ${styles.archiveYear} ${y === year ? styles.railYearActive : ""}`}
                      onClick={() => pickYear(y)}>
                      {y}
                    </button>
                  ))
                : null}
            </>
          ) : null}
        </nav>
        <div>
      {shown.length ? (
        // data-no-reveal: cards appear on filter/Load More changes, so they skip the scroll-reveal (it would leave them hidden).
        <div
          className={`${styles.grid} ${styles.eventsGrid}`}
          data-no-reveal>
          {shown.map((c) => (
            <article
              key={c.id}
              className={styles.card}>
              <img
                src={c.image || FALLBACK_IMAGE}
                alt={c.imageAlt}
                loading="lazy"
              />
              <div className={styles.caption}>
                {c.date ? <p className={styles.date}>{c.date}</p> : null}
                {/* Fixed-height title box (scrolls when long) so every card caption lines up. */}
                <p className={`${styles.text} ${styles.eventTitle}`}>{c.title}</p>
                <Link
                  href={`/events/${c.slug}`}
                  className="btn accent">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No events for this selection.</p>
      )}

      {count < filtered.length ? (
        <div className={styles.loadMore}>
          <button
            type="button"
            className="btn accent-outline"
            onClick={() => setCount((n) => n + PAGE)}>
            Load More
          </button>
        </div>
      ) : null}
        </div>
      </div>
    </>
  );
}
