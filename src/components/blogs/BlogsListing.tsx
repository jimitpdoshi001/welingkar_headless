"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogCategory, BlogListingResult } from "@/lib/drupal";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import { BlogCard } from "./BlogCard";
import { FeaturedBlog } from "./FeaturedBlog";
import { ChevronDownIcon, HomeIcon, PlusIcon } from "./BlogIcons";
import styles from "./BlogsListing.module.scss";

const TABS = [
  { id: "all", label: "All" },
  { id: "campus-corner", label: "Campus Corner" },
  { id: "videos", label: "Videos" },
] as const;

type BlogsListingProps = {
  listing: BlogListingResult;
};

function parentOfSelected(categories: BlogCategory[], selectedKey: string | null): string | null {
  if (!selectedKey) return null;
  for (const category of categories) {
    if (category.slug === selectedKey || category.id === selectedKey) return category.slug || category.id;
    if (category.children.some((child) => child.slug === selectedKey || child.id === selectedKey)) return category.slug || category.id;
  }
  return null;
}

export function BlogsListing({ listing }: BlogsListingProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { featured, articles, categories, page, hasNext, hasPrev, pageNumbers, selectedCategoryId, month, tab, monthOptions } = listing;
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(() => parentOfSelected(categories, selectedCategoryId));

  const hrefFor = useMemo(() => {
    return (next: { page?: number; category?: string | null; month?: string; tab?: string }) => {
      const params = new URLSearchParams();
      const nextPage = next.page ?? 1;
      const nextCategory = next.category === undefined ? selectedCategoryId : next.category;
      const nextMonth = next.month === undefined ? month : next.month;
      const nextTab = next.tab === undefined ? tab : next.tab;

      if (nextPage > 1) params.set("page", String(nextPage));
      if (nextCategory) params.set("category", nextCategory);
      if (nextMonth) params.set("month", nextMonth);
      if (nextTab && nextTab !== "all") params.set("tab", nextTab);

      const query = params.toString();
      return query ? `/blogs?${query}` : "/blogs";
    };
  }, [month, selectedCategoryId, tab]);

  function navigate(next: { page?: number; category?: string | null; month?: string; tab?: string }) {
    startTransition(() => {
      router.push(hrefFor(next));
    });
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" aria-label="Home">
            <HomeIcon />
          </Link>
          <span aria-hidden="true">/</span>
          <span>Blogs</span>
        </nav>

        <h1 className={styles.heading}>Blogs & Articles</h1>

        {featured ? <FeaturedBlog article={featured} /> : null}

        <div className={styles.tabs} role="tablist" aria-label="Blog sections">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={tab === item.id ? styles.tabActive : styles.tab}
              onClick={() => navigate({ page: 1, tab: item.id, category: null })}>
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <label className={styles.monthLabel}>
              <span className={styles.visuallyHidden}>Select month</span>
              <select
                className={styles.monthSelect}
                value={month}
                onChange={(event) => navigate({ page: 1, month: event.target.value })}
                aria-label="Select month">
                <option value="">Select Month</option>
                {monthOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon />
            </label>

            <h2 className={styles.categoriesHeading}>Categories</h2>
            <ul className={styles.categories}>
              {categories.map((item) => {
                const itemKey = item.slug || item.id;
                const isOpen = openCategoryId === itemKey || openCategoryId === item.id;
                const isActive = selectedCategoryId === itemKey || selectedCategoryId === item.id;
                const subcategories =
                  item.children.length > 0
                    ? item.children
                    : [{ id: item.id, name: "All", slug: item.slug, weight: "0", drupal_internal__tid: 0, children: [] }];

                return (
                  <li key={item.id}>
                    <div className={styles.categoryRow}>
                      <button
                        type="button"
                        className={isActive ? styles.categoryActive : styles.category}
                        onClick={() => navigate({ page: 1, category: isActive ? null : itemKey, tab: "all" })}
                        aria-pressed={isActive}>
                        <span>{item.name}</span>
                      </button>
                      <button
                        type="button"
                        className={`${styles.categoryToggle} ${isOpen ? styles.categoryToggleOpen : ""}`}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.name}`}
                        onClick={() => setOpenCategoryId(isOpen ? null : itemKey)}>
                        <PlusIcon />
                      </button>
                    </div>

                    {isOpen ? (
                      <ul className={styles.subcategories}>
                        {subcategories.map((child) => {
                          const childKey = child.slug || child.id;
                          const childActive = selectedCategoryId === childKey || selectedCategoryId === child.id;
                          return (
                            <li key={child.id}>
                              <button
                                type="button"
                                className={childActive ? styles.categoryActive : styles.category}
                                onClick={() => navigate({ page: 1, category: childActive ? null : childKey, tab: "all" })}
                                aria-pressed={childActive}>
                                <span>{child.name}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className={`${styles.content} ${isPending ? styles.contentPending : ""}`}>
            {isPending ? (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner} />
                <span>Loading…</span>
              </div>
            ) : null}
            {articles.length ? (
              <div className={styles.grid}>
                {articles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>No articles match the selected filters.</p>
            )}

            {articles.length > 0 || hasPrev ? (
              <nav className={styles.pagination} aria-label="Blog pagination">
                {hasPrev ? (
                  <Link href={hrefFor({ page: page - 1 })} prefetch={false} className={styles.pageArrow} aria-label="Previous page">
                    <ArrowLeft height={9} width={7} />
                  </Link>
                ) : (
                  <span className={styles.pageArrow} aria-disabled="true" aria-label="Previous page">
                    <ArrowLeft height={9} width={7} />
                  </span>
                )}
                {pageNumbers.map((number) =>
                  number === page ? (
                    <span key={number} className={styles.pageNumActive} aria-current="page">
                      {number}
                    </span>
                  ) : (
                    <Link key={number} href={hrefFor({ page: number })} prefetch={false} className={styles.pageNum}>
                      {number}
                    </Link>
                  ),
                )}
                {hasNext ? (
                  <Link href={hrefFor({ page: page + 1 })} prefetch={false} className={styles.pageArrow} aria-label="Next page">
                    <ArrowRight height={9} width={7} />
                  </Link>
                ) : (
                  <span className={styles.pageArrow} aria-disabled="true" aria-label="Next page">
                    <ArrowRight height={9} width={7} />
                  </span>
                )}
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
