"use client";

import { useState, type ReactNode } from "react";

import styles from "./CampusPage.module.scss";

/**
 * Director's message (already-sanitized HTML): collapsed = first two paragraphs (three when the
 * first is only a bold heading). An underlined "Show more" / "Show less" link at the end of the text toggles the rest.
 * `action` (e.g. the Read More button) is shown under the message.
 */
export function DirectorMessage({ html, className, action }: { html: string; className?: string; action?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const paras = html.match(/<p[\s\S]*?<\/p>/gi) ?? [`<p>${html}</p>`];
  // "<p><strong>Heading</strong></p>" first: show it plus two paragraphs (about the photo's height); else two.
  const isHeading = /^<p[^>]*>\s*<(strong|b)>[\s\S]*?<\/\1>\s*<\/p>$/i.test(paras[0] ?? "");
  const collapsed = isHeading ? 3 : 2;
  const long = paras.length > collapsed;
  const shown = open || !long ? paras : paras.slice(0, collapsed);
  const inner = (p: string) => p.replace(/^<p[^>]*>|<\/p>$/gi, "");

  return (
    <>
      <div className={className}>
        {shown.map((p, i) => (
          <p key={i}>
            <span dangerouslySetInnerHTML={{ __html: inner(p) }} />
            {/* Show more / Show less sits at the end of the last visible paragraph. */}
            {long && i === shown.length - 1 ? (
              <>
                {" "}
                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={open}
                  onClick={() => setOpen((o) => !o)}>
                  {open ? "Show less" : "Show more"}
                </button>
              </>
            ) : null}
          </p>
        ))}
      </div>
      {action ? <div className={styles.directorActions}>{action}</div> : null}
    </>
  );
}
