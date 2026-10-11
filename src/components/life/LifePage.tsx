import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { LifeData } from "@/lib/life/life-data";
import styles from "./LifePage.module.scss";

export function LifePage({ data }: { data: LifeData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

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
                <Link href="/">Home</Link> <span>›</span> <span>Life @ WeSchool</span>
              </nav>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
            </div>
          </section>

          {/* Intro + collage */}
          <section className={`container ${styles.block} ${styles.intro}`}>
            <div className={styles.introText}>
              {data.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className={styles.introHighlight}>{data.intro.highlight}</p>
            </div>
            <div className={styles.collage}>
              <img
                src={data.intro.images[0]}
                alt=""
                className={styles.collageMain}
              />
              <img
                src={data.intro.images[1]}
                alt=""
                className={styles.collageA}
              />
              <img
                src={data.intro.images[2]}
                alt=""
                className={styles.collageB}
              />
            </div>
          </section>

          {/* Tabs */}
          <div className={styles.tabsWrap}>
            <div className={`container ${styles.tabs}`}>
              {data.tabs.map((t, i) => (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={i === data.activeTab ? "page" : undefined}
                  className={`${styles.tab} ${i === data.activeTab ? styles.tabActive : ""}`}>
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Campus feature cards */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.campus.heading}</h2>
            <p className={styles.sub}>{data.campus.subtitle}</p>
            <div className={styles.cardGrid}>
              {data.campus.cards.map((c) => (
                <article
                  key={c.id}
                  className={styles.featureCard}>
                  <img
                    src={c.image}
                    alt=""
                  />
                  <div className={styles.featureBody}>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Facilities + Hostel/Address */}
          <section className={`container ${styles.block}`}>
            <div className={styles.infoBar}>
              <h3>{data.facilities.heading}</h3>
              <p>{data.facilities.text}</p>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoBox}>
                <h3>{data.hostel.heading}</h3>
                <p>{data.hostel.text}</p>
              </div>
              <div className={styles.infoBox}>
                <h3>{data.address.heading}</h3>
                <p>{data.address.text}</p>
              </div>
            </div>
          </section>

          {/* Run by students */}
          <section className={styles.cells}>
            <img
              src={data.cells.image}
              alt=""
              className={styles.cellsBg}
            />
            <div className={styles.cellsOverlay} />
            <div className={`container ${styles.cellsInner}`}>
              <h2 className={styles.headingLight}>{data.cells.heading}</h2>
              <p className={styles.cellsBody}>{data.cells.body}</p>
              <div className={styles.cellGrid}>
                {data.cells.items.map((c) => (
                  <div
                    key={c.title}
                    className={styles.cell}>
                    <h4>{c.title}</h4>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Two years in pictures */}
          <section className="bg-secondary">
            <div className={`container ${styles.block}`}>
              <div className={styles.galleryHead}>
                <div>
                  <h2 className={styles.headingLight}>{data.gallery.heading}</h2>
                  <p className={styles.sectionBodyLight}>{data.gallery.subtitle}</p>
                  <div className={styles.galleryFilters}>
                    {data.gallery.filters.map((f, i) => (
                      <span
                        key={f}
                        className={`${styles.galleryFilter} ${i === 0 ? styles.galleryFilterActive : ""}`}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={data.gallery.cta.href}
                  className="btn accent-outline-light">
                  {data.gallery.cta.label}
                </Link>
              </div>
              <div className={styles.galleryGrid}>
                {data.gallery.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Happening now */}
          <section className={`container ${styles.block}`}>
            <div className={styles.rowHead}>
              <div>
                <h2 className={styles.heading}>{data.happening.heading}</h2>
                <p className={styles.sub}>{data.happening.subtitle}</p>
              </div>
            </div>
            <div className={styles.eventRow}>
              {data.happening.events.map((e) => (
                <article
                  key={e.id}
                  className={styles.eventCard}>
                  <h3>{e.title}</h3>
                  <p className={styles.eventWhen}>{e.when}</p>
                  <p className={styles.eventHost}>{e.host}</p>
                  <p className={styles.eventDesc}>{e.desc}</p>
                  <Link
                    href={e.href}
                    className={styles.readLink}>
                    Details and registration →
                  </Link>
                </article>
              ))}
            </div>
            <div className={styles.rowCta}>
              <Link
                href={data.happening.cta.href}
                className={styles.readLink}>
                {data.happening.cta.label}
              </Link>
            </div>
          </section>

          {/* Ideas */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <h2 className={styles.heading}>{data.ideas.heading}</h2>
              <p className={styles.sub}>{data.ideas.subtitle}</p>
              <div className={styles.cardGrid3}>
                {data.ideas.stories.map((s) => (
                  <article
                    key={s.id}
                    className={styles.featureCard}>
                    <img
                      src={s.image}
                      alt=""
                    />
                    <div className={styles.featureBody}>
                      <span className={styles.storyTag}>{s.tag}</span>
                      <h3>{s.title}</h3>
                      <p className={styles.storyMeta}>{s.meta}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className={styles.ideasNote}>{data.ideas.note}</p>
            </div>
          </section>

          {/* For current students */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.students.heading}</h2>
            <div className={styles.studentGrid}>
              {data.students.items.map((s) => (
                <div
                  key={s.title}
                  className={styles.studentCard}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Come see it for yourself */}
          <section className={`bg-secondary ${styles.visit}`}>
            <div className={`container ${styles.visitInner}`}>
              <h2 className={styles.headingLight}>{data.visit.heading}</h2>
              <p className={styles.visitSub}>{data.visit.subtitle}</p>
              <div className={styles.visitCtas}>
                <Link
                  href={data.visit.primary.href}
                  className="btn accent">
                  {data.visit.primary.label}
                </Link>
                <Link
                  href={data.visit.secondary.href}
                  className="btn accent-outline-light">
                  {data.visit.secondary.label}
                </Link>
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

export default LifePage;
