import type { PgdmUspBand as PgdmUspBandData } from "@/lib/pgdm/pgdm-data";
import { PgdmImage } from "../common/PgdmImage";
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
        <PgdmImage
          src={data.image}
          mobileSrc={data.imageMobile}
          alt=""
          className={styles.photo}
        />
        <div className={styles.overlay} />
      </div>
      <div
        className={`container ${styles.inner}`}
        // Columns follow the card count: up to 6 per row on desktop, 3 on tablet.
        style={
          {
            "--usp-cols": Math.min(data.cards.length, 6),
            "--usp-cols-tab": Math.min(data.cards.length, 3),
          } as React.CSSProperties
        }>
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
