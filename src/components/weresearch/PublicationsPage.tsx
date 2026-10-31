import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import {
  DEFAULT_PUBLICATION_YEAR,
  PUBLICATIONS,
  PUBLICATIONS_PER_PAGE,
  PUBLICATION_YEARS,
} from "@/lib/weresearch/publications-data";
import { WeResearchBreadcrumb } from "./WeResearchBreadcrumb";
import { PublicationsList } from "./PublicationsList";
import styles from "./PublicationsPage.module.scss";

// Figma 2549:1783 "WeResearch - Inside page - Research Publications Section".
export function PublicationsPage() {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main className={`container ${styles.main}`}>
          <WeResearchBreadcrumb current="WeResearch" tone="dark" className={styles.crumbs} />
          <h1 className={styles.srOnly}>Research Publications</h1>
          <PublicationsList
            years={PUBLICATION_YEARS}
            defaultYear={DEFAULT_PUBLICATION_YEAR}
            perPage={PUBLICATIONS_PER_PAGE}
            publications={PUBLICATIONS}
          />
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default PublicationsPage;
