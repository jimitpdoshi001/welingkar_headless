import type { DrupalPage, HeroBannerAttributes, IconBoxAttributes, ImageBoxAttributes, JsonApiResource, ParagraphItem, HomeSection2Attributes, HomeSustainabilitySecAttributes } from "@/lib/drupal";
import type { ReactNode } from "react";
import { Button } from "./Button/Button";
import { Divider } from "./Divider/Divider";
import { Section } from "./Section/Section";

export type ParagraphRenderContext = {
  page: DrupalPage;
  renderChildren: (children: ParagraphItem[]) => ReactNode;
};

function tabLabel(attributes: Record<string, unknown>): string {
  const tabText = attributes.field_tab_text;
  if (typeof tabText === "string" && tabText.trim()) return tabText.trim();
  const header = attributes.field_header;
  if (typeof header === "string" && header.trim()) return header.trim();
  return "Tab";
}

function tabDescription(attributes: Record<string, unknown>): string | null {
  const description = attributes.field_description as { processed?: string } | null | undefined;
  return description?.processed?.trim() || null;
}

function tabHeader(attributes: Record<string, unknown>): string | null {
  const header = attributes.field_header;
  return typeof header === "string" && header.trim() ? header.trim() : null;
}

function toHomeProductsTabItem(item: ParagraphItem, ctx: ParagraphRenderContext): HomeProductsTabItem {
  return {
    id: item.resource.id,
    header: tabHeader(item.resource.attributes),
    tabText: tabLabel(item.resource.attributes),
    descriptionHtml: tabDescription(item.resource.attributes),
    responsiveMedia: ctx.page.paragraphResponsiveMedia[item.resource.id] ?? null,
  };
}

function toHeroBannerSlide(item: ParagraphItem, ctx: ParagraphRenderContext): HeroBannerSlide {
  const contentChildren = item.children.filter((child) => child.resource.type !== "paragraph--responsive_image");

  return {
    id: item.resource.id,
    paragraph: item.resource as JsonApiResource<"paragraph--herobanner", HeroBannerAttributes>,
    image: ctx.page.paragraphImages[item.resource.id] ?? null,
    responsiveMedia: ctx.page.paragraphResponsiveMedia[item.resource.id] ?? null,
    children: ctx.renderChildren(contentChildren),
  };
}

function toImageBoxSlide(item: ParagraphItem, ctx: ParagraphRenderContext): ImageBoxSlide {
  const contentChildren = item.children.filter((child) => child.resource.type !== "paragraph--responsive_image");

  return {
    id: item.resource.id,
    paragraph: item.resource as JsonApiResource<"paragraph--imagebox", ImageBoxAttributes>,
    image: ctx.page.paragraphImages[item.resource.id] ?? null,
    responsiveMedia: ctx.page.paragraphResponsiveMedia[item.resource.id] ?? null,
    children: ctx.renderChildren(contentChildren),
  };
}

function toIconBoxSlide(item: ParagraphItem, ctx: ParagraphRenderContext): IconBoxSlide {
  return {
    id: item.resource.id,
    paragraph: item.resource as JsonApiResource<"paragraph--iconbox", IconBoxAttributes>,
    image: ctx.page.paragraphImages[item.resource.id] ?? null,
  };
}

function toHomeSection2Slide(item: ParagraphItem, ctx: ParagraphRenderContext): HomeSection2Slide {
  const contentChildren = item.children.filter((child) => child.resource.type !== "paragraph--responsive_image");

  return {
    id: item.resource.id,
    paragraph: item.resource as JsonApiResource<"paragraph--home_section2", HomeSection2Attributes>,
    image: ctx.page.paragraphImages[item.resource.id] ?? null,
    responsiveMedia: ctx.page.paragraphResponsiveMedia[item.resource.id] ?? null,
    children: ctx.renderChildren(contentChildren),
  };
}

function toHomeSustainabilitySecSlide(item: ParagraphItem, ctx: ParagraphRenderContext): HomeSustainabilitySecSlide {
  const contentChildren = item.children.filter((child) => child.resource.type !== "paragraph--responsive_image");

  return {
    id: item.resource.id,
    paragraph: item.resource as JsonApiResource<"paragraph--home_sustainability_sec", HomeSustainabilitySecAttributes>,
    responsiveMedia: ctx.page.paragraphResponsiveMedia[item.resource.id] ?? null,
    children: ctx.renderChildren(contentChildren),
  };
}

/**
 * Map Drupal `paragraph--*` types → React components.
 */
