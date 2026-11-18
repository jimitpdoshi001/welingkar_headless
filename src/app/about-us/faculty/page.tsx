import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { getFacultyAbout } from "@/lib/drupal/faculty-about";
import { DirectorMessage } from "@/components/paragraphs/DirectorMessage/DirectorMessage";
import { DEFAULT_DIRECTOR_MESSAGE } from "@/lib/drupal/faculty";
import { FacultyGrid } from "@/components/paragraphs/FacultyGrid/FacultyGrid";
import { facultyProfileHref, getCampusFacultyGrid } from "@/lib/drupal/faculty-api";

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
export default async function FacultyPreviewPage() {
  // Drupal faculty for this campus; hidden when none (or on fetch error).
  // Banner + director from Drupal (faculty_about_us); built-in values fill any gaps.
  const [grid, about] = await Promise.all([getCampusFacultyGrid("mumbai"), getFacultyAbout("mumbai")]);


  // Read More opens the director's own faculty profile (hidden if not in the directory).
  const merged = { ...DEFAULT_DIRECTOR_MESSAGE, ...about?.director };
  const director = { ...merged, link: await facultyProfileHref(merged.name) };

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main style={{ ["--faculty-accent" as string]: "var(--color-orange)" }}>
          <section className={styles.hero}>
            <img
              src={about?.hero.image || HERO_IMAGE}
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
              <h1 className={styles.heroTitle}>{about?.hero.title || "Faculty"}</h1>
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <DirectorMessage data={director} />
          </section>

          {grid && grid.members.length > 0 ? (
            <section className={`container ${styles.block}`}>
              <FacultyGrid
                categories={grid.categories}
                members={grid.members}
              />
            </section>
          ) : null}
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
