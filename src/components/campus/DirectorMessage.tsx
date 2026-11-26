"use client";

import { useState, type ReactNode } from "react";

import styles from "./CampusPage.module.scss";

/**
 * Director's message (already-sanitized HTML): collapsed = first paragraph, plus the next one
 * when the first is only a bold heading. An underlined "Show more" / "Show less" link toggles the rest.
 */
/** action: shown on the same row as the Show more / Show less link (e.g. the Read More button). */
export function DirectorMessage({ html, className, action }: { html: string; className?: string; action?: ReactNode }) {
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
      <div className={styles.directorActions}>
        {long ? (
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}>
            {open ? "Show less" : "Show more"}
          </button>
        ) : null}
        {action}
      </div>
    </>
  );
}
