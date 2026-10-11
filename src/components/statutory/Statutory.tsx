import Link from "next/link";

import {
  DISCLOSURE_GROUPS,
  DISCLOSURE_NAV,
  GRIEVANCE_OPTIONS,
  type DocLink,
} from "@/lib/statutory/statutory-data";
import styles from "./Statutory.module.scss";

// Figma 1610:771: side menu + collapsible campus groups of disclosure PDFs.
export function MandatoryDisclosure() {
  return (
    <section className={`container ${styles.block} ${styles.disclosure}`}>
      <nav className={styles.sideNav} aria-label="Disclosures">
        {DISCLOSURE_NAV.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={i === 0 ? "page" : undefined}
            className={i === 0 ? styles.sideActive : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.groups}>
        {DISCLOSURE_GROUPS.map((g, i) =>
          // Native <details> gives keyboard-accessible toggling without client JS.
          g.links.length ? (
            <details key={g.title} className={styles.group} open={i === 0}>
              <summary className={styles.groupTitle}>{g.title}</summary>
              <DocList links={g.links} className={styles.disclosureLinks} />
            </details>
          ) : (
            <div key={g.title} className={styles.group}>
              <h2 className={styles.groupTitle}>{g.title}</h2>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export function DocList({
  links,
  className,
}: {
  links: DocLink[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href}>{l.label}</a>
        </li>
      ))}
    </ul>
  );
}

// Figma 1610:1432: plain list of exhibit documents.
export function AutonomyDocs({ links }: { links: DocLink[] }) {
  return (
    <section className={`container ${styles.block}`}>
      <DocList links={links} className={styles.autonomyList} />
    </section>
  );
}

const field = (name: string, placeholder: string, type = "text") => (
  <label className={styles.field}>
    <span className={styles.srOnly}>{placeholder}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={placeholder.startsWith("*")}
      maxLength={type === "tel" ? 15 : 120}
      className={styles.input}
    />
  </label>
);

const select = (name: string, placeholder: string, options: string[]) => (
  <label className={styles.field}>
    <span className={styles.srOnly}>{placeholder}</span>
    <select
      name={name}
      required={placeholder.startsWith("*")}
      defaultValue=""
      className={`${styles.input} ${styles.select}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </label>
);

/**
 * Figma 1610:1755 grievance form. Posts to Netlify Forms (same as SiteForm)
 * with a honeypot and Netlify reCAPTCHA in place of the static captcha mock.
 */
export function GrievanceForm() {
  return (
    <section className={`container ${styles.block}`}>
      <h2 className={styles.formHeading}>Submit your grievance below :</h2>
      <form
        name="grievance"
        method="POST"
        action="/form-success"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        className={styles.form}
      >
        <input type="hidden" name="form-name" value="grievance" />
        <p hidden aria-hidden="true">
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>
        {field("name", "*Name")}
        {field("mobile", "*Mobile", "tel")}
        {field("contact", "*Contact", "email")}
        {select("campus", "*Select Campus", GRIEVANCE_OPTIONS.campus)}
        {select("role", "You are", GRIEVANCE_OPTIONS.role)}
        {select("subject", "*Select Subject", GRIEVANCE_OPTIONS.subject)}
        <label className={`${styles.field} ${styles.full}`}>
          <span className={styles.srOnly}>Message (Maximum 300 words)</span>
          <textarea
            name="message"
            placeholder="*Message (Maximum 300 words)"
            required
            maxLength={2000}
            rows={4}
            className={`${styles.input} ${styles.textarea}`}
          />
        </label>
        <div className={`${styles.full} ${styles.captcha}`}>
          <h3>CAPTCHA</h3>
          <div data-netlify-recaptcha="true" />
        </div>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </section>
  );
}
