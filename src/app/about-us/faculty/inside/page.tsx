import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { FacultyProfile } from "@/components/faculty/FacultyProfile/FacultyProfile";

export const metadata: Metadata = {
  title: "Faculty Profile — Welingkar (Preview)",
  description: "Faculty profile — Welingkar",
};

/**
 * Standalone preview of the Faculty Inside (detail) page built from the Figma
 * design. Uses mock data from `@/lib/drupal/faculty`. Dev-only.
 */
export default function FacultyInsidePreviewPage() {

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main style={{ ["--faculty-accent" as string]: "var(--color-orange)" }}>
          <FacultyProfile />
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
