"use client";

import { useState } from "react";

import toggleStyles from "@/components/pgdm/common/PgdmReadMore.module.scss";

/**
 * Director's message (already-sanitized HTML): collapsed = first paragraph, plus the next one
 * when the first is only a bold heading. Show more / Show less toggles the rest.
 */
export function DirectorMessage({ html, className }: { html: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const paras = html.match(/<p[\s\S]*?<\/p>/gi) ?? [html];
  // "<p><strong>Heading</strong></p>": keep the paragraph after it visible too.
  const isHeading = /^<p[^>]*>\s*<(strong|b)>[\s\S]*?<\/\1>\s*<\/p>$/i.test(paras[0] ?? "");
  const collapsed = isHeading ? 2 : 1;
  const long = paras.length > collapsed;

  return (
    <>
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: (open || !long ? paras : paras.slice(0, collapsed)).join("") }}
      />
      {long ? (
        <button
          type="button"
          className={toggleStyles.toggle}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}>
          {open ? "Show less" : "Show more"}
        </button>
      ) : null}
    </>
  );
}
