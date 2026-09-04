import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { BlogDetail } from "@/components/blogs/BlogDetail";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getBlogBySlug } from "@/lib/drupal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) {
    return { title: "Blog not found" };
  }

  return {
    title: article.title,
    description: article.excerpt || `${article.title} — Welingkar`,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />
        <main>
          <BlogDetail article={article} />
        </main>
        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
