import Link from "next/link";

import type { PgdmPlacement } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmWhyRecruit.module.scss";

type PgdmWhyRecruitProps = {
  data: PgdmPlacement["whyRecruit"];
  steps: PgdmPlacement["steps"];
};

export function PgdmWhyRecruit({ data, steps }: PgdmWhyRecruitProps) {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h2 className={styles.heading}>{data.heading}</h2>
        {data.paragraphs.map((para, i) => (
          <p
            key={i}
            className={styles.body}>
            {para}
          </p>
        ))}
        <Link
          href={data.cta.href}
          className="btn white-outline">
          {data.cta.label}
        </Link>
      </div>

      <ol className={styles.steps}>
        {steps.map((step) => (
          <li
            key={step.num}
            className={styles.step}>
            <span className={styles.num}>{step.num}</span>
            <span className={styles.stepContent}>
              <span className={styles.stepTitle}>{step.title}</span>
              <span className={styles.stepDesc}>{step.desc}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default PgdmWhyRecruit;
