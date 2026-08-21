import { NODE_BUNDLES, drupalConfig, type NodeBundle } from "./config";
import { fetchJsonApi } from "./jsonapi";
import { resolveParagraphImage, resolveParagraphMediaImage, resolveResponsiveMedia } from "./media";
import {
  NESTED_PARAGRAPH_FIELDS,
  PARAGRAPH_IMAGE_FIELDS,
  PARAGRAPH_TYPES_RESPONSIVE_MEDIA,
  PARAGRAPH_TYPES_WITH_IMAGE,
  PARAGRAPH_TYPES_WITH_NESTED_RESPONSIVE_MEDIA,
  includeForBundle,
  nodeParagraphFieldsForBundle,
} from "./paragraph-registry";
import type { DrupalImage, DrupalPage, DrupalResponsiveMedia, JsonApiDocument, JsonApiResource, NodeResource, ParagraphItem } from "./types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.replace(/\/+$/, "") || "/";
}

/** allpage titled "homepage" (case-insensitive) is the site root. */
function isSiteHomepage(node: NodeResource): boolean {
  return node.attributes.title.trim().toLowerCase() === "homepage";
}

function isNewsroomNode(node: NodeResource): boolean {
  return node.type === "node--newsroom";
}

function isNewsroomOverviewNode(node: NodeResource): boolean {
  if (node.type !== "node--allpage") return false;
  const title = node.attributes.title.trim().toLowerCase();
  const alias = normalizePath(node.attributes.path?.alias ?? "");
  return title === "newsroom" || title === "newsroom overview" || alias === "/newsroom";
}

function pathsForNode(node: NodeResource): string[] {
  const paths = new Set<string>();
  const alias = node.attributes.path?.alias;
  const titleSlug = slugify(node.attributes.title);
  const nidPath = normalizePath(`/node/${node.attributes.drupal_internal__nid}`);

  if (isSiteHomepage(node)) {
    paths.add("/");
    paths.add(normalizePath(drupalConfig.homepageAlias));
  }

  if (isNewsroomOverviewNode(node)) {
    paths.add("/newsroom");
    if (alias) paths.add(normalizePath(alias));
    paths.add(nidPath);
    return [...paths];
  }

  if (isNewsroomNode(node) && titleSlug) {
    paths.add(normalizePath(`/newsroom/${titleSlug}`));
    if (alias) paths.add(normalizePath(alias));
    paths.add(nidPath);
    return [...paths];
  }

  if (alias) {
    paths.add(normalizePath(alias));
  } else if (titleSlug && !isSiteHomepage(node)) {
    paths.add(normalizePath(`/${titleSlug}`));
  }

  paths.add(nidPath);

  return [...paths];
}

function relationshipIds(data: { type: string; id: string } | Array<{ type: string; id: string }> | null | undefined): string[] {
  if (!data) return [];
  return Array.isArray(data) ? data.map((item) => item.id) : [data.id];
}

function buildParagraphItem(resource: JsonApiResource, byId: Map<string, JsonApiResource>): ParagraphItem {
  const children: ParagraphItem[] = [];

  for (const field of NESTED_PARAGRAPH_FIELDS) {
    const ids = relationshipIds(resource.relationships?.[field]?.data);
    for (const id of ids) {
      const child = byId.get(id);
      if (child) children.push(buildParagraphItem(child, byId));
    }
  }

  return { resource, children };
}

function collectParagraphs(node: NodeResource, document: JsonApiDocument): ParagraphItem[] {
  const included = document.included ?? [];
  const byId = new Map(included.map((item) => [item.id, item]));
  const paragraphs: ParagraphItem[] = [];
  const bundle = node.type.replace("node--", "") as NodeBundle;
  const nodeFields = nodeParagraphFieldsForBundle(bundle);

  for (const field of nodeFields) {
    const ids = relationshipIds(node.relationships?.[field]?.data);
    for (const id of ids) {
      const paragraph = byId.get(id);
      if (paragraph) paragraphs.push(buildParagraphItem(paragraph, byId));
    }
  }

  return paragraphs;
}

function collectImages(items: ParagraphItem[], document: JsonApiDocument, images: Record<string, DrupalImage> = {}): Record<string, DrupalImage> {
  for (const item of items) {
    const iconField = PARAGRAPH_IMAGE_FIELDS[item.resource.type];
    if (iconField) {
      const image = resolveParagraphMediaImage(item.resource, document, iconField);
      if (image) images[item.resource.id] = image;
    } else if ((PARAGRAPH_TYPES_WITH_IMAGE as readonly string[]).includes(item.resource.type)) {
      const image = resolveParagraphImage(item.resource, document);
      if (image) images[item.resource.id] = image;
    }
    collectImages(item.children, document, images);
  }
  return images;
}

