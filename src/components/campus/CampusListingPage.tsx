import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import styles from "./CampusListingPage.module.scss";

type Row = { id: string; title: string; eyebrow: string; body: string; image: string; href: string; reverse?: boolean };

const ROWS: Row[] = [
  {
    id: "mumbai",
    title: "PGDM Mumbai",
    eyebrow: "(AICTE approved standalone institute)",
    body: "The WeSchool Mumbai Campus is a thriving ecosystem of new thoughts, ideas, and enterprise. Here's where cutting-edge global conversations begin.",
    image: "/campus/listing-mumbai.webp",
    href: "/campuses/mumbai",
  },
  {
    id: "mms",
    title: "MMS / PhD",
    eyebrow: "(Autonomous Institute affiliated to University of Mumbai)",
    body: "MMS (Master of Management Studies) is a 2-year full-time Master's Degree program introduced in 1984. It offers specializations in Marketing, Finance, Human Resource Management, and Operations.",
    image: "/campus/listing-mms.webp",
    href: "/programmes/mms",
    reverse: true,
  },
  {
    id: "bengaluru",
    title: "PGDM Bengaluru",
    eyebrow: "(AICTE approved standalone institute)",
    body: "Situated in Bengaluru, the Silicon Valley of India, the WeSchool Bengaluru campus is designed to nurture Design Thinking and Innovation as well as the business pioneers of tomorrow.",
    image: "/campus/listing-bengaluru.webp",
    href: "/campuses/bengaluru",
  },
];

export function CampusListingPage() {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main>
          <div className={`container ${styles.crumbWrap}`}>
            <nav className={styles.breadcrumb}>
              <Link href="/">Home</Link> <span>›</span> <span>Campus Listing</span>
            </nav>
          </div>

          {ROWS.map((r) => (
            <section
              key={r.id}
              className={`${styles.rowSection} ${r.reverse ? styles.tinted : ""}`}>
              <div className={`container ${styles.row} ${r.reverse ? styles.reverse : ""}`}>
                <img
                  src={r.image}
                  alt={r.title}
                  className={styles.image}
                />
                <div className={styles.card}>
                  <h2 className={styles.title}>{r.title}</h2>
                  <p className={styles.eyebrow}>{r.eyebrow}</p>
                  <p className={styles.body}>{r.body}</p>
                  <Link
                    href={r.href}
                    className="btn accent">
                    Know More
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default CampusListingPage;
