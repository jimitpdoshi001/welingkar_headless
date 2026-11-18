import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import type { WeFactorDetailData } from "@/lib/wefactor/welearning-data";
import listing from "@/components/campus/CampusListingPage.module.scss";
import base from "./WeFactorPage.module.scss";
import styles from "./WeFactorDetailPage.module.scss";

/**
 * WeFactor sub-page (WeLearning, …): same banner as the WeFactor page, then
 * the campus-listing rows. A section without a photo spans the full width.
 */
export function WeFactorDetailPage({ data }: { data: WeFactorDetailData }) {
  const { hero, parent, sections } = data;
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main>
          <section className={base.hero}>
            <img src={hero.image} alt="" className={base.heroImage} />
            <div className={base.heroOverlay} aria-hidden="true" />
            <div className={`container ${base.heroInner}`}>
              <WeResearchBreadcrumb current={hero.title} parent={parent} />
              <div className={base.heroText}>
                <h1 className={base.heroTitle}>{hero.title}</h1>
                <p className={base.heroSub}>{hero.subtitle}</p>
              </div>
            </div>
          </section>

          {sections.map((s, i) => {
            const reverse = i % 2 === 1;
            const startsGroup = s.group && s.group !== sections[i - 1]?.group;
            return (
              <div key={s.id}>
                {startsGroup ? (
                  <div className={`container ${styles.groupHead}`}>
                    <h2 className={styles.groupTitle}>{s.group}</h2>
                  </div>
                ) : null}
                <section
                  id={s.id}
                  className={`${listing.rowSection} ${reverse ? listing.tinted : ""}`}>
                  <div className={`container ${listing.row} ${reverse ? listing.reverse : ""} ${s.image ? "" : styles.single}`}>
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.title}
                        className={listing.image}
                      />
                    ) : null}
                    <div className={`${listing.card} ${styles.card}`}>
                      <h2 className={listing.title}>{s.title}</h2>
                      {s.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className={`${listing.body} ${styles.paragraph}`}>
                          {p}
                        </p>
                      ))}
                      {s.downloads?.length ? (
                        <ul className={styles.downloads}>
                          {s.downloads.map((d) => (
                            <li key={d.href}>
                              <img
                                src={d.image}
                                alt={`${s.title} ${d.label}`}
                              />
                              <span>{d.label}</span>
                              <Link
                                href={d.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn accent">
                                Download
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </section>
              </div>
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

export default WeFactorDetailPage;
