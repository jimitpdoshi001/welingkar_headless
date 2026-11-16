import type { PgpFees as PgpFeesData } from "@/lib/pgp/pgp-entrepreneurship-data";
import styles from "./PgpFees.module.scss";

// Figma 3081:968: cream band, two photo fee cards with glass labels + purple info card.
export function PgpFees({ data }: { data: PgpFeesData }) {
  return (
    <section className={`bg-light-yellow ${styles.section}`}>
      <div className="container">
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.description}>{data.description}</p>

        <div className={styles.grid}>
          {data.cards.map((card) => (
            <article key={card.label} className={styles.card}>
              <img
                src={card.image}
                alt=""
                className={styles.cardImage}
                style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
              />
              <div className={styles.glass}>
                <h3 className={styles.label}>{card.label}</h3>
                <p className={styles.value}>
                  {card.value.map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </p>
              </div>
            </article>
          ))}

          <div className={styles.info}>
            {data.info.map((item) => (
              <div key={item.heading}>
                <h3 className={styles.infoHeading}>{item.heading}</h3>
                <p className={styles.infoBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
