import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import type { FeatureBlock, WeResearchData } from "@/lib/weresearch/weresearch-data";
import { WeResearchBreadcrumb } from "./WeResearchBreadcrumb";
import { JournalDownloads } from "./JournalDownloads";
import styles from "./WeResearchPage.module.scss";

const PUBLICATIONS_ROW_ID = "weresearch-publications";

// Cream text panel used by the Research projects / activities rows.
function FeatureText({ block, className = "" }: { block: FeatureBlock; className?: string }) {
  return (
    <div className={`${styles.featureText} ${className}`}>
      <h2 className={styles.heading}>{block.heading}</h2>
      <p className={styles.body}>{block.body}</p>
      <Link href={block.cta.href} className={`btn accent ${styles.smallBtn}`}>
        {block.cta.label}
      </Link>
    </div>
  );
}

export function WeResearchPage({ data }: { data: WeResearchData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main>
          {/* Hero (Figma 2533:396): photo with left, bottom and top dark fades. */}
          <section className={styles.hero}>
            <img src={data.hero.image} alt="" className={styles.heroImage} />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <WeResearchBreadcrumb current="WeResearch" />
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>{data.hero.title}</h1>
                <p className={styles.heroBody}>{data.hero.body}</p>
              </div>
            </div>
          </section>

          {/* About (Figma 2534:1275 + 2534:1270): frosted glass card over a photo. */}
          <section className={styles.about}>
            <img src={data.about.image} alt="" className={styles.aboutImage} />
            <div className="container">
              <div className={styles.aboutCard}>
                <h2 className={styles.heading}>{data.about.heading}</h2>
                <div className={styles.aboutBody}>
                  {data.about.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Governance (Figma 2534:1279): purple band, two policies. */}
          <section className={styles.governance}>
            <div className="container">
              <h2 className={styles.governanceHeading}>{data.governance.heading}</h2>
              <div className={styles.governanceGrid}>
                {data.governance.items.map((item) => (
                  <div key={item.title} className={styles.policy}>
                    <h3 className={styles.policyTitle}>{item.title}</h3>
                    <p className={styles.policyBody}>{item.body}</p>
                    <Link href={item.href} className={`btn accent ${styles.smallBtn}`}>
                      Know More
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Research Publications (Figma 2544:1345): card row that bleeds off the right edge. */}
          <section className={styles.publications}>
            <div className={`container ${styles.publicationsHead}`}>
              <div>
                <h2 className={styles.heading}>{data.publications.heading}</h2>
                <p className={styles.body}>{data.publications.description}</p>
              </div>
              <ScrollArrows targetId={PUBLICATIONS_ROW_ID} />
            </div>
            <div className={styles.pubTrack}>
              <ul id={PUBLICATIONS_ROW_ID} className={styles.pubRow}>
                {data.publications.cards.map((card) => (
                  <li key={card.title} className={styles.pubCard}>
                    <img src={card.image} alt="" className={styles.pubImage} />
                    <div className={styles.pubGlass}>
                      <h3 className={styles.pubTitle}>{card.title}</h3>
                      <Link href={card.href} className={`btn accent ${styles.smallBtn}`}>
                        Know More
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Research projects / activities (Figma 2544:1353-1416): 2x2 checkerboard. */}
          <section className={`container ${styles.features}`}>
            <div className={styles.featureRow}>
              <FeatureText block={data.projects} className={styles.featureTextProjects} />
              <img src={data.projects.image} alt="" className={styles.featureImage} />
            </div>
            <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
              <FeatureText block={data.activities} className={styles.featureTextActivities} />
              <img src={data.activities.image} alt="" className={styles.featureImage} />
            </div>
          </section>

          {/* Area of research (Figma 2549:1678): 3x3 icon grid with hairline dividers. */}
          <section className={styles.areas}>
            <div className="container">
              <h2 className={styles.areasHeading}>{data.areas.heading}</h2>
              <ul className={styles.areaGrid}>
                {data.areas.items.map((area) => (
                  <li key={area.label} className={styles.area}>
                    <span className={styles.areaIcon}>
                      <img src={area.icon} alt="" />
                    </span>
                    <span className={styles.areaLabel}>{area.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CECD (Figma 2549:1679): cream band, text left, photo right. */}
          <section className={styles.cecd}>
            <div className={`container ${styles.split}`}>
              <div className={styles.cecdText}>
                <h2 className={styles.heading}>
                  {data.cecd.headingLines.map((line) => (
                    <span key={line} className={styles.headingLine}>
                      {line}
                    </span>
                  ))}
                </h2>
                <p className={styles.body}>
                  {data.cecd.body}{" "}
                  <Link href={data.cecd.linkHref} className={styles.inlineLink}>
                    {data.cecd.linkLabel}
                  </Link>
                  .
                </p>
              </div>
              <img src={data.cecd.image} alt="" className={styles.cecdImage} />
            </div>
          </section>

          {/* Seminars (Figma 2549:1592): photo with 60% black overlay, centred copy. */}
          <section className={styles.seminars}>
            <img src={data.seminars.image} alt="" className={styles.seminarsImage} />
            <div className={`container ${styles.seminarsInner}`}>
              <h2 className={styles.seminarsHeading}>{data.seminars.heading}</h2>
              <p className={styles.seminarsBody}>{data.seminars.body}</p>
              <Link href={data.seminars.cta.href} className={`btn accent ${styles.smallBtn}`}>
                {data.seminars.cta.label}
              </Link>
            </div>
          </section>

          {/* Doctoral research center (Figma 2549:1600-1618) with pale arrow watermark. */}
          <section className={styles.doctoral}>
            <div className={`container ${styles.split}`}>
              <div className={styles.doctoralText}>
                <h2 className={styles.heading}>{data.doctoral.heading}</h2>
                <div className={styles.paragraphs}>
                  {data.doctoral.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                <div className={styles.doctoralCtas}>
                  <Link href={data.doctoral.pdf.href} className={`btn accent ${styles.smallBtn}`}>
                    {data.doctoral.pdf.label}
                  </Link>
                  <Link
                    href={data.doctoral.apply.href}
                    className={`btn accent-outline ${styles.smallBtn}`}>
                    {data.doctoral.apply.label}
                  </Link>
                </div>
              </div>
              <img src={data.doctoral.image} alt="" className={styles.doctoralImage} />
            </div>
          </section>

          {/* Aweshkar Journal (Figma 2549:1677): purple band, downloads left, photo right. */}
          <section className={styles.journal}>
            <div className={`container ${styles.split}`}>
              <div className={styles.journalText}>
                <h2 className={styles.headingLight}>{data.journal.heading}</h2>
                <p className={styles.bodyLight}>{data.journal.body}</p>
                <JournalDownloads
                  heading={data.journal.downloadHeading}
                  years={data.journal.years}
                />
              </div>
              <img src={data.journal.image} alt="" className={styles.journalImage} />
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

export default WeResearchPage;
