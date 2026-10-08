"use client";

import clsx from "clsx";
import styles from "./PgdmTabBar.module.scss";

type Tab = { id: string; label: string };

type PgdmTabBarProps = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pill";
  theme?: "light" | "onDark";
};

export function PgdmTabBar({ tabs, active, onChange, variant = "underline", theme = "light" }: PgdmTabBarProps) {
  return (
    <div
      className={clsx(styles.bar, styles[variant], theme === "onDark" && styles.onDark)}
      role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === active}
          className={clsx(styles.tab, tab.id === active && styles.active)}
          onClick={() => onChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default PgdmTabBar;
