import { allNodeParagraphFields } from "@/lib/drupal/paragraph-registry";
import type { DrupalPage, DrupalResponsiveMedia, ParagraphItem } from "@/lib/drupal";
import clsx from "clsx";
import { HeroBannerGroup, type HeroBannerThumb } from "../HeroBanner/HeroBanner";
import { ImageBoxGroup } from "../ImageBox/ImageBox";
import { MediaBoxWithPopupGroup } from "../MediaBoxWithPopup/MediaBoxWithPopup";
import { paragraphComponents } from "../paragraph-components";
import styles from "./ParagraphRenderer.module.scss";

type ParagraphRendererProps = {
  page: DrupalPage;
};

export function ParagraphRenderer({ page }: ParagraphRendererProps) {
  const hasParagraphReferences = allNodeParagraphFields().some((field) => Boolean(page.node.relationships?.[field]?.data));

  if (!page.paragraphs.length) {
    if (!hasParagraphReferences) return null;

    return (
      <div className={clsx(styles.empty)}>
        <p>Paragraph content could not be loaded from Drupal.</p>

        <p className={styles.hint}>
          Check <code>DRUPAL_USERNAME</code> / <code>DRUPAL_PASSWORD</code> in <code>.env.local</code>, then restart the Next.js server.
        </p>
      </div>
    );
  }

  return <div>{renderParagraphItems(page.paragraphs, page)}</div>;
}

function renderParagraphItems(items: ParagraphItem[], page: DrupalPage): React.ReactNode[] {
  const renderChildren = (children: ParagraphItem[]) => renderParagraphItems(children, page);
  const nodes: React.ReactNode[] = [];
  let index = 0;

  while (index < items.length) {
    const item = items[index];

    if (item.resource.type === "paragraph--image_box") {
      const groupStyle = imageBoxStyleName(item);
      const group: ParagraphItem[] = [];

      while (index < items.length && items[index].resource.type === "paragraph--image_box" && imageBoxStyleName(items[index]) === groupStyle) {
        group.push(items[index]);
        index += 1;
      }

      nodes.push(
        <ImageBoxGroup
          key={group[0].resource.id}
          componentStyle={groupStyle}>
          {group.map((groupedItem) => renderParagraphItem(groupedItem, page, renderChildren))}
        </ImageBoxGroup>,
      );
      continue;
    }

    if (item.resource.type === "paragraph--media_box_with_popup") {
      const group: ParagraphItem[] = [];

      while (index < items.length && items[index].resource.type === "paragraph--media_box_with_popup") {
        group.push(items[index]);
        index += 1;
      }

      nodes.push(
        <MediaBoxWithPopupGroup key={group[0].resource.id}>
          {group.map((groupedItem) => renderParagraphItem(groupedItem, page, renderChildren))}
        </MediaBoxWithPopupGroup>,
      );
      continue;
    }

    if (item.resource.type === "paragraph--hero_banner") {
      const group: ParagraphItem[] = [];

      while (index < items.length && items[index].resource.type === "paragraph--hero_banner") {
        group.push(items[index]);
        index += 1;
      }

      nodes.push(
        <HeroBannerGroup
          key={group[0].resource.id}
          thumbs={heroBannerThumbs(group, page)}>
          {group.map((groupedItem) => renderParagraphItem(groupedItem, page, renderChildren))}
        </HeroBannerGroup>,
      );
      continue;
    }

    nodes.push(renderParagraphItem(item, page, renderChildren));
    index += 1;
  }

  return nodes;
}

function heroBannerThumbs(items: ParagraphItem[], page: DrupalPage): HeroBannerThumb[] {
  return items.map((item) => {
    const headingChild = item.children.find((child) => child.resource.type === "paragraph--header_and_description");
    const heading = headingChild?.resource.attributes.field_header;
    const media = page.paragraphResponsiveMedia[item.resource.id];
    const image = thumbImage(media);

    return {
      id: item.resource.id,
      heading: typeof heading === "string" ? heading : "",
      image,
    };
  });
}

function thumbImage(media: DrupalResponsiveMedia | null | undefined): HeroBannerThumb["image"] {
  const desktop = media?.desktop ?? null;
  const mobile = media?.mobile ?? null;
  const image = desktop?.kind === "image" ? desktop : mobile?.kind === "image" ? mobile : null;

  if (!image || image.kind !== "image") return null;

  return {
    url: image.url,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}

function imageBoxStyleName(item: ParagraphItem): string {
  const style = item.resource.attributes.field_components_style;
  return typeof style === "string" && style ? style : "default";
}

function renderParagraphItem(item: ParagraphItem, page: DrupalPage, renderChildren: (children: ParagraphItem[]) => React.ReactNode[]): React.ReactNode {
  const render = paragraphComponents[item.resource.type];

  if (render) {
    return render(item, {
      page,
      renderChildren,
    });
  }

  return (
    <div
      key={item.resource.id}
      className={styles.fallback}>
      Unsupported paragraph type: {item.resource.type}
      <span className={styles.hint}> Register it in paragraph-components.tsx and paragraph-registry.ts</span>
    </div>
  );
}
