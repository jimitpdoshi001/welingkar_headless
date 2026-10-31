"use client";

import { useState } from "react";

import type { PgdmVisionMission as PgdmVisionMissionData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmVisionMission.module.scss";

export function PgdmVisionMission({ data }: { data: PgdmVisionMissionData }) {
  // Figma mobile: Mission shows three points, then "Read More" reveals the rest.
  const [expanded, setExpanded] = useState(false);
  const hasMore = data.mission.lines.length > 3;

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.text}>
          <h2 className={styles.heading}>{data.vision.heading}</h2>
          <p className={styles.body}>{data.vision.body}</p>
        </div>
        <div className={styles.media}>
          {data.vision.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={styles.image}
            />
          ))}
        </div>
      </div>

      <div className={`${styles.row} ${styles.rowReverse}`}>
        <div className={styles.text}>
          <h2 className={styles.heading}>{data.mission.heading}</h2>
          <ul className={`${styles.lines} ${expanded ? styles.linesOpen : ""}`}>
            {data.mission.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {hasMore ? (
            <button
              type="button"
              className={styles.readMore}
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Read Less" : "Read More"}
            </button>
          ) : null}
        </div>
        <div className={styles.media}>
          {data.mission.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={styles.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PgdmVisionMission;
