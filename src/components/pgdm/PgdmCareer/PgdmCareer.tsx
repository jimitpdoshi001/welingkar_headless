"use client";

import { useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import { useScrollEdges } from "@/util/useScrollEdges";

import type { PgdmCareer as PgdmCareerData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmCareer.module.scss";
import { PgdmReadMore } from "../common/PgdmReadMore";

/** Plain text -> safe HTML text (used when joining the description with HTML bullets). */
const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
      {data.html || data.extraHtml ? (
        // One block (description + extra bullets) so Show More counts their words together.
        // HTML is sanitized server-side; the plain description is escaped here.
        <PgdmReadMore
          html={(data.html ?? (data.description ? `<p>${escapeHtml(data.description)}</p>` : "")) + (data.extraHtml ?? "")}
          className={`${styles.description} ${styles.rich}`}
        />
      ) : (
        <PgdmReadMore text={data.description} className={styles.description} />
      )}

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
