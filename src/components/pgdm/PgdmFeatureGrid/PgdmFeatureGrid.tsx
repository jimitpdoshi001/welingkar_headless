import clsx from "clsx";

import type { PgdmFeature } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmFeatureGrid.module.scss";

type PgdmFeatureGridProps = {
  heading?: string;
  headingAlign?: "left" | "center";
  items: PgdmFeature[];
  columns?: 3 | 4;
  theme?: "light" | "onDark";
};

function FeatureIcon() {
  // Generic placeholder mark; swap for the per-feature icon when assets exist.
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M13 20l5 5 9-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PgdmFeatureGrid({ heading, headingAlign = "left", items, columns = 3, theme = "light" }: PgdmFeatureGridProps) {
  return (
    <div className={clsx(styles.root, theme === "onDark" && styles.onDark)}>
      {heading ? (
        <h2 className={clsx(styles.heading, headingAlign === "center" && styles.headingCenter)}>{heading}</h2>
      ) : null}

      <div className={clsx(styles.grid, columns === 4 ? styles.cols4 : styles.cols3)}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.item}>
            <span className={styles.icon}>
              <FeatureIcon />
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            {item.description ? <p className={styles.description}>{item.description}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PgdmFeatureGrid;
