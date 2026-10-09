import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { MdcData } from "@/lib/mdc/mdc-data";
import styles from "./MdcPage.module.scss";

export function MdcPage({ data }: { data: MdcData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main style={{ ["--faculty-accent" as string]: "var(--color-secondary)" }}>
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
                <Link href="/">Home</Link> <span>›</span> <span>MDC</span>
              </nav>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
              <Link
                href={data.hero.cta.href}
                className="btn accent">
                {data.hero.cta.label}
              </Link>
            </div>
          </section>

          {/* In-page nav */}
          <nav className={styles.inPageNav}>
            <div className={`container ${styles.inPageNavInner}`}>
              {data.nav.map((n, i) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className={`${styles.inPageLink} ${i === 0 ? styles.inPageActive : ""}`}>
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Stats */}
          <section className={`container ${styles.block}`}>
            <div className={styles.stats}>
              {data.stats.map((s) => (
                <div
                  key={s.label}
                  className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Learning that keeps pace */}
          <section className={`container ${styles.block} ${styles.learning}`}>
            <div>
              <h2 className={styles.heading}>{data.learning.heading}</h2>
              {data.learning.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={styles.body}>
                  {p}
                </p>
              ))}
            </div>
            <div className={styles.collage}>
              <img
                src={data.learning.images[0]}
                alt=""
                className={styles.collageMain}
              />
              <img
                src={data.learning.images[1]}
                alt=""
                className={styles.collageSmall}
              />
            </div>
          </section>

          <section className={styles.featureBand}>
            <div className={`container ${styles.featureRow}`}>
              {data.learning.features.map((f) => (
                <div
                  key={f.title}
                  className={styles.feature}>
                  <span className={styles.featureIcon} />
                  <h3>{f.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* About MDC (dark) */}
          <section className={styles.about}>
            <img
              src={data.about.image}
              alt=""
              className={styles.aboutBg}
            />
            <div className={styles.aboutOverlay} />
            <div className={`container ${styles.aboutInner}`}>
              <h2 className={styles.headingLightCenter}>{data.about.heading}</h2>
              {data.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={styles.aboutBody}>
                  {p}
                </p>
              ))}
              <h3 className={styles.offerHeading}>{data.about.offerHeading}</h3>
              <div className={styles.offerGrid}>
                {data.about.offers.map((o) => (
                  <span
                    key={o}
                    className={styles.offerCard}>
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Why organizations choose MDC */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.why.heading}</h2>
            <div className={styles.whyGrid}>
              {data.why.cards.map((c) => (
                <div
                  key={c.title}
                  className={styles.whyCard}>
                  <span className={styles.whyIcon} />
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Areas of expertise (purple) */}
          <section className="bg-secondary">
            <div className={`container ${styles.block}`}>
              <h2 className={styles.headingLight}>{data.expertise.heading}</h2>
              <div className={styles.expertiseGrid}>
                {data.expertise.items.map((e) => (
                  <div
                    key={e}
                    className={styles.expertiseItem}>
                    <span className={styles.expertiseIcon} />
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Flagship offerings */}
          <section className={styles.flagshipBand}>
            <div className={`container ${styles.block}`}>
              <h2 className={styles.heading}>{data.flagship.heading}</h2>
              <div className={styles.flagshipGrid}>
                {data.flagship.cards.map((c) => (
                  <article
                    key={c.id}
                    className={styles.flagshipCard}>
                    <img
                      src={c.image}
                      alt=""
                    />
                    <div className={styles.flagshipBody}>
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      <Link
                        href="/mdc#team"
                        className="btn accent-outline">
                        Enquire Now
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Trusted */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.headingCenter}>{data.trusted.heading}</h2>
            <div className={styles.logoStrip}>
              {data.trusted.logos.map((l) => (
                <img
                  key={l.name}
                  src={l.image}
                  alt={l.name}
                />
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-secondary">
            <div className={`container ${styles.block} ${styles.testi}`}>
              <h2 className={styles.headingLight}>{data.testimonials.heading}</h2>
              <div className={styles.testiRow}>
                {data.testimonials.items.map((t) => (
                  <article
                    key={t.id}
                    className={styles.testiCard}>
                    <div className={styles.stars}>★★★★★</div>
                    <p className={styles.testiText}>{t.text}</p>
                    <p className={styles.testiName}>{t.name}</p>
                    <p className={styles.testiRole}>{t.role}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Talk to our MDP team */}
          <section
            id="team"
            className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.team.heading}</h2>
            <p className={styles.sub}>{data.team.subtitle}</p>
            <div className={styles.contactGrid}>
              {data.team.contacts.map((c) => (
                <div
                  key={c.id}
                  className={styles.contactCard}>
                  <h3>{c.name}</h3>
                  <p className={styles.contactTitle}>{c.title}</p>
                  <p className={styles.contactDept}>{c.dept}</p>
                  <p className={styles.contactLine}>
                    {c.office} <span>Office</span>
                  </p>
                  <p className={styles.contactLine}>
                    {c.mobile} <span>Mobile</span>
                  </p>
                  <p className={styles.contactLine}>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                  </p>
                </div>
              ))}
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

export default MdcPage;
