import Link from "next/link";

import type { PgdmScholarship as PgdmScholarshipData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmScholarship.module.scss";

// Scholarships: heading, scholarship name, description, Apply Now and note on
// the left; rounded photo on the right (stacks on mobile).
export function PgdmScholarship({ data }: { data: PgdmScholarshipData }) {
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h2 className={styles.heading}>{data.heading}</h2>
        {data.title ? <p className={styles.title}>{data.title}</p> : null}
        {data.paragraphs.map((para, i) => (
          <p key={i} className={styles.body}>
            {para}
          </p>
        ))}
        {data.cta?.href ? (
          <Link href={data.cta.href} className={`btn accent ${styles.cta}`}>
            {data.cta.label}
          </Link>
        ) : null}
        {data.note ? <p className={styles.note}>{data.note}</p> : null}
      </div>
      {data.image ? (
        <img src={data.image} alt={data.title || data.heading} className={styles.image} />
      ) : null}
    </div>
  );
}

export default PgdmScholarship;
