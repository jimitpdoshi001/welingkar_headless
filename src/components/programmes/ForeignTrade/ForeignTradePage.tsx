import Image from "next/image";
import { PageShell } from "@/components/shell/PageShell";
import type { ForeignTradeData } from "@/lib/programmes/foreign-trade-data";
import styles from "./ForeignTradePage.module.scss";

/** Bulleted list with the green dot markers used across the design. */
function DotList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`${styles.dotList} ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Figma 3652:1025 — Post Graduate Program in Foreign Trade Management (PGP-FTM).
 * Data from Drupal (getForeignTrade); any part left empty in Drupal is hidden.
 */
export function ForeignTradePage({ data: D }: { data: ForeignTradeData }) {
  const { accreditation, nirf } = D.rankings;
  const f = D.features;
  return (
    <PageShell
      variant="tall"
      title={D.hero.title}
      subtitle={D.hero.subtitle}
      image={D.hero.image}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs/all" }, { label: "Foreign Trade Management" }]}
      heroAction={
        D.hero.cta.href && D.hero.cta.label ? (
          <a
            href={D.hero.cta.href}
            className={styles.heroCta}>
            {D.hero.cta.label}
          </a>
        ) : undefined
      }>
      {/* About us (cream band, decorative triangle on the left) */}
      {D.about.heading || D.about.text ? (
      <section className={styles.aboutBand}>
        <img
          src="/programs/foreign-trade/decor-triangle.svg"
          alt=""
          width={153}
          height={175}
          className={styles.decor}
          aria-hidden="true"
        />
        <div className={`container ${styles.aboutInner}`}>
          {D.about.heading ? <h2 className={styles.heading}>{D.about.heading}</h2> : null}
          {D.about.text ? <p className={styles.aboutText}>{D.about.text}</p> : null}
        </div>
      </section>
      ) : null}

      {/* Intro */}
      {D.intro.lead || D.intro.paragraphs.length ? (
      <section className={`container ${styles.intro}`}>
        {D.intro.lead ? <p className={styles.introLead}>{D.intro.lead}</p> : null}
        {D.intro.paragraphs.map((p) => (
          <p
            key={p.slice(0, 30)}
            className={styles.introText}>
            {p}
          </p>
        ))}
      </section>
      ) : null}

      {/* Rankings: three joined panels */}
      {accreditation || nirf ? (
      <section className={`container ${styles.rankings}`}>
        <div className={styles.rankLabel}>
          {D.rankings.heading ? <h2 className={styles.headingLight}>{D.rankings.heading}</h2> : null}
        </div>
        {accreditation ? (
          <div className={styles.rankDark}>
            <p className={styles.rankValue}>{accreditation.value}</p>
            <p className={styles.rankUnit}>{accreditation.unit}</p>
            <p className={styles.rankText}>{accreditation.text}</p>
          </div>
        ) : null}
        {nirf ? (
          <div className={styles.rankLight}>
            <p className={`${styles.rankValue} ${styles.rankValueGreen}`}>{nirf.value}</p>
            <p className={styles.rankUnit}>{nirf.unit}</p>
            <p className={styles.rankText}>{nirf.text}</p>
          </div>
        ) : null}
      </section>
      ) : null}

      {/* About FIEO */}
      {D.fieo.heading || D.fieo.text ? (
      <section className={`container ${styles.fieo}`}>
        {D.fieo.heading ? <h2 className={styles.heading}>{D.fieo.heading}</h2> : null}
        {D.fieo.text ? <p className={styles.body}>{D.fieo.text}</p> : null}
      </section>
      ) : null}

      {/* Leader messages: photo left / right on tinted bands */}
      {D.messages.map((m, i) => (
        <section
          key={m.name}
          className={`${styles.message} ${i % 2 ? styles.messagePeach : styles.messageLavender}`}>
          <div className={`container ${styles.messageInner} ${i % 2 ? styles.messageReverse : ""}`}>
            {m.image ? (
              <Image
                src={m.image}
                alt={m.name}
                width={451}
                height={451}
                sizes="(max-width: 767px) 80vw, 451px"
                className={styles.messagePhoto}
              />
            ) : null}
            <div className={styles.messageText}>
              <p className={styles.messageBody}>{m.message}</p>
              <p className={styles.messageName}>{m.name}</p>
              {m.role ? <p className={styles.messageRole}>{m.role}</p> : null}
            </div>
          </div>
        </section>
      ))}

      {/* Programme overview + "will broadly encompass" cards */}
      {D.programme.heading || D.programme.paragraphs.length ? (
      <section className={`container ${styles.programme}`}>
        <div>
          {D.programme.heading ? <h2 className={styles.heading}>{D.programme.heading}</h2> : null}
          {D.programme.paragraphs.map((p) => (
            <p
              key={p.slice(0, 30)}
              className={styles.body}>
              {p}
            </p>
          ))}
          {D.programme.encompassHeading ? <h3 className={styles.subheading}>{D.programme.encompassHeading}</h3> : null}
          {D.programme.encompass.length ? (
            <ul className={styles.encompass}>
              {D.programme.encompass.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          ) : null}
        </div>
        {D.programme.image ? (
          <Image
            src={D.programme.image}
            alt="Students in a WeSchool classroom"
            width={505}
            height={500}
            sizes="(max-width: 1024px) 100vw, 505px"
            className={styles.programmeImage}
          />
        ) : null}
      </section>
      ) : null}

      {/* Program features (cream band) */}
      <section className={styles.featuresBand}>
        <div className="container">
          {f.heading ? <h2 className={styles.heading}>{f.heading}</h2> : null}
          <ul className={styles.featureRow}>
            {f.items.map((f) => (
              <li key={f.label}>
                <img
                  src={f.icon}
                  alt=""
                  width={f.w}
                  height={f.h}
                  className={styles.featureIcon}
                />
                <span>{f.label}</span>
              </li>
            ))}
          </ul>

          {f.duration || f.batch || f.details.length ? (
            <div className={styles.detailCards}>
              {f.duration || f.batch ? (
                <div className={styles.detailCard}>
                  {f.duration ? (
                    <div className={styles.detailBlock}>
                      <h3>{f.duration.title}</h3>
                      {f.duration.text ? <p>{f.duration.text}</p> : null}
                    </div>
                  ) : null}
                  {f.batch ? (
                    <div className={styles.detailBlock}>
                      <h3>{f.batch.title}</h3>
                      {f.batch.slots.map((slot) => (
                        <div
                          key={slot.label}
                          className={styles.batchSlot}>
                          <p>{slot.label}</p>
                          {slot.time ? <strong>{slot.time}</strong> : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {f.details.length ? (
                <div className={styles.detailCard}>
                  {f.details.map((d) => (
                    <div
                      key={d.title}
                      className={styles.detailBlock}>
                      <h3>{d.title}</h3>
                      {d.text ? <p>{d.text}</p> : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className={styles.listCols}>
            {[f.objectives, f.faculty].map((col, i) =>
              col.heading || col.items.length ? (
                <div key={i}>
                  {col.heading ? <h3 className={styles.listHeading}>{col.heading}</h3> : null}
                  {col.items.length ? <DotList items={col.items} /> : null}
                </div>
              ) : null,
            )}
          </div>
        </div>
      </section>

      {/* Course structure: photo card with a dark overlay */}
      {D.structure.semesters.length ? (
      <section className={`container ${styles.structureWrap}`}>
        <div className={styles.structure}>
          {D.structure.image ? (
            <Image
              src={D.structure.image}
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className={styles.structureBg}
            />
          ) : null}
          <div className={styles.structureInner}>
            {D.structure.heading ? <h2 className={`${styles.headingLight} ${styles.center}`}>{D.structure.heading}</h2> : null}
            <div className={styles.semesters}>
              {D.structure.semesters.map((s) => (
                <div key={s.title}>
                  <h3 className={styles.semesterTitle}>{s.title}</h3>
                  <DotList
                    items={s.items}
                    className={styles.dotListLight}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {/* Course fee + Admissions (cream band) */}
      <section className={styles.feeBand}>
        <div className={`container ${styles.feeGrid}`}>
          <div>
            {D.fee.heading ? <h2 className={styles.heading}>{D.fee.heading}</h2> : null}
            {D.fee.groups.map((g, i) => (
              <div
                key={`${g.title}-${i}`}
                className={styles.feeGroup}>
                <h3 className={styles.feeTitle}>{g.title}</h3>
                {g.lines.length ? (
                  <p className={styles.feeLines}>
                    {g.lines.map((l, k) => (
                      <span key={k}>{l}</span>
                    ))}
                  </p>
                ) : null}
                {g.subheading ? <p className={styles.feeSub}>{g.subheading}</p> : null}
                {g.bullets ? (
                  <DotList
                    items={g.bullets}
                    className={styles.feeBullets}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div>
            {D.admissions.heading ? <h2 className={styles.heading}>{D.admissions.heading}</h2> : null}
            {D.admissions.text ? <p className={styles.body}>{D.admissions.text}</p> : null}
            {D.admissions.link ? (
              <a
                href={D.admissions.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.admissionLink}>
                {D.admissions.link}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Contact us (purple band) */}
      {D.contact.addresses.length ? (
      <section className={styles.contactBand}>
        <div className="container">
          {D.contact.heading ? <h2 className={styles.headingLight}>{D.contact.heading}</h2> : null}
          <div className={styles.contactGrid}>
            {D.contact.addresses.map((lines) => (
              <address
                key={lines[0]}
                className={styles.address}>
                {lines.map((l, i) => (l ? <p key={i}>{l}</p> : <br key={i} />))}
              </address>
            ))}
          </div>
        </div>
      </section>
      ) : null}

      {/* Enquire now: Netlify form (registered in public/__forms.html) + photo */}
      <section
        id="enquire"
        className={`container ${styles.enquire}`}>
        <div>
          <h2 className={styles.heading}>{D.enquire.heading}</h2>
          <form
            name="ftm-enquiry"
            method="POST"
            action="/form-success"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className={styles.form}>
            <input
              type="hidden"
              name="form-name"
              value="ftm-enquiry"
            />
            <p
              hidden
              aria-hidden="true">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <input
              aria-label="Name"
              name="name"
              placeholder="Name*"
              required
              maxLength={100}
              autoComplete="given-name"
            />
            <input
              aria-label="Last name"
              name="last-name"
              placeholder="Last Name*"
              required
              maxLength={100}
              autoComplete="family-name"
            />
            <input
              aria-label="Email"
              type="email"
              name="email"
              placeholder="Email*"
              required
              maxLength={150}
              autoComplete="email"
              className={styles.full}
            />
            <select
              aria-label="Field of graduation"
              name="graduation"
              required
              defaultValue="">
              <option
                value=""
                disabled>
                Field of Graduation*
              </option>
              {D.enquire.graduationFields.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select
              aria-label="City"
              name="city"
              defaultValue="">
              <option
                value=""
                disabled>
                City
              </option>
              {D.enquire.cities.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <textarea
              aria-label="Message"
              name="message"
              placeholder="Message*"
              required
              maxLength={2000}
              className={`${styles.full} ${styles.message}`}
            />
            <button
              type="submit"
              className={styles.submit}>
              Submit
            </button>
          </form>
        </div>
        {D.enquire.image ? (
          <Image
            src={D.enquire.image}
            alt="WeSchool conference room"
            width={524}
            height={472}
            sizes="(max-width: 1024px) 100vw, 524px"
            className={styles.enquireImage}
          />
        ) : null}
      </section>
    </PageShell>
  );
}
