import type { PgdmInnovative as PgdmInnovativeData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmInnovative.module.scss";

type PgdmInnovativeProps = {
  data: PgdmInnovativeData;
};

// Figma 644:472: rounded photo card. Heading top-left; bottom-left a list of
// initiative rows (label + play ▶ on the right) with hairline dividers.
export function PgdmInnovative({ data }: PgdmInnovativeProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${data.image})` }}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h2 className={styles.heading}>{data.heading}</h2>
            <ul className={styles.links}>
              {data.links.map((link, i) => (
                <li
                  key={link}
                  className={`${styles.row} ${i === 0 ? styles.rowActive : ""}`}>
                  <span>{link}</span>
                  {i === 0 ? (
                    <span
                      className={styles.play}
                      aria-hidden="true">
                      ▶
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PgdmInnovative;
