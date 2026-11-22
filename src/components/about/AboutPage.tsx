"use client";

import { Fragment, useRef, useState } from "react";
import Link from "next/link";

import Header from "@/components/Header/Header";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type { AboutData, AboutPerson } from "@/lib/about/about-data";
import styles from "./AboutPage.module.scss";
import cdc from "./CdcPage/CdcPage.module.scss";

// splitRole (College Development Committee): Drupal titles read "Designation - Role";
// rendered like the Visiting Faculty grid: name, designation, role in purple on its own line.
function BoardList({ id, heading, people, splitRole = false }: { id: string; heading: string; people: AboutPerson[]; splitRole?: boolean }) {
  return (
    <section id={id} className={`container ${styles.block} ${styles.anchor}`}>
      <h2 className={styles.heading}>{heading}</h2>
      {splitRole ? (
        <ul className={`${cdc.grid} ${cdc.grid4}`}>
          {people.map((p) => {
            // Role = text after the last hyphen; any earlier hyphens become spaces.
            const parts = p.title.split(/\s+[-–]\s+/);
            const role = parts.length > 1 ? parts.pop() : "";
            return (
              <li key={p.id} className={cdc.member}>
                <p className={cdc.name}>{p.name}</p>
                <p className={cdc.designation}>{parts.join(" ")}</p>
                {role ? <p className={cdc.role}>{role}</p> : null}
              </li>
            );
          })}
        </ul>
      ) : (
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
      )}
    </section>
  );
}

