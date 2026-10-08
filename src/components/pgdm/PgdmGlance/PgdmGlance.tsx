import type { PgdmGlance as PgdmGlanceData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmGlance.module.scss";

export function PgdmGlance({ data }: { data: PgdmGlanceData }) {
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

        <div className={styles.card}>
          <dl className={styles.grid}>
            {data.details.map((detail) => (
              <div
                key={detail.label}
                className={styles.detail}>
                <dt className={styles.label}>{detail.label}</dt>
                <dd className={styles.value}>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default PgdmGlance;
