import Link from "next/link";
import type { ReactNode } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import styles from "./PageShell.module.scss";

export type Crumb = { label: string; href?: string };

type PageShellProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  image?: string;
  accent?: "orange" | "green" | "default";
  children?: ReactNode;
};

const DEFAULT_HERO = "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1600&auto=format&fit=crop&q=80";

export function PageShell({ title, subtitle, breadcrumbs, image = DEFAULT_HERO, accent = "default", children }: PageShellProps) {
  const accentVar = accent === "orange" ? "var(--color-orange)" : accent === "green" ? "var(--color-primary)" : undefined;

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main style={accentVar ? ({ ["--faculty-accent" as string]: accentVar } as React.CSSProperties) : undefined}>
          <section className={styles.hero}>
            <img
              src={image}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              {breadcrumbs && breadcrumbs.length > 0 ? (
                <nav
                  className={styles.breadcrumb}
                  aria-label="Breadcrumb">
                  {breadcrumbs.map((crumb, i) => (
                    <span key={crumb.label}>
                      {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
                      {i < breadcrumbs.length - 1 ? <span aria-hidden="true"> – </span> : null}
                    </span>
                  ))}
                </nav>
              ) : null}
              <h1 className={styles.title}>{title}</h1>
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>
          </section>

          {children}
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default PageShell;
