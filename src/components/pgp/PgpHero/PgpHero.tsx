import Link from "next/link";

import type { PgpHero as PgpHeroData } from "@/lib/pgp/pgp-entrepreneurship-data";
import styles from "./PgpHero.module.scss";

// Figma 3045:139: full-bleed photo, breadcrumb top-left, copy + outline CTA low on the left.
export function PgpHero({ data }: { data: PgpHeroData }) {
  return (
    <section className={styles.hero}>
      <img src={data.image} alt="" className={styles.image} />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" aria-label="Home" className={styles.home}>
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
              <path d="M6.5 0.5L0.8 5H2.3V9.5H5.2V6.6H7.8V9.5H10.7V5H12.2L6.5 0.5Z" stroke="white" strokeWidth="0.9" strokeLinejoin="round" />
            </svg>
          </Link>
          <span aria-hidden="true">-</span>
          <span>{data.breadcrumb}</span>
        </nav>

        {data.title ? <h1 className={styles.title}>{data.title}</h1> : null}
        {data.tagline ? <p className={styles.tagline}>{data.tagline}</p> : null}
        {data.description ? <p className={styles.description}>{data.description}</p> : null}
        {data.facts?.length ? (
          <ul className={styles.facts}>
            {data.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : null}
        <div className={styles.ctas}>
          <Link href={data.cta.href} className={`btn white-outline ${styles.cta}`}>
            {data.cta.label}
          </Link>
          {/* Drupal brochure PDF (stage): opens in a new tab. */}
          {data.brochure?.href ? (
            <a href={data.brochure.href} target="_blank" rel="noopener noreferrer" className={`btn white-outline ${styles.cta}`}>
              {data.brochure.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
