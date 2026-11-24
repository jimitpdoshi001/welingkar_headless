"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import type { EventCity } from "@/lib/drupal/events";
import styles from "./MediaGridPage.module.scss";

/** Card data only (no description HTML) to keep the client payload small. */
export type EventCard = { id: string; slug: string; title: string; date: string; year: string; city: EventCity | null; image: string | null; imageAlt: string };

const PAGE = 12;
const noopSubscribe = () => () => {};
const readUrlCampus = (): EventCity | "" => {
  const c = new URLSearchParams(window.location.search).get("campus");
  return c === "mumbai" || c === "bengaluru" ? c : "";
};
const VISIBLE_YEARS = 4; // Figma: four year tabs, older years in the caret dropdown
const FALLBACK_IMAGE = "/campus/mumbai/life-at-weschool.webp"; // events without a featured image
const CAMPUSES: { value: EventCity; label: string }[] = [
  { value: "mumbai", label: "Mumbai" },
  { value: "bengaluru", label: "Bengaluru" },
];

/** Events listing: year tabs (+ older years), campus select, card grid and Load More. */
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

  const filtered = events.filter((e) => e.year === year && e.city === campus);
  const shown = filtered.slice(0, count);
  const tabYears = years.slice(0, VISIBLE_YEARS);
  const olderYears = years.slice(VISIBLE_YEARS);

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
        <div
          className={styles.years}
          role="tablist"
          aria-label="Year">
          {tabYears.map((y) => (
            <button
              key={y}
              type="button"
              role="tab"
              aria-selected={y === year}
              className={`${styles.year} ${y === year ? styles.yearActive : ""}`}
              onClick={() => pickYear(y)}>
              {y}
            </button>
          ))}
          {olderYears.length ? (
            <select
              aria-label="Older years"
              className={`${styles.yearSelect} ${olderYears.includes(year) ? styles.yearActive : ""}`}
              value={olderYears.includes(year) ? year : ""}
              onChange={(e) => e.target.value && pickYear(e.target.value)}>
              <option value="">{olderYears.includes(year) ? year : "Older"}</option>
              {olderYears.map((y) => (
                <option
                  key={y}
                  value={y}>
                  {y}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <select
          aria-label="Select Campus"
          className={styles.select}
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
      </div>

      {shown.length ? (
        // data-no-reveal: cards appear on filter/Load More changes, so they skip the scroll-reveal (it would leave them hidden).
        <div
          className={styles.grid}
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
                <p className={styles.text}>{c.title}</p>
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
    </>
  );
}
