import type { PgdmUspBand as PgdmUspBandData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmUspBand.module.scss";

type PgdmUspBandProps = {
  data: PgdmUspBandData;
};

// Figma 644:472: "Program USPs" — dark photo band, heading top-left, a row of
// white cards along the lower edge.
export function PgdmUspBand({ data }: PgdmUspBandProps) {
  return (
    <div
      className={styles.band}
      style={{ backgroundImage: `url(${data.image})` }}>
      <div className={styles.overlay} />
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
    </div>
  );
}

export default PgdmUspBand;
