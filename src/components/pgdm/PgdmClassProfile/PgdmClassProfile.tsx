"use client";

import type { PgdmClassProfile as PgdmClassProfileData } from "@/lib/pgdm/pgdm-data";
import { PgdmAccordion, type AccordionItem } from "../common/PgdmAccordion";
import styles from "./PgdmClassProfile.module.scss";

export function PgdmClassProfile({ data }: { data: PgdmClassProfileData }) {
  const items: AccordionItem[] = data.items.map((item) => ({
    id: item.id,
    label: item.label,
    content: (
      <div className={styles.statGrid}>
        {(item.stats ?? []).map((stat, i) => (
          <div
            key={i}
            className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.description}>{data.description}</p>
      <PgdmAccordion
        items={items}
        defaultOpenId={null}
      />
    </div>
  );
}

export default PgdmClassProfile;
