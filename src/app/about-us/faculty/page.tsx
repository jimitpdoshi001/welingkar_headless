import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { DirectorMessage } from "@/components/paragraphs/DirectorMessage/DirectorMessage";
import { FacultyGrid } from "@/components/paragraphs/FacultyGrid/FacultyGrid";
import { AffiliateFaculty } from "@/components/paragraphs/AffiliateFaculty/AffiliateFaculty";

import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Faculty — Welingkar (Preview)",
  description: "Faculty — Welingkar",
};

const HERO_IMAGE = "/faculty/hero.webp";

/**
 * Standalone preview of the Faculty (Mumbai) page built from the Figma design.
 * Uses mock data from `@/lib/drupal/faculty`. In production the same sections are
 * assembled as paragraphs on a Drupal node. Dev-only, like the HTML tester route.
 */
export default function FacultyPreviewPage() {

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main style={{ ["--faculty-accent" as string]: "var(--color-orange)" }}>
          <section className={styles.hero}>
            <img
              src={HERO_IMAGE}
              alt="WeSchool faculty"
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroInner}`}>
              <nav
                className={styles.breadcrumb}
                aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">–</span>
                <span className={styles.breadcrumbCurrent}>Faculty</span>
              </nav>
              <h1 className={styles.heroTitle}>Faculty</h1>
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <DirectorMessage />
          </section>

          <section className={`container ${styles.block}`}>
            <FacultyGrid />
          </section>

          <section className={`container ${styles.block}`}>
            <AffiliateFaculty />
          </section>
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
