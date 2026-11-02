"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Arrow state for a natively scrolling row: whether it overflows, and whether it
 * sits at its first (`atStart`) or last (`atEnd`) position. Updates on scroll and resize;
 * pass `contentKey` (e.g. the active tab) to re-check when the row content changes.
 */
export function useScrollEdges(ref: RefObject<HTMLElement | null>, contentKey?: unknown) {
  const [state, setState] = useState({ overflows: false, atStart: true, atEnd: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const max = el.scrollWidth - el.clientWidth;
      setState({ overflows: max > 1, atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 });
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", check);
      observer.disconnect();
    };
  }, [ref, contentKey]);

  return state;
}
