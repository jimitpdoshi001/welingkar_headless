"use client";

import { useState } from "react";

import type { PgdmPlacement as PgdmPlacementData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmPlacement.module.scss";

// `bare`: skip the own photo/overlay when a parent band supplies the background.
export function PgdmPlacement({ data, bare = false }: { data: PgdmPlacementData; bare?: boolean }) {
  const [year, setYear] = useState(data.years[0]?.id ?? "");
  const current = data.years.find((y) => y.id === year) ?? data.years[0];

  return (
    <section className={styles.root}>
      {bare ? null : (
        <>
          <img
            src={data.image}
            alt=""
            className={styles.bg}
          />
          <div className={styles.overlay} />
        </>
      )}

      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>{data.heading}</h2>
        {data.paragraphs.map((para, i) => (
          <p
            key={i}
            className={styles.paragraph}>
            {para}
          </p>
        ))}

        <div className={styles.yearTabs}>
          <PgdmTabBar
            tabs={data.years.map((y) => ({ id: y.id, label: y.label }))}
            active={year}
            onChange={setYear}
            variant="segmented"
          />
        </div>

        <div className={styles.statsCard}>
          {current?.stats.map((stat) => (
            <div
              key={stat.label}
              className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PgdmPlacement;
