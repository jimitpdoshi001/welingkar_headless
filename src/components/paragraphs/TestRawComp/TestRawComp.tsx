import type {
  JsonApiResource,
  TestRawCompAttributes,
} from "@/lib/drupal";

type TestRawCompProps = {
  paragraph: JsonApiResource<
    "paragraph--test_raw_comp",
    TestRawCompAttributes
  >;
  children?: React.ReactNode;
};

export function TestRawComp({
  paragraph,
  children,
}: TestRawCompProps) {
  const rawHtml =
    paragraph.attributes.field_raw_html?.processed ||
    paragraph.attributes.field_raw_html?.value ||
    null;

  if (!rawHtml && !children) return null;

  return (
    <div>
      {rawHtml && (
        <div
          dangerouslySetInnerHTML={{
            __html: rawHtml,
          }}
        />
      )}
      {children}
    </div>
  );
}
