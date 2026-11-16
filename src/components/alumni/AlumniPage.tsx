import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import type { AlumniData } from "@/lib/alumni/alumni-data";
import styles from "./AlumniPage.module.scss";

export function AlumniPage({ data }: { data: AlumniData }) {
  const { hero, intro, experience, programs, quote, reconnect } = data;
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main>
          {/* Full-bleed hero under the transparent header (Figma 2962:1950) */}
          <section className={styles.hero}>
            <Image src={hero.image} alt="" fill priority sizes="100vw" className={styles.heroImg} />
            <div className={`container ${styles.heroInner}`}>
              <WeResearchBreadcrumb current={data.breadcrumb} className={styles.breadcrumb} />
              <div className={styles.heroText}>
                <h1 className={styles.heroHeading}>{hero.heading}</h1>
                <p className={styles.heroBody}>{hero.body}</p>
              </div>
            </div>
          </section>

          <section className={`container ${styles.intro}`}>
            <h2 className={styles.heading}>
              {intro.headingLines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h2>
            <div className={styles.introBody}>
              {intro.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          {/* Purple panel bleeding right with the photo overlapping its end (Figma 2962:2477/2148) */}
          <section className={`container ${styles.experience}`}>
            <div className={styles.experienceText}>
              <h2 className={`${styles.heading} ${styles.light}`}>{experience.heading}</h2>
              <p className={styles.experienceBody}>{experience.body}</p>
            </div>
            <Image src={experience.image} alt="" width={613} height={488} sizes="(max-width: 1024px) 100vw, 613px" className={styles.experienceImg} />
          </section>

          <section className={`container ${styles.programs}`}>
            <h2 className={styles.heading}>{programs.heading}</h2>
            <p className={styles.programsBody}>{programs.body}</p>
            <ul className={styles.programList}>
              {programs.items.map((p) => (
                <li key={p.id} className={styles.program}>
                  <Image src={p.icon} alt="" width={51} height={56} className={styles.programIcon} />
                  <h3 className={styles.programTitle}>{p.title}</h3>
                  <p className={styles.programText}>{p.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.quote}>
            <div className="container">
              <blockquote className={styles.quoteText}>{quote.text}</blockquote>
              <p className={styles.quoteCaption}>{quote.caption}</p>
            </div>
          </section>

          <section className={`container ${styles.reconnect}`}>
            <Image src={reconnect.image} alt="" width={613} height={490} sizes="(max-width: 1024px) 100vw, 613px" className={styles.reconnectImg} />
            <div className={styles.reconnectText}>
              <h2 className={styles.heading}>
                {reconnect.headingLines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </h2>
              <p className={styles.reconnectBody}>{reconnect.body}</p>
              <Link href={reconnect.cta.href} className={styles.cta}>
                {reconnect.cta.label}
              </Link>
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
