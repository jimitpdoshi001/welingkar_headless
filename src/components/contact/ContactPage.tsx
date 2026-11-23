import { PageShell } from "@/components/shell/PageShell";
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
      {/* Campus tabs switch the contact cards and the Connect With Us block (address, phones, map). */}
      <ContactTabs
        form={
          <>
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
          </>
        }
      />
    </PageShell>
  );
}
