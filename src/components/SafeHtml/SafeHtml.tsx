import { sanitizeCmsHtml } from "@/lib/security/sanitize-html";

type SafeHtmlProps = {
  html: string;
  className?: string;
};

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const clean = sanitizeCmsHtml(html);
  if (!clean) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
