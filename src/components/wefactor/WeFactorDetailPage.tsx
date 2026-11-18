import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import type { WeFactorDetailData, WeFactorItem } from "@/lib/wefactor/welearning-data";
// Every block reuses an existing WeResearch section style (no new visual design).
import wr from "@/components/weresearch/WeResearchPage.module.scss";
import { PhotoSlider } from "./PhotoSlider";
import styles from "./WeFactorDetailPage.module.scss";

function Paragraphs({ item, light = false }: { item: WeFactorItem; light?: boolean }) {
  return (
    <div className={styles.paragraphs}>
      {item.paragraphs.map((p, i) => (
        <p key={i} className={light ? wr.policyBody : wr.body}>
          {p}
        </p>
      ))}
    </div>
  );
}

/** WeFactor sub-page (WeLearning, …) laid out with the WeResearch page sections. */
export function WeFactorDetailPage({ data }: { data: WeFactorDetailData }) {
  const { hero, parent, blocks } = data;
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main>
          {/* Hero: WeResearch banner. */}
          <section className={wr.hero}>
            <img src={hero.image} alt="" className={wr.heroImage} />
            <div className={wr.heroOverlay} />
            <div className={`container ${wr.heroInner}`}>
              <WeResearchBreadcrumb current={hero.title} parent={parent} />
              <div className={wr.heroText}>
                <h1 className={wr.heroTitle}>{hero.title}</h1>
                <p className={wr.heroBody}>{hero.subtitle}</p>
              </div>
            </div>
          </section>

          {blocks.map((block, b) => {
            if (block.type === "band") {
              // WeResearch "Governance": purple band with text columns.
              return (
                <section key={b} className={wr.governance}>
                  <div className={`container ${wr.governanceGrid}`}>
                    {block.items.map((item) => (
                      <div key={item.id} id={item.id} className={wr.policy}>
                        <h3 className={wr.policyTitle}>{item.title}</h3>
                        <Paragraphs item={item} light />
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            if (block.type === "split") {
              // WeResearch "CECD": cream band, text left, photo right.
              const { item } = block;
              return (
                <section key={b} id={item.id} className={wr.cecd}>
                  <div className={`container ${wr.split}`}>
                    <div className={wr.cecdText}>
                      <h2 className={wr.heading}>{item.title}</h2>
                      <Paragraphs item={item} />
                    </div>
                    {item.images?.length ? (
                      <PhotoSlider id={item.id} images={item.images} alt={item.title} className={wr.cecdImage} />
                    ) : null}
                  </div>
                </section>
              );
            }

            // WeResearch "Research projects / activities": cream text + photo checkerboard.
            return (
              <section key={b} className={`container ${wr.features} ${styles.features}`}>
                {block.heading ? <h2 className={wr.heading}>{block.heading}</h2> : null}
                {block.items.map((item, i) => (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`${wr.featureRow} ${i % 2 ? wr.featureRowReverse : ""}`}>
                    <div className={`${wr.featureText} ${styles.featureText}`}>
                      <h2 className={wr.heading}>{item.title}</h2>
                      <Paragraphs item={item} />
                      {item.downloads ? (
                        // Issue downloads as the site's standard small buttons.
                        <div className={styles.downloads}>
                          {item.downloads.issues.map((issue) => (
                            <a
                              key={issue.href}
                              href={issue.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`btn accent ${wr.smallBtn}`}>
                              Download {issue.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {item.images?.length ? (
                      <PhotoSlider id={item.id} images={item.images} alt={item.title} className={wr.featureImage} />
                    ) : null}
                  </div>
                ))}
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
