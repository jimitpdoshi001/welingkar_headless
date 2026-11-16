import Link from "next/link";

import type { PgpIdealFor as PgpIdealForData } from "@/lib/pgp/pgp-entrepreneurship-data";
import styles from "./PgpIdealFor.module.scss";

// Figma 3047:506: rounded photo card (60% black overlay), copy + bullets + two CTAs left.
export function PgpIdealFor({ data }: { data: PgpIdealForData }) {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.card}>
        <img src={data.image} alt="" className={styles.image} />
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.content}>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={styles.description}>{data.description}</p>
          <ul className={styles.list}>
            {data.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.ctas}>
            <Link href={data.primaryCta.href} className={`btn ${styles.btn}`}>
              {data.primaryCta.label}
            </Link>
            <Link href={data.secondaryCta.href} className={`btn white-outline ${styles.btn}`}>
              {data.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
