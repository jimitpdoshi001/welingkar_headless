"use client";

import { useState } from "react";
import Link from "next/link";

import type { MegaColumn, MegaPanel } from "@/lib/menu/menu-config";
import styles from "./MegaMenu.module.scss";

type MegaMenuProps = {
  panel: MegaPanel;
  onNavigate?: () => void;
};

export function MegaMenu({ panel, onNavigate }: MegaMenuProps) {
  const intro = panel.intro ?? [];
  // Tab mode (Programs): each intro group carries its own columns.
  const tabbed = intro.length > 0 && intro.every((group) => group.columns);
  const [active, setActive] = useState(0);
  const columns = tabbed ? (intro[active]?.columns ?? []) : panel.columns;
  // Intro only, no columns (Campus): the groups sit side by side.
  const introOnly = !tabbed && intro.length > 0 && columns.length === 0;

  // One heading + its links; reused for stacked sections inside a column.
  const renderGroup = (column: MegaColumn) => (
    <>
      {column.heading ? (
        column.headingHref ? (
          <Link
            href={column.headingHref}
            className={styles.columnHeading}
            onClick={onNavigate}>
            {column.heading}
          </Link>
        ) : (
          <span className={styles.columnHeading}>{column.heading}</span>
        )
      ) : null}

      {column.links.length > 0 ? (
        <ul className={styles.linkList}>
          {column.links.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className={styles.link}
                onClick={onNavigate}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  return (
    <div className={styles.panel}>
      <div className={`${styles.inner} ${introOnly ? styles.innerRow : ""}`}>
        {intro.length > 0 ? (
          <div
            className={`${styles.intro} ${introOnly ? styles.introRow : ""}`}
            role={tabbed ? "tablist" : undefined}
            aria-orientation={tabbed ? "vertical" : undefined}>
            {intro.map((group, index) => {
              const content = (
                <>
                  <span className={styles.introTitle}>{group.title}</span>
                  {group.subtitle ? <span className={styles.introSubtitle}>{group.subtitle}</span> : null}
                </>
              );
              // Tabs switch on hover and keyboard focus; a click still opens the campus page.
              const tabProps = tabbed
                ? {
                    role: "tab",
                    "aria-selected": index === active,
                    onMouseEnter: () => setActive(index),
                    onFocus: () => setActive(index),
                  }
                : {};
              return (
                <div
                  key={group.title + index}
                  className={`${styles.introGroup} ${tabbed && index === active ? styles.introActive : ""}`}>
                  {group.href ? (
                    <Link
                      href={group.href}
                      className={styles.introLink}
                      onClick={onNavigate}
                      {...tabProps}>
                      {content}
                    </Link>
                  ) : (
                    <div
                      className={styles.introLink}
                      tabIndex={tabbed ? 0 : undefined}
                      {...tabProps}>
                      {content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}

        {columns.length > 0 ? (
          <div
            className={styles.columns}
            role={tabbed ? "tabpanel" : undefined}>
            {columns.map((column, index) => (
              <div
                key={(column.heading || "col") + index}
                className={styles.column}>
                {renderGroup(column)}
                {column.sections?.map((section, si) => (
                  <div
                    key={(section.heading || "sec") + si}
                    className={styles.section}>
                    {renderGroup(section)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MegaMenu;
