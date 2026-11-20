"use client";

import { useState, type ReactNode } from "react";

import styles from "./CorporatePage.module.scss";

export type CorporateAccordionItem = { id: string; title: string; content?: ReactNode };

/**
 * One-open-at-a-time accordion. tone: orange (Placements) / green (Batch profile).
 * Items without content show as plain headings (no toggle).
 */
export function CorporateAccordion({
  items,
  tone,
  defaultOpenId,
}: {
  items: CorporateAccordionItem[];
  tone: "orange" | "green";
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className={`${styles.accordion} ${tone === "orange" ? styles.orange : styles.green}`}>
      {items.map((item) => {
        const isOpen = item.id === openId;
        const panelId = `acc-${item.id}`;
        return (
          <div key={item.id} className={styles.accItem}>
            {item.content ? (
              <button
                type="button"
                className={styles.accHeader}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}>
                <span className={styles.accTitle}>{item.title}</span>
                <span className={`${styles.accToggle} ${isOpen ? styles.accToggleOpen : ""}`} aria-hidden="true" />
              </button>
            ) : (
              <div className={styles.accHeader}>
                <span className={styles.accTitle}>{item.title}</span>
              </div>
            )}
            {item.content && isOpen ? (
              <div id={panelId} className={styles.accPanel}>
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
