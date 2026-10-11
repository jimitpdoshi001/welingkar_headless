import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { CardCarousel } from "./CardCarousel/CardCarousel";
import { ScrollArrows } from "./ScrollArrows/ScrollArrows";
import type { CampusData } from "@/lib/campus/campus-data";
import styles from "./CampusPage.module.scss";

export function CampusPage({ data }: { data: CampusData }) {
  const isMumbai = data.accent === "orange";
  const accentVar = data.accent === "orange" ? "var(--color-orange)" : "var(--color-primary)";

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main
          className={`${styles.page} ${data.accent === "orange" ? styles.orangeCtas : ""}`}
          style={
            {
              "--faculty-accent": accentVar,
              // Figma: Mumbai uses purple bands/banner; Bengaluru terracotta bands, green banner.
              "--campus-band": isMumbai ? "var(--color-secondary)" : "#b04535",
              "--campus-banner": isMumbai ? "var(--color-secondary)" : "var(--color-primary)",
            } as React.CSSProperties
          }>
          {/* Figma: institute banner strip (sits under the fixed site header). */}
          <p className={styles.banner}>{data.bannerTitle}</p>
          <section className={styles.hero}>
            <img
              src={data.hero.image}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
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
            className={styles.aboutBand}>
            <div className={`container ${styles.about}`}>
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
            </div>
          </section>
          {/* Figma: full-width campus photo fading up into the About band. */}
          <img
            src={data.about.image}
            alt=""
            className={styles.aboutPhoto}
          />

          <section className={`container ${styles.block} ${styles.accred}`}>
            <h2 className={styles.sectionHeading}>{data.accreditations.heading}</h2>
            <div className={styles.accredLogos}>
              {data.accreditations.logos.map((l) => (
                <img
                  key={l.name}
                  src={l.image}
                  alt={l.name}
                  className={styles.accredLogo}
                />
              ))}
            </div>
            <ul className={styles.accredPoints}>
              {data.accreditations.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>

          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <h2 className={styles.sectionHeading}>{data.director.heading}</h2>
              <div className={styles.director}>
                <img
                  src={data.director.image}
                  alt={data.director.name}
                  className={styles.directorImage}
                />
                <div className={styles.directorText}>
                  <h3 className={styles.directorName}>{data.director.name}</h3>
                  <p className={styles.directorRole}>{data.director.title}</p>
                  <p className={styles.directorBody}>{data.director.body}</p>
                  <Link
                    href={data.director.cta.href}
                    className="btn accent">
                    {data.director.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <h2 className={styles.sectionHeading}>{data.mentors.heading}</h2>
            <div className={styles.mentorsBar}>
              <div className={styles.mentorTabs}>
                {data.mentors.tabs.map((t, i) => (
                  <span
                    key={t}
                    className={`${styles.mentorTab} ${i === 2 ? styles.mentorTabActive : ""}`}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.barActions}>
                <Link
                  href={data.mentors.cta.href}
                  className="btn accent">
                  {data.mentors.cta.label}
                </Link>
                <ScrollArrows targetId="campus-mentors" />
              </div>
            </div>
            <div
              id="campus-mentors"
              className={styles.mentorGrid}>
              {data.mentors.people.map((p) => (
                <article
                  key={p.id}
                  className={styles.mentorCard}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className={styles.mentorImage}
                  />
                  <h4 className={styles.mentorName}>{p.name}</h4>
                  <p className={styles.mentorRole}>{p.title}</p>
                  <Link
                    href={data.mentors.cta.href}
                    className={styles.mentorLink}>
                    Read More
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Figma 979:1564: full-width photo card with copy and category list on top. */}
          <section
            id="faculty"
            className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <div
                className={styles.facultyCard}
                style={{ backgroundImage: `url(${data.faculty.image})` }}>
                <div className={styles.facultyText}>
                  <h2 className={styles.facultyHeading}>{data.faculty.heading}</h2>
                  <p className={styles.facultyBody}>{data.faculty.description}</p>
                </div>
                <ul className={styles.facultyTabs}>
                  {data.faculty.categories.map((cat, i) => (
                    <li
                      key={cat}
                      className={`${styles.facultyTab} ${i === 0 ? styles.facultyTabActive : ""}`}>
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            id="programmes"
            className={styles.band}>
            <div className={`container ${styles.block}`}>
              <CardCarousel
                heading={data.programmes.heading}
                description={data.programmes.description}
                cards={data.programmes.cards}
                theme="onDark"
                overlayCaption
              />
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <div className={styles.recruiters}>
              <div className={styles.recHead}>
                <div>
                  <h2 className={styles.recHeading}>{data.recruiters.heading}</h2>
                  <p className={styles.recDescription}>{data.recruiters.description}</p>
                </div>
                <ScrollArrows targetId="campus-recruiters" />
              </div>
              <div
                id="campus-recruiters"
                className={styles.logoStrip}>
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

          {/* Figma 1064:184: one campus photo behind WeResearch and The World of
              WeSchool, fading to white at the top and bottom. */}
          <section
            className={styles.researchWorld}
            style={{ backgroundImage: `url(${data.weresearch.image})` }}>
            <div className={`container ${styles.weresearch}`}>
              <h2 className={styles.weresearchHeading}>{data.weresearch.heading}</h2>
              <p className={styles.weresearchBody}>{data.weresearch.description}</p>
              <Link
                href={data.weresearch.cta.href}
                className="btn accent">
                {data.weresearch.cta.label}
              </Link>
            </div>
            <div className={`container ${styles.world}`}>
              <h2 className={styles.sectionHeading}>{data.world.heading}</h2>
              <div className={styles.worldMedia}>
                <img
                  src={data.world.image}
                  alt=""
                  className={styles.worldImage}
                />
                <span
                  className={styles.worldPlay}
                  aria-hidden="true"
                />
                <p className={styles.worldCaption}>{data.world.caption}</p>
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
            className={styles.band}>
            <div className={`container ${styles.block}`}>
              <CardCarousel
                heading={data.infrastructure.heading}
                description={data.infrastructure.description}
                cards={data.infrastructure.cards}
                theme="onDark"
              />
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <CardCarousel
              heading={data.accommodation.heading}
              description={data.accommodation.description}
              cards={data.accommodation.cards}
              theme="light"
              overlayCaption
            />
          </section>

          <section className={`container ${styles.block}`}>
            <div className={styles.rowHead}>
              <h2 className={styles.sectionHeading}>{data.moments.heading}</h2>
              <Link
                href={data.moments.cta.href}
                className="btn accent">
                {data.moments.cta.label}
              </Link>
            </div>
            <div className={styles.momentsGrid}>
              {data.moments.images.map((m, i) => (
                <div
                  key={m.id}
                  className={`${styles.momentItem} ${styles[`moment${i + 1}`]}`}>
                  <img
                    src={m.image}
                    alt=""
                  />
                  {m.video && <span className={styles.playBadge} />}
                </div>
              ))}
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <div className={styles.rowHead}>
              <h2 className={styles.sectionHeading}>{data.news.heading}</h2>
              <Link
                href={data.news.cta.href}
                className="btn accent">
                {data.news.cta.label}
              </Link>
            </div>
            {/* Figma: 610px feature card, then two rows of image + text card. */}
            <div className={styles.newsGrid}>
              <article className={styles.newsFeature}>
                <img
                  src={data.news.items[0].image}
                  alt=""
                />
                <div className={styles.newsFeatureCard}>
                  <div>
                    <h3>{data.news.items[0].title}</h3>
                    <p className={styles.newsDate}>{data.news.items[0].date}</p>
                  </div>
                  <Link
                    href={data.news.items[0].href}
                    className={styles.newsArrow}
                    aria-label={`Read: ${data.news.items[0].title}`}
                  />
                </div>
              </article>
              {data.news.items.slice(1).map((n) => (
                <div
                  key={n.id}
                  className={styles.newsRow}>
                  <img
                    src={n.image}
                    alt=""
                    className={styles.newsSmallImage}
                  />
                  <article className={styles.newsSmallBody}>
                    <h4>{n.title}</h4>
                    <p className={styles.newsDate}>{n.date}</p>
                    <Link
                      href={n.href}
                      className={styles.newsArrow}
                      aria-label={`Read: ${n.title}`}
                    />
                  </article>
                </div>
              ))}
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <div className={styles.connectGrid}>
              <div>
                <h2 className={styles.sectionHeading}>{data.connect.heading}</h2>
                <p className={styles.connectAddr}>Address: {data.connect.address}</p>
                <p className={styles.connectPhone}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
                  </svg>
                  <a href={`tel:${data.connect.phone.replace(/[^0-9+]/g, "")}`}>{data.connect.phone}</a>
                </p>
                <h3 className={styles.connectFormHeading}>Contact form</h3>
                <form className={styles.connectForm}>
                  <div className={styles.formRow}>
                    <input
                      type="text"
                      placeholder="Name*"
                      className={styles.input}
                      aria-label="Name"
                    />
                    <input
                      type="email"
                      placeholder="Email*"
                      className={styles.input}
                      aria-label="Email"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Message*"
                    className={styles.input}
                    aria-label="Message"
                  />
                  <button
                    type="submit"
                    className="btn accent">
                    Submit
                  </button>
                </form>
              </div>
              <img
                src={data.connect.mapImage}
                alt={`${data.campus} campus location map`}
                className={styles.map}
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
