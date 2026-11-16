import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { PgdmUspBand } from "@/components/pgdm/PgdmUspBand/PgdmUspBand";

import type { PgpData } from "@/lib/pgp/pgp-entrepreneurship-data";
import { PgpHero } from "./PgpHero/PgpHero";
import { PgpOverview } from "./PgpOverview/PgpOverview";
import { PgpFees } from "./PgpFees/PgpFees";
import { PgpIdealFor } from "./PgpIdealFor/PgpIdealFor";

// Figma 3045:135 (Mumbai): hero, overview, USPs (shared PGDM band), fees, ideal for.
export function PgpEntrepreneurshipPage({ data }: { data: PgpData }) {
  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />
        <main style={{ "--pgdm-band": "#493460" } as React.CSSProperties}>
          <PgpHero data={data.hero} />
          <PgpOverview data={data.overview} />
          {data.uspBand.cards.length > 0 ? <PgdmUspBand data={data.uspBand} /> : null}
          <PgpFees data={data.fees} />
          <PgpIdealFor data={data.idealFor} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
