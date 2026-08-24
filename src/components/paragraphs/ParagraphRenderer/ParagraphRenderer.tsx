import { allNodeParagraphFields } from "@/lib/drupal/paragraph-registry";
import type { DrupalPage, ParagraphItem } from "@/lib/drupal";
import clsx from "clsx";
import { ImageBoxGroup } from "../ImageBox/ImageBox";
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

    nodes.push(renderParagraphItem(item, page, renderChildren));
    index += 1;
  }

  return nodes;
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
