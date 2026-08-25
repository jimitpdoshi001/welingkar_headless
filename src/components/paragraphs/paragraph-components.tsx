import type { DrupalPage, ParagraphItem } from "@/lib/drupal";
import type { ReactNode } from "react";
import { Button } from "./Button/Button";
import { Divider } from "./Divider/Divider";
import { ImageBox } from "./ImageBox/ImageBox";
import { GalleryGrid } from "./GalleryGrid/GalleryGrid";
import { PlacementPartners } from "./PlacementPartners/PlacementPartners";
import { Section } from "./Section/Section";
import { HeadingAndDescription } from "./HeadingAndDescription/HeadingAndDescription";
import { ResponsiveMedia } from "./ResponsiveMedia/ResponsiveMedia";

export type ParagraphRenderContext = {
  page: DrupalPage;
  renderChildren: (children: ParagraphItem[]) => ReactNode;
};

/**
 * Map Drupal `paragraph--*` types → React components.
 */
export const paragraphComponents: Record<string, (item: ParagraphItem, ctx: ParagraphRenderContext) => ReactNode> = {
  "paragraph--section": (item, { page, renderChildren }) => {
    const contentChildren = item.children.filter((child) => child.resource.type !== "paragraph--responsive_media");

    return (
      <Section
        key={item.resource.id}
        paragraph={item.resource as Parameters<typeof Section>[0]["paragraph"]}
        responsiveMedia={page.paragraphResponsiveMedia[item.resource.id] ?? null}>
        {renderChildren(contentChildren)}
      </Section>
    );
  },

  "paragraph--responsive_media": (item, { page }) => {
    const media = page.paragraphResponsiveMedia[item.resource.id];
    if (!media) return null;

    return (
      <ResponsiveMedia
        key={item.resource.id}
        media={media}
      />
    );
  },

  "paragraph--image_box": (item, { page, renderChildren }) => {
    const contentChildren = item.children.filter((child) => child.resource.type !== "paragraph--responsive_media");

    return (
      <ImageBox
        key={item.resource.id}
        paragraph={item.resource as Parameters<typeof ImageBox>[0]["paragraph"]}
        image={page.paragraphImages[item.resource.id] ?? null}
        responsiveMedia={page.paragraphResponsiveMedia[item.resource.id] ?? null}>
        {renderChildren(contentChildren)}
      </ImageBox>
    );
  },

  "paragraph--placement_partners": (item, { page, renderChildren }) => (
    <PlacementPartners
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof PlacementPartners>[0]["paragraph"]}
      images={page.paragraphImageLists[item.resource.id] ?? []}>
      {renderChildren(item.children)}
    </PlacementPartners>
  ),

  "paragraph--gallery_grid": (item, { page, renderChildren }) => (
    <GalleryGrid
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof GalleryGrid>[0]["paragraph"]}
      images={page.paragraphImageLists[item.resource.id] ?? []}>
      {renderChildren(item.children)}
    </GalleryGrid>
  ),

  "paragraph--header_and_description": (item, { renderChildren }) => (
    <HeadingAndDescription
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof HeadingAndDescription>[0]["paragraph"]}>
      {renderChildren(item.children)}
    </HeadingAndDescription>
  ),

  "paragraph--button": (item) => (
    <Button
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof Button>[0]["paragraph"]}
    />
  ),

  "paragraph--divider": (item) => (
    <Divider
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof Divider>[0]["paragraph"]}
    />
  ),
};
