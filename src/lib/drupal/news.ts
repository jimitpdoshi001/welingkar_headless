import { fetchJsonApi, absoluteDrupalUrl } from "./jsonapi";
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
  const rels = [
    node.relationships?.field_thumbnail?.data,
    node.relationships?.field_news_and_press_release_jpg?.data,
    node.relationships?.field_media_image?.data,
    node.relationships?.field_image?.data,
  ];

  for (const relData of rels) {
    if (!relData) continue;
    const relId = Array.isArray(relData) ? relData[0]?.id : relData.id;
    if (!relId) continue;
    const file = (doc.included ?? []).find((item) => item.id === relId);
    if (!file) continue;

    const uri = file.attributes?.uri as { url?: string; value?: string } | string | undefined;
    if (typeof uri === "object" && uri?.url) {
      return absoluteDrupalUrl(uri.url);
    }
    if (typeof uri === "object" && uri?.value) {
      const path = uri.value.replace(/^public:\/\//, "/sites/default/files/");
      return absoluteDrupalUrl(path);
    }
    if (typeof uri === "string") {
      const path = uri.replace(/^public:\/\//, "/sites/default/files/");
      return absoluteDrupalUrl(path);
    }
  }

  const extUrlObj = node.attributes?.field_external_url as { uri?: string; resolvable_uri?: string } | undefined;
  const extUrl = extUrlObj?.uri || extUrlObj?.resolvable_uri;
  if (extUrl && typeof extUrl === "string") {
    return absoluteDrupalUrl(extUrl);
  }

  return null;
}

export async function getNewsItems(limit = 12): Promise<NewsItem[]> {
  try {
    const document = await fetchJsonApi<NodeResource>("/node/news", {
      include: "field_thumbnail,field_news_and_press_release_jpg",
      "filter[status]": "1",
      "page[limit]": String(limit),
      sort: "-created",
    });

    const nodes = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
    return nodes.map((node, index) => {
      const rawDate = (node.attributes.field_date as string) || node.attributes.created || "";
      const title = node.attributes.title || `News Item ${index + 1}`;
      const image = resolveMediaUrl(node, document);
      const alias = node.attributes.path?.alias;
      const extUrlObj = node.attributes.field_external_url as { uri?: string; resolvable_uri?: string } | undefined;
      const extUrl = extUrlObj?.uri || extUrlObj?.resolvable_uri;
      const href = alias ? absoluteDrupalUrl(alias) || alias : extUrl ? absoluteDrupalUrl(extUrl) || extUrl : `/newsroom/${node.id}`;
      const bodyText = (node.attributes.field_news_and_press_release_aut as string) || (node.attributes.body as { processed?: string; value?: string })?.processed || (node.attributes.body as { processed?: string; value?: string })?.value || "";
      const description = bodyText ? bodyText.replace(/<[^>]+>/g, " ").slice(0, 140).trim() : undefined;

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
  } catch (error) {
    console.error("Failed to fetch news items from Drupal:", error);
    return [];
  }
}

