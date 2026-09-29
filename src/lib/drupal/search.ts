import { fetchJsonApi } from "./jsonapi";
import type { JsonApiDocument, NodeResource } from "./types";

export const SEARCH_PREVIEW_LIMIT = 5;
export const SEARCH_PAGE_SIZE = 10;
const SEARCH_FETCH_LIMIT = 50;

const SEARCH_BUNDLES = ["allpage", "blogs", "news", "faculty"] as const;

const TYPE_LABEL: Record<string, string> = {
  "node--allpage": "Page",
  "node--blogs": "Blog",
  "node--news": "News",
  "node--faculty": "Faculty",
};

export type DrupalSearchHit = {
  id: string;
  title: string;
  href: string;
  typeLabel: string;
  excerpt: string;
  changed: string;
};

export type DrupalSearchResult = {
  keys: string;
  items: DrupalSearchHit[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
  pageNumbers: number[];
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

function excerptFromNode(node: NodeResource, maxLength = 180): string {
  const body = node.attributes.body?.processed || node.attributes.body?.value || node.attributes.field_body?.processed || node.attributes.field_body?.value || "";
  const text = stripHtml(body);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
}

function nodeHref(node: NodeResource): string {
  const alias = node.attributes.path?.alias;
  const slug = slugify(node.attributes.title);
  const nid = node.attributes.drupal_internal__nid;

  if (node.type === "node--blogs") return alias || `/blogs/${slug || nid}`;
  if (node.type === "node--news") return alias || `/newsroom/${slug || nid}`;
  if (node.type === "node--faculty") return alias || `/faculty/${slug || nid}`;
  if (alias) return alias;
  if (slug) return `/${slug}`;
  return `/node/${nid}`;
}

function scoreHit(title: string, keys: string): number {
  const needle = keys.toLowerCase();
  const hay = title.toLowerCase();
  if (hay === needle) return 3;
  if (hay.startsWith(needle)) return 2;
  if (hay.includes(needle)) return 1;
  return 0;
}

function toHit(node: NodeResource): DrupalSearchHit {
  return {
    id: node.id,
    title: node.attributes.title,
    href: nodeHref(node),
    typeLabel: TYPE_LABEL[node.type] || "Content",
    excerpt: excerptFromNode(node),
    changed: node.attributes.changed || node.attributes.created || "",
  };
}

async function searchBundle(bundle: string, keys: string): Promise<DrupalSearchHit[]> {
  try {
    const document = await fetchJsonApi<NodeResource>(`/node/${bundle}`, {
      "filter[status]": "1",
      "filter[title][operator]": "CONTAINS",
      "filter[title][value]": keys,
      "page[limit]": String(SEARCH_FETCH_LIMIT),
      sort: "-changed",
    }, { cache: "no-store", next: { revalidate: 0 } });

    const nodes = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
    return nodes
      .filter((node) => node.attributes.title.trim().toLowerCase() !== "homepage")
      .map(toHit);
  } catch {
    return [];
  }
}

function pageWindow(current: number, last: number): number[] {
  const start = Math.max(1, current - 2);
  const end = Math.min(last, current + 2);
  const pages: number[] = [];
  for (let i = start; i <= end; i += 1) pages.push(i);
  return pages;
}

export async function searchDrupal(keys: string, options?: { page?: number; pageSize?: number; limit?: number }): Promise<DrupalSearchResult> {
  const query = keys.trim();
  const pageSize = options?.limit ?? options?.pageSize ?? SEARCH_PAGE_SIZE;
  const page = Math.max(1, options?.page ?? 1);

  if (query.length < 2) {
    return {
      keys: query,
      items: [],
      total: 0,
      page: 1,
      pageSize,
      hasNext: false,
      hasPrev: false,
      pageNumbers: [],
    };
  }

  const groups = await Promise.all(SEARCH_BUNDLES.map((bundle) => searchBundle(bundle, query)));
  const seen = new Set<string>();
  const merged = groups
    .flat()
    .filter((hit) => {
      if (seen.has(hit.id)) return false;
      seen.add(hit.id);
      return true;
    })
    .sort((a, b) => {
      const score = scoreHit(b.title, query) - scoreHit(a.title, query);
      if (score !== 0) return score;
      return (b.changed || "").localeCompare(a.changed || "");
    });

  const total = merged.length;
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, lastPage);
  const start = (current - 1) * pageSize;
  const items = merged.slice(start, start + pageSize);

  return {
    keys: query,
    items,
    total,
    page: current,
    pageSize,
    hasNext: current < lastPage,
    hasPrev: current > 1,
    pageNumbers: pageWindow(current, lastPage),
  };
}
