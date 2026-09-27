"use client";

import { memo, useState } from "react";
import type { CampusContactUsAttributes, JsonApiResource } from "@/lib/drupal";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import clsx from "clsx";
import styles from "./CampusContactUs.module.scss";

type CampusContactUsProps = {
  paragraph: JsonApiResource<"paragraph--campus_contact_us", CampusContactUsAttributes>;
  children?: React.ReactNode;
};

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

const MapSection = memo(function MapSection({ mapHtml }: { mapHtml?: string }) {
  return (
    <div className={styles.mapWrapper}>
      {mapHtml ? (
        <SafeHtml html={mapHtml} />
      ) : (
        <iframe
          title="Campus Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.967664654924!2d77.66258017596041!3d12.845371587458693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6ca5c39f1aa1%3A0x6b447aa6a928929e!2sWelingkar%20Institute%20of%20Management%20Development%20%26%20Research!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
});

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field}>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Name*"
            className={styles.input}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="Email*"
            className={styles.input}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.field}>
        <input
          type="text"
          name="message"
          required
          maxLength={2000}
          autoComplete="off"
          placeholder="Message*"
          className={styles.textarea}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className={styles.submitBtn}>
        {submitted ? "Submitted!" : "Submit"}
      </button>
    </form>
  );
}

export function CampusContactUs({ paragraph }: CampusContactUsProps) {
  const { attributes } = paragraph;

  const descriptionHtml = attributes.field_description?.processed || attributes.field_description?.value || "";
  const mapHtml = attributes.field_html?.processed || attributes.field_html?.value || "";

  const defaultAddress = "Address: 102/103, Electronic City Phase 1, Next to Telephone Exchange, Hosur Road, Bengaluru-560100";
  const defaultPhone = "080-42678300";

  return (
    <div className={clsx(styles.root)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>Connect With Us</h2>

          {descriptionHtml ? (
            <SafeHtml
              className={styles.addressText}
              html={descriptionHtml}
            />
          ) : (
            <div className={styles.addressText}>{defaultAddress}</div>
          )}

          <a
            href={`tel:${defaultPhone.replace(/[^0-9+]/g, "")}`}
            className={styles.phoneLink}>
            <PhoneIcon />
            <span>{defaultPhone}</span>
          </a>

          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>Contact form</h3>
            <ContactForm />
            {/* {Children.count(children) > 0 && (
              <div className={styles.webformContainer}>{children}</div>
            )} */}
          </div>
        </div>

        <MapSection mapHtml={mapHtml} />
      </div>
    </div>
  );
}
