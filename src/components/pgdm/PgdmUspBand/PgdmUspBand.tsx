import type { PgdmUspBand as PgdmUspBandData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmUspBand.module.scss";

type PgdmUspBandProps = {
  data: PgdmUspBandData;
};

// Figma 2344:954: dark photo band, 40px heading top-left, six grey-glass cards
// along the lower edge.
export function PgdmUspBand({ data }: PgdmUspBandProps) {
  return (
    <section className={styles.band}>
      <div
        className={styles.bg}
        aria-hidden="true">
        <img
          src={data.image}
          alt=""
          className={styles.photo}
        />
        <div className={styles.overlay} />
      </div>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <div className={styles.cards}>
          {data.cards.map((card) => (
            <p
              key={card}
              className={styles.card}>
              {card}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PgdmUspBand;
