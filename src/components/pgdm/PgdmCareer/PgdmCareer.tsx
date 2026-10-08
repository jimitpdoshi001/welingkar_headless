"use client";

import { useState } from "react";

import type { PgdmCareer as PgdmCareerData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmCareer.module.scss";

export function PgdmCareer({ data }: { data: PgdmCareerData }) {
  const [active, setActive] = useState(data.tabs[0]?.id ?? "");
  const [expanded, setExpanded] = useState(false);

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

      <div className={styles.grid}>
        {visible.map((role) => (
          <span
            key={role}
            className={styles.pill}>
            {role}
          </span>
        ))}
      </div>

      {hasMore ? (
        <div className={styles.moreWrap}>
          <button
            type="button"
            className="btn accent"
            onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default PgdmCareer;
