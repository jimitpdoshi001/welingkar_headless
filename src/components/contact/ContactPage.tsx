import { PageShell } from "@/components/shell/PageShell";
import { CONNECT } from "@/lib/contact/contact-data";
import { ContactTabs } from "./ContactTabs";
import styles from "./ContactPage.module.scss";

/** Figma 3507:152 Contact Us. */
export function ContactPage() {
  return (
    <PageShell
      variant="tall"
      title="Contact us"
      subtitle="If you’d like to know more about WeSchool or have a query answered, we'd be happy to help."
      image="/contact/hero.webp"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
    >
      <ContactTabs />

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
