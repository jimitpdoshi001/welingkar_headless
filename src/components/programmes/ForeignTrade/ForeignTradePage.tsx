import Image from "next/image";
import { PageShell } from "@/components/shell/PageShell";
import { FOREIGN_TRADE as D } from "@/lib/programmes/foreign-trade-data";
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

/** Figma 3652:1025 — Post Graduate Program in Foreign Trade Management (PGP-FTM). */
export function ForeignTradePage() {
  return (
    <PageShell
      variant="tall"
      title={D.hero.title}
      subtitle={D.hero.subtitle}
      image={D.hero.image}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programmes/all" }, { label: "Foreign Trade Management" }]}
      heroAction={
        <a
          href={D.hero.cta.href}
          className={styles.heroCta}>
          {D.hero.cta.label}
        </a>
      }>
      {/* About us (cream band, decorative triangle on the left) */}
      <section className={styles.aboutBand}>
        <img
          src="/programmes/foreign-trade/decor-triangle.svg"
          alt=""
          width={153}
          height={175}
          className={styles.decor}
          aria-hidden="true"
        />
        <div className={`container ${styles.aboutInner}`}>
          <h2 className={styles.heading}>{D.about.heading}</h2>
          <p className={styles.aboutText}>{D.about.text}</p>
        </div>
      </section>

      {/* Intro */}
      <section className={`container ${styles.intro}`}>
        <p className={styles.introLead}>{D.intro.lead}</p>
        {D.intro.paragraphs.map((p) => (
          <p
            key={p.slice(0, 30)}
            className={styles.introText}>
            {p}
          </p>
        ))}
      </section>

      {/* Rankings: three joined panels */}
      <section className={`container ${styles.rankings}`}>
        <div className={styles.rankLabel}>
          <h2 className={styles.headingLight}>{D.rankings.heading}</h2>
        </div>
        <div className={styles.rankDark}>
          <p className={styles.rankValue}>{D.rankings.accreditation.value}</p>
          <p className={styles.rankUnit}>{D.rankings.accreditation.unit}</p>
          <p className={styles.rankText}>{D.rankings.accreditation.text}</p>
        </div>
        <div className={styles.rankLight}>
          <p className={`${styles.rankValue} ${styles.rankValueGreen}`}>{D.rankings.nirf.value}</p>
          <p className={styles.rankUnit}>{D.rankings.nirf.unit}</p>
          <p className={styles.rankText}>{D.rankings.nirf.text}</p>
        </div>
      </section>

      {/* About FIEO */}
      <section className={`container ${styles.fieo}`}>
        <h2 className={styles.heading}>{D.fieo.heading}</h2>
        <p className={styles.body}>{D.fieo.text}</p>
      </section>

      {/* Leader messages: photo left / right on tinted bands */}
      {D.messages.map((m, i) => (
        <section
          key={m.name}
          className={`${styles.message} ${i % 2 ? styles.messagePeach : styles.messageLavender}`}>
          <div className={`container ${styles.messageInner} ${i % 2 ? styles.messageReverse : ""}`}>
            <Image
              src={m.image}
              alt={m.name}
              width={451}
              height={451}
              sizes="(max-width: 767px) 80vw, 451px"
              className={styles.messagePhoto}
            />
            <div className={styles.messageText}>
              <p className={styles.messageBody}>{m.message}</p>
              <p className={styles.messageName}>{m.name}</p>
              <p className={styles.messageRole}>{m.role}</p>
            </div>
          </div>
        </section>
      ))}

      {/* Programme overview + "will broadly encompass" cards */}
      <section className={`container ${styles.programme}`}>
        <div>
          <h2 className={styles.heading}>{D.programme.heading}</h2>
          {D.programme.paragraphs.map((p) => (
            <p
              key={p.slice(0, 30)}
              className={styles.body}>
              {p}
            </p>
          ))}
          <h3 className={styles.subheading}>{D.programme.encompassHeading}</h3>
          <ul className={styles.encompass}>
            {D.programme.encompass.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <Image
          src={D.programme.image}
          alt="Students in a WeSchool classroom"
          width={505}
          height={500}
          sizes="(max-width: 1024px) 100vw, 505px"
          className={styles.programmeImage}
        />
      </section>

      {/* Program features (cream band) */}
      <section className={styles.featuresBand}>
        <div className="container">
          <h2 className={styles.heading}>{D.features.heading}</h2>
          <ul className={styles.featureRow}>
            {D.features.items.map((f) => (
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

          <div className={styles.detailCards}>
            <div className={styles.detailCard}>
              <div className={styles.detailBlock}>
                <h3>{D.features.duration.title}</h3>
                <p>{D.features.duration.text}</p>
              </div>
              <div className={styles.detailBlock}>
                <h3>{D.features.batch.title}</h3>
                {D.features.batch.slots.map((s) => (
                  <div
                    key={s.label}
                    className={styles.batchSlot}>
                    <p>{s.label}</p>
                    <strong>{s.time}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.detailCard}>
              {D.features.details.map((d) => (
                <div
                  key={d.title}
                  className={styles.detailBlock}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.listCols}>
            <div>
              <h3 className={styles.listHeading}>{D.features.objectives.heading}</h3>
              <DotList items={D.features.objectives.items} />
            </div>
            <div>
              <h3 className={styles.listHeading}>{D.features.faculty.heading}</h3>
              <DotList items={D.features.faculty.items} />
            </div>
          </div>
        </div>
      </section>

      {/* Course structure: photo card with a dark overlay */}
      <section className={`container ${styles.structureWrap}`}>
        <div className={styles.structure}>
          <Image
            src={D.structure.image}
            alt=""
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            className={styles.structureBg}
          />
          <div className={styles.structureInner}>
            <h2 className={`${styles.headingLight} ${styles.center}`}>{D.structure.heading}</h2>
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

      {/* Course fee + Admissions (cream band) */}
      <section className={styles.feeBand}>
        <div className={`container ${styles.feeGrid}`}>
          <div>
            <h2 className={styles.heading}>{D.fee.heading}</h2>
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
            <h2 className={styles.heading}>{D.admissions.heading}</h2>
            <p className={styles.body}>{D.admissions.text}</p>
            <a
              href={D.admissions.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.admissionLink}>
              {D.admissions.link}
            </a>
          </div>
        </div>
      </section>

      {/* Contact us (purple band) */}
      <section className={styles.contactBand}>
        <div className="container">
          <h2 className={styles.headingLight}>{D.contact.heading}</h2>
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
        <Image
          src={D.enquire.image}
          alt="WeSchool conference room"
          width={524}
          height={472}
          sizes="(max-width: 1024px) 100vw, 524px"
          className={styles.enquireImage}
        />
      </section>
    </PageShell>
  );
}
