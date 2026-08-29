"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogArticle, BlogCategory } from "@/lib/drupal";
import { BlogCard } from "./BlogCard";
import { FeaturedBlog } from "./FeaturedBlog";
import { ChevronDownIcon, HomeIcon, PlusIcon } from "./BlogIcons";
import styles from "./BlogsListing.module.scss";

const TABS = [
  { id: "all", label: "All" },
  { id: "campus-corner", label: "Campus Corner" },
  { id: "videos", label: "Videos" },
] as const;

const PAGE_SIZE = 9;

type BlogsListingProps = {
  articles: BlogArticle[];
  categories: BlogCategory[];
};

function pickFeatured(articles: BlogArticle[]): BlogArticle | null {
  if (!articles.length) return null;
  const sticky = articles.find((article) => article.featured);
  return sticky ?? articles[0] ?? null;
}

export function BlogsListing({ articles, categories }: BlogsListingProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const featured = useMemo(() => pickFeatured(articles), [articles]);

  const monthOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const article of articles) {
      map.set(article.monthKey, article.monthLabel);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      if (featured && article.id === featured.id) return false;
      if (tab === "campus-corner" && !article.categories.includes("Campus Corner")) return false;
      if (tab === "videos" && !article.isVideo) return false;
      if (month && article.monthKey !== month) return false;
      if (category && !article.categories.includes(category)) return false;
      return true;
    });
  }, [articles, category, featured, month, tab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 3);

  function setTabValue(next: (typeof TABS)[number]["id"]) {
    setTab(next);
    setPage(1);
    if (next === "campus-corner") setCategory("Campus Corner");
    if (next === "all") setCategory("");
  }

  function setCategoryValue(name: string) {
    setCategory((current) => (current === name ? "" : name));
    setPage(1);
    if (name === "Campus Corner") setTab("campus-corner");
    else setTab("all");
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
              onClick={() => setTabValue(item.id)}>
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
                onChange={(event) => {
                  setMonth(event.target.value);
                  setPage(1);
                }}
                aria-label="Select month">
                <option value="">Select Month</option>
                {monthOptions.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon />
            </label>

            <h2 className={styles.categoriesHeading}>Categories</h2>
            <ul className={styles.categories}>
              {categories.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={category === item.name ? styles.categoryActive : styles.category}
                    onClick={() => setCategoryValue(item.name)}
                    aria-pressed={category === item.name}>
                    <span>{item.name}</span>
                    <PlusIcon />
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.content}>
            {paged.length ? (
              <div className={styles.grid}>
                {paged.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>No articles match the selected filters.</p>
            )}

            {filtered.length > 0 ? (
              <nav className={styles.pagination} aria-label="Blog pagination">
                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}>
                  Previous
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    type="button"
                    className={number === currentPage ? styles.pageNumActive : styles.pageNum}
                    onClick={() => setPage(number)}
                    aria-current={number === currentPage ? "page" : undefined}>
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                  disabled={currentPage === pageCount}>
                  Next
                </button>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
