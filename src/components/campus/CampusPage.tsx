import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { CardCarousel } from "./CardCarousel/CardCarousel";
import type { CampusData } from "@/lib/campus/campus-data";
import styles from "./CampusPage.module.scss";

export function CampusPage({ data }: { data: CampusData }) {
  const accentVar = data.accent === "orange" ? "var(--color-orange)" : "var(--color-primary)";

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main style={{ ["--faculty-accent" as string]: accentVar }}>
          <section className={styles.hero}>
            <img
              src={data.hero.image}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <p className={styles.eyebrow}>{data.bannerTitle}</p>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
              <Link
                href={data.hero.cta.href}
                className="btn accent">
                {data.hero.cta.label}
              </Link>
            </div>
          </section>

          <nav
            className={styles.inPageNav}
            aria-label="Campus sections">
            <div className={`container ${styles.inPageNavInner}`}>
              {data.nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.inPageLink} ${i === 0 ? styles.inPageActive : ""}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <section
            id="about"
            className={`container ${styles.about}`}>
            <h2 className={styles.aboutHeading}>{data.about.heading}</h2>
            {data.about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={styles.aboutBody}>
                {p}
              </p>
            ))}
            <div className={styles.stats}>
              {data.about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            id="faculty"
            className="bg-light-yellow">
            <div className={`container ${styles.block} ${styles.facultyGrid}`}>
              <div
                className={styles.facultyMedia}
                style={{ backgroundImage: `url(${data.faculty.image})` }}>
                <div className={styles.facultyTabs}>
                  {data.faculty.categories.map((cat, i) => (
                    <span
                      key={cat}
                      className={`${styles.facultyTab} ${i === 0 ? styles.facultyTabActive : ""}`}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.facultyText}>
                <h2 className={styles.facultyHeading}>{data.faculty.heading}</h2>
                <p className={styles.facultyBody}>{data.faculty.description}</p>
                <Link
                  href={data.faculty.cta.href}
                  className="btn accent">
                  {data.faculty.cta.label}
                </Link>
              </div>
            </div>
          </section>

          <section
            id="programmes"
            className="bg-secondary">
            <div className={`container ${styles.block}`}>
              <CardCarousel
                heading={data.programmes.heading}
                description={data.programmes.description}
                cards={data.programmes.cards}
                cta={data.programmes.cta}
                theme="onDark"
                overlayCaption
              />
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <div className={styles.recruiters}>
              <h2 className={styles.recHeading}>{data.recruiters.heading}</h2>
              <p className={styles.recDescription}>{data.recruiters.description}</p>
              <div className={styles.logoStrip}>
                {data.recruiters.logos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.image}
                    alt={logo.name}
                    className={styles.logo}
                  />
                ))}
              </div>
              <div className={styles.recCta}>
                <Link
                  href={data.recruiters.cta.href}
                  className="btn accent">
                  {data.recruiters.cta.label}
                </Link>
              </div>
            </div>
          </section>

          <section
            id="life"
            className={styles.life}>
            <img
              src={data.life.image}
              alt=""
              className={styles.lifeImage}
            />
            <div className={styles.lifeOverlay} />
            <div className={`container ${styles.lifeInner}`}>
              <h2 className={styles.lifeHeading}>{data.life.heading}</h2>
              <div className={styles.lifeCard}>
                <p className={styles.lifeBody}>{data.life.body}</p>
                <Link
                  href={data.life.cta.href}
                  className="btn accent">
                  {data.life.cta.label}
                </Link>
              </div>
            </div>
          </section>

          <section
            id="infrastructure"
            className="bg-secondary">
            <div className={`container ${styles.block}`}>
              <CardCarousel
                heading={data.infrastructure.heading}
                description={data.infrastructure.description}
                cards={data.infrastructure.cards}
                theme="onDark"
              />
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

export default CampusPage;
