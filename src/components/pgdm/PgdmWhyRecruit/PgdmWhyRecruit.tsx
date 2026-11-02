import Link from "next/link";

import type { PgdmPlacement } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmWhyRecruit.module.scss";
import { PgdmReadMore } from "../common/PgdmReadMore";

type PgdmWhyRecruitProps = {
  data: PgdmPlacement["whyRecruit"];
  steps: PgdmPlacement["steps"];
};

export function PgdmWhyRecruit({ data, steps }: PgdmWhyRecruitProps) {
  return (
    // One column when there are no steps (e.g. none in Drupal).
    <div className={`${styles.root} ${steps.length ? "" : styles.rootSingle}`}>
      {data.paragraphs.length > 0 ? (
        <div className={`${styles.card} ${data.cta.href ? "" : styles.cardNoCta}`}>
          <h2 className={styles.heading}>{data.heading}</h2>
          <PgdmReadMore paragraphs={data.paragraphs} className={styles.body} />
          {data.cta.href ? (
            <Link href={data.cta.href} className="btn white-outline">
              {data.cta.label}
            </Link>
          ) : null}
        </div>
      ) : null}

      {steps.length > 0 ? (
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.num} className={styles.step}>
              <span className={styles.num}>{step.num}</span>
              <span className={styles.stepContent}>
                <span className={styles.stepTitle}>{step.title}</span>
                <span className={styles.stepDesc}>{step.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export default PgdmWhyRecruit;
