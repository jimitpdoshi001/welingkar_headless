import type { PgdmFees as PgdmFeesData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmFees.module.scss";

export function PgdmFees({ data }: { data: PgdmFeesData }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.description}>{data.description}</p>

      <div className={styles.cards}>
        {data.cards.map((card) => (
          <article
            key={card.label}
            className={styles.card}>
            <img
              src={card.image}
              alt=""
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay}>
              <h3 className={styles.cardLabel}>{card.label}</h3>
              <p className={styles.cardValue}>{card.value}</p>
              {card.note ? <p className={styles.cardNote}>{card.note}</p> : null}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.lists}>
        {[data.waiver, data.eligibility].map((block) => (
          <div
            key={block.heading}
            className={styles.listBlock}>
            <h3 className={styles.listHeading}>{block.heading}</h3>
            <ul className={styles.bullets}>
              {block.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PgdmFees;
