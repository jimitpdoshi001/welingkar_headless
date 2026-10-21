import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { LifeData } from "@/lib/life/life-data";
import { StickyInPageNav } from "@/components/campus/StickyInPageNav/StickyInPageNav";
import { LifeCarousel } from "./LifeCarousel/LifeCarousel";
import styles from "./LifePage.module.scss";

export function LifePage({ data }: { data: LifeData }) {
  // Bengaluru uses a terracotta/red accent (Figma 1445:129); Mumbai is purple.
  const isRed = data.accent === "red";

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        {/* data-auto-reveal: scroll fade-in for text, media and buttons.
            --life-band drives the gallery/visit band colour per campus. */}
        <main
          data-auto-reveal=""
          style={{ ["--life-band" as string]: isRed ? "#b04535" : "var(--color-secondary)" }}>
          {/* Hero (Figma 1384:134): 650px, breadcrumb top-left, title bottom-left. */}
          <section className={styles.hero}>
            <img
              src={data.hero.image}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <nav
                className={styles.breadcrumb}
                aria-label="Breadcrumb">
                <Link href="/">Home</Link> <span>-</span> <span>Life @ WeSchool</span>
              </nav>
              <div>
                <h1 className={styles.heroTitle}>{data.hero.title}</h1>
                <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
              </div>
            </div>
          </section>

          {/* Intro + collage (Figma 1384:359, 1392:137) */}
          <section className={styles.introBand}>
            <div className={`container ${styles.intro}`}>
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
            </div>
          </section>

          {/* Campus tabs (Figma 1477:131): docks under the header once scrolled past. */}
          <StickyInPageNav
            className={styles.tabsBar}
            label="Campus">
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
          </StickyInPageNav>

          {/* Campus feature cards: 400 x 500, glass caption; hover turns the card purple. */}
          <section className={`container ${styles.campus}`}>
            <h2 className={styles.heading}>{data.campus.heading}</h2>
            <p className={styles.sub}>{data.campus.subtitle}</p>
            <div className={styles.cardGrid}>
              {data.campus.cards.map((c) => (
                <article
                  key={c.id}
                  className={`${styles.featureCard} ${isRed ? styles.featureCardred : ""}`}>
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

            {/* Facilities + Hostel/Address: 20px below the cards (Figma 1397:257). */}
            <div className={styles.infoBar}>
              <h3>{data.facilities.heading}</h3>
              <p>{data.facilities.text}</p>
            </div>
            <div className={styles.infoBar}>
                <h3>{data.hostel.heading}</h3>
                <p>{data.hostel.lines}</p>
              {/* <div className={styles.infoBox}>
                <h3>{data.address.heading}</h3>
                <p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}>
                    {data.address.text}
                  </a>
                  <span className={styles.line}>
                    TEL :{" "}
                    <a
                      href={`tel:${data.address.tel.replace(/[^\d+]/g, "")}`}
                      className={styles.telLink}>
                      {data.address.tel}
                    </a>
                  </span>
                </p>
              </div> */}
            </div>
          </section>

          {/* Run by students (Figma 1409:221): 872px photo band, copy top-left, cells bottom. */}
          <section className={styles.cells}>
            <img
              src={data.cells.image}
              alt=""
              className={styles.cellsBg}
            />
            <div className={styles.cellsOverlay} />
            <div className={`container ${styles.cellsInner}`}>
              <div className={styles.cellsIntro}>
                <h2 className={styles.headingLight}>{data.cells.heading}</h2>
                {data.cells.body.split("\n").map((para, i) => (
                  <p
                    key={i}
                    className={styles.cellsBody}>
                    {para}
                  </p>
                ))}
              </div>
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

          {/* Two years in pictures (Figma 1413:323): full-bleed rows of 295px squares;
              the first row scrolls continuously left to right. */}
          <section className={styles.gallery}>
            <div className={`container ${styles.galleryHead}`}>
              <div className={styles.galleryHeadText}>
                <h2 className={styles.headingLight}>{data.gallery.heading}</h2>
                <p className={styles.sectionBodyLight}>
                  {data.gallery.subtitle[0]} {data.gallery.subtitle[1]}
                </p>
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
                className={styles.outlineBtn}>
                {data.gallery.cta.label}
              </Link>
            </div>
            <div className={styles.galleryRows}>
              {/* Two copies so the -50% translate loops seamlessly. */}
              <div
                className={`${styles.galleryRow} ${styles.galleryMarquee}`}
                aria-hidden="true">
                {[...data.gallery.images.slice(0, 5), ...data.gallery.images.slice(0, 5), ...data.gallery.images.slice(0, 5), ...data.gallery.images.slice(0, 5)].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                  />
                ))}
              </div>
              {/* Row 2: same looping technique, reversed (four copies of the second set). */}
              <div
                className={`${styles.galleryRow} ${styles.galleryRowOffset}`}
                aria-hidden="true">
                {[...data.gallery.images.slice(5), ...data.gallery.images.slice(5), ...data.gallery.images.slice(5), ...data.gallery.images.slice(5)].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Happening now (Figma 1419:328): 505 x 280 outlined cards with arrows. */}
          <section className={styles.happening}>
            <div className="container">
              <LifeCarousel
                label="events"
                slideClassName={styles.eventSlide}
                header={
                  <div>
                    <h2 className={styles.heading}>{data.happening.heading}</h2>
                    <p className={styles.subTight}>{data.happening.subtitle}</p>
                  </div>
                }>
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
              </LifeCarousel>
              <div className={styles.rowCta}>
                <Link
                  href={data.happening.cta.href}
                  className={styles.readLink}>
                  {data.happening.cta.label} →
                </Link>
              </div>
            </div>
          </section>

          {/* Ideas (Figma 1419:326 band, 1419:425 cards) */}
          <section className={styles.ideas}>
            <div className="container">
              <LifeCarousel
                label="stories"
                slideClassName={styles.storySlide}
                header={
                  <div>
                    <h2 className={styles.heading}>{data.ideas.heading}</h2>
                    <p className={styles.subTight}>{data.ideas.subtitle}</p>
                  </div>
                }>
                {data.ideas.stories.map((s) => (
                  <article
                    key={s.id}
                    className={`${styles.featureCard} ${styles.storyCard} ${isRed ? styles.featureCardred : ""}`}>
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
              </LifeCarousel>
              {/* The trailing email address in the note becomes a mailto link. */}
              <p className={styles.ideasNote}>
                {data.ideas.note.replace(/\S+@\S+$/, "")}
                <a href={`mailto:${data.ideas.note.match(/\S+@\S+$/)?.[0] ?? ""}`}>{data.ideas.note.match(/\S+@\S+$/)?.[0]}</a>
              </p>
            </div>
          </section>

          {/* For current students (Figma 1419:447): 294 x 130 outlined cards. */}
          <section className={`${styles.students}`}>
            <div className="container">
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
            </div>
          </section>

          {/* Come see it for yourself (Figma 1424:487): 350px purple band. */}
          {/* <section className={styles.visit}>
            <div className="container">
              <h2 className={styles.headingLight}>{data.visit.heading}</h2>
              <p className={styles.visitSub}>{data.visit.subtitle}</p>
              <div className={styles.visitCtas}>
                <Link
                  href={data.visit.primary.href}
                  className={styles.fillBtn}>
                  {data.visit.primary.label}
                </Link>
                <Link
                  href={data.visit.secondary.href}
                  className={styles.outlineBtn}>
                  {data.visit.secondary.label}
                </Link>
              </div>
            </div>
          </section> */}
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default LifePage;
