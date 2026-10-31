import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { WeGlobalData, WgCard } from "@/lib/weglobal/weglobal-data";
import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import { PartnerMap } from "./PartnerMap";
import styles from "./WeGlobalPage.module.scss";

type CardSectionProps = {
  id: string;
  heading: string;
  body: string;
  items: WgCard[];
  className?: string;
};

// Heading + copy with slider arrows on the right, then a 609x362 card row that
// starts on the container edge and runs off the right of the viewport (Figma).
function CardSection({ id, heading, body, items, className = "" }: CardSectionProps) {
  return (
    <section className={`${styles.cardSection} ${className}`}>
      <div className={`container ${styles.cardHead}`}>
        <div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.sectionBody}>{body}</p>
        </div>
        <ScrollArrows targetId={id} />
      </div>
      <div className={styles.track}>
        <ul id={id} className={styles.scrollRow}>
          {items.map((c) => (
            <li key={c.id} className={styles.card}>
              <img src={c.image} alt="" className={styles.cardImg} />
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardText}>{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WeGlobalPage({ data }: { data: WeGlobalData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main>
          {/* Hero + intro (Figma 1064:287 / 1064:290) */}
          <section className={`container ${styles.heroBlock}`}>
            <WeResearchBreadcrumb current="We Global" tone="dark" className={styles.breadcrumb} />
            <img src={data.hero.image} alt="" className={styles.heroImage} />
            <p className={styles.intro}>{data.hero.intro}</p>
          </section>

          {/* Alliances: copy left, contact cards right */}
          <section className={`container ${styles.alliances}`}>
            <div className={styles.alliancesText}>
              <h2 className={styles.heading}>{data.alliances.heading}</h2>
              <div className={styles.body}>
                {data.alliances.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
            <div className={styles.contacts}>
              {data.alliances.contacts.map((c) => (
                <div key={c.id} className={styles.contactCard}>
                  <h3>{c.name}</h3>
                  <p>
                    <strong>Contact Details</strong> : {c.contact}
                  </p>
                  <p>
                    <strong>Email Address</strong> : {c.email}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Partner universities map (Figma 2568:1782 + labels) */}
          <section className={`container ${styles.partners}`}>
            <h2 className={styles.heading}>{data.partners.heading}</h2>
            <PartnerMap
              map={data.partners.map}
              items={data.partners.items}
              title={data.partners.heading}
            />
          </section>

          <CardSection
            id="wg-engagements"
            heading={data.engagements.heading}
            body={data.engagements.body}
            items={data.engagements.items}
            className={styles.engagements}
          />

          <CardSection
            id="wg-learning"
            heading={data.learning.heading}
            body={data.learning.body}
            items={data.learning.items}
            className={styles.learning}
          />

          {/* Become a Student Buddy (Figma 1069:604) */}
          <section className={styles.buddy}>
            <div className={`container ${styles.buddyInner}`}>
              <div className={styles.buddyText}>
                <h2 className={styles.headingLight}>{data.buddy.heading}</h2>
                <p className={styles.buddyBody}>{data.buddy.body}</p>
              </div>
              <form
                name="weglobal"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/form-success"
                className={styles.buddyForm}>
                <input type="hidden" name="form-name" value="weglobal" />
                <p hidden aria-hidden="true">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  maxLength={100}
                  autoComplete="name"
                  aria-label="Name"
                />
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  maxLength={150}
                  autoComplete="email"
                  aria-label="Email"
                />
                <input
                  className={styles.input}
                  type="tel"
                  name="contact"
                  placeholder="Contact Us*"
                  required
                  pattern="[0-9+\-\s]{7,15}"
                  autoComplete="tel"
                  aria-label="Contact number"
                />
                <input
                  className={styles.input}
                  type="text"
                  name="course"
                  placeholder="Course*"
                  required
                  maxLength={100}
                  aria-label="Course"
                />
                <div className={styles.checkRow}>
                  <label className={styles.check}>
                    <input type="checkbox" name="campus" value="Mumbai" />
                    Mumbai
                  </label>
                  <label className={styles.check}>
                    <input type="checkbox" name="campus" value="Bengaluru" />
                    Bengaluru
                  </label>
                </div>
                <button type="submit" className={`btn accent ${styles.submit}`}>
                  Submit
                </button>
              </form>
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

export default WeGlobalPage;
