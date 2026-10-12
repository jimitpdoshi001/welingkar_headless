import Link from "next/link";
import { optimizedImgProps } from "@/util/optimized-img";
import type { NewsItem } from "@/lib/drupal/news";
import styles from "./NewsItems.module.scss";

type NewsItemsFlatGridProps = {
  items: NewsItem[];
};

export function NewsItemsFlatGrid({ items }: NewsItemsFlatGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.flatGrid}>
      {items.map((item) => (
        <article
          key={item.id}
          className={`${styles.card} ${styles.flatGridCard}`}
        >
          {item.image && (
            <div className={styles.cardImageContainer}>
              <img
                {...optimizedImgProps(item.image, item.imageAlt || item.title)}
                className={styles.cardImage}
              />
            </div>
          )}
          <div className={styles.flatGridCardBody}>
            <h6 className={styles.cardTitle}>{item.title}</h6>
            {item.description && (
              <p className={styles.cardExcerpt}>{item.description}</p>
            )}
            <div className={styles.cardFooter}>
              <span className={styles.date}>{item.date}</span>
              <Link className="btn" href={item.href || "#"}>
                Know More
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
