"use client";

import { useEffect } from "react";

// CTA links = anchors styled as buttons (`.btn`). Page anchors, email and phone
// links stay in the same tab.
const CTA_SELECTOR = "a.btn[href]:not([href^='#']):not([href^='mailto:']):not([href^='tel:'])";

/**
 * Site-wide rule: every CTA button opens in a new tab.
 * Done on click (not by adding target="_blank" to the links), so the page's HTML
 * is never changed while React is still hydrating it (that caused a mismatch).
 * Ctrl/Cmd/Shift/middle clicks keep the browser's own behaviour.
 */
export function CtaNewTab() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.(CTA_SELECTOR) as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;
      // Stops Next.js client navigation (it skips clicks that are already handled).
      event.preventDefault();
      window.open(link.href, "_blank", "noopener,noreferrer");
    };
    // Capture phase: runs before the link's own handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

export default CtaNewTab;
