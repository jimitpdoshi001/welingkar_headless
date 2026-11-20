import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { WeResearchBreadcrumb } from "@/components/weresearch/WeResearchBreadcrumb";
import wf from "@/components/wefactor/WeFactorDetailPage.module.scss";
import type { CdcMember } from "@/lib/about/cdc-data";
import styles from "./CdcPage.module.scss";

/**
 * Member grid per the supplied screenshot: name, designation, role (purple).
 * Also used by the international / visiting / guest faculty pages.
 */
export function CdcPage({
  title,
  members,
  intro,
  parent = { label: "About Us", href: "/who-we-are" },
}: {
  title: string;
  members: CdcMember[];
  intro?: string;
  parent?: { label: string; href: string };
}) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main data-auto-reveal="reveal">
          <section className={`container ${wf.intro} ${styles.intro}`}>
            <WeResearchBreadcrumb current={title} parent={parent} tone="dark" />
            <h1 className={wf.textTitle}>{title}</h1>
            {intro ? <p className={wf.textBody}>{intro}</p> : null}
          </section>
          <section className={`container ${styles.section}`}>
            <ul className={styles.grid}>
              {members.map((m) => (
                <li key={`${m.name}-${m.designation}`} className={styles.member}>
                  <h2 className={styles.name}>{m.name}</h2>
                  <p className={styles.designation}>{m.designation}</p>
                  {m.role ? <p className={styles.role}>{m.role}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
        <SearchOverlay />
        <ScrollToTop />
      </div>
    </SearchProvider>
  );
}
