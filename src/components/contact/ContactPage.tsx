import Link from "next/link";

import { PageShell } from "@/components/shell/PageShell";
import { CONNECT, CONTACT_CAMPUSES, CONTACT_COLUMNS, CONTACT_SIDE, type ContactLine } from "@/lib/contact/contact-data";
import styles from "./ContactPage.module.scss";

// Phone numbers become tel: links; multi-line text (timings) stays plain.
function Line({ line }: { line: ContactLine }) {
  const icon = line.kind === "phone" ? "/contact/icon-phone.svg" : "/contact/icon-mail.svg";
  const first = line.text.split(/[/\n]/)[0].replace(/[^\d+]/g, "");
  const href = line.kind === "mail" ? `mailto:${line.text.trim()}` : first.length >= 8 && !line.text.includes("Ext") ? `tel:${first}` : undefined;
  const body = href ? <a href={href}>{line.text.trim()}</a> : line.text;
  return (
    <p className={`${styles.line} ${line.kind === "mail" ? styles.mail : ""}`}>
      <img src={icon} alt="" width={line.kind === "phone" ? 15 : 18} height={line.kind === "phone" ? 15 : 11} />
      <span>{body}</span>
    </p>
  );
}

/** Figma 3507:152 Contact Us (Mumbai). */
export function ContactPage() {
  return (
    <PageShell
      variant="tall"
      title="Contact us"
      subtitle="If you’d like to know more about WeSchool or have a query answered, we'd be happy to help."
      image="/contact/hero.webp"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Mumbai - Contact Us" }]}
    >
      <section className={`container ${styles.campuses}`}>
        {CONTACT_CAMPUSES.map((c) => {
          const inner = (
            <>
              <img src={c.image} alt="" className={styles.cardImg} />
              <span className={styles.cardBar}>
                <span>{c.label}</span>
                <img src={"active" in c ? "/contact/arrow-active.svg" : "/contact/arrow.svg"} alt="" width={50} height={50} className={styles.cardArrow} />
              </span>
            </>
          );
          return "href" in c ? (
            <Link key={c.label} href={c.href} className={styles.card}>
              {inner}
            </Link>
          ) : (
            <div key={c.label} className={styles.card}>
              {inner}
            </div>
          );
        })}
      </section>

      <section className={`container ${styles.info}`}>
        <aside className={styles.side}>
          <h2 className={styles.sideHeading}>
            {CONTACT_SIDE.heading}
            <img src="/contact/icon-play.svg" alt="" width={10} height={12} />
          </h2>
          <ul>
            {CONTACT_SIDE.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </aside>

        {CONTACT_COLUMNS.map((col) => (
          <div key={col.heading} className={styles.col}>
            <h2 className={styles.colHeading}>{col.heading}</h2>
            {col.groups.map((g, i) => (
              <div key={i} className={styles.group}>
                {g.label ? <p className={styles.groupLabel}>{g.label}</p> : null}
                {g.lines.map((l) => (
                  <Line key={l.text} line={l} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className={`container ${styles.connect}`}>
        <div className={styles.connectText}>
          <h2 className={styles.connectHeading}>{CONNECT.heading}</h2>
          <p className={styles.address}>{CONNECT.address}</p>
          <p className={styles.connectPhone}>
            <img src="/contact/icon-phone-grey.svg" alt="" width={13} height={13} />
            <a href={`tel:${CONNECT.phone.replace(/\D/g, "")}`}>{CONNECT.phone}</a>
          </p>

          <h3 className={styles.formHeading}>Contact form</h3>
          {/* Netlify "contact" form (registered in public/__forms.html). */}
          <form name="contact" method="POST" action="/form-success" data-netlify="true" data-netlify-honeypot="bot-field" className={styles.form}>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden aria-hidden="true">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <label className={styles.field}>
              <input aria-label="Name" type="text" name="name" placeholder="Name*" required maxLength={100} autoComplete="name" />
            </label>
            <label className={styles.field}>
              <input aria-label="Email" type="email" name="email" placeholder="Email*" required maxLength={150} autoComplete="email" />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <textarea aria-label="Message" name="message" placeholder="Message*" required maxLength={2000} rows={1} />
            </label>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </form>
        </div>
        <img src={CONNECT.map} alt="Map of the WeSchool campus location" className={styles.map} />
      </section>
    </PageShell>
  );
}
