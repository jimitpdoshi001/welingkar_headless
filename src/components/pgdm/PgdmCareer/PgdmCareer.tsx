"use client";

import { useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import { useScrollEdges } from "@/util/useScrollEdges";

import type { PgdmCareer as PgdmCareerData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmCareer.module.scss";
import { PgdmReadMore } from "../common/PgdmReadMore";

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
  // Arrows only when the pills overflow (e.g. not for a single role); re-check per tab.
  const { overflows, atStart, atEnd } = useScrollEdges(gridRef, `${active}-${expanded}`);
  const hasMore = roles.length > data.initialCount;

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      {data.html ? (
        // Sanitized/escaped server-side (program-listing): keeps bullet points.
        <PgdmReadMore html={data.html} className={`${styles.description} ${styles.rich}`} />
      ) : (
        <PgdmReadMore text={data.description} className={styles.description} />
      )}
      {data.extraHtml ? (
        // Sanitized server-side (program-listing sanitizeRich).
        <PgdmReadMore html={data.extraHtml} className={`${styles.description} ${styles.rich}`} />
      ) : null}

      {/* Role tabs only when Drupal (or the built-in data) has roles. */}
      {data.tabs.length > 0 ? (
        <>
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
            className={styles.grid}
            style={{ "--career-rows": Math.min(Math.max(visible.length, 1), 5) } as React.CSSProperties}>
            {visible.map((role) => (
              <span key={role} className={styles.pill}>
                {role}
              </span>
            ))}
          </div>

          <div className={styles.moreWrap}>
            {hasMore ? (
              <button
                type="button"
                className="btn accent"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            ) : null}
            {overflows ? (
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.prev}
                data-slider-arrow
                disabled={atStart}
                onClick={() => scroll(-1)}
                aria-label="Previous"
              >
                <ArrowLeft width={7} height={10} />
              </button>
              <button
                type="button"
                className={styles.next}
                data-slider-arrow
                disabled={atEnd}
                onClick={() => scroll(1)}
                aria-label="Next"
              >
                <ArrowRight width={7} height={10} />
              </button>
            </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default PgdmCareer;
