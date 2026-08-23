import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DrupalPageView } from "@/components/DrupalPageView";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { getAllPages, getAllRouteParams, getPageByPath } from "@/lib/drupal";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return getAllRouteParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageByPath(slug);

  if (!page) {
    return { title: "Page not found" };
  }

  return {
    title: page.title,
    description: `${page.title} — Welingkar`,
  };
}

export default async function DrupalDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const [page] = await Promise.all([getPageByPath(slug), getAllPages()]);

  if (!page) {
    notFound();
  }

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main>
          <DrupalPageView page={page} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
