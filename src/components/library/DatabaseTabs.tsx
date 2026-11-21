"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { LibDatabase } from "@/lib/library/library-data";
import styles from "./LibraryPage.module.scss";

const ALL = "All";

export function DatabaseTabs({ categories, items }: { categories: string[]; items: LibDatabase[] }) {
  const tabs = [ALL, ...categories];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const visible = active === 0 ? items : items.filter((d) => d.category === tabs[active]);

  // Roving focus: arrow keys / Home / End move between tabs (WAI-ARIA tabs pattern).
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <>
      <div role="tablist" aria-label="Database categories" className={styles.tabs} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
            onClick={() => setActive(i)}>
            {t}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${active}`}>
        {visible.length ? (
          <ul className={styles.dbGrid}>
            {visible.map((d) => (
              <li key={d.id} className={styles.dbCard}>
                <span className={styles.dbTag}>{d.category}</span>
                <h3 className={styles.dbName}>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer">
                      {d.name}
                    </a>
                  ) : (
                    d.name
                  )}
                </h3>
                {d.meta && <p className={styles.dbMeta}>{d.meta}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.dbEmpty}>No databases listed in this category yet.</p>
        )}
      </div>
    </>
  );
}

export default DatabaseTabs;
