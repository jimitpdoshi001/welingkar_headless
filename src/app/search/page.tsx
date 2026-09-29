import type { Metadata } from "next";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { SearchResults } from "@/components/search/SearchResults";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { searchDrupal } from "@/lib/drupal";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const keys = params.q?.trim() || "";

  return {
    title: keys ? `Search: ${keys}` : "Search",
    description: keys ? `Search results for ${keys}` : "Search Welingkar",
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const listing = await searchDrupal(params.q || "", {
    page: Number(params.page) || 1,
  });

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main>
          <SearchResults listing={listing} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
