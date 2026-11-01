import type { PgdmBandStat } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmStatBar.module.scss";

type PgdmStatBarProps = {
  stats: PgdmBandStat[];
};

// Figma 644:472: purple band directly under the hero — four stats (value +
// label) separated by vertical hairline dividers.
export function PgdmStatBar({ stats }: PgdmStatBarProps) {
  return (
    <div className={styles.band}>
      {/* Layout adapts to 1–4 stats (count class drives the mobile grid). */}
      <div className={`container ${styles.inner} ${styles[`count${Math.min(stats.length, 4)}`] ?? ""}`}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PgdmStatBar;
