import type { PgdmOutcomes as PgdmOutcomesData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmOutcomes.module.scss";
import { PgdmMobileRow } from "../common/PgdmMobileRow";

type PgdmOutcomesProps = {
  data: PgdmOutcomesData;
};

// Figma 644:472: "Program Outcomes" — purple band, 3x2 grid of title + body
// separated by hairline dividers (no icons).
export function PgdmOutcomes({ data }: PgdmOutcomesProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <PgdmMobileRow className={styles.grid} itemWidth="82%">
        {data.items.map((item) => (
          <div
            key={item.id}
            className={styles.cell}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.description}</p>
          </div>
        ))}
      </PgdmMobileRow>
    </div>
  );
}

export default PgdmOutcomes;
