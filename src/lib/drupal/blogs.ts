import { cache } from "react";
import { absoluteDrupalUrl, fetchJsonApi, fetchPaginatedJsonApi } from "./jsonapi";
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
  body: string;
  featured: boolean;
  isVideo: boolean;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  children: BlogCategory[];
};

export const BLOG_PAGE_SIZE = 9;

export type BlogListingQuery = {
  page?: number;
  categoryId?: string | null;
  month?: string;
  tab?: string;
};

export type BlogListingResult = {
  featured: BlogArticle | null;
  articles: BlogArticle[];
  categories: BlogCategory[];
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
  pageNumbers: number[];
  selectedCategoryId: string | null;
  month: string;
  tab: string;
  monthOptions: Array<{ key: string; label: string }>;
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

function blogSlugFromNode(node: NodeResource): string {
  const alias = node.attributes.path?.alias;
  if (alias) {
    const last = alias.replace(/\/+$/, "").split("/").filter(Boolean).at(-1);
    if (last) return last;
  }

  return slugify(node.attributes.title) || String(node.attributes.drupal_internal__nid);
}

function firstNodes(document: JsonApiDocument<NodeResource>): NodeResource[] {
  return Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
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

  return {
    id: node.id,
    title: node.attributes.title,
    href: `/blogs/${blogSlugFromNode(node)}`,
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
    body: bodyHtml,
    featured: Boolean(node.attributes.sticky || node.attributes.promote),
    isVideo: categories.some((name) => /video/i.test(name)),
  };
}

function decodeName(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function termParentId(term: JsonApiResource): string | null {
  const data = term.relationships?.parent?.data;
  const items = Array.isArray(data) ? data : data ? [data] : [];
  const parent = items[0];
  if (!parent?.id || parent.id === "virtual") return null;
  return parent.id;
}

function collectDescendantIds(node: BlogCategory): string[] {
  return [node.id, ...node.children.flatMap((child) => collectDescendantIds(child))];
}

function findCategory(nodes: BlogCategory[], idOrSlug: string): BlogCategory | null {
  const needle = idOrSlug.trim().toLowerCase();
  for (const node of nodes) {
    if (node.id === idOrSlug || node.slug === needle || slugify(node.name) === needle) return node;
    const nested = findCategory(node.children, idOrSlug);
    if (nested) return nested;
  }
  return null;
}

function findCategoryByName(nodes: BlogCategory[], name: string): BlogCategory | null {
  const needle = name.trim().toLowerCase();
  for (const node of nodes) {
    if (node.name.trim().toLowerCase() === needle) return node;
    const nested = findCategoryByName(node.children, name);
    if (nested) return nested;
  }
  return null;
}

function monthOptionsFromNow(count = 24): Array<{ key: string; label: string }> {
  const options: Array<{ key: string; label: string }> = [];
  const now = new Date();
  for (let index = 0; index < count; index += 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    options.push({
      key,
      label: new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(date),
    });
  }
  return options;
}

function applyMonthFilter(params: Record<string, string>, month: string) {
  if (!/^\d{4}-\d{2}$/.test(month)) return;
  const [year, monthNumber] = month.split("-").map(Number);
  const start = `${month}-01`;
  const endDate = new Date(year, monthNumber, 1);
  const end = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-01`;
  params["filter[date_start][condition][path]"] = "field_date";
  params["filter[date_start][condition][operator]"] = ">=";
  params["filter[date_start][condition][value]"] = start;
  params["filter[date_end][condition][path]"] = "field_date";
  params["filter[date_end][condition][operator]"] = "<";
  params["filter[date_end][condition][value]"] = end;
}

function applyCategoryFilter(params: Record<string, string>, categoryIds: string[]) {
  if (!categoryIds.length) return;
  if (categoryIds.length === 1) {
    params["filter[field_category.id]"] = categoryIds[0];
    return;
  }

  params["filter[cat][condition][path]"] = "field_category.id";
  params["filter[cat][condition][operator]"] = "IN";
  categoryIds.forEach((id, index) => {
    params[`filter[cat][condition][value][${index}]`] = id;
  });
}

function flattenCategories(nodes: BlogCategory[]): BlogCategory[] {
  return nodes.flatMap((node) => [node, ...flattenCategories(node.children)]);
}

function termsFromDocument(document: JsonApiDocument<JsonApiResource>): JsonApiResource[] {
  return Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
}

function buildCategoryTree(terms: JsonApiResource[]): BlogCategory[] {
  const byId = new Map<string, BlogCategory>();

  for (const term of terms) {
    const name = decodeName(typeof term.attributes.name === "string" ? term.attributes.name : "");
    if (!name) continue;
    byId.set(term.id, { id: term.id, name, slug: slugify(name), children: [] });
  }

  const roots: BlogCategory[] = [];
  for (const term of terms) {
    const node = byId.get(term.id);
    if (!node) continue;
    const parentId = termParentId(term);
    const parent = parentId ? byId.get(parentId) : null;
    if (parent && parent.id !== node.id) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

async function fetchTaxonomyTerms(vocab: string): Promise<JsonApiResource[]> {
  const document = await fetchPaginatedJsonApi<JsonApiResource>(`/taxonomy_term/${vocab}`, {
    include: "parent",
    "filter[status]": "1",
    sort: "name",
  }, 50);
  return termsFromDocument(document);
}

async function getFilterIdsByName(): Promise<Map<string, string[]>> {
  try {
    const terms = await fetchTaxonomyTerms("categories");
    const byName = new Map<string, string[]>();
    for (const term of terms) {
      const name = decodeName(typeof term.attributes.name === "string" ? term.attributes.name : "")
        .trim()
        .toLowerCase();
      if (!name) continue;
      const ids = byName.get(name) ?? [];
      ids.push(term.id);
      byName.set(name, ids);
    }
    return byName;
  } catch {
    return new Map();
  }
}

function resolveFilterIds(selected: BlogCategory, aliasByName: Map<string, string[]>): string[] {
  const selectedIds = collectDescendantIds(selected);
  const selectedTerms = flattenCategories([selected]);
  const ids = new Set(selectedIds);

  for (const term of selectedTerms) {
    for (const mapped of aliasByName.get(term.name.trim().toLowerCase()) ?? []) {
      ids.add(mapped);
    }
  }

  return [...ids];
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const terms = await fetchTaxonomyTerms("blog_category");
  return buildCategoryTree(terms);
}

async function fetchBlogPage(options: {
  page: number;
  categoryIds: string[];
  month: string;
  excludeId?: string | null;
}): Promise<{ articles: BlogArticle[]; hasNext: boolean; hasPrev: boolean }> {
  const page = Math.max(1, options.page);
  const offset = (page - 1) * BLOG_PAGE_SIZE;
  const params: Record<string, string> = {
    include: "field_thumbnail,field_category",
    "filter[status]": "1",
    "page[limit]": String(BLOG_PAGE_SIZE),
    "page[offset]": String(offset),
    sort: "-field_date",
  };

  applyCategoryFilter(params, options.categoryIds);
  applyMonthFilter(params, options.month);

  if (options.excludeId) {
    params["filter[notid][condition][path]"] = "id";
    params["filter[notid][condition][operator]"] = "<>";
    params["filter[notid][condition][value]"] = options.excludeId;
  }

  const document = await fetchJsonApi<NodeResource>("/node/blogs", params, { next: { revalidate: 3600 } });
  const nodes = firstNodes(document);

  return {
    articles: nodes.map((node) => mapBlogNode(node, document)),
    hasNext: Boolean(document.links?.next?.href),
    hasPrev: page > 1,
  };
}

async function fetchFeaturedArticle(): Promise<BlogArticle | null> {
  const document = await fetchJsonApi<NodeResource>(
    "/node/blogs",
    {
      include: "field_thumbnail,field_category",
      "filter[status]": "1",
      "page[limit]": "1",
      sort: "-field_date",
    },
    { next: { revalidate: 3600 } },
  );

  const nodes = firstNodes(document);
  return nodes[0] ? mapBlogNode(nodes[0], document) : null;
}

let slugIndexPromise: Promise<Map<string, string>> | null = null;

async function buildSlugIndex(): Promise<Map<string, string>> {
  const index = new Map<string, string>();
  const pageSize = 50;
  let offset = 0;

  while (true) {
    const document = await fetchJsonApi<NodeResource>("/node/blogs", {
      "filter[status]": "1",
      "fields[node--blogs]": "title,path,drupal_internal__nid",
      "page[limit]": String(pageSize),
      "page[offset]": String(offset),
      sort: "-field_date",
    });

    const nodes = firstNodes(document);
    for (const node of nodes) {
      index.set(blogSlugFromNode(node), node.id);
      const titleSlug = slugify(node.attributes.title);
      if (titleSlug) index.set(titleSlug, node.id);
    }

    if (!nodes.length || !document.links?.next?.href) break;
    offset += pageSize;
    if (offset > 1000) break;
  }

  return index;
}

function getSlugIndex(): Promise<Map<string, string>> {
  if (!slugIndexPromise) {
    slugIndexPromise = buildSlugIndex().catch((error) => {
      slugIndexPromise = null;
      throw error;
    });
  }

  return slugIndexPromise;
}

async function fetchBlogNode(id: string): Promise<BlogArticle | null> {
  const document = await fetchJsonApi<NodeResource>(`/node/blogs/${id}`, {
    include: "field_thumbnail,field_category",
  });
  const node = firstNodes(document)[0];
  return node ? mapBlogNode(node, document) : null;
}

export const getBlogBySlug = cache(async (slug: string): Promise<BlogArticle | null> => {
  const decoded = decodeURIComponent(slug).replace(/^\/+|\/+$/g, "");
  if (!decoded) return null;

  const index = await getSlugIndex();
  const id = index.get(decoded);
  if (!id) return null;

  return fetchBlogNode(id);
});

export async function getBlogSlugs(): Promise<string[]> {
  return [...new Set((await getSlugIndex()).keys())];
}

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const { articles } = await fetchBlogPage({ page: 1, categoryIds: [], month: "" });
  return articles;
}

export async function getBlogListing(query: BlogListingQuery = {}): Promise<BlogListingResult> {
  const page = Math.max(1, Number(query.page) || 1);
  const month = query.month && /^\d{4}-\d{2}$/.test(query.month) ? query.month : "";
  const tab = query.tab === "campus-corner" || query.tab === "videos" ? query.tab : "all";
  const selectedCategoryId = query.categoryId || null;

  const [categories, featured, filterIdsByName] = await Promise.all([
    getBlogCategories(),
    fetchFeaturedArticle(),
    getFilterIdsByName(),
  ]);

  let categoryIds: string[] = [];
  let highlightId = selectedCategoryId;

  if (selectedCategoryId) {
    const selected = findCategory(categories, selectedCategoryId);
    categoryIds = selected ? resolveFilterIds(selected, filterIdsByName) : [selectedCategoryId];
    if (selected) {
      highlightId = selected.slug;
    }
  } else if (tab === "campus-corner") {
    const campus = findCategoryByName(categories, "Campus Corner");
    if (campus) {
      categoryIds = resolveFilterIds(campus, filterIdsByName);
      highlightId = campus.slug;
    }
  } else if (tab === "videos") {
    const videos = findCategoryByName(categories, "Videos");
    if (videos) {
      categoryIds = resolveFilterIds(videos, filterIdsByName);
      highlightId = videos.slug;
    }
  }

  const listing = await fetchBlogPage({
    page,
    categoryIds,
    month,
    excludeId: featured?.id,
  });

  let hasThirdPage = false;
  if (page === 1 && listing.hasNext) {
    try {
      const third = await fetchBlogPage({
        page: 3,
        categoryIds,
        month,
        excludeId: featured?.id,
      });
      hasThirdPage = third.articles.length > 0;
    } catch {
      hasThirdPage = false;
    }
  }

  const pageNumbers: number[] = [];
  if (page === 1) {
    pageNumbers.push(1);
    if (listing.hasNext) pageNumbers.push(2);
    if (hasThirdPage) pageNumbers.push(3);
  } else {
    if (listing.hasPrev) pageNumbers.push(page - 1);
    pageNumbers.push(page);
    if (listing.hasNext) pageNumbers.push(page + 1);
  }

  return {
    featured,
    articles: listing.articles,
    categories,
    page,
    pageSize: BLOG_PAGE_SIZE,
    hasNext: listing.hasNext,
    hasPrev: listing.hasPrev,
    pageNumbers,
    selectedCategoryId: highlightId,
    month,
    tab,
    monthOptions: monthOptionsFromNow(),
  };
}

