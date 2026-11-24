import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "@/components/blogs/BlogIcons";
import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import type { AdmissionsData } from "@/lib/admissions/admissions-data";
import styles from "./AdmissionsPage.module.scss";

/**
 * Figma 3666:984 — Admissions (2-Year Full-Time PGDM). Content from Drupal (see
 * src/lib/drupal/pages/admissions.ts); every element is hidden when its field is empty.
 * Rich-text fields (*Html) render only through SafeHtml (sanitized).
 */
export function AdmissionsPage({ data: D }: { data: AdmissionsData }) {
  const { intro, eligibility, exams, howToApply, cutoffs, fees, scholarships } = D;
  const hasEligibility = Boolean(eligibility.heading || eligibility.itemsHtml.length || exams.heading || exams.textHtml);
  const hasFeeDetails = Boolean(fees.waiver.heading || fees.waiver.html || fees.admissions.heading || fees.admissions.text || fees.loan.heading || fees.loan.paragraphs.length || fees.loan.logo || fees.loan.cta.href);

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
        {/* Keep one h1 for the page even if the Drupal title is empty. */}
        <h1 className={styles.title}>{intro.title || "Admissions"}</h1>
        {intro.subtitle ? <p className={styles.subtitle}>{intro.subtitle}</p> : null}
        <SafeHtml
          html={intro.textHtml}
          className={`${styles.body} ${styles.rich}`}
        />
        {intro.cta.href ? (
          <a
            href={intro.cta.href}
            className={styles.cta}>
            {intro.cta.label}
          </a>
        ) : null}
      </section>

      {/* Eligibility criteria + entrance exams, over a classroom photo fading to white */}
      {hasEligibility ? (
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
          {eligibility.image ? (
            <Image
              src={eligibility.image}
              alt=""
              width={1024}
              height={1019}
              sizes="100vw"
              className={styles.eligibilityBg}
            />
          ) : null}
          <div className={`container ${styles.eligibilityInner}`}>
            {eligibility.heading ? <h2 className={`${styles.heading} ${styles.center}`}>{eligibility.heading}</h2> : null}
            {eligibility.itemsHtml.length ? (
              <ul className={styles.criteria}>
                {eligibility.itemsHtml.map((h, i) => (
                  <li key={i}>
                    <span className={styles.check}>
                      <img
                        src="/admissions/check.svg"
                        alt=""
                        width={13}
                        height={9}
                      />
                    </span>
                    <SafeHtml
                      html={h}
                      className={styles.rich}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {exams.heading || exams.textHtml ? (
            <div className={`container ${styles.exams}`}>
              {exams.heading ? <h2 className={`${styles.heading} ${styles.center}`}>{exams.heading}</h2> : null}
              <SafeHtml
                html={exams.textHtml}
                className={`${styles.body} ${styles.rich}`}
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* How to apply: steps */}
      {howToApply.heading || howToApply.textHtml || howToApply.steps.length ? (
        <section
          id="how-to-apply"
          className={styles.cream}>
          <div className="container">
            {howToApply.heading ? <h2 className={styles.heading}>{howToApply.heading}</h2> : null}
            <SafeHtml
              html={howToApply.textHtml}
              className={`${styles.body} ${styles.narrow} ${styles.rich}`}
            />
            {howToApply.steps.length ? (
              <ol className={styles.steps}>
                {howToApply.steps.map((s) => (
                  <li key={`${s.step}-${s.title}`}>
                    <span className={styles.stepPill}>STEP {s.step}</span>
                    {s.title ? <h3 className={styles.subheading}>{s.title}</h3> : null}
                    <SafeHtml
                      html={s.html}
                      className={`${styles.stepText} ${styles.rich}`}
                    />
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Eligibility & cut-offs: purple cards */}
      {cutoffs.heading || cutoffs.textHtml || cutoffs.cards.length ? (
        <section
          id="eligibility-cutoffs"
          className={`container ${styles.cutoffs}`}>
          {cutoffs.heading ? <h2 className={styles.heading}>{cutoffs.heading}</h2> : null}
          <SafeHtml
            html={cutoffs.textHtml}
            className={`${styles.body} ${styles.rich}`}
          />
          {cutoffs.cards.length ? (
            <div className={styles.cutoffCards}>
              {cutoffs.cards.map((c) => (
                <div
                  key={c.title}
                  className={styles.cutoffCard}>
                  {c.title ? <h3>{c.title}</h3> : null}
                  <SafeHtml
                    html={c.html}
                    className={styles.rich}
                  />
                  {c.href ? (
                    <Link
                      href={c.href}
                      className={styles.cardArrow}
                      aria-label={c.title || "Open"}>
                      <img
                        src="/admissions/arrow-filled.svg"
                        alt=""
                        width={50}
                        height={50}
                      />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Fees & support */}
      {fees.heading || fees.textHtml || fees.cards.length || hasFeeDetails ? (
        <section className={styles.cream}>
          <div className="container">
            {fees.heading ? <h2 className={styles.heading}>{fees.heading}</h2> : null}
            {fees.textHtml || fees.cards.length ? (
              <div className={styles.feesHead}>
                <SafeHtml
                  html={fees.textHtml}
                  className={`${styles.body} ${styles.rich}`}
                />
                {fees.cards.length ? <ScrollArrows targetId="admission-fees" /> : null}
              </div>
            ) : null}
            {fees.cards.length ? (
              <ul
                id="admission-fees"
                className={styles.feeRow}>
                {fees.cards.map((c) => (
                  <li
                    key={c.title}
                    className={styles.feeCard}>
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 85vw, 400px"
                      className={styles.feeImage}
                      style={{ objectPosition: c.position }}
                    />
                    {c.overlay ? (
                      // Figma places this second photo layer oversized and offset, not fitted to the card.
                      <Image
                        src={c.overlay}
                        alt=""
                        width={497}
                        height={598}
                        sizes="(max-width: 767px) 100vw, 460px"
                        className={styles.feeOverlay}
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
            ) : null}

            {hasFeeDetails ? (
              <div className={styles.feeDetails}>
                <div>
                  {fees.waiver.heading ? (
                    <h3
                      id="tfw-scheme"
                      className={styles.subheading}>
                      {fees.waiver.heading}
                    </h3>
                  ) : null}
                  <SafeHtml
                    html={fees.waiver.html}
                    className={`${styles.dotList} ${styles.rich}`}
                  />
                </div>
                <div>
                  {fees.admissions.heading ? <h3 className={styles.subheading}>{fees.admissions.heading}</h3> : null}
                  {fees.admissions.text ? <p className={styles.body}>{fees.admissions.text}</p> : null}
                  {fees.loan.heading ? (
                    <h3
                      id="education-loan"
                      className={`${styles.subheading} ${styles.loanHeading}`}>
                      {fees.loan.heading}
                    </h3>
                  ) : null}
                  {fees.loan.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 30)}
                      className={styles.loanText}>
                      {p}
                    </p>
                  ))}
                  {fees.loan.logo || fees.loan.cta.href ? (
                    <div className={styles.loanPill}>
                      {fees.loan.logo ? (
                        <Image
                          src={fees.loan.logo}
                          alt={fees.loan.logoAlt}
                          width={108}
                          height={22}
                        />
                      ) : null}
                      {fees.loan.cta.href ? (
                        <Link
                          href={fees.loan.cta.href}
                          className={styles.loanCta}>
                          {fees.loan.cta.label}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Scholarships: photo band with dark overlay */}
      {scholarships.heading || scholarships.html ? (
        <section
          id="scholarships"
          className={styles.scholarships}>
          {scholarships.image ? (
            <Image
              src={scholarships.image}
              alt=""
              fill
              sizes="100vw"
              className={styles.scholarshipsBg}
            />
          ) : null}
          <div className={`container ${styles.scholarshipsInner}`}>
            {scholarships.heading ? <h2 className={`${styles.heading} ${styles.light}`}>{scholarships.heading}</h2> : null}
            <SafeHtml
              html={scholarships.html}
              className={styles.rich}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
