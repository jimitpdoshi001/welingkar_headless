import type { PgdmProgramFaculty } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmFaculty.module.scss";
import { PgdmMobileRow } from "../common/PgdmMobileRow";

type PgdmFacultyProps = {
  data: PgdmProgramFaculty;
};

// Figma 644:472: "Program Faculty" — grid of portrait cards (5 per row).
export function PgdmFaculty({ data }: PgdmFacultyProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <PgdmMobileRow className={styles.grid} itemWidth="48%">
        {data.people.map((person) => (
          <article
            key={person.id}
            className={styles.card}>
            <img
              src={person.image}
              alt={person.name}
              className={styles.photo}
            />
            <h3 className={styles.name}>{person.name}</h3>
            <p className={styles.title}>{person.title}</p>
          </article>
        ))}
      </PgdmMobileRow>
    </div>
  );
}

export default PgdmFaculty;
