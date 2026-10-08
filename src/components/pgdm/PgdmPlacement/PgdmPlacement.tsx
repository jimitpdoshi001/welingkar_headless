"use client";

import { useState } from "react";

import type { PgdmPlacement as PgdmPlacementData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmPlacement.module.scss";

export function PgdmPlacement({ data }: { data: PgdmPlacementData }) {
  const [year, setYear] = useState(data.years[0]?.id ?? "");
  const current = data.years.find((y) => y.id === year) ?? data.years[0];

  return (
    <section className={styles.root}>
      <img
        src={data.image}
        alt=""
        className={styles.bg}
      />
      <div className={styles.overlay} />

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
            variant="pill"
            theme="onDark"
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
