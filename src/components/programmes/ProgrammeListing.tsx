import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { listingImage, type ProgrammeListingData } from "@/lib/programmes/listing-data";
import styles from "./ProgrammeListing.module.scss";

// Programme listing (Figma 627:1158): hero, section nav, category pills on a
// purple strip, intro, then rows alternating image | card on white and
// card | image on a lavender band.
export function ProgrammeListing({ data }: { data: ProgrammeListingData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main
          style={
            {
              "--listing-strip": data.theme.strip,
              "--listing-tint": data.theme.tint,
              "--listing-button": data.theme.button,
            } as React.CSSProperties
          }>
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
                <Link
                  href="/"
                  aria-label="Home">
                  <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    aria-hidden="true">
                    <path
                      d="M1 5.5 6.5 1 12 5.5M2.5 4.3V10h3V7h2v3h3V4.3"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <span aria-hidden="true">-</span>
                <span>Programs</span>
              </nav>
              <div>
                <h1 className={styles.heroTitle}>{data.hero.title}</h1>
                <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
              </div>
            </div>
          </section>

          <div className={styles.strip}>
            <nav
              className={styles.sectionNav}
              aria-label="Campus sections">
              <div className={`container ${styles.sectionNavInner}`}>
                {data.nav.map((item, i) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${styles.sectionLink} ${i === 0 ? styles.sectionLinkActive : ""}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
            <nav
              className={`container ${styles.pills}`}
              aria-label="Program categories">
              {data.pills.map((pill, i) => (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className={`${styles.pill} ${i === 0 ? styles.pillActive : ""}`}
                  aria-current={i === 0 ? "page" : undefined}>
                  {pill.label}
                  <span
                    className={styles.caret}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </div>

          <section className={`container ${styles.intro}`}>
            <h2 className={styles.introHeading}>{data.intro.heading}</h2>
            <p className={styles.introBody}>{data.intro.body}</p>
          </section>

          {data.programmes.map((p, i) => {
            const banded = i % 2 === 1;
            return (
              <section
                key={p.slug}
                className={`${styles.rowSection} ${banded ? styles.banded : ""}`}>
                <div className={`container ${styles.row} ${banded ? styles.reverse : ""}`}>
                  <img
                    src={listingImage(data.campus, p.slug)}
                    alt=""
                    className={styles.image}
                  />
                  <div className={styles.card}>
                    <h3 className={`${styles.title} ${p.slug === "pgdm-media" ? styles.titleOneLine : ""}`}>{p.title}</h3>
                    <p className={styles.body}>{p.description}</p>
                    <p className={styles.intake}>{p.intake}</p>
                    <div className={styles.actions}>
                      <Link
                        href={p.href}
                        className={`btn ${styles.knowMore}`}>
                        Know More
                      </Link>
                      <Link
                        href={data.applyHref}
                        className={`btn ${styles.apply}`}>
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
