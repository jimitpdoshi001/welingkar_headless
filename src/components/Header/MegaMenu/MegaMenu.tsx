"use client";

import Link from "next/link";

import type { MegaPanel } from "@/lib/menu/menu-config";
import styles from "./MegaMenu.module.scss";

type MegaMenuProps = {
  panel: MegaPanel;
  onNavigate?: () => void;
};

export function MegaMenu({ panel, onNavigate }: MegaMenuProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.inner}>
        {panel.intro && panel.intro.length > 0 ? (
          <div className={styles.intro}>
            {panel.intro.map((group, index) => {
              const content = (
                <>
                  <span className={styles.introTitle}>{group.title}</span>
                  {group.subtitle ? <span className={styles.introSubtitle}>{group.subtitle}</span> : null}
                </>
              );
              return (
                <div
                  key={group.title + index}
                  className={styles.introGroup}>
                  {group.href ? (
                    <Link
                      href={group.href}
                      className={styles.introLink}
                      onClick={onNavigate}>
                      {content}
                    </Link>
                  ) : (
                    <div className={styles.introLink}>{content}</div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}

        <div className={styles.columns}>
          {panel.columns.map((column, index) => (
            <div
              key={(column.heading || "col") + index}
              className={styles.column}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
