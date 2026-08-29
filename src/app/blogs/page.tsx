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

export default async function BlogsPage() {
  const { articles, categories } = await getBlogListing();

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main>
          <BlogsListing articles={articles} categories={categories} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
