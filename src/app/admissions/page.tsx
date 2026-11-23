import type { Metadata } from "next";
import { AdmissionsPage } from "@/components/admissions/AdmissionsPage";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/admissions");

export default function Page() {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main data-auto-reveal="reveal">
          <AdmissionsPage />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
