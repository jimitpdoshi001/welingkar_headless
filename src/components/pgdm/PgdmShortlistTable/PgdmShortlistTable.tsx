import type { PgdmTable } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmShortlistTable.module.scss";

// Figma 644:472: section heading, then one table per campus with a coloured
// header bar (rounded top corners).
export function PgdmShortlistTable({ data }: { data: PgdmTable }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.title}</h2>

      {data.campuses.map((campus) => (
        <div
          key={campus.label}
          className={styles.wrap}>
          <div
            className={styles.campusRow}
            style={{ background: campus.color }}>
            {campus.label}
          </div>

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
                      <td colSpan={data.columns.length - 1}>{row.values[0]}</td>
                    ) : (
                      row.values.map((value, i) => <td key={i}>{value}</td>)
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Figma mobile: stacked blocks instead of the table. */}
          <div className={styles.mobileList}>
            {data.rows.map((row) => (
              <div
                key={row.program}
                className={styles.mobileRow}>
                <p className={styles.mobileProgram}>{row.program}</p>
                <div className={styles.mobileCells}>
                  {(row.span ? [row.values[0]] : row.values).map((value, i) => (
                    <div
                      key={i}
                      className={styles.mobileCell}
                      // Figma mobile tints: lavender (Mumbai), pink (Bengaluru).
                      style={{ background: campus.color === "#b04535" ? "#fbeeec" : "#f1ecfa" }}>
                      {row.span ? null : <span className={styles.mobileLabel}>{data.columns[i + 1]}</span>}
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PgdmShortlistTable;
