import Link from "next/link";

import type { PgdmCommunity as PgdmCommunityData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmCommunity.module.scss";

export function PgdmCommunity({ data }: { data: PgdmCommunityData }) {
  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.description}>{data.description}</p>
        <Link
          href={data.cta.href}
          className="btn accent">
          {data.cta.label}
        </Link>
      </div>

      <div className={styles.cards}>
        {data.testimonials.map((item) => (
          <figure
            key={item.id}
            className={styles.card}>
            <blockquote className={styles.quote}>{item.quote}</blockquote>
            <figcaption className={styles.person}>
              <img
                src={item.avatar}
                alt={item.name}
                className={styles.avatar}
              />
              <span>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.role}>{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default PgdmCommunity;
