import type { PgdmStrengths as PgdmStrengthsData } from "@/lib/pgdm/pgdm-data";
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
        <img
          src={data.image}
          alt=""
          className={styles.photo}
        />
        <div className={styles.fade} />
      </div>

      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.subheading}>{data.subheading}</p>

        <PgdmMobileRow className={styles.cards} itemWidth="72%">
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