function collectResponsiveMedia(items: ParagraphItem[], document: JsonApiDocument, mediaByParagraph: Record<string, DrupalResponsiveMedia> = {}): Record<string, DrupalResponsiveMedia> {
  for (const item of items) {
    if ((PARAGRAPH_TYPES_RESPONSIVE_MEDIA as readonly string[]).includes(item.resource.type)) {
      mediaByParagraph[item.resource.id] = resolveResponsiveMedia(item.resource, document);
    }

    if ((PARAGRAPH_TYPES_WITH_NESTED_RESPONSIVE_MEDIA as readonly string[]).includes(item.resource.type)) {
      const backgroundMedia = item.children.find((child) => child.resource.type === "paragraph--responsive_image");
      if (backgroundMedia) {
        mediaByParagraph[item.resource.id] = resolveResponsiveMedia(backgroundMedia.resource, document);
      }
    }

    collectResponsiveMedia(item.children, document, mediaByParagraph);
  }

  return mediaByParagraph;
}

function toDrupalPage(node: NodeResource, paragraphs: DrupalPage["paragraphs"] = [], paragraphImages: Record<string, DrupalImage> = {}, paragraphResponsiveMedia: Record<string, DrupalResponsiveMedia> = {}): DrupalPage {
  const paths = pathsForNode(node);
  const primary = isSiteHomepage(node)
    ? "/"
    : isNewsroomOverviewNode(node)
      ? "/newsroom"
      : isNewsroomNode(node)
        ? (paths.find((path) => path.startsWith("/newsroom/") && path !== "/newsroom") ?? paths[0] ?? "/")
        : (paths.find((path) => path !== "/" && !path.startsWith("/node/")) ?? paths[0] ?? "/");

  return {
    id: node.id,
    bundle: node.type.replace("node--", ""),
    title: node.attributes.title,
    path: primary,
    paths,
    status: node.attributes.status,
    changed: node.attributes.changed,
    node,
    paragraphs,
    paragraphImages,
    paragraphResponsiveMedia,
  };
}

async function fetchBundleNodes(bundle: NodeBundle): Promise<DrupalPage[]> {
  const document = await fetchJsonApi<NodeResource>(`/node/${bundle}`, {
    include: includeForBundle(bundle),
    "filter[status]": "1",
  });

  const nodes = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];

  return nodes.map((node) => {
    const paragraphs = collectParagraphs(node, document);
    const paragraphImages = collectImages(paragraphs, document);
    const paragraphResponsiveMedia = collectResponsiveMedia(paragraphs, document);
    return toDrupalPage(node, paragraphs, paragraphImages, paragraphResponsiveMedia);
  });
}

export async function getAllPages(): Promise<DrupalPage[]> {
  const pagesByBundle = await Promise.all(NODE_BUNDLES.map((bundle) => fetchBundleNodes(bundle)));

  return pagesByBundle.flat().filter((page) => page.status);
}

export async function getPageByPath(slug: string[] | undefined): Promise<DrupalPage | null> {
  const requestPath = normalizePath(slug?.length ? `/${slug.join("/")}` : "/");
  const pages = await getAllPages();

  return pages.find((page) => page.paths.includes(requestPath)) ?? pages.find((page) => page.path === requestPath) ?? null;
}

/** Pretty paths keyed by Drupal nid (`entity:node/7` → `/about-us`). */
export async function getNodePathMap(): Promise<Record<number, string>> {
  const pages = await getAllPages();
  const map: Record<number, string> = {};

  for (const page of pages) {
    map[page.node.attributes.drupal_internal__nid] = page.path;
  }

  return map;
}

export async function getNewsroomArticles(): Promise<DrupalPage[]> {
  const pages = await getAllPages();
  return pages.filter((page) => page.bundle === "newsroom").sort((a, b) => b.node.attributes.created.localeCompare(a.node.attributes.created));
}

export function isNewsroomOverviewPage(page: DrupalPage): boolean {
  return isNewsroomOverviewNode(page.node) || page.path === "/newsroom";
}

export async function getAllRouteParams(): Promise<Array<{ slug: string[] }>> {
  const pages = await getAllPages();
  const params: Array<{ slug: string[] }> = [];
  for (const page of pages) {
    for (const path of page.paths) {
      if (path === "/") {
        params.push({ slug: [] });
        continue;
      }

      params.push({
        slug: path.replace(/^\//, "").split("/").filter(Boolean),
      });
    }
  }

  const seen = new Set<string>();
  return params.filter((entry) => {
    const key = entry.slug.join("/");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
