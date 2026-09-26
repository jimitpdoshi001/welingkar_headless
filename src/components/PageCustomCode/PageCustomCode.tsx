import Script from "next/script";
import type { DrupalPage } from "@/lib/drupal";

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

function extractTaggedContent(tag: "style" | "script", source: string): string {
  if (!source) return "";

  const matches = [...source.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi"))];
  if (matches.length) {
    return matches.map((match) => match[1].trim()).filter(Boolean).join("\n");
  }

  return source.replace(new RegExp(`</?${tag}[^>]*>`, "gi"), "").trim();
}

export function PageCustomCode({ page }: PageCustomCodeProps) {
  const css = extractTaggedContent("style", fieldText(page.node.attributes.field_page_css));
  const js = extractTaggedContent("script", fieldText(page.node.attributes.field_page_js));

  if (!css && !js) return null;

  return (
    <>
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      {js ? (
        <Script id={`page-js-${page.id}`} strategy="afterInteractive">
          {js}
        </Script>
      ) : null}
    </>
  );
}
