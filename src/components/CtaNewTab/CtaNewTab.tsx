"use client";

import { useEffect } from "react";

// CTA links = anchors styled as buttons (`.btn`). Page anchors, email and phone
// links stay in the same tab.
const CTA_SELECTOR = "a.btn[href]:not([href^='#']):not([href^='mailto:']):not([href^='tel:'])";

/** Opens a CTA in a new tab, with rel=noopener so the new page can't control this one. */
function markCta(link: HTMLAnchorElement) {
  if (link.target === "_blank") return;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

function markAll(root: ParentNode) {
  root.querySelectorAll<HTMLAnchorElement>(CTA_SELECTOR).forEach(markCta);
}

/**
 * Site-wide rule: every CTA button opens in a new tab. Applied after render
 * (and to CTAs added later by sliders, tabs or menus) so no component changes.
 */
export function CtaNewTab() {
  useEffect(() => {
    markAll(document);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(CTA_SELECTOR)) markCta(node as HTMLAnchorElement);
          markAll(node);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}

export default CtaNewTab;
