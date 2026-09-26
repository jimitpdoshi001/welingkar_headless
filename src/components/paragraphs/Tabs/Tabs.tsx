import type { JsonApiResource, TabsAttributes } from "@/lib/drupal";
import styles from "./Tabs.module.scss";

type TabsProps = {
  paragraph: JsonApiResource<"paragraph--tabs", TabsAttributes>;
};

type HtmlValue = {
  value?: string;
  processed?: string;
} | null;

function processedHtml(value: HtmlValue | HtmlValue[] | unknown): string | null {
  if (!value) return null;
  if (Array.isArray(value)) {
    const html = value
      .map((item) => item?.processed || item?.value || "")
      .filter(Boolean)
      .join("");
    return html || null;
  }
  if (typeof value === "object" && value) {
    const item = value as HtmlValue;
    return item?.processed || item?.value || null;
  }
  return null;
}

export function Tabs({ paragraph }: TabsProps) {
  const html = processedHtml(paragraph.attributes.field_raw_html);
  if (!html) return null;

  return <div className={styles.panel} dangerouslySetInnerHTML={{ __html: html }} />;
}
