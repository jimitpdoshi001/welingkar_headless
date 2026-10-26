import type { PgdmPedagogy as PgdmPedagogyData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmPedagogy.module.scss";

type PgdmPedagogyProps = {
  data: PgdmPedagogyData;
};

// Figma 644:472: "Student - Centric Pedagogy" — purple rounded card with a
// bulleted list on the left and a photo filling the right half.
export function PgdmPedagogy({ data }: PgdmPedagogyProps) {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <ul className={styles.list}>
          {data.bullets.map((b, i) => (
            <li
              key={i}
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
