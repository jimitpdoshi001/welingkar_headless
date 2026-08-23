import { absoluteDrupalUrl } from "./jsonapi";
import type { DrupalImage, DrupalMedia, DrupalResponsiveMedia, JsonApiDocument, JsonApiResource } from "./types";

type RelData = {
  type: string;
  id: string;
  meta?: Record<string, unknown>;
};

function asSingle(data: RelData | RelData[] | null | undefined): RelData | null {
  if (!data) return null;
  return Array.isArray(data) ? (data[0] ?? null) : data;
}

function asMany(data: RelData | RelData[] | null | undefined): RelData[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

function findIncluded(included: JsonApiResource[], type: string, id: string): JsonApiResource | undefined {
  return included.find((item) => item.type === type && item.id === id);
}

function resolveFileMedia(
  included: JsonApiResource[],
  media: JsonApiResource,
  fileRel: RelData,
  altFallback: string,
  kind: "image" | "video",
): DrupalMedia | null {
  const file = findIncluded(included, fileRel.type, fileRel.id);
  const uri = file?.attributes?.uri as { url?: string; value?: string } | undefined;
  const url = absoluteDrupalUrl(uri?.url);
  if (!url) return null;

  const meta = (fileRel.meta ?? {}) as {
    alt?: string | null;
    title?: string | null;
    width?: number;
    height?: number;
  };

  const alt = meta.alt || meta.title || altFallback || (kind === "image" ? "Image" : "Video");

  if (kind === "image") {
    return {
      kind: "image",
      url,
      alt,
      width: meta.width,
      height: meta.height,
    };
  }

  return {
    kind: "video",
    url,
    alt,
    mimeType: typeof file?.attributes?.filemime === "string" ? file.attributes.filemime : undefined,
  };
}

/** Resolve a media entity (image, video, or remote video) from JSON:API includes. */
export function resolveMedia(mediaRel: RelData | null, document: JsonApiDocument): DrupalMedia | null {
  if (!mediaRel) return null;

  const included = document.included ?? [];
  const media = findIncluded(included, mediaRel.type, mediaRel.id);
  if (!media) return null;

  const altFallback = typeof media.attributes.name === "string" ? media.attributes.name : "";

  if (media.type === "media--image") {
    const fileRel = asSingle(media.relationships?.field_media_image?.data) ?? asSingle(media.relationships?.thumbnail?.data);
    if (!fileRel) return null;
    return resolveFileMedia(included, media, fileRel, altFallback, "image");
  }

  if (media.type === "media--video") {
    const fileRel = asSingle(media.relationships?.field_media_video_file?.data) ?? asSingle(media.relationships?.thumbnail?.data);
    if (!fileRel) return null;
    return resolveFileMedia(included, media, fileRel, altFallback, "video");
  }

  if (media.type === "media--remote_video") {
    const url = media.attributes.field_media_oembed_video;
    if (typeof url !== "string" || !url.trim()) return null;

    return {
      kind: "remote_video",
      url: url.trim(),
      alt: altFallback || "Video",
    };
  }

  return null;
}

/** Resolve a media--image on a paragraph relationship field (field_image, field_icon, …). */
export function resolveParagraphMediaImage(paragraph: JsonApiResource, document: JsonApiDocument, fieldName: string): DrupalImage | null {
  const imageRel = asSingle(paragraph.relationships?.[fieldName]?.data);
  if (!imageRel) return null;

  const media = resolveMedia(imageRel, document);
  if (!media || media.kind !== "image") return null;

  return {
    url: media.url,
    alt: media.alt,
    width: media.width,
    height: media.height,
  };
}

/** Resolve a multi-value media--image field (field_multiple_images, …). */
export function resolveParagraphMediaImages(paragraph: JsonApiResource, document: JsonApiDocument, fieldName: string): DrupalImage[] {
  const images: DrupalImage[] = [];

  for (const imageRel of asMany(paragraph.relationships?.[fieldName]?.data)) {
    const media = resolveMedia(imageRel, document);
    if (!media || media.kind !== "image") continue;

    images.push({
      url: media.url,
      alt: media.alt,
      width: media.width,
      height: media.height,
    });
  }

  return images;
}

/** Resolve paragraph.field_image → media → file URL from a JSON:API include tree. */
export function resolveParagraphImage(paragraph: JsonApiResource, document: JsonApiDocument): DrupalImage | null {
  return resolveParagraphMediaImage(paragraph, document, "field_image");
}

/** Resolve field_desktop and field_mobile on a paragraph--responsive_image. */
export function resolveResponsiveMedia(paragraph: JsonApiResource, document: JsonApiDocument): DrupalResponsiveMedia {
  const desktopRel = asSingle(paragraph.relationships?.field_desktop?.data);
  const mobileRel = asSingle(paragraph.relationships?.field_mobile?.data);

  return {
    desktop: resolveMedia(desktopRel, document),
    mobile: resolveMedia(mobileRel, document),
  };
}
