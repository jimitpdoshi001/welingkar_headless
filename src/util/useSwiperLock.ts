"use client";

import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";

/**
 * Tracks whether a Swiper is "locked" (every slide already fits, so nothing
 * can slide). Spread `lockEvents` on <Swiper> and hide the arrows when `locked`.
 * Swiper re-checks on resize, so this follows breakpoint changes too.
 */
export function useSwiperLock() {
  const [locked, setLocked] = useState(false);
  const sync = (swiper: SwiperClass) => setLocked(Boolean(swiper.isLocked));
  return { locked, lockEvents: { onInit: sync, onLock: sync, onUnlock: sync } };
}
