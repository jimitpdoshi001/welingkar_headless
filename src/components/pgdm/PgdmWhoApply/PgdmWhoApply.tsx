"use client";

import { useState } from "react";
import Link from "next/link";

import type { PgdmWhoApply as PgdmWhoApplyData } from "@/lib/pgdm/pgdm-data";
import { PgdmTabBar } from "../common/PgdmTabBar";
import styles from "./PgdmWhoApply.module.scss";

export function PgdmWhoApply({ data }: { data: PgdmWhoApplyData }) {
  const [active, setActive] = useState(data.tabs[0]?.id ?? "");
  const panel = data.panels[active] ?? Object.values(data.panels)[0];

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </div>
        <PgdmTabBar
          tabs={data.tabs}
          active={active}
          onChange={setActive}
          variant="pill"
        />
      </div>

      <div className={styles.cards}>
        <div className={styles.introCard}>
          <h3 className={styles.cardHeading}>{panel.intro.heading}</h3>
          <p className={styles.cardBody}>{panel.intro.body}</p>
          <ul className={styles.bullets}>
            {panel.intro.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className={styles.sideCard}>
          <h3 className={styles.cardHeading}>{panel.side.heading}</h3>
          {panel.side.paragraphs.map((para, i) => (
            <p
              key={i}
              className={styles.cardBody}>
              {para}
            </p>
          ))}
          <Link
            href={panel.side.cta.href}
            className="btn primary-outline">
            {panel.side.cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PgdmWhoApply;
