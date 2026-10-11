import Link from "next/link";

import {
  DISCLOSURE_GROUPS,
  DISCLOSURE_NAV,
  CAREER_OPENINGS,
  CAREER_OPTIONS,
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

// Hidden Netlify fields (form name + honeypot) for the careers form.
function NetlifyHidden({ name }: { name: string }) {
  return (
    <>
      <input
        type="hidden"
        name="form-name"
        value={name}
      />
      <p
        hidden
        aria-hidden="true">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
    </>
  );
}

// Figma 1618:2123: two openings, then the profile upload form.
export function CareersContent() {
  return (
    <section className={`container ${styles.block}`}>
      <div className={styles.opening}>
        <h2 className={styles.openingTitle}>Young Professional Program (YPP)</h2>
        <p className={styles.openingLead}>Learn. Work. Grow.</p>
        <p>
          A unique two-year opportunity for fresh graduates to gain meaningful professional experience and build a
          stronger foundation before pursuing their management journey.
        </p>
        <p>
          The Young Professional Program is not just an initiative — it’s a bridge between learning and leadership.
          Through YPP, we aim to transform academic knowledge into practical experience, empowering students to
          contribute meaningfully to Welingkar’s growth while shaping their own professional journey. It’s about
          nurturing potential, fostering innovation, and preparing graduates to step confidently into the world of
          work.
        </p>
        <a
          href="#upload-profile"
          className={styles.apply}>
          Apply Now
        </a>
      </div>

      <div className={styles.opening}>
        <h2 className={styles.openingTitle}>Guest Relations Executive</h2>
      </div>

      <h2
        id="upload-profile"
        className={styles.formHeading}>
        Upload profile below
      </h2>
      <form
        name="careers"
        method="POST"
        action="/form-success"
        encType="multipart/form-data"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        className={styles.form}>
        <NetlifyHidden name="careers" />
        {select("position", "*Guest Relations Executive", CAREER_OPENINGS)}
        <fieldset className={styles.radioField}>
          <legend>*Preferred Campus Location</legend>
          {["Mumbai", "Bangalore"].map((c, i) => (
            <label key={c}>
              <input
                type="radio"
                name="campus"
                value={c}
                required
                defaultChecked={i === 0}
              />
              {c}
            </label>
          ))}
        </fieldset>
        {select("position_type", "*Guest Relations Executive", CAREER_OPENINGS)}
        {select("source", "*Select Source", CAREER_OPTIONS.source)}
        {field("name", "*Name")}
        {field("dob", "*Date of Birth", "date")}
        {field("contact", "*Contact", "tel")}
        {field("email", "*Email", "email")}
        <div className={styles.full}>{field("location", "*Current Location")}</div>
        {select("qualification", "*Select Highest Qualification", CAREER_OPTIONS.qualification)}
        {select("class", "*Select Class Obtained", CAREER_OPTIONS.classObtained)}
        {field("institute", "*Institute Name")}
        {field("industry_exp", "*Industry Experience (In years)", "number")}
        {field("teaching_exp", "*Full-time Teaching Experience (In Years)", "number")}
        {field("visiting_exp", "*Visiting / Adjunct Teaching Experience (In Years)", "number")}
        {field("current_salary", "*Current Salary")}
        {field("expected_salary", "*Expectation Salary")}
        {field("notice_period", "*Notice Period")}
        <div className={styles.fileField}>
          <label htmlFor="careers-resume">*Attach Resume</label>
          <input
            id="careers-resume"
            type="file"
            name="resume"
            required
            accept=".doc,.docx,.pdf,.zip"
          />
          <small>
            * DOC, DOCX, PDF, ZIP files are accepted
            <br />* Files must be less than 4 MB
          </small>
        </div>
        <label className={`${styles.field} ${styles.full}`}>
          <span className={styles.srOnly}>Brief Profile (Maximum 150 characters)</span>
          <textarea
            name="profile"
            placeholder="*Brief Profile (Maximum 150 characters)"
            required
            maxLength={150}
            rows={4}
            className={`${styles.input} ${styles.textarea}`}
          />
        </label>
        <div className={`${styles.full} ${styles.captcha}`}>
          <h3>CAPTCHA</h3>
          <div data-netlify-recaptcha="true" />
        </div>
        <button
          type="submit"
          className={styles.submit}>
          Submit
        </button>
      </form>
    </section>
  );
}
