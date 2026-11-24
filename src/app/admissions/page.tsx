import type { Metadata } from "next";
import { AdmissionsPage } from "@/components/admissions/AdmissionsPage";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { getAdmissions } from "@/lib/drupal/pages/admissions";
import { sitePageMetadata } from "@/lib/pages/page-metadata";

export const metadata: Metadata = sitePageMetadata("/admissions");

// ISR: same window as the Drupal fetches (fetchJsonApi revalidates every 300s).
export const revalidate = 300;

export default async function Page() {
  const data = await getAdmissions();
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main data-auto-reveal="reveal">
          <AdmissionsPage data={data} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
