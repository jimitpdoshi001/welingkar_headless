"use client";

import { useState } from "react";

import type { PgdmCurriculum as PgdmCurriculumData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmCurriculum.module.scss";

export function PgdmCurriculum({ data }: { data: PgdmCurriculumData }) {
  const [active, setActive] = useState(data.trimesters[0]?.id ?? "");
  const current = data.trimesters.find((t) => t.id === active) ?? data.trimesters[0];

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.description}>{data.description}</p>

      <div className={styles.tabs}>
        <PgdmTabBar
          tabs={data.trimesters.map((t) => ({ id: t.id, label: t.label }))}
          active={active}
          onChange={setActive}
          variant="pill"
          theme="onDark"
        />
      </div>

      <div className={styles.cards}>
        <div className={styles.lightCard}>
          <h3 className={styles.cardHeading}>{current?.label} Subjects</h3>
          <ul className={styles.list}>
            {current?.subjects.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
        </div>

        <div className={styles.darkCard}>
          <h3 className={styles.cardHeadingLight}>Educational Objectives</h3>
          <ul className={styles.listLight}>
            {current?.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PgdmCurriculum;
