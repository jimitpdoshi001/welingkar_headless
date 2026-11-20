import { cache } from "react";

import { absoluteDrupalUrl, fetchJsonApi } from "./jsonapi";
import type { JsonApiResource } from "./types";
import { toPublicPath } from "@/lib/seo/public-paths";

/**
 * One Drupal node plus its included paragraphs/files, with small readers so
 * page mappers stay short. Pages merge what Drupal returns over their built-in
 * content; on a fetch error the reader is null and the built-in page shows.
 */
export type NodeReader = {
  node: JsonApiResource;
  /** Plain text of a string field (trimmed; "" when empty). */
  text: (entity: JsonApiResource | undefined, field: string) => string;
  /** Rich-text field as plain paragraphs (HTML stripped). */
  paras: (entity: JsonApiResource | undefined, field: string) => string[];
  /** Referenced entities of a relationship field, in order. */
  refs: (entity: JsonApiResource | undefined, field: string) => JsonApiResource[];
  /** Absolute URL of a file field, or of a media field's image. */
  image: (entity: JsonApiResource | undefined, field: string) => string;
  /** First link of a link field: site paths made relative; "" when empty. */
  link: (entity: JsonApiResource | undefined, field: string) => { href: string; title: string };
  /** Every link of a multi-value link field. */
  links: (entity: JsonApiResource | undefined, field: string) => { href: string; title: string }[];
};

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** HTML -> paragraphs: block ends and <br> split text; tags are removed. */
export function htmlParas(html: string): string[] {
  return decode(
    html
      .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim())
    .filter(Boolean);
}

type LinkValue = { uri?: string; title?: string };

function toHref(uri: string): string {
  const href = uri.replace(/^internal:/, "").replace(/^entity:node\//, "/node/");
  // Links typed with this site's own domain stay in-app.
  return toPublicPath(href.replace(/^https?:\/\/welingkar-headless\.vercel\.app(?=\/)/i, ""));
}

/** Fetch a node by type + nid with the given include paths (cached per request). */
export const getNodeReader = cache(async (type: string, nid: number, include: string[]): Promise<NodeReader | null> => {
  let node: JsonApiResource | undefined;
  let included: JsonApiResource[] = [];
  try {
    const doc = await fetchJsonApi<JsonApiResource>(`/node/${type}`, {
      "filter[drupal_internal__nid]": String(nid),
      "filter[status]": "1",
      ...(include.length ? { include: include.join(",") } : {}),
    });
    node = (Array.isArray(doc.data) ? doc.data[0] : doc.data) ?? undefined;
    included = doc.included ?? [];
  } catch (error) {
    console.error("node fetch failed", type, nid, error instanceof Error ? error.message : error);
    return null;
  }
  if (!node) return null;

  const byId = new Map(included.map((r) => [r.id, r]));
  const attr = (e: JsonApiResource | undefined, f: string) => (e?.attributes as Record<string, unknown> | undefined)?.[f];
  const refs = (e: JsonApiResource | undefined, f: string): JsonApiResource[] => {
    const data = e?.relationships?.[f]?.data;
    const list = Array.isArray(data) ? data : data ? [data] : [];
    return list.map((d) => byId.get(d.id)).filter((r): r is JsonApiResource => Boolean(r));
  };
  const fileUrl = (file: JsonApiResource | undefined) =>
    absoluteDrupalUrl((file?.attributes.uri as { url?: string } | undefined)?.url) ?? "";

  const text = (e: JsonApiResource | undefined, f: string) => {
    const v = attr(e, f);
    if (typeof v === "number") return String(v);
    const s = typeof v === "string" ? v : typeof (v as { value?: unknown })?.value === "string" ? (v as { value: string }).value : "";
    return decode(s.replace(/<[^>]+>/g, "")).trim();
  };
  const paras = (e: JsonApiResource | undefined, f: string) => {
    const v = attr(e, f);
    const html = typeof v === "string" ? v : ((v as { value?: string } | null)?.value ?? "");
    return htmlParas(html);
  };
  const image = (e: JsonApiResource | undefined, f: string) => {
    const r = refs(e, f)[0];
    if (!r) return "";
    // Media entity: its image lives in field_media_image.
    return r.type.startsWith("media--") ? fileUrl(refs(r, "field_media_image")[0]) : fileUrl(r);
  };
  const links = (e: JsonApiResource | undefined, f: string) => {
    const v = attr(e, f);
    const list = (Array.isArray(v) ? v : v ? [v] : []) as LinkValue[];
    return list.filter((l) => l?.uri).map((l) => ({ href: toHref(String(l.uri)), title: String(l.title ?? "").trim() }));
  };
  const link = (e: JsonApiResource | undefined, f: string) => links(e, f)[0] ?? { href: "", title: "" };

  return { node, text, paras, refs, image, link, links };
});

/** `value` when non-empty, else `fallback` (strings and arrays). */
export function or<T extends string | unknown[]>(value: T, fallback: T): T {
  return value.length ? value : fallback;
}
