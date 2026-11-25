"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import type { AlumniDirector } from "@/lib/alumni/alumni-data";
import styles from "./AlumniPage.module.scss";

/** Director photo card; Read More opens their full message in a modal (native <dialog>: Esc, focus trap, backdrop). */
export function DirectorCard({ director: d }: { director: AlumniDirector }) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <li className={styles.campusCard}>
      <Image
        src={d.image}
        alt={d.name}
        fill
        sizes="(max-width: 767px) 100vw, 400px"
        className={`${styles.cover} ${styles.directorCover}`}
      />
      <div className={styles.campusPanel}>
        <h3 className={styles.campusTitle}>{d.name}</h3>
        <p className={styles.cardRole}>{d.role}</p>
        <button
          type="button"
          className={`btn primary ${styles.smallBtn}`}
          onClick={() => ref.current?.showModal()}>
          Read More
        </button>
        {d.profileHref ? (
          <Link
            href={d.profileHref}
            className={styles.profileLink}>
            View Faculty Profile
          </Link>
        ) : null}
      </div>

      <dialog
        ref={ref}
        className={styles.dialog}
        aria-label={`Message from ${d.name}`}
        // Click on the backdrop (outside the box) closes it.
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}>
        <div className={styles.dialogBox}>
          <button
            type="button"
            className={styles.dialogClose}
            aria-label="Close"
            onClick={() => ref.current?.close()}>
            ×
          </button>
          <div className={styles.dialogHead}>
            <Image
              src={d.image}
              alt=""
              width={260}
              height={252}
              loading="eager" // inside a closed dialog: lazy loading would leave it blank on open
              className={styles.dialogImg}
            />
            <div>
              <h3 className={styles.directorName}>{d.name}</h3>
              <p className={styles.directorRole}>{d.role}</p>
              {d.org ? <p className={styles.directorRole}>{d.org}</p> : null}
              {d.profileHref ? (
                <Link
                  href={d.profileHref}
                  className={styles.profileLink}>
                  View Faculty Profile
                </Link>
              ) : null}
            </div>
          </div>
          <div className={styles.dialogBody}>
            {d.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </dialog>
    </li>
  );
}
