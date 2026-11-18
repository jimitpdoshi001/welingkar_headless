"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { opensInNewTab } from "@/lib/links/new-tab";

/**
 * Applies the site link rule on click (not by editing the HTML, which would
 * cause hydration mismatches): PDFs and third-party links open in a new tab,
 * site pages open in the same tab even if the CMS marked them "_blank".
 * Ctrl/Cmd/Shift/Alt and middle clicks keep the browser's own behaviour.
 */
export function LinkTargets() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.hasAttribute("download")) return;

      if (opensInNewTab(link)) {
        if (link.target === "_blank") return; // browser already opens a new tab
        event.preventDefault();
        window.open(link.href, "_blank", "noopener,noreferrer");
        return;
      }

      // Site page marked "_blank": keep it in this tab (client navigation).
      if (link.target === "_blank") {
        event.preventDefault();
        const url = new URL(link.href);
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }
    };
    // Capture phase: runs before the link's own handler (Next.js Link).
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}

export default LinkTargets;
