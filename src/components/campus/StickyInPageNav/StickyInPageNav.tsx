"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StickyInPageNav.module.scss";

type StickyInPageNavProps = {
  /** Class of the nav bar in its normal (in-flow) position. */
  className: string;
  label: string;
  children: React.ReactNode;
};

/**
 * In-page nav that docks under the fixed site header (like the menu) once it
 * scrolls past its original position, and returns to its place back at the top.
 */
export function StickyInPageNav({ className, label, children }: StickyInPageNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const slot = slotRef.current;
      const nav = navRef.current;
      if (!slot || !nav) return;

      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      // The slot keeps the bar's original place; once it has scrolled under the header, the bar may dock.
      const pastOriginal = slot.getBoundingClientRect().top < headerBottom;

      if (pastOriginal) {
        setHeight(nav.offsetHeight);
        setTop(Math.max(headerBottom, 0));
      }
      setStuck(pastOriginal);
    };

    update();
    // Throttle to one update per animation frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={slotRef}
      // Holds the bar's space while it is docked so the page does not jump.
      style={stuck ? { height } : undefined}
      className={stuck ? className : undefined}>
      <nav
        ref={navRef}
        aria-label={label}
        className={stuck ? `${className} ${styles.stuck}` : className}
        style={stuck ? { top } : undefined}>
        {children}
      </nav>
    </div>
  );
}
