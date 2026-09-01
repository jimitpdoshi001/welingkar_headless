/**
 * Map Drupal `paragraph--*` types → React components.
 *
 * Default mappings are generated from /paragraphs YAML.
 * Add overrides below if a type needs custom grouping props or should not use the generated mapper.
 */
import { generatedParagraphComponents, type ParagraphRenderContext } from "./paragraph-components.generated";

export type { ParagraphRenderContext };

export const paragraphComponents = {
  ...generatedParagraphComponents,
};
