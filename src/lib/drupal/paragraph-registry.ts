import type { NodeBundle } from "./config";

/**
 * Single source of truth for Drupal paragraph wiring.
 *
 * When you add a new paragraph (or nest one under another), update THIS file first.
 * `pages.ts` builds includes + the paragraph tree from here; `paragraph-components.tsx`
 * maps types to React. Keeping them aligned stops most "I added a component and
 * the whole site broke" failures (usually a bad JSON:API `include=`).
 *
 * Current Drupal shape:
 *
 *   allpage.field_components children may be:
 *     - paragraph--section
 *         ├─ field_section_content → header_and_description | image_box | button | divider | …
 *         │     ├─ field_cta
 *         │     └─ field_responsive_media → responsive_media
 *         └─ field_responsive_media → responsive_media
 *     - paragraph--image_box → field_responsive_media, field_link
 *     - paragraph--header_and_description → field_cta
 *     - paragraph--divider / button
 *
 *   Site home = allpage whose title is "homepage" (served at `/`).
 */

/** Reusable responsive_image media chain (desktop + mobile → file). */
export const RESPONSIVE_MEDIA_INCLUDE = ["field_desktop", "field_mobile", "field_desktop.field_media_image", "field_mobile.field_media_image", "field_desktop.field_media_video_file", "field_mobile.field_media_video_file", "field_desktop.thumbnail", "field_mobile.thumbnail"] as const;

/** media--image → file chain (field_icon / field_image). */
export const IMAGE_MEDIA_INCLUDE = ["field_media_image"] as const;

function withMediaChain(field: string, chain: readonly string[]): string[] {
  return [field, ...chain.map((path) => `${field}.${path}`)];
}

/**
 * Top-level node → paragraph reference fields, per content type.
 * If a bundle is missing here, its paragraphs will never appear on the page.
 */
export const NODE_PARAGRAPH_FIELDS_BY_BUNDLE: Record<NodeBundle, readonly string[]> = {
  allpage: ["field_components"],
  blogs: [],
};

/**
 * Every relationship field that can hold a *child paragraph*
 * (checked on every parent while building the ParagraphItem tree).
 */
export const NESTED_PARAGRAPH_FIELDS = [
  "field_responsive_media",
  "field_section_content",
  "field_cta",
] as const;

/**
 * Include path suffixes keyed by the *node* paragraph field.
 *
 * Only list paths that exist on at least one allowed target type of that field.
 * An invalid path → Drupal JSON:API 400 → every page for that bundle fails.
 */
export const INCLUDE_SUFFIXES_BY_NODE_FIELD: Record<string, readonly string[]> = {
  field_components: [
    "field_section_content",
    "field_section_content.field_cta",
    ...withMediaChain("field_responsive_media", RESPONSIVE_MEDIA_INCLUDE),
    ...withMediaChain("field_section_content.field_responsive_media", RESPONSIVE_MEDIA_INCLUDE),
  ],
};

/**
 * Paragraph types → media relationship field used for a simple image
 * (stored in DrupalPage.paragraphImages).
 */
export const PARAGRAPH_IMAGE_FIELDS: Record<string, string> = {
  "paragraph--iconbox": "field_icon",
  "paragraph--home_section2": "field_icon",
  "paragraph--investor_section": "field_desktop",
};

/** @deprecated Prefer PARAGRAPH_IMAGE_FIELDS — kept for any field_image consumers. */
export const PARAGRAPH_TYPES_WITH_IMAGE = ["paragraph--herobanner", "paragraph--section"] as const;

/** Paragraph types that are themselves a responsive_image entity. */
export const PARAGRAPH_TYPES_RESPONSIVE_MEDIA = ["paragraph--responsive_media"] as const;

/**
 * Parent types that pull responsive media from a nested
 * `field_responsive_media` → paragraph--responsive_media child.
 */
export const PARAGRAPH_TYPES_WITH_NESTED_RESPONSIVE_MEDIA = [
  "paragraph--section",
  "paragraph--image_box",
] as const;

/** Union of all node paragraph fields (for empty-state detection in the renderer). */
export function allNodeParagraphFields(): string[] {
  return [...new Set(Object.values(NODE_PARAGRAPH_FIELDS_BY_BUNDLE).flat())];
}

/** Build the `include=` query string for a node bundle. */
export function includeForBundle(bundle: NodeBundle): string {
  const nodeFields = NODE_PARAGRAPH_FIELDS_BY_BUNDLE[bundle] ?? [];
  const paths = new Set<string>();

  for (const field of nodeFields) {
    paths.add(field);
    const suffixes = INCLUDE_SUFFIXES_BY_NODE_FIELD[field] ?? [];
    for (const suffix of suffixes) {
      paths.add(`${field}.${suffix}`);
    }
  }

  return [...paths].join(",");
}

export function nodeParagraphFieldsForBundle(bundle: NodeBundle): readonly string[] {
  return NODE_PARAGRAPH_FIELDS_BY_BUNDLE[bundle] ?? [];
}
