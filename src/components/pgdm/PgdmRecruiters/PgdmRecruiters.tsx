import type { PgdmRecruiters as PgdmRecruitersData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmRecruiters.module.scss";

export function PgdmRecruiters({ data }: { data: PgdmRecruitersData }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <div className={styles.strip}>
        {data.logos.map((logo) => (
          <div
            key={logo.name}
            className={styles.logo}>
            <img
              src={logo.image}
              alt={logo.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PgdmRecruiters;
