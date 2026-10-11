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

      {/* Figma 701:1274: video tile | (video tile + quote card); without media,
          fall back to the stacked quote cards. */}
      {data.media?.length ? (
        <div className={styles.mosaic}>
          {data.media.map((src, i) => (
            <div
              key={src}
              className={`${styles.tile} ${i === 0 ? styles.tileTall : ""}`}>
              <img
                src={src}
                alt=""
              />
              <span
                className={styles.play}
                aria-hidden="true"
              />
            </div>
          ))}
          {data.testimonials.slice(0, 1).map((item) => (
            <figure
              key={item.id}
              className={`${styles.card} ${styles.mosaicCard}`}>
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
      ) : (
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
      )}
    </div>
  );
}

export default PgdmCommunity;
