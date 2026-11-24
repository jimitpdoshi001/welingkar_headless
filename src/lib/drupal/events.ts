import { absoluteDrupalUrl, fetchPaginatedJsonApi } from "./jsonapi";
import type { JsonApiResource, NodeResource } from "./types";

export type EventCity = "mumbai" | "bengaluru";

export type EventItem = {
  id: string;
  nid: string;
  slug: string;
  title: string;
  /** ISO "YYYY-MM-DD" (sorting/filtering). */
  isoDate: string;
  /** Display date, e.g. "Nov 04, 2025". */
  date: string;
  year: string;
  city: EventCity | null;
  image: string | null;
  imageAlt: string;
  youtubeUrl: string | null;
  /** Raw Drupal HTML; render only through SafeHtml. */
  descriptionHtml: string;
};

/** "2025-11-04" -> "Nov 04, 2025" (same format as the listing mock). */
function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (!iso || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });
}

/** "Student Induction Program 2025" -> "student-induction-program-2025". */
function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}

// Slugs that must never be event slugs (old-site campus URLs, handled separately).
const RESERVED = new Set(["mumbai", "bengaluru"]);

/**
 * All published events, newest first (field_event_date desc). Empty array on API error,
 * so pages render their empty state instead of failing. Cached via fetchJsonApi (revalidate 300s).
 */
export async function getEvents(): Promise<EventItem[]> {
  try {
    const doc = await fetchPaginatedJsonApi<NodeResource>(
      "/node/events",
      {
        include: "field_event_featured_image",
        "filter[status]": "1",
        sort: "-field_event_date,-drupal_internal__nid",
      },
      50,
    );
    const nodes = (Array.isArray(doc.data) ? doc.data : []) as NodeResource[];
    const files = new Map<string, JsonApiResource>((doc.included ?? []).map((f) => [f.id, f]));
    // Unique, stable slugs: title-based; repeated titles get -2, -3… by node ID (oldest keeps the
    // plain slug, so adding a new event never changes an existing URL). Reserved words get "-event".
    const slugs = new Map<string, string>();
    const used = new Map<string, number>();
    const nidOf = (n: NodeResource) => Number((n.attributes as Record<string, unknown>).drupal_internal__nid ?? 0);
    for (const node of [...nodes].sort((x, y) => nidOf(x) - nidOf(y))) {
      const t = String((node.attributes as Record<string, unknown>).title ?? "").trim();
      let base = slugify(t) || `event-${nidOf(node) || node.id.slice(0, 8)}`;
      if (RESERVED.has(base)) base = `${base}-event`;
      const n = (used.get(base) ?? 0) + 1;
      used.set(base, n);
      slugs.set(node.id, n === 1 ? base : `${base}-${n}`);
    }

    return nodes.map((node) => {
      const a = node.attributes as Record<string, unknown>;
      const str = (k: string) => (typeof a[k] === "string" ? (a[k] as string).trim() : "");
      const title = str("title") || str("field_event_title") || "Event";
      const isoDate = str("field_event_date");

      // Featured image (file field): URL from the included file, alt from the relationship meta.
      const rel = node.relationships?.field_event_featured_image?.data;
      const relOne = Array.isArray(rel) ? rel[0] : rel;
      const file = relOne ? files.get(relOne.id) : undefined;
      const uri = file?.attributes?.uri as { url?: string } | undefined;
      const image = uri?.url ? absoluteDrupalUrl(uri.url) ?? null : null;
      const alt = ((relOne as { meta?: { alt?: string } } | undefined)?.meta?.alt ?? "").trim();

      const slug = slugs.get(node.id) ?? node.id;

      const city = str("field_event_city").toLowerCase();
      const yt = str("field_event_featured_youtube_url");

      return {
        id: node.id,
        nid: String(a.drupal_internal__nid ?? ""),
        slug,
        title,
        isoDate,
        date: formatDate(isoDate),
        year: str("field_event_year") || isoDate.slice(0, 4),
        city: city === "mumbai" || city === "bengaluru" ? city : null,
        image,
        imageAlt: alt || title,
        youtubeUrl: yt || null,
        descriptionHtml: str("field_event_description"),
      };
    });
  } catch (error) {
    console.error("Failed to fetch events from Drupal:", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  return (await getEvents()).find((e) => e.slug === slug) ?? null;
}

/** youtube.com/watch?v=ID or youtu.be/ID -> privacy-friendly embed URL; null if not a YouTube link. */
export function youtubeEmbedUrl(url: string | null): string | null {
  const id = url?.match(/(?:youtu\.be\/|[?&]v=|embed\/)([\w-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;
}
