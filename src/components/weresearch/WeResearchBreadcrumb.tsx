import Link from "next/link";

import styles from "./WeResearchBreadcrumb.module.scss";

type Props = {
  /** Last crumb label (current page). */
  current: string;
  /** "light" over the hero photo, "dark" on a white page. */
  tone?: "light" | "dark";
  className?: string;
};

// Figma breadcrumb: home icon, "-" separator, current page (12px).
export function WeResearchBreadcrumb({ current, tone = "light", className = "" }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.crumbs} ${tone === "dark" ? styles.dark : ""} ${className}`}>
      <Link href="/" aria-label="Home" className={styles.home}>
        <svg width="12.22" height="10" viewBox="0 0 12.2222 10" aria-hidden="true">
          <path
            d="M1.66667 10V4.79167L0.666667 5.55556L0 4.66667L6.11111 0L12.2222 4.66667L11.5556 5.54167L10.5556 4.79167V10H1.66667ZM2.77778 8.88889H5.55556V6.66667H6.66667V8.88889H9.44444V3.94444L6.11111 1.40278L2.77778 3.94444V8.88889Z"
            fill="currentColor"
          />
        </svg>
      </Link>
      <span aria-hidden="true">-</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}

export default WeResearchBreadcrumb;
