import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import type { WeFactorData } from "@/lib/wefactor/wefactor-data";
// Rows reuse the campus listing layout (photo + bordered card, alternating sides).
import listing from "@/components/campus/CampusListingPage.module.scss";
import styles from "./WeFactorPage.module.scss";

export function WeFactorPage({ data }: { data: WeFactorData }) {
  const { hero, about, pillars } = data;
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main data-auto-reveal="reveal">
          {/* Banner: same pattern as the other inner pages (photo, breadcrumb, title, intro). */}
          <section className={styles.hero}>
            <img src={hero.image} alt="" className={styles.heroImage} />
            <div className={styles.heroOverlay} aria-hidden="true" />
            <div className={`container ${styles.heroInner}`}>
              <WeResearchBreadcrumb current={hero.title} />
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>{hero.title}</h1>
                <p className={styles.heroSub}>{hero.subtitle}</p>
              </div>
            </div>
          </section>

          <section className={`container ${styles.about}`}>
            <h2 className={styles.aboutHeading}>{about.heading}</h2>
            <p className={styles.aboutBody}>{about.body}</p>
          </section>

          {pillars.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <section
                key={p.id}
                id={p.id}
                className={`${listing.rowSection} ${reverse ? listing.tinted : ""}`}>
                <div className={`container ${listing.row} ${reverse ? listing.reverse : ""}`}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className={listing.image}
                  />
                  <div className={listing.card}>
                    <h2 className={listing.title}>{p.title}</h2>
                    <p className={listing.body}>{p.body}</p>
                    <Link
                      href={p.href}
                      className="btn accent">
                      Know More
                    </Link>
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

export default WeFactorPage;
