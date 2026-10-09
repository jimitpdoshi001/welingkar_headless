import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { WeResearchData } from "@/lib/weresearch/weresearch-data";
import styles from "./WeResearchPage.module.scss";

export function WeResearchPage({ data }: { data: WeResearchData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main>
          {/* Hero */}
          <section className={styles.hero}>
            <img
              src={data.hero.image}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <nav className={styles.breadcrumb}>
                <Link href="/">Home</Link> <span>›</span> <span>WeResearch</span>
              </nav>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              <p className={styles.heroBody}>{data.hero.body}</p>
              <Link
                href={data.hero.cta.href}
                className="btn accent">
                {data.hero.cta.label}
              </Link>
            </div>
          </section>

          {/* Research Areas */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <h2 className={styles.heading}>{data.areas.heading}</h2>
              <div className={styles.pills}>
                {data.areas.items.map((a, i) => (
                  <span
                    key={a}
                    className={`${styles.pill} ${i === 0 ? styles.pillActive : ""}`}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Awarded & Recognised Papers */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.awarded.heading}</h2>
            <p className={styles.sectionBody}>{data.awarded.description}</p>
            <div className={styles.awardGrid}>
              {data.awarded.papers.map((p) => (
                <article
                  key={p.id}
                  className={styles.awardCard}>
                  <div className={styles.cardTop}>
                    <span className={styles.tag}>{p.area}</span>
                    <span className={styles.year}>{p.year}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardAuthors}>{p.authors}</p>
                  <p className={styles.cardMeta}>{p.journal}</p>
                  <div className={styles.awardBadge}>
                    <span aria-hidden="true">🏆</span> {p.award}
                  </div>
                  <Link
                    href={p.href}
                    className="btn accent-outline">
                    View Paper
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* All Research Papers */}
          <section className={styles.papers}>
            <img
              src={data.allPapers.image}
              alt=""
              className={styles.papersBg}
            />
            <div className={styles.papersOverlay} />
            <div className={`container ${styles.papersInner}`}>
              <h2 className={styles.headingLight}>{data.allPapers.heading}</h2>
              <p className={styles.sectionBodyLight}>{data.allPapers.description}</p>
              <div className={styles.papersPanel}>
                <div className={styles.searchRow}>
                  <input
                    className={styles.search}
                    type="search"
                    placeholder="Search research by title, author, keyword, publication or year"
                    aria-label="Search research"
                  />
                  <span className={styles.select}>By Years ▾</span>
                  <span className={styles.select}>All Areas ▾</span>
                </div>
                <div className={styles.pills}>
                  {data.areas.items.map((a, i) => (
                    <span
                      key={a}
                      className={`${styles.pill} ${i === 0 ? styles.pillActive : ""}`}>
                      {a}
                    </span>
                  ))}
                </div>
                <div className={styles.paperList}>
                  {data.allPapers.papers.map((p) => (
                    <article
                      key={p.id}
                      className={styles.paperItem}>
                      <div className={styles.cardTop}>
                        <span className={styles.tag}>{p.area}</span>
                        <span className={styles.year}>{p.year}</span>
                      </div>
                      <h3 className={styles.paperTitle}>{p.title}</h3>
                      <p className={styles.cardAuthors}>{p.authors}</p>
                      <p className={styles.cardMeta}>{p.journal}</p>
                      <p className={styles.abstract}>{p.abstract}</p>
                      <Link
                        href={p.href}
                        className="btn accent-outline">
                        Read Paper
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Books Published */}
          <section className="bg-secondary">
            <div className={`container ${styles.block}`}>
              <h2 className={styles.headingLight}>{data.books.heading}</h2>
              <p className={styles.sectionBodyLight}>{data.books.description}</p>
              <div className={styles.scrollRow}>
                {data.books.items.map((b) => (
                  <article
                    key={b.id}
                    className={styles.bookCard}>
                    <span className={styles.tagOutline}>ISBN</span>
                    <h3 className={styles.cardTitle}>{b.title}</h3>
                    <p className={styles.cardAuthors}>{b.authors}</p>
                    <p className={styles.cardMetaItalic}>{b.publisher}</p>
                    <div className={styles.bookFoot}>
                      <span className={styles.year}>{b.year}</span>
                      <Link
                        href={b.href}
                        className="btn accent-outline">
                        View Paper
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Authored Cases */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.cases.heading}</h2>
            <p className={styles.sectionBody}>{data.cases.description}</p>
            <div className={styles.scrollRow}>
              {data.cases.items.map((c) => (
                <article
                  key={c.id}
                  className={styles.caseCard}>
                  <span className={styles.year}>{c.year}</span>
                  <span className={styles.tag}>{c.publisher}</span>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardAuthors}>{c.authors}</p>
                  <p className={styles.cardMetaItalic}>{c.source}</p>
                  <p className={styles.abstract}>{c.abstract}</p>
                  <Link
                    href={c.href}
                    className="btn accent-outline">
                    View Case
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Magazine Articles */}
          <section className={styles.magazine}>
            <img
              src={data.magazine.image}
              alt=""
              className={styles.magazineBg}
            />
            <div className={styles.magazineOverlay} />
            <div className={`container ${styles.magazineInner}`}>
              <h2 className={styles.headingLight}>{data.magazine.heading}</h2>
              <p className={styles.sectionBodyLight}>{data.magazine.description}</p>
              <div className={styles.magazineGrid}>
                {data.magazine.items.map((m) => (
                  <article
                    key={m.id}
                    className={styles.magazineCard}>
                    <div className={styles.cardTop}>
                      <span className={styles.tag}>{m.area}</span>
                      <span className={styles.year}>{m.date}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{m.title}</h3>
                    <p className={styles.cardAuthors}>{m.author}</p>
                    <p className={styles.cardMetaItalic}>{m.source}</p>
                    <Link
                      href={m.href}
                      className={styles.readLink}>
                      Read Article
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Conference Articles */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.conference.heading}</h2>
            <p className={styles.sectionBody}>{data.conference.description}</p>
            <div className={styles.confList}>
              {data.conference.items.map((c) => (
                <article
                  key={c.id}
                  className={styles.confItem}>
                  <div className={styles.confText}>
                    <h3 className={styles.confTitle}>{c.title}</h3>
                    <p className={styles.confMeta}>
                      <strong>{c.authors}</strong> <em>{c.conference}</em>
                    </p>
                    <p className={styles.cardMeta}>{c.proceedings}</p>
                  </div>
                  <Link
                    href={c.href}
                    className="btn accent-outline">
                    View Article
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Aweshkar Journal */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <div className={styles.journalTop}>
                <div>
                  <h2 className={styles.heading}>{data.journal.heading}</h2>
                  <p className={styles.sectionBody}>{data.journal.body}</p>
                </div>
                <img
                  src={data.journal.image}
                  alt=""
                  className={styles.journalImage}
                />
              </div>
              <div className={styles.archiveHead}>
                <h3 className={styles.archiveHeading}>{data.journal.archiveHeading}</h3>
                <Link
                  href={data.journal.cta.href}
                  className={styles.readLinkDark}>
                  {data.journal.cta.label}
                </Link>
              </div>
              <div className={styles.issueRow}>
                {data.journal.issues.map((iss) => (
                  <Link
                    key={iss.id}
                    href={iss.href}
                    className={`${styles.issueCard} ${iss.latest ? styles.issueActive : ""}`}>
                    <span className={styles.issueVol}>{iss.volume}</span>
                    <span className={styles.issueLabel}>{iss.label}</span>
                    {iss.latest && <span className={styles.issueTag}>Latest</span>}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default WeResearchPage;
