/* eslint-disable @next/next/no-img-element -- local static assets, same <img> pattern as other page shells */
import type { CSSProperties } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import type { LibraryData } from "@/lib/library/library-data";
import { DatabaseTabs } from "./DatabaseTabs";
import styles from "./LibraryPage.module.scss";

// Figma: Mumbai 2958:129, Bengaluru 2959:726 (same layout, per-campus accent).
export function LibraryPage({ data }: { data: LibraryData }) {
  const theme = { "--lib-accent": data.accent, "--lib-cta": data.ctaColor } as CSSProperties;
  const { hero, about, collection, databases, services, facilities, bestPractices, hours, membership } = data;

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main className={styles.page} style={theme}>
          {/* Hero: full-bleed photo with dark fades */}
          <section className={styles.hero}>
            <img src={hero.image} alt="" className={styles.heroImage} />
            <div className={styles.heroOverlay} aria-hidden="true" />
            <div className={`container ${styles.heroInner}`}>
              <WeResearchBreadcrumb current={data.campus} />
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>{hero.title}</h1>
                <p className={styles.heroSub}>{hero.subtitle}</p>
              </div>
            </div>
          </section>

          {/* About LRC */}
          <section className={styles.about}>
            <img src="/library/decor-triangle.svg" alt="" className={styles.decor} aria-hidden="true" />
            <div className="container">
              <h2 className={styles.heading}>{about.heading}</h2>
              <p className={styles.sub}>{about.subheading}</p>
              <div className={styles.aboutGrid}>
                <img src={about.image} alt={about.imageAlt} className={styles.aboutImage} />
                <div>
                  <p className={styles.aboutLead}>{about.lead}</p>
                  <p className={styles.aboutBody}>{about.body}</p>
                  <div className={styles.mission}>
                    <h3>{about.mission.title}</h3>
                    <p>{about.mission.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Overall Collection */}
          <section className={`container ${styles.collection}`}>
            <h2 className={styles.heading}>{collection.heading}</h2>
            <ul className={styles.stats}>
              {collection.stats.map((s, i) => (
                <li key={i} className={styles.stat}>
                  {s.label && <span className={styles.statLabel}>{s.label}</span>}
                  <span>
                    <span className={styles.statValue}>{s.value}</span>
                    {s.suffix && <span className={styles.statSuffix}> {s.suffix}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <ul className={styles.highlights}>
              {collection.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          {/* List of Databases */}
          <section className={styles.databases}>
            <div className="container">
              <h2 className={styles.heading}>{databases.heading}</h2>
              <p className={styles.sub}>{databases.subheading}</p>
              <DatabaseTabs categories={databases.categories} items={databases.items} />
            </div>
          </section>

          {/* LRC Services: accent band, 4 columns divided by rules */}
          <section className={styles.services}>
            <div className="container">
              <h2 className={`${styles.heading} ${styles.light}`}>{services.heading}</h2>
              <div className={styles.serviceCols}>
                {services.columns.map((col) => (
                  <div key={col.title} className={styles.serviceCol}>
                    <h3 className={styles.serviceTitle}>{col.title}</h3>
                    <ul>
                      {col.items.map((it) => (
                        <li key={it.label} className={styles.serviceItem}>
                          <img src={it.icon} alt="" aria-hidden="true" />
                          <span>{it.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {facilities && (
            <section className={`container ${styles.facilities}`}>
              <h2 className={styles.heading}>{facilities.heading}</h2>
              <div className={styles.facTable}>
                {facilities.columns.map((col) => (
                  <ul key={col.title} className={styles.facCol}>
                    <li className={styles.facHead}>{col.title}</li>
                    {col.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </section>
          )}

          {bestPractices && (
            <section className={`container ${styles.practices}`}>
              <div>
                <h2 className={styles.heading}>{bestPractices.heading}</h2>
                <p className={styles.practicesText}>{bestPractices.text}</p>
              </div>
              <img src={bestPractices.image} alt={bestPractices.imageAlt} className={styles.practicesImage} />
            </section>
          )}

          {/* Working hours + contact | timings */}
          <section className={`container ${styles.hours}`}>
            <div className={styles.hoursCard}>
              <img src="/library/decor-triangle.svg" alt="" className={styles.hoursDecor} aria-hidden="true" />
              <h2 className={`${styles.heading} ${styles.light} ${styles.hoursHeading}`}>{hours.heading}</h2>
              <p className={styles.hoursNote}>{hours.note}</p>
              <div className={styles.contact}>
                <h3>{hours.contactTitle}</h3>
                {hours.contactLines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </div>
            <div className={styles.timings}>
              <span className={styles.days}>{hours.days}</span>
              <dl className={styles.slots}>
                {hours.slots.map((s) => (
                  <div key={s.place} className={styles.slot}>
                    <dt>
                      <strong>{s.place}</strong>
                      <span>{s.label}</span>
                    </dt>
                    <dd>{s.time}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.links}>
                {hours.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.linkBox}>
                    <span>{l.label}</span>
                    <strong>{l.href}</strong>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Membership CTA */}
          <section className="container">
            <div className={styles.cta}>
              <img src={membership.image} alt="" className={styles.ctaImage} />
              <div className={styles.ctaInner}>
                <h2 className={`${styles.heading} ${styles.light} ${styles.ctaHeading}`}>{membership.heading}</h2>
                <p className={styles.ctaText}>{membership.text}</p>
                <a href={membership.cta.href} className={`btn ${styles.ctaBtn}`}>
                  {membership.cta.label}
                </a>
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

export default LibraryPage;
