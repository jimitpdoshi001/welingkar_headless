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
            <div className={styles.links}>
              {data.links.map((link) => (
                <div
                  key={link.label}
                  className={styles.linkBlock}>
                  <div className={styles.linkRow}>
                    <span className={styles.label}>{link.label}</span>
                    <span
                      className={styles.play}
                      aria-hidden="true">
                      ▶
                    </span>
                  </div>
                  {link.sub ? <p className={styles.sub}>{link.sub}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PgdmInnovative;
