import Link from "next/link";

import type { PgdmWhoApply as PgdmWhoApplyData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmWhoApply.module.scss";

// Figma 644:472: subtitle over two info cards (eligibility + entrance exams).
export function PgdmWhoApply({ data }: { data: PgdmWhoApplyData }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.subtitle}>{data.subtitle}</p>

      <div className={styles.cards}>
        {data.cards.map((card, i) => (
          <div
            key={card.heading}
            className={`${styles.card} ${i === 0 ? styles.cardTint : ""}`}>
            <h3 className={styles.cardHeading}>{card.heading}</h3>
            <p className={styles.cardBody}>{card.body}</p>
            {card.note ? <p className={styles.note}>{card.note}</p> : null}
            {card.cta ? (
              <Link
                href={card.cta.href}
                className="btn accent">
                {card.cta.label}
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PgdmWhoApply;
