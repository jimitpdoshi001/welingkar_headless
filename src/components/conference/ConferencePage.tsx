import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { ConferenceData } from "@/lib/conference/conference-data";
import styles from "./ConferencePage.module.scss";

export function ConferencePage({ data }: { data: ConferenceData }) {
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
                <Link href="/">Home</Link> <span>›</span> <span>We Conference</span>
              </nav>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
              <p className={styles.heroMeta}>{data.hero.meta}</p>
            </div>
          </section>

          {/* About */}
          <section className={`container ${styles.block}`}>
            <div className={styles.aboutCard}>
              <h2 className={styles.headingLight}>{data.about.heading}</h2>
              {data.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className={styles.infoRow}>
              {data.info.map((b) => (
                <div
                  key={b.title}
                  className={styles.infoBox}>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conference tracks */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.tracks.heading}</h2>
            <p className={styles.sectionBody}>{data.tracks.description}</p>
            <div className={styles.accordion}>
              {data.tracks.items.map((t, i) => (
                <details
                  key={t.id}
                  className={styles.track}
                  open={i === 1}>
                  <summary className={styles.trackSummary}>
                    <span>{t.title}</span>
                    <span className={styles.chevron} />
                  </summary>
                  <ul className={styles.trackPoints}>
                    {t.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          {/* Submission guidelines */}
          <section className="bg-secondary">
            <div className={`container ${styles.block} ${styles.guidelines}`}>
              <h2 className={styles.headingLight}>{data.guidelines.heading}</h2>
              <div className={styles.chipList}>
                {data.guidelines.items.map((g) => (
                  <div
                    key={g}
                    className={styles.chip}>
                    {g}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Publication + Key dates */}
          <section className={`container ${styles.block}`}>
            <div className={styles.pubGrid}>
              <div>
                <h2 className={styles.heading}>{data.publication.heading}</h2>
                <p className={styles.pubIntro}>{data.publication.intro}</p>
                <ul className={styles.pubPoints}>
                  {data.publication.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.datesBox}>
                <h2 className={styles.heading}>{data.keyDates.heading}</h2>
                <div className={styles.dateList}>
                  {data.keyDates.items.map((d) => (
                    <div
                      key={d.label}
                      className={styles.dateRow}>
                      <span>{d.label}</span>
                      <strong>{d.date}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact / Reach out */}
          <section className={`container ${styles.block}`}>
            <div className={styles.contactGrid}>
              <div className={styles.contactBox}>
                <h2 className={styles.headingLight}>{data.contact.heading}</h2>
                <a
                  href={`mailto:${data.contact.email}`}
                  className={styles.emailChip}>
                  {data.contact.email}
                </a>
                <p className={styles.contactOrg}>{data.contact.org}</p>
                <p className={styles.contactAddr}>{data.contact.address}</p>
              </div>
              <div className={styles.contactBox}>
                <h2 className={styles.headingLight}>{data.reachOut.heading}</h2>
                <p className={styles.reachPhone}>{data.reachOut.phone}</p>
                {data.reachOut.people.map((p) => (
                  <p
                    key={p}
                    className={styles.reachPerson}>
                    {p}
                  </p>
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

export default ConferencePage;
