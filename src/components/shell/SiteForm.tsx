import clsx from "clsx";

import styles from "./SiteForm.module.scss";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "file" | "date" | "number" | "radio";
  options?: string[];
  required?: boolean;
  full?: boolean;
  note?: string;
};

export type FormConfig = {
  name: string;
  heading?: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
  tint?: "cream" | "purple";
};

/**
 * Native HTML form wired for Netlify Forms (works on the Netlify deploy, and
 * degrades gracefully elsewhere). File inputs use multipart encoding.
 */
export function SiteForm({ config }: { config: FormConfig }) {
  const hasFile = config.fields.some((f) => f.type === "file");
  const bgClass = config.tint === "cream" ? "bg-light-yellow" : config.tint === "purple" ? "bg-secondary" : "";
  const onDark = config.tint === "purple";

  return (
    <section className={bgClass}>
      <div className={clsx("container", styles.section, onDark && styles.onDark)}>
        {config.heading ? <h2 className={styles.heading}>{config.heading}</h2> : null}
        {config.description ? <p className={styles.description}>{config.description}</p> : null}

        <form
          name={config.name}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/form-success"
          encType={hasFile ? "multipart/form-data" : undefined}
          className={styles.form}>
          <input
            type="hidden"
            name="form-name"
            value={config.name}
          />
          <p
            hidden
            aria-hidden="true">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <div className={styles.grid}>
            {config.fields.map((field) => (
              <div
                key={field.name}
                className={clsx(styles.field, (field.full || field.type === "textarea") && styles.fieldFull)}>
                <label
                  htmlFor={`f-${field.name}`}
                  className={styles.label}>
                  {field.label}
                  {field.required ? <span className={styles.req}> *</span> : null}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={`f-${field.name}`}
                    name={field.name}
                    required={field.required}
                    rows={4}
                    className={styles.input}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={`f-${field.name}`}
                    name={field.name}
                    required={field.required}
                    className={styles.input}
                    defaultValue="">
                    <option
                      value=""
                      disabled>
                      Select…
                    </option>
                    {field.options?.map((opt) => (
                      <option
                        key={opt}
                        value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "radio" ? (
                  <div className={styles.radioRow}>
                    {field.options?.map((opt, i) => (
                      <label
                        key={opt}
                        className={styles.radioOption}>
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          required={field.required && i === 0}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    id={`f-${field.name}`}
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    className={clsx(styles.input, field.type === "file" && styles.fileInput)}
                  />
                )}
                {field.note ? <span className={styles.note}>{field.note}</span> : null}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="btn accent">
            {config.submitLabel ?? "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default SiteForm;
