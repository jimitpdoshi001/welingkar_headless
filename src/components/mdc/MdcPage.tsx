import Link from "next/link";
import { PgdmReadMore } from "@/components/pgdm/common/PgdmReadMore";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { MdcData } from "@/lib/mdc/mdc-data";
import { MdcTestimonials } from "./MdcTestimonials/MdcTestimonials";
import styles from "./MdcPage.module.scss";

export function MdcPage({ data }: { data: MdcData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main data-auto-reveal="reveal"
          style={
            {
              "--faculty-accent": "var(--mdc-accent, var(--color-secondary))",
              ...(data.theme && {
                "--mdc-accent": data.theme.accent,
                "--mdc-tint": data.theme.tint,
                "--mdc-tint2": data.theme.tint,
                "--mdc-overlay": "rgba(80, 25, 18, 0.25)",
              }),
            } as React.CSSProperties
          }>
          {/* Hero */}
          <section className={styles.hero}>
            {data.hero.image ? (
              <img
                src={data.hero.image}
                alt=""
                className={styles.heroImage}
              />
            ) : null}
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <nav className={styles.breadcrumb}>
                <Link href="/">Home</Link> <span>›</span> <span>MDP</span>
              </nav>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              {data.hero.subtitle ? <p className={styles.heroSubtitle}>{data.hero.subtitle}</p> : null}
              {data.hero.cta.href && data.hero.cta.label ? (
                <Link
                  href={data.hero.cta.href}
                  className="btn white-outline">
                  {data.hero.cta.label}
                </Link>
              ) : null}
            </div>
          </section>

          {/* In-page nav */}
          <nav className={styles.inPageNav}>
            <div className={`container ${styles.inPageNavInner}`}>
              {data.nav.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  // This page is the MDP page, so its MDP tab is the active one.
                  className={`${styles.inPageLink} ${n.label === "MDP" ? styles.inPageActive : ""}`}
                  aria-current={n.label === "MDP" ? "page" : undefined}>
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Stats */}
          {data.stats.length ? (
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
          ) : null}

          {/* Learning that keeps pace */}
          {data.learning.heading || data.learning.paragraphs.length ? (
          <section className={styles["bg-purplearrow"]}>
            <div className={`container ${styles.block} ${styles.learning}`}>
              <div>
                <h2 className={styles.heading}>{data.learning.heading}</h2>
                {/* Long copy: first part with Show More / Show Less (same as program pages). */}
                {/* Collapsed view: the first two paragraphs only. */}
                <PgdmReadMore
                  paragraphs={data.learning.paragraphs}
                  className={styles.body}
                  limit={data.learning.paragraphs.slice(0, 2).join(" ").split(/\s+/).filter(Boolean).length}
                />
              </div>
              {/* Main photo only (the small overlapping photo was removed on request). */}
              {data.learning.images[0] ? (
                <div className={styles.collage}>
                  <img
                    src={data.learning.images[0]}
                    alt=""
                    className={styles.collageMain}
                  />
                </div>
              ) : null}
            </div>
          </section>
          ) : null}

          {data.learning.features.length ? (
          <section className={styles.featureBand}>
            <div className={`container ${styles.featureRow}`}>
              {data.learning.features.map((f, i) => (
                <div
                  key={f.title}
                  className={styles.feature}>
                  <img src={`/mdc/icons/${data.iconSet ?? ""}feature-${i + 1}.svg`} alt="" className={styles.featureIcon} />
                  <h3>{f.title}</h3>
                </div>
              ))}
            </div>
          </section>
          ) : null}

          {/* About MDC (dark) */}
          {data.about.heading || data.about.paragraphs.length ? (
          <section className={styles.about}>
            {data.about.image ? (
              <img
                src={data.about.image}
                alt=""
                className={styles.aboutBg}
              />
            ) : null}
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
              {data.about.offers.length ? (
              <>
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
              </>
              ) : null}
            </div>
          </section>
          ) : null}

          {/* Why organizations choose MDC */}
          {data.why.cards.length ? (
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.why.heading}</h2>
            <div className={styles.whyGrid}>
              {data.why.cards.map((c, i) => (
                <div
                  key={c.title}
                  className={styles.whyCard}>
                  <img src={`/mdc/icons/${data.iconSet ?? ""}why-${i + 1}.svg`} alt="" className={styles.whyIcon} />
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </section>
          ) : null}

          {/* Areas of expertise (purple) */}
          {data.expertise.items.length ? (
          <section className={`bg-secondary ${styles.band}`}>
            <div className={`container ${styles.block}`}>
              <h2 className={styles.headingLight}>{data.expertise.heading}</h2>
              <div className={styles.expertiseGrid}>
                {data.expertise.items.map((e, i) => (
                  <div
                    key={e}
                    className={styles.expertiseItem}>
                    <img src={`/mdc/icons/expertise-${(i % 8) + 1}.svg`} /* 8 icons; reused in turn when Drupal has more items */ alt="" className={styles.expertiseIcon} />
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          ) : null}

          {/* Flagship offerings */}
          {data.flagship.cards.length ? (
          <section className={styles.flagshipBand}>
            <div className={`container ${styles.block}`}>
              <h2 className={styles.heading}>{data.flagship.heading}</h2>
              <div className={styles.flagshipGrid}>
                {data.flagship.cards.map((c) => (
                  <article
                    key={c.id}
                    className={styles.flagshipCard}>
                    {c.image ? (
                      <img
                        src={c.image}
                        alt=""
                      />
                    ) : null}
                    <div className={styles.flagshipBody}>
                      <h3>{c.title}</h3>
                      {/* First 150 characters, Show More / Show Less for the rest. Enquire Now hidden for now. */}
                      <PgdmReadMore
                        text={c.text}
                        charLimit={150}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          ) : null}

          {/* Trusted */}
          {data.trusted.logos.length ? (
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

          ) : null}

          {/* Testimonials: heading left, carousel right (arrows below-right). */}
          {data.testimonials.items.length ? (
          <section className={`bg-secondary ${styles.band}`}>
            <div className={`container ${styles.block}`}>
              <MdcTestimonials
                heading={data.testimonials.heading}
                items={data.testimonials.items}
              />
            </div>
          </section>

          ) : null}

          {/* Talk to our MDP team */}
          {data.team.contacts.length ? (
          <section
            id="team"
            className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.team.heading}</h2>
            {data.team.subtitle ? <p className={styles.sub}>{data.team.subtitle}</p> : null}
            <div className={styles.contactGrid}>
              {data.team.contacts.map((c) => (
                <div
                  key={c.id}
                  className={styles.contactCard}>
                  <h3>{c.name}</h3>
                  <p className={styles.contactTitle}>{c.title}</p>
                  <p className={styles.contactDept}>{c.dept}</p>
                  {c.office ? (
                    <p className={styles.contactLine}>
                      {c.office} <span>Office</span>
                    </p>
                  ) : null}
                  {c.mobile ? (
                    <p className={styles.contactLine}>
                      {c.mobile} <span>Mobile</span>
                    </p>
                  ) : null}
                  {c.email ? (
                    <p className={styles.contactLine}>
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
          ) : null}
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default MdcPage;
