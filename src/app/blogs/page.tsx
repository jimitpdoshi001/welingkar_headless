import type { Metadata } from "next";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { BlogsListing } from "@/components/blogs/BlogsListing";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getBlogListing } from "@/lib/drupal";

export const metadata: Metadata = {
  title: "Blogs & Articles",
  description: "Blogs and articles from Welingkar Institute of Management.",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    month?: string;
    tab?: string;
  }>;
};

export default async function BlogsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const listing = await getBlogListing({
    page: Number(params.page) || 1,
    categoryId: params.category || null,
    month: params.month || "",
    tab: params.tab,
  });

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main>
          <BlogsListing listing={listing} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
