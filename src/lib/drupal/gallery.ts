import { cache } from "react";

import { fetchJsonApi } from "./jsonapi";
import { resolveParagraphMediaImages } from "./media";
import type { DrupalImage, JsonApiResource } from "./types";

/** Images of one gallery_grid paragraph (in Drupal order); [] on error. */
export const getGalleryImages = cache(async (paragraphId: string): Promise<DrupalImage[]> => {
  if (!/^[0-9a-f-]{36}$/i.test(paragraphId)) return [];
  try {
    const doc = await fetchJsonApi<JsonApiResource>(`/paragraph/gallery_grid/${paragraphId}`, {
      include: "field_multiple_images,field_multiple_images.field_media_image",
    });
    const paragraph = Array.isArray(doc.data) ? doc.data[0] : doc.data;
    return paragraph ? resolveParagraphMediaImages(paragraph, doc, "field_multiple_images") : [];
  } catch (error) {
    console.error("gallery fetch failed", paragraphId, error instanceof Error ? error.message : error);
    return [];
  }
});
