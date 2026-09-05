import { jsonApiUrl, absoluteDrupalUrl } from "./jsonapi";
import type { JsonApiDocument, NodeResource } from "./types";

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  image: string | null;
  imageAlt?: string;
  href: string;
  description?: string;
};

export const DEFAULT_NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Welingkar Institute of Management Engages with Healthcare Innovators at DHN City Meetup Mumbai 2026",
    date: "31 July 2026",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    imageAlt: "DHN City Meetup Mumbai 2026",
    href: "#",
    description: "Healthcare leaders and faculty gathered to discuss digital health innovations and collaborative strategy.",
  },
  {
    id: "news-2",
    title: "WeSchool hosts Marketing Legend Prof. V. Kumar on aligning Academia, Industry and the Future Workforce",
    date: "29 July 2026",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Prof. V. Kumar lecture",
    href: "#",
    description: "Renowned scholar shared insights into customer engagement and evolving market dynamics.",
  },
  {
    id: "news-3",
    title: "Nexus Select Malls and Welingkar Institute Launch India's First Post Graduate Program in Mall Management",
    date: "29 July 2026",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Mall Management Program Launch",
    href: "#",
    description: "A landmark partnership to prepare specialized leadership for retail real estate management.",
  },
  {
    id: "news-4",
    title: "WeSchool Students Win National Innovation Challenge at Tech Leadership Summit 2026",
    date: "20 July 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Tech Leadership Summit",
    href: "#",
    description: "Student team presented an AI-driven solution for sustainable urban mobility.",
  },
  {
    id: "news-5",
    title: "Annual Global Business Conclave Explores Sustainable Leadership and Digital Transformation",
    date: "15 July 2026",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Global Business Conclave",
    href: "#",
    description: "Industry stalwarts and alumni shared visions on resilient enterprise growth.",
  },
  {
    id: "news-6",
    title: "WeSchool Inks Strategic MoUs with European Universities for Exchange Programs",
    date: "05 July 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    imageAlt: "International Partnership MoU",
    href: "#",
    description: "Expanding global exposure opportunities for management students across Germany and France.",
  },
];

function formatDate(isoOrRaw: string): string {
  if (!isoOrRaw) return "";
  const date = new Date(isoOrRaw);
  if (Number.isNaN(date.getTime())) return isoOrRaw;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function resolveMediaUrl(node: NodeResource, doc: JsonApiDocument): string | null {
  const relData = node.relationships?.field_media_image?.data || node.relationships?.field_image?.data || node.relationships?.field_thumbnail?.data;
  if (!relData) return null;
  const relId = Array.isArray(relData) ? relData[0]?.id : relData.id;
  if (!relId) return null;
  const file = (doc.included ?? []).find((item) => item.id === relId);
  const uri = file?.attributes?.uri as { url?: string } | undefined;
  return uri?.url ? absoluteDrupalUrl(uri.url) : null;
}

export async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const url = jsonApiUrl("/node/news", {
      include: "field_media_image,field_image,field_thumbnail",
      "filter[status]": "1",
      "page[limit]": "12",
      sort: "-created",
    });

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const document = (await res.json()) as JsonApiDocument<NodeResource>;
      const nodes = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
      if (nodes.length > 0) {
        return nodes.map((node, index) => {
          const rawDate = (node.attributes.field_date as string) || node.attributes.created || "";
          const title = node.attributes.title || `News Item ${index + 1}`;
          const image = resolveMediaUrl(node, document) || DEFAULT_NEWS_ITEMS[index % DEFAULT_NEWS_ITEMS.length].image;
          const alias = node.attributes.path?.alias;
          const href = alias || `/newsroom/${node.id}`;
          const bodyText = (node.attributes.body as { processed?: string; value?: string })?.processed || "";
          const description = bodyText.replace(/<[^>]+>/g, " ").slice(0, 140).trim();

          return {
            id: node.id,
            title,
            date: formatDate(rawDate),
            image,
            imageAlt: title,
            href,
            description,
          };
        });
      }
    }
  } catch {
    // Return default news items silently if fetch fails or network is offline
  }

  return DEFAULT_NEWS_ITEMS;
}
