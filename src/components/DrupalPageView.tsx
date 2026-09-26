import type { DrupalPage } from "@/lib/drupal";
import { PageCustomCode } from "@/components/PageCustomCode/PageCustomCode";
import { ParagraphRenderer } from "@/components/paragraphs/ParagraphRenderer/ParagraphRenderer";

type DrupalPageViewProps = {
  page: DrupalPage;
};

export function DrupalPageView({ page }: DrupalPageViewProps) {
  const body = page.node.attributes.body?.processed || page.node.attributes.field_body?.processed || page.node.attributes.field_body?.value;
  return (
    <>
      <PageCustomCode page={page} />
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
