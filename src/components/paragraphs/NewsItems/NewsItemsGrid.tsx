import Link from "next/link";
import type { NewsItem } from "@/lib/drupal/news";
import styles from "./NewsItems.module.scss";

type NewsItemsGridProps = {
  items: NewsItem[];
  children?: React.ReactNode;
};

export function NewsItemsGrid({ items, children }: NewsItemsGridProps) {
  const featured = items[0];
  const item2 = items[1];
  const item3 = items[2];
  const item4 = items[3];
  const item5 = items[4];

  return (
    <div className={styles.mainGrid}>
      {/* Large left card */}
      {featured && (
        <article className={`${styles.card} ${styles.featuredCard}`}>
          {featured.image && (
            <img
              src={featured.image}
              alt={featured.imageAlt || featured.title}
            />
          )}

          <div className={styles.featuredContent}>
            <h6>{featured.title}</h6>

            <div className={styles.cardBottom}>
              <span>{featured.date}</span>

              <Link className="btn" href={featured.href || "#"}>
                Know More
              </Link>
            </div>
          </div>
        </article>
      )}

      {/* Middle top image card */}
      <article className={`${styles.card} ${styles.imageCard}`}>
        <img
          src={item2?.image as string}
          alt={item2?.imageAlt || item2?.title || "WeSchool event"}
        />
      </article>

      {/* Right top text card */}
      {item3 && (
        <article className={`${styles.card} ${styles.textCard}`}>
          <h6>{item3.title}</h6>
          <span className={styles.date}>{item3.date}</span>

          <Link className="btn" href={item3.href || "#"}>
            Know More
          </Link>
        </article>
      )}

      {/* Middle bottom image card */}
      <article className={`${styles.card} ${styles.imageCard}`}>
        <img
          src={item4?.image as string}
          alt={item4?.imageAlt || item4?.title || "WeSchool event"}
        />
      </article>

      {/* Right bottom text card */}
      {item5 && (
        <article className={`${styles.card} ${styles.textCard}`}>
          <h6>{item5.title}</h6>
          <span className={styles.date}>{item5.date}</span>

          <Link className="btn" href={item5.href || "#"}>
            Know More
          </Link>
        </article>
      )}

      {children}
    </div>
  );
}
