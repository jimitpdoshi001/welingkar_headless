/**
 * Map Drupal `paragraph--*` types → React components.
 *
 * Default mappings are generated from /paragraphs YAML.
 * Add overrides below if a type needs custom grouping props or should not use the generated mapper.
 */
import type { ReactNode } from "react";
import type { DrupalPage, ParagraphItem, TestimonialsDataAttributes } from "@/lib/drupal";
import { generatedParagraphComponents, type ParagraphRenderContext } from "./paragraph-components.generated";
import { HomeCommunitySection, type CommunityTestimonial } from "./HomeCommunitySection/HomeCommunitySection";
import { TabItemsGroup } from "./TabItemsGroup/TabItemsGroup";

export type { ParagraphRenderContext };

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function testimonialsFromChildren(item: ParagraphItem, page: DrupalPage): CommunityTestimonial[] {
  return item.children
    .filter((child) => child.resource.type === "paragraph--testimonials_data")
    .map((child) => {
      const attributes = child.resource.attributes as TestimonialsDataAttributes;
      const image = page.paragraphImages[child.resource.id];
      const quote = stripHtml(attributes.field_description?.processed || attributes.field_description?.value || "");

      return {
        id: child.resource.id,
        quote,
        name: attributes.field_name || "",
        role: attributes.field_designation || "",
        avatar: image?.url || "",
        avatarAlt: image?.alt || attributes.field_name || "",
      };
    });
}

export const paragraphComponents: Record<string, (item: ParagraphItem, ctx: ParagraphRenderContext) => ReactNode> = {
  ...generatedParagraphComponents,
  "paragraph--tab_items_group": (item, { renderChildren }) => {
    const tabs = item.children.map((child) => {
      const attributes = child.resource.attributes as {
        field_tab_title?: string | null;
        field_title?: string | null;
        field_header?: string | null;
      };

      return {
        id: child.resource.id,
        title: attributes.field_tab_title || attributes.field_title || attributes.field_header || "Tab",
      };
    });

    return (
      <TabItemsGroup
        key={item.resource.id}
        paragraph={item.resource as Parameters<typeof TabItemsGroup>[0]["paragraph"]}
        tabs={tabs}>
        {renderChildren(item.children)}
      </TabItemsGroup>
    );
  },

  "paragraph--home_community_section": (item, { page, renderChildren }) => {
    const headerChildren = item.children.filter((child) => child.resource.type !== "paragraph--testimonials_data");

    return (
      <HomeCommunitySection
        key={item.resource.id}
        paragraph={item.resource as Parameters<typeof HomeCommunitySection>[0]["paragraph"]}
        testimonials={testimonialsFromChildren(item, page)}>
        {renderChildren(headerChildren)}
      </HomeCommunitySection>
    );
  },
};