export const paragraphComponents: Record<string, (item: ParagraphItem, ctx: ParagraphRenderContext) => ReactNode> = {
  "paragraph--herobanner": (item, ctx) => (
    <HeroBanner
      key={item.resource.id}
      slides={[toHeroBannerSlide(item, ctx)]}
    />
  ),

  "paragraph--home_section2": (item, ctx) => (
    <HomeSection2
      key={item.resource.id}
      slides={[toHomeSection2Slide(item, ctx)]}
    />
  ),

  "paragraph--home_products_tab": (item, ctx) => renderHomeProductsTabGroup([item], ctx),

  "paragraph--home_sustainability_sec": (item, ctx) => renderHomeSustainabilitySecGroup([item], ctx),

  "paragraph--imagebox": (item, ctx) => (
    <ImageBox
      key={item.resource.id}
      slides={[toImageBoxSlide(item, ctx)]}
    />
  ),

  "paragraph--iconbox": (item, ctx) => (
    <IconBox
      key={item.resource.id}
      slides={[toIconBoxSlide(item, ctx)]}
    />
  ),

  "paragraph--heading_and_description": (item, { renderChildren }) => (
    <HeadingAndDescription
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof HeadingAndDescription>[0]["paragraph"]}>
      {renderChildren(item.children)}
    </HeadingAndDescription>
  ),

  "paragraph--investor_section": (item, ctx) => (
    <InvestorSection
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof InvestorSection>[0]["paragraph"]}
      image={ctx.page.paragraphImages[item.resource.id] ?? null}
    />
  ),

  "paragraph--newsroom_list": (item) => (
    <NewsroomList
      key={item.resource.id}
      paragraph={item.resource as Parameters<typeof NewsroomList>[0]["paragraph"]}
    />
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

  "paragraph--section": (item, { page, renderChildren }) => {
    const contentChildren = item.children.filter((child) => child.resource.type !== "paragraph--responsive_image");

    return (
      <Section
        key={item.resource.id}
        paragraph={item.resource as Parameters<typeof Section>[0]["paragraph"]}
        image={page.paragraphImages[item.resource.id] ?? null}
        responsiveMedia={page.paragraphResponsiveMedia[item.resource.id] ?? null}>
        {renderChildren(contentChildren)}
      </Section>
    );
  },

  "paragraph--responsive_image": (item, { page }) => {
    const media = page.paragraphResponsiveMedia[item.resource.id];
    if (!media) return null;

    return (
      <ResponsiveMedia
        key={item.resource.id}
        media={media}
      />
    );
  },
};

export function renderHeroBannerGroup(items: ParagraphItem[], ctx: ParagraphRenderContext): ReactNode {
  if (!items.length) return null;
  const slides = items.map((item) => toHeroBannerSlide(item, ctx));
  return (
    <HeroBanner
      key={slides.map((slide) => slide.id).join("-")}
      slides={slides}
    />
  );
}

export function renderImageBoxGroup(items: ParagraphItem[], ctx: ParagraphRenderContext): ReactNode {
  if (!items.length) return null;
  const slides = items.map((item) => toImageBoxSlide(item, ctx));
  return (
    <ImageBox
      key={slides.map((slide) => slide.id).join("-")}
      slides={slides}
    />
  );
}

export function renderIconBoxGroup(items: ParagraphItem[], ctx: ParagraphRenderContext): ReactNode {
  if (!items.length) return null;
  const slides = items.map((item) => toIconBoxSlide(item, ctx));
  return (
    <IconBox
      key={slides.map((slide) => slide.id).join("-")}
      slides={slides}
    />
  );
}

export function renderHomeSection2Group(items: ParagraphItem[], ctx: ParagraphRenderContext): ReactNode {
  if (!items.length) return null;
  const slides = items.map((item) => toHomeSection2Slide(item, ctx));
  return (
    <HomeSection2
      key={slides.map((slide) => slide.id).join("-")}
      slides={slides}
    />
  );
}

export function renderHomeSustainabilitySecGroup(items: ParagraphItem[], ctx: ParagraphRenderContext): ReactNode {
  if (!items.length) return null;
  const slides = items.map((item) => toHomeSustainabilitySecSlide(item, ctx));
  return (
    <HomeSustainabilitySec
      key={slides.map((slide) => slide.id).join("-")}
      slides={slides}
    />
  );
}

/**
 * Home products tabs.
 *
 * Consecutive `home_products_tab` paragraphs under a section are grouped into one tab UI.
 * A preceding (or nested) `heading_and_description` is rendered as a child of the slider.
 *
 * Each tab item uses:
 *   - field_header → overlay heading (updates with the active slide)
 *   - field_tab_text → tab label
 *   - field_description → tab panel
 *   - field_background_media → full background (active tab, falls back to first)
 */
export function renderHomeProductsTabGroup(items: ParagraphItem[], ctx: ParagraphRenderContext, headingItem?: ParagraphItem): ReactNode {
  if (!items.length) return null;

  const first = items[0];
  const backgroundMedia = ctx.page.paragraphResponsiveMedia[first.resource.id] ?? null;
  const tabs: HomeProductsTabItem[] = items.map((item) => toHomeProductsTabItem(item, ctx));

  const nestedHeadings = items.flatMap((item) => item.children.filter((child) => child.resource.type === "paragraph--heading_and_description"));
  const headingItems = [...(headingItem ? [headingItem] : []), ...nestedHeadings].filter((item, index, list) => list.findIndex((entry) => entry.resource.id === item.resource.id) === index);

  return (
    <HomeProductsTab
      key={items.map((item) => item.resource.id).join("-")}
      backgroundMedia={backgroundMedia}
      tabs={tabs}>
      {ctx.renderChildren(headingItems)}
    </HomeProductsTab>
  );
}
