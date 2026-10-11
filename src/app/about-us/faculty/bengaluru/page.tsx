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
import { DEFAULT_DIRECTOR_MESSAGE_BENGALURU } from "@/lib/drupal/faculty";

import styles from "../page.module.scss";

export const metadata: Metadata = {
  title: "Faculty — Welingkar Bengaluru (Preview)",
  description: "Faculty — Welingkar Bengaluru",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80";

/**
 * Standalone preview of the Faculty (Bengaluru) page. Identical structure to the
 * Mumbai page — only the Director's message differs. Dev-only.
 */
export default function FacultyBengaluruPreviewPage() {

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main style={{ ["--faculty-accent" as string]: "var(--color-primary)" }}>
          <section className={styles.hero}>
            <img
              src={HERO_IMAGE}
              alt="WeSchool Bengaluru faculty"
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
            <DirectorMessage data={DEFAULT_DIRECTOR_MESSAGE_BENGALURU} />
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
