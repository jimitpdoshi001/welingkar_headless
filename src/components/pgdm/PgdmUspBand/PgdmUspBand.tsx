import type { PgdmUspBand as PgdmUspBandData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmUspBand.module.scss";
import { PgdmMobileRow } from "../common/PgdmMobileRow";

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
        <PgdmMobileRow className={styles.cards} itemWidth="56%" arrowsClassName={styles.noArrows}>
          {data.cards.map((card) => (
            <p
              key={card}
              className={styles.card}>
              {card}
            </p>
          ))}
        </PgdmMobileRow>
      </div>
    </section>
  );
}

export default PgdmUspBand;
