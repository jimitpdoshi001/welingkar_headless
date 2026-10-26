import type { PgdmObjectives as PgdmObjectivesData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmObjectives.module.scss";

type PgdmObjectivesProps = {
  data: PgdmObjectivesData;
};

// Figma 644:472: "Program Educational Objectives" — centred heading over a grid
// of icon + paragraph cards (no per-card title).
export function PgdmObjectives({ data }: PgdmObjectivesProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <div className={styles.grid}>
        {data.items.map((item) => (
          <div
            key={item.id}
            className={styles.item}>
            {item.icon ? (
              <img
                src={item.icon}
                alt=""
                className={styles.icon}
              />
            ) : null}
            <p className={styles.text}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PgdmObjectives;
