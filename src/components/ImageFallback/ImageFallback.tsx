"use client";

import { useEffect } from "react";
import { logoPlaceholder } from "@/util/placeholder";

/**
 * Global broken-image safety net. When any <img> fails to load (e.g. a CMS
 * image that is not yet uploaded to Drupal), it is swapped for a sensible
 * placeholder instead of a broken-image icon. Accreditation / logo marks get
 * a labelled logo box; everything else gets a neutral campus photo. Once the
 * real asset exists in Drupal the original URL loads and no fallback applies.
 */
const PHOTO_FALLBACKS = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
];

const PORTRAIT_FALLBACK = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80";

const LOGO_HINT = /logo|accredit|acbsp|saqs|nba|nirf|aicte|\bmu\b|university|trophy|award/i;
const PORTRAIT_HINT = /chairman|director|president|principal|dean|ceo|portrait|message|profile/i;

let photoIdx = 0;

function pickFallback(img: HTMLImageElement): string {
  const key = `${img.getAttribute("alt") || ""} ${img.getAttribute("src") || ""}`;
  if (LOGO_HINT.test(key)) return logoPlaceholder(img.getAttribute("alt")?.trim() || "WeSchool");
  if (PORTRAIT_HINT.test(key)) return PORTRAIT_FALLBACK;
  const src = PHOTO_FALLBACKS[photoIdx % PHOTO_FALLBACKS.length];
  photoIdx += 1;
  return src;
}

export function ImageFallback() {
  useEffect(() => {
    const onError = (e: Event) => {
      const img = e.target as HTMLImageElement | null;
      if (!img || img.tagName !== "IMG") return;
      if (img.dataset.fallbackApplied === "1") return;
      img.dataset.fallbackApplied = "1";
      img.removeAttribute("srcset");
      img.src = pickFallback(img);
    };
    // error events don't bubble, but they are observable in the capture phase.
    document.addEventListener("error", onError, true);
    return () => document.removeEventListener("error", onError, true);
  }, []);

  return null;
}

export default ImageFallback;
