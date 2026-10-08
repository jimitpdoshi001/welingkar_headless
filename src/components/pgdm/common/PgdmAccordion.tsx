"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./PgdmAccordion.module.scss";

export type AccordionItem = { id: string; label: string; content: ReactNode };

type PgdmAccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
};

export function PgdmAccordion({ items, defaultOpenId }: PgdmAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  return (
    <div className={styles.root}>
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <div
            key={item.id}
            className={clsx(styles.item, isOpen && styles.itemOpen)}>
            <button
              type="button"
              className={styles.header}
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}>
              <span className={styles.label}>{item.label}</span>
              <span
                className={styles.toggle}
                aria-hidden="true">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {isOpen ? <div className={styles.body}>{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}

export default PgdmAccordion;
