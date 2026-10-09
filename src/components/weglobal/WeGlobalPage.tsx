import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import type { WeGlobalData, WgCard } from "@/lib/weglobal/weglobal-data";
import styles from "./WeGlobalPage.module.scss";

function CardRow({ items }: { items: WgCard[] }) {
  return (
    <div className={styles.scrollRow}>
      {items.map((c) => (
        <article
          key={c.id}
          className={styles.card}>
          <img
            src={c.image}
            alt=""
            className={styles.cardImg}
          />
          <h3 className={styles.cardTitle}>{c.title}</h3>
          <p className={styles.cardText}>{c.text}</p>
        </article>
      ))}
    </div>
  );
}

export function WeGlobalPage({ data }: { data: WeGlobalData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main>
          {/* Hero + intro */}
          <section className={`container ${styles.heroBlock}`}>
            <nav className={styles.breadcrumb}>
              <Link href="/">Home</Link> <span>›</span> <span>We Global</span>
            </nav>
            <img
              src={data.hero.image}
              alt=""
              className={styles.heroImage}
            />
            <p className={styles.intro}>{data.hero.intro}</p>
          </section>

          {/* Alliances */}
          <section className={`container ${styles.block} ${styles.alliances}`}>
            <div>
              <h2 className={styles.heading}>{data.alliances.heading}</h2>
              {data.alliances.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={styles.body}>
                  {p}
                </p>
              ))}
            </div>
            <div className={styles.contacts}>
              {data.alliances.contacts.map((c) => (
                <div
                  key={c.id}
                  className={styles.contactCard}>
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

          {/* Engagements */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <h2 className={styles.heading}>{data.engagements.heading}</h2>
              <p className={styles.sectionBody}>{data.engagements.body}</p>
              <CardRow items={data.engagements.items} />
            </div>
          </section>

          {/* Learning */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.learning.heading}</h2>
            <p className={styles.sectionBody}>{data.learning.body}</p>
            <CardRow items={data.learning.items} />
          </section>

          {/* Become a Student Buddy */}
          <section className={`bg-secondary ${styles.buddy}`}>
            <div className={`container ${styles.buddyInner}`}>
              <div>
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
                <input
                  type="hidden"
                  name="form-name"
                  value="weglobal"
                />
                <p
                  hidden
                  aria-hidden="true">
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
                  aria-label="Name"
                />
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  aria-label="Email"
                />
                <input
                  className={styles.input}
                  type="tel"
                  name="contact"
                  placeholder="Contact Us*"
                  required
                  aria-label="Contact"
                />
                <input
                  className={styles.input}
                  type="text"
                  name="course"
                  placeholder="Course*"
                  required
                  aria-label="Course"
                />
                <div className={styles.checkRow}>
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      name="campus"
                      value="Mumbai"
                    />{" "}
                    Mumbai
                  </label>
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      name="campus"
                      value="Bengaluru"
                    />{" "}
                    Bengaluru
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn accent">
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
