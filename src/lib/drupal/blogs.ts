import { absoluteDrupalUrl, fetchJsonApi } from "./jsonapi";
import type { DrupalImage, JsonApiDocument, JsonApiResource, NodeResource } from "./types";

export type BlogArticle = {
  id: string;
  title: string;
  href: string;
  image: DrupalImage | null;
  tags: string[];
  categories: string[];
  date: string;
  dateLabel: string;
  monthKey: string;
  monthLabel: string;
  readTime: string;
  comments: number;
  views: number;
  excerpt: string;
  featured: boolean;
  isVideo: boolean;
};

export type BlogCategory = {
  id: string;
  name: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromHtml(html: string, maxLength = 280): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
}

function readTimeFromHtml(html: string): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} mins Read`;
}

function formatDateLabel(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function monthParts(iso: string): { key: string; label: string } {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return { key: iso, label: iso };
  return {
    key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
    label: new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(date),
  };
}

function relationshipItems(data: { type: string; id: string; meta?: Record<string, unknown> } | Array<{ type: string; id: string; meta?: Record<string, unknown> }> | null | undefined) {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

function resolveThumbnail(node: NodeResource, document: JsonApiDocument): DrupalImage | null {
  const rel = relationshipItems(node.relationships?.field_thumbnail?.data)[0];
  if (!rel) return null;

  const file = (document.included ?? []).find((item) => item.id === rel.id);
  const uri = file?.attributes?.uri as { url?: string } | undefined;
  const url = absoluteDrupalUrl(uri?.url);
  if (!url) return null;

  const meta = (rel.meta ?? {}) as { alt?: string | null; title?: string | null; width?: number; height?: number };

  return {
    url,
    alt: meta.alt || meta.title || node.attributes.title,
    width: meta.width,
    height: meta.height,
  };
}

function mapBlogNode(node: NodeResource, document: JsonApiDocument): BlogArticle {
  const included = document.included ?? [];
  const categoryRels = relationshipItems(node.relationships?.field_category?.data);
  const categories = categoryRels
    .map((rel) => included.find((item) => item.id === rel.id))
    .filter((term): term is JsonApiResource => Boolean(term))
    .map((term) => (typeof term.attributes.name === "string" ? term.attributes.name : ""))
    .filter(Boolean)
    .filter((name, index, list) => list.indexOf(name) === index);

  const bodyHtml = node.attributes.field_body?.processed || node.attributes.field_body?.value || node.attributes.body?.processed || node.attributes.body?.value || "";
  const date = node.attributes.field_date || node.attributes.created.slice(0, 10);
  const month = monthParts(date);
  const alias = node.attributes.path?.alias;
  const href = alias || `/blogs/${slugify(node.attributes.title) || node.attributes.drupal_internal__nid}`;

  return {
    id: node.id,
    title: node.attributes.title,
    href,
    image: resolveThumbnail(node, document),
    tags: categories,
    categories,
    date,
    dateLabel: formatDateLabel(date),
    monthKey: month.key,
    monthLabel: month.label,
    readTime: readTimeFromHtml(bodyHtml),
    comments: 0,
    views: 0,
    excerpt: excerptFromHtml(bodyHtml),
    featured: Boolean(node.attributes.sticky || node.attributes.promote),
    isVideo: categories.some((name) => /video/i.test(name)),
  };
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const document = await fetchJsonApi<JsonApiResource>("/taxonomy_term/blog_category", {
    "page[limit]": "50",
    "filter[status]": "1",
    sort: "name",
  });

  const terms = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
  const seen = new Set<string>();
  const categories: BlogCategory[] = [];

  for (const term of terms) {
    const name = typeof term.attributes.name === "string" ? term.attributes.name : "";
    if (!name || seen.has(name)) continue;
    seen.add(name);
    categories.push({ id: term.id, name });
  }

  return categories;
}

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const document = await fetchJsonApi<NodeResource>("/node/blogs", {
    include: "field_thumbnail,field_category",
    "filter[status]": "1",
    "page[limit]": "50",
    sort: "-field_date",
  });

  const nodes = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
  return nodes.map((node) => mapBlogNode(node, document));
}

export async function getBlogListing(): Promise<{ articles: BlogArticle[]; categories: BlogCategory[] }> {
  const [articles, categories] = await Promise.all([getBlogArticles(), getBlogCategories()]);
  return { articles, categories };
}
