import Link from "next/link";
import type { BlogArticle } from "@/lib/drupal";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import { FeaturedBlog } from "./FeaturedBlog";
import { HomeIcon } from "./BlogIcons";
import listingStyles from "./BlogsListing.module.scss";
import styles from "./BlogDetail.module.scss";

type BlogDetailProps = {
  article: BlogArticle;
};

export function BlogDetail({ article }: BlogDetailProps) {
  return (
    <div className={listingStyles.page}>
      <div className="container">
        <nav
          className={listingStyles.breadcrumb}
          aria-label="Breadcrumb">
          <Link
            href="/"
            aria-label="Home">
            <HomeIcon />
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/blogs">Blogs</Link>
          <span aria-hidden="true">/</span>
          <span>{article.title}</span>
        </nav>

        <FeaturedBlog
          article={article}
          linked={false}
          showExcerpt={true}
        />

        {article.body ? (
          <SafeHtml
            className={`${styles.body} p`}
            html={article.body}
          />
        ) : null}
      </div>
    </div>
  );
}
