"use client";

import { useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";

import type { PgdmCareer as PgdmCareerData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmCareer.module.scss";

export function PgdmCareer({ data }: { data: PgdmCareerData }) {
  const [active, setActive] = useState(data.tabs[0]?.id ?? "");
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Mobile: the pill grid scrolls sideways (Figma mobile); arrows step one column.
  const scroll = (dir: 1 | -1) => {
    const el = gridRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  const current = data.tabs.find((t) => t.id === active) ?? data.tabs[0];
  const roles = current?.roles ?? [];
  const visible = expanded ? roles : roles.slice(0, data.initialCount);
  const hasMore = roles.length > data.initialCount;

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.description}>{data.description}</p>

      <div className={styles.tabs}>
        <PgdmTabBar
          tabs={data.tabs.map((t) => ({ id: t.id, label: t.label }))}
          active={active}
          onChange={(id) => {
            setActive(id);
            setExpanded(false);
          }}
          variant="underline"
        />
      </div>

      <div
        ref={gridRef}
        className={styles.grid}>
        {visible.map((role) => (
          <span
            key={role}
            className={styles.pill}>
            {role}
          </span>
        ))}
      </div>

      <div className={styles.moreWrap}>
        {hasMore ? (
          <button
            type="button"
            className="btn accent"
            onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "Show Less" : "Show More"}
          </button>
        ) : null}
        <div className={styles.arrows}>
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
      </div>
    </div>
  );
}

export default PgdmCareer;
