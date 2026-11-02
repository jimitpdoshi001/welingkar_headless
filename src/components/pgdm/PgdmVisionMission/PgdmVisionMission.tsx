"use client";

import { useState } from "react";

import type { PgdmVisionMission as PgdmVisionMissionData } from "@/lib/pgdm/pgdm-data";
import styles from "./PgdmVisionMission.module.scss";
import { PgdmReadMore } from "../common/PgdmReadMore";

export function PgdmVisionMission({ data }: { data: PgdmVisionMissionData }) {
  // Figma mobile: Mission shows three points, then "Read More" reveals the rest.
  const [expanded, setExpanded] = useState(false);
  const hasMore = data.mission.lines.length > 3;

  return (
    <div className={styles.root}>
      {data.vision.body ? (
        <div className={styles.row}>
          <div className={styles.text}>
            <h2 className={styles.heading}>{data.vision.heading}</h2>
            {data.vision.html ? (
              // Sanitized server-side (program-listing listHtml).
              <PgdmReadMore html={data.vision.html} className={`${styles.body} ${styles.rich}`} />
            ) : (
              <PgdmReadMore text={data.vision.body} className={styles.body} />
            )}
          </div>
          <div className={styles.media}>
            {data.vision.images.map((src, i) => (
              <img key={i} src={src} alt="" className={styles.image} />
            ))}
          </div>
        </div>
      ) : null}

      {data.mission.lines.length > 0 ? (
        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.text}>
            <h2 className={styles.heading}>{data.mission.heading}</h2>
            <ul
              className={`${styles.lines} ${expanded ? styles.linesOpen : ""}`}
            >
              {/* Drupal HTML (bold, links), sanitized server-side. */}
              {data.mission.lines.map((line) => (
                <li key={line} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </ul>
            {hasMore ? (
              <button
                type="button"
                className={styles.readMore}
                aria-expanded={expanded}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            ) : null}
          </div>
          <div className={styles.media}>
            {data.mission.images.map((src, i) => (
              <img key={i} src={src} alt="" className={styles.image} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PgdmVisionMission;
