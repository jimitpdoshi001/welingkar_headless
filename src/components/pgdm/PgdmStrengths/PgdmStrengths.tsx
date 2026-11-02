import type { PgdmStrengths as PgdmStrengthsData } from "@/lib/pgdm/pgdm-data";
import { PgdmImage } from "../common/PgdmImage";
import styles from "./PgdmStrengths.module.scss";
import { PgdmMobileRow } from "../common/PgdmMobileRow";

type PgdmStrengthsProps = {
  data: PgdmStrengthsData;
};

// Figma 2356:1160: full-bleed photo that fades to white at the top (behind the
// heading) and bottom, with four glass cards over its lower part.
export function PgdmStrengths({ data }: PgdmStrengthsProps) {
  return (
    <section className={styles.section}>
      <div
        className={styles.bg}
        aria-hidden="true">
        <PgdmImage
          src={data.image}
          mobileSrc={data.imageMobile}
          alt=""
          className={styles.photo}
        />
        <div className={styles.fade} />
      </div>

      <div
        className={`container ${styles.inner}`}
        // Columns follow the card count (1 card = full width, 2 = two columns…), max 4.
        style={
          {
            "--strength-cols": Math.min(data.cards.length, 4),
            "--strength-cols-tab": Math.min(data.cards.length, 2),
          } as React.CSSProperties
        }>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.subheading}>{data.subheading}</p>

        <PgdmMobileRow className={styles.cards} itemWidth={data.cards.length === 1 ? "100%" : "72%"}>
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

export default PgdmStrengths;
