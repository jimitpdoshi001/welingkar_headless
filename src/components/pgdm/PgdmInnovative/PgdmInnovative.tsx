import type { PgdmInnovative as PgdmInnovativeData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmInnovative.module.scss";

type PgdmInnovativeProps = {
  data: PgdmInnovativeData;
};

// Figma 644:472: rounded photo card. Heading top-left; bottom-left a list of
// initiative rows (label + play ▶ on the right) with hairline dividers.
export function PgdmInnovative({ data }: PgdmInnovativeProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div
          className={styles.card}
          style={
            {
              // CSS reads --bg, and --bg-mobile on phones when Drupal supplies one.
              "--bg": `url(${data.image})`,
              ...(data.imageMobile ? { "--bg-mobile": `url(${data.imageMobile})` } : {}),
            } as React.CSSProperties
          }>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h2 className={styles.heading}>{data.heading}</h2>
            <ul className={styles.links}>
              {data.links.map((link, i) => {
                const href = data.hrefs?.[i];
                const inner = (
                  <>
                    <span>{link}</span>
                    <span
                      className={styles.play}
                      aria-hidden="true">
                      ▶
                    </span>
                  </>
                );
                return (
                  <li
                    key={link}
                    tabIndex={href ? undefined : 0}
                    className={`${styles.row} ${i === 0 ? styles.rowActive : ""}`}>
                    {/* Drupal rows open their PDF / form in a new tab. */}
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.rowLink}>
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PgdmInnovative;
