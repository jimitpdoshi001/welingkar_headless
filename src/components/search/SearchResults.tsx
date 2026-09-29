import Link from "next/link";
import type { DrupalSearchResult } from "@/lib/drupal";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./SearchResults.module.scss";
import clsx from "clsx";

type SearchResultsProps = {
  listing: DrupalSearchResult;
};

export function SearchResults({ listing }: SearchResultsProps) {
  const { keys, items, total, page, hasNext, hasPrev, pageNumbers } = listing;

  const hrefFor = (nextPage: number) => {
    const params = new URLSearchParams();
    if (keys) params.set("q", keys);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `/search?${query}` : "/search";
  };

  return (
    <div className={clsx("container", styles.page)}>
      <h1 className={styles.heading}>{keys ? `Search results for "${keys}"` : "Search"}</h1>
      {keys ? (
        <p className={styles.count}>
          {total} {total === 1 ? "result" : "results"}
        </p>
      ) : null}

      {!keys ? (
        <p className={styles.empty}>Enter a search term to find pages, blogs, news, and faculty.</p>
      ) : items.length === 0 ? (
        <p className={styles.empty}>No results matched “{keys}”.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={item.id}
              className={styles.item}>
              <span className={styles.type}>{item.typeLabel}</span>
              <Link
                href={item.href}
                className={styles.title}>
                {item.title}
              </Link>
              {item.excerpt ? <p className={styles.excerpt}>{item.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 || hasPrev ? (
        <nav
          className={styles.pagination}
          aria-label="Search pagination">
          {hasPrev ? (
            <Link
              href={hrefFor(page - 1)}
              prefetch={false}
              className={styles.pageArrow}
              aria-label="Previous page">
              <ArrowLeft
                height={9}
                width={7}
              />
            </Link>
          ) : (
            <span
              className={styles.pageArrow}
              aria-disabled="true"
              aria-label="Previous page">
              <ArrowLeft
                height={9}
                width={7}
              />
            </span>
          )}
          {pageNumbers.map((number) =>
            number === page ? (
              <span
                key={number}
                className={styles.pageNumActive}
                aria-current="page">
                {number}
              </span>
            ) : (
              <Link
                key={number}
                href={hrefFor(number)}
                prefetch={false}
                className={styles.pageNum}>
                {number}
              </Link>
            ),
          )}
          {hasNext ? (
            <Link
              href={hrefFor(page + 1)}
              prefetch={false}
              className={styles.pageArrow}
              aria-label="Next page">
              <ArrowRight
                height={9}
                width={7}
              />
            </Link>
          ) : (
            <span
              className={styles.pageArrow}
              aria-disabled="true"
              aria-label="Next page">
              <ArrowRight
                height={9}
                width={7}
              />
            </span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
