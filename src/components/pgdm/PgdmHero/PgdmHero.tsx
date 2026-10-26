import Link from "next/link";

import type { PgdmHeroData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmHero.module.scss";

type PgdmHeroProps = {
  data: PgdmHeroData;
};

export function PgdmHero({ data }: PgdmHeroProps) {
  return (
    <section className={styles.hero}>
      <img
        src={data.image}
        alt={data.imageAlt}
        className={styles.heroImage}
      />
      <div className={styles.heroOverlay} />

      <div className={`container ${styles.heroInner}`}>
        <nav
          className={styles.breadcrumb}
          aria-label="Breadcrumb">
          {data.breadcrumb.map((crumb, index) => (
            <span
              key={crumb}
              className={styles.crumb}>
              {index === 0 ? <Link href="/">{crumb}</Link> : crumb}
              {index < data.breadcrumb.length - 1 ? <span aria-hidden="true"> – </span> : null}
            </span>
          ))}
        </nav>

        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>

        {/* Figma 644:472 hero: single green Apply Now button, no stats row. */}
        <div className={styles.ctaRow}>
          <Link
            href={data.primaryCta.href}
            className="btn accent">
            {data.primaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PgdmHero;
