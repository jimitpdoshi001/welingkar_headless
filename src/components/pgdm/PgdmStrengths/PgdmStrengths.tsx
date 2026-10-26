import type { PgdmStrengths as PgdmStrengthsData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmStrengths.module.scss";

type PgdmStrengthsProps = {
  data: PgdmStrengthsData;
};

// Figma 644:472: centred heading + subheading over a photo, with translucent
// glass cards overlaid along the lower edge of the image.
export function PgdmStrengths({ data }: PgdmStrengthsProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.subheading}>{data.subheading}</p>

      <div className={styles.stage}>
        <img
          src={data.image}
          alt=""
          className={styles.photo}
        />
        <div className={styles.cards}>
          {data.cards.map((card, i) => (
            <p
              key={i}
              className={styles.card}>
              {card}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PgdmStrengths;
