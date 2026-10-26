import type { PgdmInnovative as PgdmInnovativeData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmInnovative.module.scss";

type PgdmInnovativeProps = {
  data: PgdmInnovativeData;
};

// Figma 644:472: full-bleed dark photo band. Heading top-left, with two
// play-link rows (Faculty / Institutional initiatives) separated by hairlines.
export function PgdmInnovative({ data }: PgdmInnovativeProps) {
  return (
    <div
      className={styles.band}
      style={{ backgroundImage: `url(${data.image})` }}>
      <div className={styles.overlay} />
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <ul className={styles.links}>
          {data.links.map((link, i) => (
            <li
              key={i}
              className={styles.link}>
              <span
                className={styles.play}
                aria-hidden="true">
                ▶
              </span>
              <span className={styles.label}>{link.label}</span>
              {link.sub ? <span className={styles.sub}>{link.sub}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PgdmInnovative;
