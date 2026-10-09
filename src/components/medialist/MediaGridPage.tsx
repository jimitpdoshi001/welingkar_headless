import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { MediaGridData } from "@/lib/medialist/media-data";
import styles from "./MediaGridPage.module.scss";

export function MediaGridPage({ data }: { data: MediaGridData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main>
          <section className={styles.hero}>
            <img
              src={data.hero.image}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <nav className={styles.breadcrumb}>
                <Link href="/">Home</Link> <span>›</span> <span>{data.hero.crumb}</span>
              </nav>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            {data.tabs && (
              <div className={styles.tabs}>
                {data.tabs.map((t) => (
                  <Link
                    key={t.label}
                    href={t.href}
                    className={`${styles.tab} ${t.active ? styles.tabActive : ""}`}>
                    {t.label}
                  </Link>
                ))}
              </div>
            )}

            <div className={styles.filterBar}>
              {data.tabs ? (
                data.filters.map((f) => (
                  <span
                    key={f}
                    className={styles.select}>
                    {f} ▾
                  </span>
                ))
              ) : (
                <>
                  <div className={styles.years}>
                    {data.filters.map((y, i) => (
                      <span
                        key={y}
                        className={`${styles.year} ${i === 0 ? styles.yearActive : ""}`}>
                        {y}
                      </span>
                    ))}
                  </div>
                  <span className={styles.select}>Select Campus ▾</span>
                </>
              )}
            </div>

            <div className={styles.grid}>
              {data.cards.map((c) => (
                <article
                  key={c.id}
                  className={styles.card}>
                  <img
                    src={c.image}
                    alt=""
                  />
                  <div className={styles.caption}>
                    <p className={styles.date}>{c.date}</p>
                    <p className={styles.text}>{c.text}</p>
                    <Link
                      href={c.href}
                      className="btn accent">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {data.loadMore && (
              <div className={styles.loadMore}>
                <button
                  type="button"
                  className="btn accent-outline">
                  Load More
                </button>
              </div>
            )}
          </section>
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default MediaGridPage;