// `footer` is rendered on the server (it fetches the Drupal menu) and passed in,
// because a client component cannot run an async server component itself.
// Every section is Drupal content (sanitized server-side) and is hidden when empty.
export function AboutPage({ data, footer }: { data: AboutData | null; footer?: React.ReactNode }) {
  const [activeYear, setActiveYear] = useState(data?.honours.years[0] ?? "");
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollHonours = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const d = data;

  // Chairman / Vice Chairman desks: alternate purple and cream bands.
  // CDC Chairman photo comes from Figma 3507:676.
  const renderDesk = (raw: AboutData["desks"][number], i: number) => {
    const cdc = isCdcDesk(raw.heading);
    const desk = cdc ? { ...raw, image: "/about/cdc-chairman.webp" } : raw;
    // Both photos have plain space above the head; zoom from the bottom edge so the
    // person fills the band top to bottom (values tuned to each photo's framing).
    const zoom = { ["--desk-zoom" as string]: cdc ? 1.15 : i === 0 ? 1.35 : 1 } as React.CSSProperties;
    return (

            <section
              key={desk.heading}
              id={i === 0 ? "chairman" : i === 1 ? "vice-chairman" : undefined}
              className={`${i % 2 ? `mt-5 ${styles.bandCream}` : styles.bandPurple} ${styles.anchor}`}>
              <div className={`container ${styles.block} ${styles.chairman} ${i % 2 ? styles.chairmanReverse : ""}`}>
                {desk.image && i % 2 === 0 ? (
                  <div className={styles.chairmanMedia} style={zoom}>
                    <img
                      src={desk.image}
                      alt={desk.name}
                      className={styles.chairmanImage}
                    />
                  </div>
                ) : null}
                <div className={styles.chairmanText}>
                  <h2 className={styles.heading}>{desk.heading}</h2>
                  {desk.html ? <div className={`${styles.body} ${styles.rich}`} dangerouslySetInnerHTML={{ __html: desk.html }} /> : null}
                  {desk.name ? <p className={styles.personName}>{desk.name}</p> : null}
                  {desk.title ? <p className={styles.personRole}>{desk.title}</p> : null}
                </div>
                {desk.image && i % 2 === 1 ? (
                  <div className={styles.chairmanMedia} style={zoom}>
                    <img
                      src={desk.image}
                      alt={desk.name}
                      className={styles.chairmanImage}
                    />
                  </div>
                ) : null}
              </div>
            </section>
    );
  };
  // The CDC Chairman's desk sits just above the College Development Committee.
  const isCdcDesk = (heading: string) => /\bCDC\b/i.test(heading);
  const isCdcBoard = (heading: string) => /college development committee/i.test(heading);

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main data-auto-reveal="reveal">
          {d?.hero.title ? (
            <section className={styles.hero}>
              {d.hero.image ? (
                <img
                  src={d.hero.image}
                  alt=""
                  className={styles.heroImage}
                />
              ) : null}
              <div className={styles.heroOverlay} />
              <div className={`container ${styles.heroInner}`}>
                <nav className={styles.breadcrumb}>
                  <Link href="/">Home</Link> <span>›</span> <span>About Us</span>
                </nav>
                <div className={styles.heroBottom}>
                  <h1 className={styles.heroTitle}>{d.hero.title}</h1>
                  {d.hero.subtitle ? <p className={styles.heroSubtitle}>{d.hero.subtitle}</p> : null}
                </div>
              </div>
            </section>
          ) : null}

          {d?.vision.html ? (
            <section id="vision-mission" className={`container ${styles.block} ${styles.vision} ${styles.anchor}`}>
              <div className={styles.visionText}>
                <h2 className={styles.bigHeading}>{d.vision.heading}</h2>
                <div className={`${styles.lead} ${styles.rich}`} dangerouslySetInnerHTML={{ __html: d.vision.html }} />
              </div>
              {d.vision.image ? (
                <div className={styles.collage}>
                  <img
                    src={d.vision.image}
                    alt={d.vision.heading}
                    className={styles.collageMain}
                  />
                </div>
              ) : null}
            </section>
          ) : null}

          {d?.mission.html ? (
            <section className={`container ${styles.block} ${styles.mission}`}>
              {d.mission.image ? (
                <div className={styles.collageLeft}>
                  <img
                    src={d.mission.image}
                    alt={d.mission.heading}
                    className={styles.collageMain}
                  />
                </div>
              ) : null}
              <div className={styles.missionText}>
                <h2 className={styles.bigHeading}>{d.mission.heading}</h2>
                <div className={`${styles.body} ${styles.rich}`} dangerouslySetInnerHTML={{ __html: d.mission.html }} />
              </div>
            </section>
          ) : null}

          {/* S.P. Mandali (Figma 2128:185): watermark layout, right after Mission. */}
          {d?.spMandali.paragraphs.length ? (
            <section id="spm" className={`${styles.whoWeAre} ${styles.spm} ${styles.anchor}`}>
              <div className="container">
                <span
                  className={styles.watermark}
                  aria-hidden="true">
                  {d.spMandali.watermark}
                </span>
                {d.spMandali.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={styles.whoBody}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {/* Chairman desks (the CDC desk is shown above the College Development Committee). */}
          {d?.desks.map((desk, i) => (isCdcDesk(desk.heading) ? null : renderDesk(desk, i)))}

          {/* Who We Are (WeSchool watermark). */}
          {d?.whoWeAre.paragraphs.length ? (
            <section id="weschool" className={`${styles.whoWeAre} ${styles.anchor}`}>
              <div className="container">
                <span
                  className={styles.watermark}
                  aria-hidden="true">
                  {d.whoWeAre.watermark}
                </span>
                {d.whoWeAre.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={styles.whoBody}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {d?.director ? (
            <section id="director" className={`container ${styles.block} ${styles.director} ${styles.anchor}`}>
              <div className={styles.directorText}>
                <h2 className={styles.heading}>{d.director.heading}</h2>
                <div className={`${styles.body} ${styles.rich}`} dangerouslySetInnerHTML={{ __html: d.director.html }} />
                {d.director.sign ? <p className={styles.sign}>{d.director.sign}</p> : null}
              </div>
              {d.director.image ? (
                <div className={styles.directorMedia}>
                  <img
                    src={d.director.image}
                    alt=""
                  />
                </div>
              ) : null}
            </section>
          ) : null}

          {/* Managing Council. */}
          {d?.council.people.length ? (
            <section id="managing-council" className={`container ${styles.block} ${styles.anchor}`}>
              <h2 className={styles.heading}>{d.council.heading}</h2>
              {d.council.html ? <div className={`${styles.sub} ${styles.rich}`} dangerouslySetInnerHTML={{ __html: d.council.html }} /> : null}
              <div className={styles.facultyGrid}>
                {d.council.people.map((p) => (
                  <article
                    key={p.id}
                    className={styles.facultyCard}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                      />
                    ) : null}
                    <h3>{p.name}</h3>
                    <p>{p.title}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          {/* Advisory boards / committees (only those with people). */}
          {d?.boards.map((board) => (
            <Fragment key={board.id}>
              {isCdcBoard(board.heading)
                ? d.desks.map((desk, i) => (isCdcDesk(desk.heading) ? renderDesk(desk, i) : null))
                : null}
              <BoardList
                id={isCdcBoard(board.heading) ? "college-development-committee" : board.id}
                heading={board.heading}
                people={board.people}
                splitRole={isCdcBoard(board.heading)}
              />
            </Fragment>
          ))}

          {/* Accreditations (Figma 2292:147..): heading + 2x2 bordered cards. */}
          {d?.accreditations.length ? (
            <section className={styles.accredSection}>
              <div className={`container ${styles.block}`}>
                <h2 className={styles.heading}>{d.accreditationsHeading || "Accreditations"}</h2>
                <div className={styles.accredGrid}>
                  {d.accreditations.map((a) => (
                    <div
                      key={a.id}
                      className={styles.accredItem}>
                      {a.logo ? (
                        <img
                          src={a.logo}
                          alt=""
                          className={styles.accredLogo}
                        />
                      ) : null}
                      <div className={`${styles.accredText} ${styles.rich}`} dangerouslySetInnerHTML={{ __html: a.html }} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* Honours & Achievements (awards API). */}
          {d?.honours.cards.length ? (
            <section id="awards" className={`bg-light-yellow ${styles.anchor}`}>
              <div className={`container ${styles.block} ${styles.honours}`}>
                <div className={styles.yearNav}>
                  {d.honours.years.map((y) => (
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
                  <h2 className={styles.heading}>{d.honours.heading}</h2>
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
                    {d.honours.cards.filter((c) => !c.year || c.year === activeYear).map((c) => (
                      <article
                        key={c.id}
                        className={styles.honourCard}>
                        {c.image ? (
                          <img
                            src={c.image}
                            alt=""
                          />
                        ) : null}
                        <p className={styles.honourTitle}>{c.text}</p>
                        {/* Award description from Drupal (sanitized server-side). */}
                        {c.html ? <div className={`${styles.honourText} ${styles.rich}`} dangerouslySetInnerHTML={{ __html: c.html }} /> : null}
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

        </main>

        <SearchOverlay />
        <ScrollToTop />
        {footer}
      </div>
    </SearchProvider>
  );
}

export default AboutPage;
