import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/drupal";
import { CommentIcon, ViewsIcon } from "./BlogIcons";
import styles from "./BlogCard.module.scss";

type BlogCardProps = {
  article: BlogArticle;
};

export function BlogCard({ article }: BlogCardProps) {
  const decodeHtml = (text: string) => text.replace(/&amp;/g, "&");
  return (
    <article className={styles.card}>
      <Link
        href={article.href}
        className={styles.mediaLink}>
        <div className={styles.media}>
          {article.image ? (
            <Image
              src={article.image.url}
              alt={article.image.alt || article.title}
              fill
              sizes="(max-width: 767px) 90vw, (max-width: 1024px) 45vw, 22vw"
              className={styles.image}
            />
          ) : (
            <div
              className={styles.placeholder}
              aria-hidden="true"
            />
          )}
          {article.tags.length > 0 ? (
            <ul className={styles.tags}>
              {article.tags.slice(0, 2).map((tag) => (
                <li key={tag}>{decodeHtml(tag)}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={article.href}>{article.title}</Link>
        </h3>
        <div className={styles.meta}>
          <time dateTime={article.date}>{article.dateLabel}</time>
          <span>
            <CommentIcon />
            <span className="sr-only">Comments</span>
            {article.comments}
          </span>
          <span>
            <ViewsIcon />
            {article.views}
          </span>
        </div>
        <Link
          href={article.href}
          className={styles.readMore}>
          Read More
        </Link>
      </div>
    </article>
  );
}
