import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { HomeIcon } from "@/components/blogs/BlogIcons";
import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import { ADMISSIONS as D } from "@/lib/admissions/admissions-data";
import styles from "./AdmissionsPage.module.scss";

/** Renders text with "{label|href}" tokens as internal links (data is static, so no user input reaches here). */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\{([^|}]+)\|([^}]+)\}/);
  // split() with 2 capture groups yields [text, label, href, text, label, href, text...]
  return (
    <>
      {parts.map((p, i) =>
        i % 3 === 1 ? (
          <Link
            key={i}
            href={parts[i + 1]}
            className={styles.inlineLink}>
            {p}
          </Link>
        ) : i % 3 === 2 ? null : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Figma 3666:984 — Admissions (2-Year Full-Time PGDM). */
export function AdmissionsPage() {
  return (
    <>
      {/* Intro */}
      <section className={`container ${styles.intro}`}>
        <nav
          className={styles.breadcrumb}
          aria-label="Breadcrumb">
          <Link
            href="/"
            aria-label="Home">
            <HomeIcon />
          </Link>
          <span aria-hidden="true">-</span>
          <span>Admissions</span>
        </nav>
        <h1 className={styles.title}>{D.intro.title}</h1>
        <p className={styles.subtitle}>{D.intro.subtitle}</p>
        <p className={styles.body}>{D.intro.text}</p>
        <a
          href={D.intro.cta.href}
          className={styles.cta}>
          {D.intro.cta.label}
        </a>
      </section>

      {/* Eligibility criteria + entrance exams, over a classroom photo fading to white */}
      <section className={styles.eligibility}>
        <img
          src="/admissions/decor-left.svg"
          alt=""
          width={221}
          height={252}
          className={styles.decorLeft}
          aria-hidden="true"
        />
        <img
          src="/admissions/decor-right.svg"
          alt=""
          width={83}
          height={94}
          className={styles.decorRight}
          aria-hidden="true"
        />
        <Image
          src={D.eligibility.image}
          alt=""
          width={1024}
          height={1019}
          sizes="100vw"
          className={styles.eligibilityBg}
        />
        <div className={`container ${styles.eligibilityInner}`}>
          <h2 className={`${styles.heading} ${styles.center}`}>{D.eligibility.heading}</h2>
          <ul className={styles.criteria}>
            {D.eligibility.items.map((t) => (
              <li key={t}>
                <span className={styles.check}>
                  <img
                    src="/admissions/check.svg"
                    alt=""
                    width={13}
                    height={9}
                  />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className={`container ${styles.exams}`}>
          <h2 className={`${styles.heading} ${styles.center}`}>{D.exams.heading}</h2>
          <p className={styles.body}>{D.exams.text}</p>
        </div>
      </section>

      {/* How to apply: 3 steps */}
      <section
        id="how-to-apply"
        className={styles.cream}>
        <div className="container">
          <h2 className={styles.heading}>{D.howToApply.heading}</h2>
          <p className={`${styles.body} ${styles.narrow}`}>{D.howToApply.text}</p>
          <ol className={styles.steps}>
            {D.howToApply.steps.map((s, i) => (
              <li key={s.title}>
                <span className={styles.stepPill}>STEP {i + 1}</span>
                <h3 className={styles.subheading}>{s.title}</h3>
                {s.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 30)}
                    className={styles.stepText}>
                    <RichText text={p} />
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Eligibility & cut-offs: two purple cards */}
      <section className={`container ${styles.cutoffs}`}>
        <h2 className={styles.heading}>{D.cutoffs.heading}</h2>
        <p className={styles.body}>{D.cutoffs.text}</p>
        <div className={styles.cutoffCards}>
          {D.cutoffs.cards.map((c) => (
            <div
              key={c.title}
              className={styles.cutoffCard}>
              <h3>{c.title}</h3>
              <p>
                <RichText text={c.text} />
              </p>
              <Link
                href={c.href}
                className={styles.cardArrow}
                aria-label={c.title}>
                <img
                  src="/admissions/arrow-filled.svg"
                  alt=""
                  width={50}
                  height={50}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Fees & support */}
      <section className={styles.cream}>
        <div className="container">
          <h2 className={styles.heading}>{D.fees.heading}</h2>
          <div className={styles.feesHead}>
            <p className={styles.body}>{D.fees.text}</p>
            <ScrollArrows targetId="admission-fees" />
          </div>
          <ul
            id="admission-fees"
            className={styles.feeRow}>
            {D.fees.cards.map((c) => (
              <li
                key={c.title}
                className={styles.feeCard}>
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 85vw, 400px"
                  className={styles.feeImage}
                />
                {c.overlay ? (
                  <Image
                    src={c.overlay}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 85vw, 400px"
                    className={styles.feeImage}
                  />
                ) : null}
                <div className={styles.feeInfo}>
                  <p className={styles.feeTitle}>{c.title}</p>
                  {c.lines.map((l) => (
                    <p
                      key={l}
                      className={styles.feeAmount}>
                      {l}
                    </p>
                  ))}
                  {c.note ? <p className={styles.feeNote}>{c.note}</p> : null}
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.feeDetails}>
            <div>
              <h3 className={styles.subheading}>{D.fees.waiver.heading}</h3>
              <ul className={styles.dotList}>
                {D.fees.waiver.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.subheading}>{D.fees.admissions.heading}</h3>
              <p className={styles.body}>{D.fees.admissions.text}</p>
              <h3 className={`${styles.subheading} ${styles.loanHeading}`}>{D.fees.loan.heading}</h3>
              {D.fees.loan.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 30)}
                  className={styles.loanText}>
                  {p}
                </p>
              ))}
              <div className={styles.loanPill}>
                <Image
                  src={D.fees.loan.logo}
                  alt="ICICI Bank"
                  width={108}
                  height={22}
                />
                <Link
                  href={D.fees.loan.cta.href}
                  className={styles.loanCta}>
                  {D.fees.loan.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships: photo band with dark overlay */}
      <section className={styles.scholarships}>
        <Image
          src={D.scholarships.image}
          alt=""
          fill
          sizes="100vw"
          className={styles.scholarshipsBg}
        />
        <div className={`container ${styles.scholarshipsInner}`}>
          <h2 className={`${styles.heading} ${styles.light}`}>{D.scholarships.heading}</h2>
          {D.scholarships.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </section>
    </>
  );
}
