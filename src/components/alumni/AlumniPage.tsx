import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import { ALUMNI_APP, ALUMNI_CAMPUSES, ALUMNI_DIRECTORS, ALUMNI_GALLERY, ALUMNI_NEWS, type AlumniData } from "@/lib/alumni/alumni-data";
import styles from "./AlumniPage.module.scss";

export function AlumniPage({ data }: { data: AlumniData }) {
  const { hero, experience, programs, quote, reconnect } = data;
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

          {/* Figma 3461:440 revision: campuses, directors, gallery, news, app. */}
          <section className={`container ${styles.campuses}`}>
            <h2 className={styles.heading}>Our Campuses</h2>
            <ul className={styles.campusGrid}>
              {ALUMNI_CAMPUSES.map((c) => (
                <li key={c.title} className={styles.campusCard}>
                  <Image src={c.image} alt={c.title} fill sizes="(max-width: 767px) 100vw, 400px" className={styles.cover} />
                  <div className={styles.campusPanel}>
                    <h3 className={styles.campusTitle}>{c.title}</h3>
                    <Link href={c.href} className={`btn primary ${styles.smallBtn}`}>
                      Know More
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {ALUMNI_DIRECTORS.map((d, i) => (
            <section key={d.name} className={`${styles.director} ${i === 0 ? styles.tinted : ""}`}>
              <div className={`container ${styles.directorInner}`}>
                <Image src={d.image} alt={d.name} width={400} height={388} sizes="(max-width: 767px) 100vw, 400px" className={styles.directorImg} />
                <div className={styles.directorText}>
                  {d.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  <h3 className={styles.directorName}>{d.name}</h3>
                  <p className={styles.directorRole}>{d.role}</p>
                  {d.org ? <p className={styles.directorRole}>{d.org}</p> : null}
                </div>
              </div>
            </section>
          ))}

          <section className={`container ${styles.gallery}`}>
            <div className={styles.sectionHead}>
              <h2 className={styles.heading}>{ALUMNI_GALLERY.heading}</h2>
              <Link href={ALUMNI_GALLERY.viewAll} className="btn primary">
                View All
              </Link>
            </div>
            <div className={styles.galleryGrid}>
              {ALUMNI_GALLERY.images.map((src, i) => (
                <div key={src} className={`${styles.galleryItem} ${styles[`g${i + 1}`]}`}>
                  <Image src={src} alt="" fill sizes="(max-width: 767px) 100vw, 820px" className={styles.cover} />
                </div>
              ))}
            </div>
          </section>

          <section className={`container ${styles.news}`}>
            <div className={styles.sectionHead}>
              <div>
                <h2 className={styles.heading}>{ALUMNI_NEWS.heading}</h2>
                <p className={styles.sectionBody}>{ALUMNI_NEWS.body}</p>
              </div>
              <Link href={ALUMNI_NEWS.viewAll} className="btn primary">
                View All
              </Link>
            </div>
            <div className={styles.newsGrid}>
              <article className={styles.newsFeatured}>
                <Image src={ALUMNI_NEWS.featured.image ?? ""} alt="" fill sizes="(max-width: 767px) 100vw, 610px" className={styles.cover} />
                <div className={styles.newsPanel}>
                  <h3 className={styles.newsTitle}>{ALUMNI_NEWS.featured.title}</h3>
                  <p className={styles.newsText}>{ALUMNI_NEWS.featured.text}</p>
                  <p className={styles.newsDate}>{ALUMNI_NEWS.featured.date}</p>
                  <Link href={ALUMNI_NEWS.featured.href} className={styles.playBtn} aria-label={`Read: ${ALUMNI_NEWS.featured.title}`} />
                </div>
              </article>
              {ALUMNI_NEWS.photos.map((src) => (
                <div key={src} className={styles.newsPhoto}>
                  <Image src={src} alt="" fill sizes="(max-width: 767px) 50vw, 295px" className={styles.cover} />
                </div>
              ))}
              {ALUMNI_NEWS.items.map((n) => (
                <article key={n.title} className={styles.newsCard}>
                  <h3 className={styles.newsTitle}>{n.title}</h3>
                  <p className={styles.newsDate}>{n.date}</p>
                  <Link href={n.href} className={styles.playBtn} aria-label={`Read: ${n.title}`} />
                </article>
              ))}
            </div>
          </section>

          <section className={`container ${styles.app}`}>
            <h2 className={styles.heading}>{ALUMNI_APP.heading}</h2>
            <p className={styles.sectionBody}>{ALUMNI_APP.body}</p>
            <div className={styles.appBand}>
              <div className={styles.appText}>
                <Image src={ALUMNI_APP.logo} alt="weunion - WeSchool Alumni Association" width={368} height={117} className={styles.appLogo} />
                {ALUMNI_APP.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
                <div className={styles.stores}>
                  {ALUMNI_APP.stores.map((st) =>
                    st.href ? (
                      <a key={st.label} href={st.href} target="_blank" rel="noopener noreferrer">
                        <img src={st.image} alt={st.label} width={st.width} height={st.height} />
                      </a>
                    ) : (
                      <img key={st.label} src={st.image} alt={st.label} width={st.width} height={st.height} />
                    ),
                  )}
                </div>
              </div>
              <Image src={ALUMNI_APP.phone} alt="WeAlumni app on a phone" width={491} height={635} sizes="(max-width: 767px) 80vw, 491px" className={styles.appPhone} />
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
