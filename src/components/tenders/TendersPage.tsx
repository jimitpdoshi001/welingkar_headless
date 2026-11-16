import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import type { TendersPageData } from "@/lib/tenders/tenders-data";
import { TendersListing } from "./TendersListing";
import styles from "./TendersPage.module.scss";

type Props = {
  data: TendersPageData;
  /** Archive (Figma 3193:137) moves the CTA beside the intro; Tenders (3077:129) puts it beside pagination. */
  variant?: "current" | "archive";
};

export function TendersPage({ data, variant = "current" }: Props) {
  const cta = (
    <Link href={data.cta.href} className={`btn ${styles.cta}`}>
      {data.cta.label}
    </Link>
  );
  const isArchive = variant === "archive";

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main className={`container ${styles.page}`}>
          <WeResearchBreadcrumb current={data.breadcrumb} tone="dark" />
          <h1 className={styles.heading}>{data.heading}</h1>
          <div className={`${styles.introRow} ${isArchive ? styles.introArchive : ""}`}>
            <div className={styles.intro}>
              {data.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            {isArchive && cta}
          </div>
          <TendersListing data={data} footerAction={isArchive ? null : cta} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
