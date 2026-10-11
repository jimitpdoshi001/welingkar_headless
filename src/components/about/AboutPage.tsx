"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { AboutData, AboutPerson } from "@/lib/about/about-data";
import styles from "./AboutPage.module.scss";

function BoardList({ heading, people }: { heading: string; people: AboutPerson[] }) {
  return (
    <section className={`container ${styles.block}`}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.boardGrid}>
        {people.map((p) => (
          <div
            key={p.id}
            className={styles.boardItem}>
            <p className={styles.boardName}>{p.name}</p>
            <p className={styles.boardRole}>{p.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutPage({ data }: { data: AboutData }) {
  const [activeYear, setActiveYear] = useState(data.honours.years[0]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollHonours = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main>
          {/* Hero */}
          <section className={styles.hero}>
            <img
              src={data.hero.image}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <nav className={styles.breadcrumb}>
                <Link href="/">Home</Link> <span>›</span> <span>About Us</span>
              </nav>
              <div className={styles.heroBottom}>
                <h1 className={styles.heroTitle}>{data.hero.title}</h1>
                <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>
              </div>
            </div>
          </section>

          {/* Our Vision */}
          <section className={`container ${styles.block} ${styles.vision}`}>
            <div className={styles.visionText}>
              <h2 className={styles.bigHeading}>{data.vision.heading}</h2>
              <p className={styles.lead}>{data.vision.body}</p>
            </div>
            <div className={styles.collage}>
              <img
                src={data.vision.images[0]}
                alt=""
                className={styles.collageMain}
              />
              <img
                src={data.vision.images[1]}
                alt=""
                className={styles.collageSmall}
              />
            </div>
          </section>

          {/* Our Mission */}
          <section className={`container ${styles.block} ${styles.mission}`}>
            <div className={styles.collageLeft}>
              <img
                src={data.mission.images[0]}
                alt=""
                className={styles.collageMain}
              />
              <img
                src={data.mission.images[1]}
                alt=""
                className={styles.collageSmallR}
              />
            </div>
            <div className={styles.missionText}>
              <h2 className={styles.bigHeading}>{data.mission.heading}</h2>
              {data.mission.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={styles.body}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Who We Are */}
          <section className={styles.whoWeAre}>
            <div className="container">
              <span
                className={styles.watermark}
                aria-hidden="true">
                {data.whoWeAre.watermark}
              </span>
              <p className={styles.whoBody}>{data.whoWeAre.body}</p>
            </div>
          </section>

          {/* Chairman */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block} ${styles.chairman}`}>
              <img
                src={data.chairman.image}
                alt={data.chairman.name}
                className={styles.chairmanImage}
              />
              <div className={styles.chairmanText}>
                <h2 className={styles.heading}>{data.chairman.heading}</h2>
                <p className={styles.body}>{data.chairman.body}</p>
                <p className={styles.personName}>{data.chairman.name}</p>
                <p className={styles.personRole}>{data.chairman.title}</p>
              </div>
            </div>
          </section>

          {/* Director */}
          <section className={`container ${styles.block} ${styles.director}`}>
            <div className={styles.directorText}>
              <h2 className={styles.heading}>{data.director.heading}</h2>
              {data.director.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={styles.body}>
                  {p}
                </p>
              ))}
              <p className={styles.sign}>{data.director.sign}</p>
            </div>
            <div className={styles.directorMedia}>
              <img
                src={data.director.image}
                alt=""
              />
              <span className={styles.playBadge} />
            </div>
          </section>

          {/* Accreditations */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <div className={styles.accredGrid}>
                {data.accreditations.map((a) => (
                  <div
                    key={a.title}
                    className={styles.accredItem}>
                    <img
                      src={a.logo}
                      alt={a.title}
                      className={styles.accredLogo}
                    />
                    <p className={styles.accredText}>
                      <strong>{a.title}</strong> {a.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Advisory boards */}
          <BoardList
            heading={data.academicBoard.heading}
            people={data.academicBoard.people}
          />
          <BoardList
            heading={data.industryBoard.heading}
            people={data.industryBoard.people}
          />

          {/* Honours & Achievements */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block} ${styles.honours}`}>
              <div className={styles.yearNav}>
                {data.honours.years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    className={`${styles.year} ${y === activeYear ? styles.yearActive : ""}`}
                    onClick={() => setActiveYear(y)}>
                    {y}
                  </button>
                ))}
              </div>
              <div className={styles.honoursMain}>
                <h2 className={styles.heading}>{data.honours.heading}</h2>
                <span
                  className={styles.bigYear}
                  aria-hidden="true">
                  {activeYear}
                </span>
                <button
                  type="button"
                  className={`${styles.hArrow} ${styles.hPrev}`}
                  onClick={() => scrollHonours(-1)}
                  aria-label="Previous">
                  <ArrowLeft
                    width={7}
                    height={10}
                  />
                </button>
                <button
                  type="button"
                  className={`${styles.hArrow} ${styles.hNext}`}
                  onClick={() => scrollHonours(1)}
                  aria-label="Next">
                  <ArrowRight
                    width={7}
                    height={10}
                  />
                </button>
                <div
                  className={styles.honoursTrack}
                  ref={trackRef}>
                  {data.honours.cards.map((c) => (
                    <article
                      key={c.id}
                      className={styles.honourCard}>
                      <img
                        src={c.image}
                        alt=""
                      />
                      <p>{c.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Faculty */}
          <section className={`container ${styles.block}`}>
            <h2 className={styles.heading}>{data.faculty.heading}</h2>
            <p className={styles.sub}>{data.faculty.body}</p>
            <div className={styles.facultyGrid}>
              {data.faculty.people.map((p) => (
                <article
                  key={p.id}
                  className={styles.facultyCard}>
                  <img
                    src={p.image}
                    alt={p.name}
                  />
                  <h3>{p.name}</h3>
                  <p>{p.title}</p>
                </article>
              ))}
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

export default AboutPage;
