import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import hero from "@/components/alumni/AlumniPage.module.scss";
import { CORPORATE } from "@/lib/corporate/corporate-data";
import { CorporateAccordion } from "./CorporateAccordion";
import styles from "./CorporatePage.module.scss";

/** Figma 3466:1642: Corporate page. Hero reuses the Alumni hero styles. */
export function CorporatePage() {
  const { overview, placements, recruiters, batch, studentProfile, stats } = CORPORATE;
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main>
          <section className={hero.hero}>
            <Image src={CORPORATE.hero.image} alt="" fill priority sizes="100vw" className={hero.heroImg} />
            <div className={`container ${hero.heroInner}`}>
              <WeResearchBreadcrumb current="Corporate" className={hero.breadcrumb} />
              <div className={hero.heroText}>
                <h1 className={hero.heroHeading}>{CORPORATE.hero.title}</h1>
                <p className={`${hero.heroBody} ${styles.preLine}`}>{CORPORATE.hero.body}</p>
              </div>
            </div>
          </section>

          <section id="overview" className={styles.overview}>
            <img src="/library/decor-triangle.svg" alt="" className={styles.decor} aria-hidden="true" />
            <div className={`container ${styles.split}`}>
              <div>
                <h2 className={styles.heading}>{overview.heading}</h2>
                {overview.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className={styles.body}>{p}</p>
                ))}
              </div>
              <Image src={overview.image} alt="WeSchool students in the library" width={608} height={348} sizes="(max-width: 1024px) 100vw, 608px" className={styles.overviewImg} />
            </div>
          </section>

          <section id="placements" className={styles.placements}>
            <div className={`container ${styles.split}`}>
              <div>
                <h2 className={styles.heading}>{placements.heading}</h2>
                <p className={`${styles.body} ${styles.narrow}`}>{placements.body}</p>
              </div>
              <CorporateAccordion
                tone="orange"
                defaultOpenId="projects"
                items={placements.panels.map((p) => ({
                  id: p.id,
                  title: p.title,
                  content: p.paragraphs ? (
                    <>
                      {p.paragraphs.map((t) => (
                        <p key={t.slice(0, 30)} className={styles.body}>{t}</p>
                      ))}
                      {p.contact ? (
                        <div className={styles.contact}>
                          <p className={styles.contactName}>{p.contact.name}</p>
                          <p className={styles.contactRole}>{p.contact.role}</p>
                          <p className={styles.contactLinks}>
                            <a href={`tel:${p.contact.phone.replace(/[^\d+]/g, "").slice(0, 11)}`}>
                              <img src="/corporate/icon-phone.svg" alt="" width={15} height={15} />
                              {p.contact.phone}
                            </a>
                            <a href={`mailto:${p.contact.email}`}>
                              <img src="/corporate/icon-mail.svg" alt="" width={18} height={11} />
                              {p.contact.email}
                            </a>
                          </p>
                        </div>
                      ) : null}
                    </>
                  ) : undefined,
                }))}
              />
            </div>
          </section>

          <section id="recruiters" className={styles.recruiters}>
            <div className="container">
              <div className={styles.split}>
                <h2 className={`${styles.heading} ${styles.light}`}>{recruiters.heading}</h2>
                <p className={`${styles.body} ${styles.light}`}>{recruiters.body}</p>
              </div>
              <div className={styles.logoBox}>
                <Image src={recruiters.image} alt="Recruiters: Abbott, Blue Star, Cinépolis, Dell, EY, ICICI Bank, Bank of America, Cigna TTK, CRISIL, Edelweiss, Hindustan Unilever, Johnson & Johnson" width={1160} height={223} sizes="(max-width: 1240px) 100vw, 1160px" className={styles.logos} />
              </div>
              <div className={styles.recruitersFoot}>
                <p className={styles.disclaimer}>{recruiters.disclaimer}</p>
                {recruiters.pdf ? (
                  <a href={recruiters.pdf} target="_blank" rel="noopener noreferrer" className={`btn ${styles.orangeBtn}`}>
                    Download pdf
                  </a>
                ) : null}
              </div>
            </div>
          </section>

          <section id="student-profile" className={`container ${styles.batch}`}>
            <h2 className={styles.heading}>{batch.heading}</h2>
            <p className={styles.body}>{batch.body}</p>
            <CorporateAccordion
              tone="green"
              defaultOpenId="education"
              items={batch.groups.map((g) => ({
                id: g.id,
                title: g.title,
                content: g.stats.length ? (
                  <ul className={styles.statGrid}>
                    {g.stats.map((s) => (
                      <li key={s.label}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                      </li>
                    ))}
                  </ul>
                ) : undefined,
              }))}
            />
          </section>

          <section id="why-recruit" className={styles.studentProfile}>
            <Image src={studentProfile.image} alt="" fill sizes="100vw" className={styles.cover} />
            <div className={`container ${styles.studentInner}`}>
              <div className={styles.studentText}>
                <h2 className={`${styles.heading} ${styles.light}`}>{studentProfile.heading}</h2>
                <p className={`${styles.body} ${styles.light}`}>{studentProfile.body}</p>
              </div>
            </div>
          </section>

          <section id="placement-stats" className={styles.stats}>
            <div className="container">
              <h2 className={`${styles.heading} ${styles.light}`}>{stats.heading}</h2>
              <p className={`${styles.body} ${styles.light} ${styles.statsBody}`}>{stats.body}</p>
              <div className={styles.statCards}>
                {stats.cards.map((c) => (
                  <div key={c.title} className={styles.statCard}>
                    <h3 className={styles.statCardTitle}>{c.title}</h3>
                    <div className={styles.statCardRow}>
                      {c.items.map((it) => (
                        <p key={it.label}>
                          <span className={styles.salary}>
                            {it.value}
                            <small>LPA</small>
                          </span>
                          <span className={styles.salaryLabel}>{it.label}</span>
                        </p>
                      ))}
                    </div>
                  </div>
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
