import { allNodeParagraphFields } from "@/lib/drupal/paragraph-registry";
import type { DrupalPage, ParagraphItem } from "@/lib/drupal";
import clsx from "clsx";
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
  return items.map((item) => renderParagraphItem(item, page, renderChildren));
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
