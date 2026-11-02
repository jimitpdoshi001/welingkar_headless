"use client";

import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";

/**
 * Tracks a Swiper's arrow state: `locked` (every slide already fits, hide the
 * arrows) plus `atStart` / `atEnd` (disable the arrow that cannot move).
 * Spread `lockEvents` on <Swiper>; Swiper re-checks on resize and slide change.
 */
export function useSwiperLock() {
  const [state, setState] = useState({ locked: false, atStart: true, atEnd: false });
  const sync = (swiper: SwiperClass) =>
    setState({ locked: Boolean(swiper.isLocked), atStart: swiper.isBeginning, atEnd: swiper.isEnd });
  return {
    ...state,
    lockEvents: {
      onInit: sync,
      onLock: sync,
      onUnlock: sync,
      onSlideChange: sync,
      onReachBeginning: sync,
      onReachEnd: sync,
      onFromEdge: sync,
      onResize: sync,
    },
  };
}
