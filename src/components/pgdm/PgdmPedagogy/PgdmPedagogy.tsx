import type { PgdmPedagogy as PgdmPedagogyData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmPedagogy.module.scss";

type PgdmPedagogyProps = {
  data: PgdmPedagogyData;
};

// Figma 2363:1201: purple rounded card — heading, intro paragraph and a dotted
// list on the left, photo filling the right column.
export function PgdmPedagogy({ data }: PgdmPedagogyProps) {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.intro}>{data.intro}</p>
        <ul className={styles.list}>
          {data.bullets.map((b) => (
            <li
              key={b}
              className={styles.bullet}>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <img
        src={data.image}
        alt=""
        className={styles.photo}
      />
    </div>
  );
}

export default PgdmPedagogy;
