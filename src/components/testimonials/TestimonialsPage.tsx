import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import wf from "@/components/wefactor/WeFactorDetailPage.module.scss";
import type { TestimonialTab } from "@/lib/testimonials/testimonials-data";
import { TestimonialsTabs } from "./TestimonialsTabs";
import styles from "./TestimonialsPage.module.scss";

/** Figma 3366:855: intro (WeFactor intro block), then Alumni / Corporate tabbed slider. */
export function TestimonialsPage({ title, intro, tabs }: { title: string; intro: string; tabs: TestimonialTab[] }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main data-auto-reveal="reveal" className={styles.page}>
          <img src="/testimonials/decor-triangle.svg" alt="" className={styles.decor} aria-hidden="true" />
          <section className={`container ${wf.intro} ${styles.intro}`}>
            <WeResearchBreadcrumb current={title} tone="dark" />
            <h1 className={wf.textTitle}>{title}</h1>
            <p className={wf.textBody}>{intro}</p>
          </section>

          <TestimonialsTabs tabs={tabs} />
        </main>

        <Footer />
        <SearchOverlay />
        <ScrollToTop />
      </div>
    </SearchProvider>
  );
}
