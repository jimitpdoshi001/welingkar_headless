import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import type { WeFactorDetailData } from "@/lib/wefactor/welearning-data";
import { WeFactorCarousel } from "./WeFactorCarousel";
import styles from "./WeFactorDetailPage.module.scss";
import career from "@/components/pgdm/PgdmCareer/PgdmCareer.module.scss";

/**
 * WeFactor sub-page (Figma 3193:137): an intro text block, then each section
 * as either the simple heading + text block or the carousel block.
 */
export function WeFactorDetailPage({ data }: { data: WeFactorDetailData }) {
  const { title, intro, parent, blocks } = data;
  let carouselIndex = 0;
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main data-auto-reveal="reveal">
          <section className={`container ${styles.intro}`}>
            <WeResearchBreadcrumb current={title} parent={parent} tone="dark" />
            <h1 className={styles.textTitle}>{title}</h1>
            <p className={styles.textBody}>{intro}</p>
          </section>

          {blocks.map((block) => {
            if (block.type === "carousel") {
              // Back-to-back carousels alternate cream / white so bands stay distinct.
              const tinted = carouselIndex++ % 2 === 0;
              return <WeFactorCarousel key={block.id} item={block} tinted={tinted} />;
            }
            carouselIndex = 0;
            if (block.type === "list") {
              // PGDM Career role-card design, 2 per row: project, then company.
              return (
                <section key={block.id} id={block.id} className={`container ${styles.textBlock}`}>
                  <h2 className={styles.textTitle}>{block.title}</h2>
                  <ul className={styles.cardGrid}>
                    {block.items.map((item) => (
                      <li key={item.title} className={`${career.pill} ${styles.card}`}>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        {item.subtitle ? <p className={styles.cardSub}>{item.subtitle}</p> : null}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            }
            return (
              <section key={block.id} id={block.id} className={`container ${styles.textBlock}`}>
                <h2 className={styles.textTitle}>{block.title}</h2>
                {block.paragraphs.map((p, i) => (
                  <p key={i} className={styles.textBody}>
                    {p}
                  </p>
                ))}
                {/* CTA buttons from Drupal (e.g. NISP policy PDFs). */}
                {block.downloads?.length ? (
                  <div className={styles.downloads}>
                    {block.downloads.map((d) => (
                      <a
                        key={d.href}
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn accent">
                        {d.label}
                      </a>
                    ))}
                  </div>
                ) : null}
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

export default WeFactorDetailPage;
