import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import styles from "./AccreditationPage.module.scss";

type Accreditation = {
  logo: string;
  alt: string;
  /** Rendered logo size from Figma 1172:499. */
  width: number;
  height: number;
  entries: { title: string; text: string }[];
};

const ITEMS: Accreditation[] = [
  {
    logo: "/about/logo-acbsp.png",
    alt: "ACBSP Global Business Accreditation",
    width: 119,
    height: 182,
    entries: [
      {
        title: "ACBSP Accredited:",
        text: "Accredited for 10 years by the Accreditation Council for Business Schools and Programs (ACBSP), a global business education accrediting body.",
      },
    ],
  },
  {
    logo: "/about/logo-saqs.png",
    alt: "SAQS Accredited",
    width: 198,
    height: 119,
    entries: [
      {
        title: "SAQS Accredited:",
        text: "All PGDM programmes at WeSchool’s Mumbai and Bengaluru campuses are accredited by the South Asian Quality Assurance System (SAQS).",
      },
    ],
  },
  {
    logo: "/about/logo-nba.png",
    alt: "National Board of Accreditation",
    width: 151,
    height: 116,
    entries: [
      {
        title: "NBA Accredited & MBA Equivalent:",
        text: "All full-time PGDM programmes across the Mumbai and Bengaluru campuses are accredited by the National Board of Accreditation (NBA) and have been granted MBA equivalence by the Association of Indian Universities (AIU).",
      },
      {
        title: "NBA Accredited – MMS:",
        text: "The MMS programme at the Mumbai campus is accredited by the National Board of Accreditation (NBA).",
      },
    ],
  },
  {
    logo: "/about/logo-mu.png",
    alt: "University of Mumbai",
    width: 243,
    height: 75,
    entries: [
      {
        title: "Autonomous Institute:",
        text: "WeSchool is an autonomous institute affiliated with the University of Mumbai.",
      },
    ],
  },
];

export function AccreditationPage() {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main className={`container ${styles.page}`}>
          <nav
            className={styles.breadcrumb}
            aria-label="Breadcrumb">
            <Link
              href="/"
              aria-label="Home">
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                aria-hidden="true">
                <path
                  d="M1 6L6.5 1L12 6M2.5 5v6h3V8h2v3h3V5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span aria-hidden="true">-</span>
            <span>Accreditation</span>
          </nav>
          <h1 className={styles.srOnly}>Accreditation</h1>

          <div className={styles.grid}>
            {ITEMS.map((item) => (
              <section
                key={item.alt}
                className={styles.item}>
                <div className={styles.logoBox}>
                  <img
                    src={item.logo}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className={styles.logo}
                  />
                </div>
                {item.entries.map((e) => (
                  <p
                    key={e.title}
                    className={styles.text}>
                    <strong>{e.title}</strong> {e.text}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default AccreditationPage;
