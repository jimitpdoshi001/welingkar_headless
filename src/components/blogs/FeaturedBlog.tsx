import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/drupal";
import { CommentIcon, ViewsIcon } from "./BlogIcons";
import styles from "./FeaturedBlog.module.scss";

type FeaturedBlogProps = {
  article: BlogArticle;
};

export function FeaturedBlog({ article }: FeaturedBlogProps) {
  return (
    <article className={styles.featured}>
      <div className={styles.media}>
        {article.image ? (
          <Image
            src={article.image.url}
            alt={article.image.alt || article.title}
            fill
            priority
            sizes="(max-width: 767px) 90vw, (max-width: 1024px) 90vw, 55vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.readTime}>{article.readTime}</p>
        <h2 className={styles.title}>
          <Link href={article.href}>{article.title}</Link>
        </h2>
        {article.excerpt ? <p className={styles.excerpt}>{article.excerpt}</p> : null}
        <div className={styles.meta}>
          <time dateTime={article.date}>{article.dateLabel}</time>
          <span>
            <CommentIcon />
            {article.comments}
          </span>
          <span>
            <ViewsIcon />
            {article.views}
          </span>
        </div>
      </div>
    </article>
  );
}
