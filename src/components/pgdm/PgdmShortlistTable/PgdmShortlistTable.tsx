import type { PgdmTable } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmShortlistTable.module.scss";

export function PgdmShortlistTable({ data }: { data: PgdmTable }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>{data.title}</div>
      <div className={styles.campusRow}>{data.campusLabel}</div>

      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {data.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.program}>
                <th
                  scope="row"
                  className={styles.program}>
                  {row.program}
                </th>
                {row.span ? (
                  <td
                    className={styles.span}
                    colSpan={data.columns.length - 1}>
                    {row.values[0]}
                  </td>
                ) : (
                  row.values.map((value, i) => <td key={i}>{value}</td>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PgdmShortlistTable;
