import type { DrupalPage } from "@/lib/drupal";
import { ParagraphRenderer } from "@/components/paragraphs/ParagraphRenderer/ParagraphRenderer";

type DrupalPageViewProps = {
  page: DrupalPage;
};

export function DrupalPageView({ page }: DrupalPageViewProps) {
  const body = page.node.attributes.body?.processed;
  return (
    <>
      <ParagraphRenderer page={page} />
      {body ? (
        <div
          className="p"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      ) : null}
    </>
  );
}
