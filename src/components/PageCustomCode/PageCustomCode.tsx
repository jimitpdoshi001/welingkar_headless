import type { DrupalPage } from "@/lib/drupal";
import { sanitizeCss } from "@/lib/security/sanitize-html";

type TextField = {
  value?: string;
  processed?: string;
} | null;

type PageCustomCodeProps = {
  page: DrupalPage;
};

function fieldText(field: TextField | undefined): string {
  return (field?.value || field?.processed || "").trim();
}

function extractStyle(source: string): string {
  if (!source) return "";

  const matches = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  const css = matches.length ? matches.map((match) => match[1].trim()).filter(Boolean).join("\n") : source.replace(/<\/?style[^>]*>/gi, "").trim();

  return sanitizeCss(css);
}

export function PageCustomCode({ page }: PageCustomCodeProps) {
  const css = extractStyle(fieldText(page.node.attributes.field_page_css));
  if (!css) return null;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
