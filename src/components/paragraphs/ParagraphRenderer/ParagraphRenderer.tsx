import { allNodeParagraphFields } from "@/lib/drupal/paragraph-registry";
import type { DrupalPage, ParagraphItem } from "@/lib/drupal";
import clsx from "clsx";
import { paragraphComponents, renderHeroBannerGroup, renderIconBoxGroup, renderImageBoxGroup, renderHomeSection2Group, renderHomeProductsTabGroup, renderHomeSustainabilitySecGroup } from "../paragraph-components";
import styles from "./ParagraphRenderer.module.scss";

type ParagraphRendererProps = {
  page: DrupalPage;
};

const groupedParagraphRenderers = {
  "paragraph--herobanner": renderHeroBannerGroup,
  "paragraph--imagebox": renderImageBoxGroup,
  "paragraph--iconbox": renderIconBoxGroup,
  "paragraph--home_section2": renderHomeSection2Group,
  "paragraph--home_products_tab": renderHomeProductsTabGroup,
  "paragraph--home_sustainability_sec": renderHomeSustainabilitySecGroup,
} as const;

type GroupedParagraphType = keyof typeof groupedParagraphRenderers;

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
  const nodes: React.ReactNode[] = [];

  const renderChildren = (children: ParagraphItem[]) => renderParagraphItems(children, page);

  let index = 0;

  while (index < items.length) {
    const item = items[index];
    const type = item.resource.type;

    if (type === "paragraph--heading_and_description" && items[index + 1]?.resource.type === "paragraph--home_products_tab") {
      const headingItem = item;
      index += 1;
      const group: ParagraphItem[] = [];

      while (index < items.length && items[index].resource.type === "paragraph--home_products_tab") {
        group.push(items[index]);
        index += 1;
      }

      nodes.push(
        renderHomeProductsTabGroup(
          group,
          {
            page,
            renderChildren,
          },
          headingItem,
        ),
      );

      continue;
    }

    const groupRenderer = groupedParagraphRenderers[type as GroupedParagraphType];

    if (groupRenderer) {
      const group: ParagraphItem[] = [];

      while (index < items.length && items[index].resource.type === type) {
        group.push(items[index]);
        index++;
      }

      nodes.push(
        groupRenderer(group, {
          page,
          renderChildren,
        }),
      );

      continue;
    }

    nodes.push(renderParagraphItem(item, page, renderChildren));

    index++;
  }

  return nodes;
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
