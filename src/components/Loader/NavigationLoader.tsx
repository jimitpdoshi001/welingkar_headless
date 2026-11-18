"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./NavigationLoader.module.scss";
import { Logo } from "@/assets/svg/Logos";

function NavigationPathReset({ onReset }: { onReset: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onReset();
  }, [pathname, searchParams, onReset]);

  return null;
}

export function NavigationLoader() {
  const [isLoading, setIsLoading] = useState(false);
  // Fast client navigations finish before this fires, so the full-screen
  // loader only shows for slow pages instead of flashing like a reload.
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleReset = useCallback(() => {
    if (showTimer.current) clearTimeout(showTimer.current);
    showTimer.current = null;
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        targetAttr !== "_blank" &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        const currentUrl = `${window.location.pathname}${window.location.search}`;
        const targetUrl = href.startsWith("http")
          ? href.replace(window.location.origin, "")
          : href;

        // Same page with only a #hash change: no route change, so no loader
        // (it would never be reset and would stay on screen).
        if (targetUrl.split("#")[0] !== currentUrl) {
          if (showTimer.current) clearTimeout(showTimer.current);
          showTimer.current = setTimeout(() => setIsLoading(true), 400);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      if (showTimer.current) clearTimeout(showTimer.current);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <NavigationPathReset onReset={handleReset} />
      </Suspense>
      {isLoading ? (
        <div className={styles.fullScreenLoader} role="progressbar" aria-label="Loading page">
          <div className={styles.loaderCenter}>
            <div className={styles.logoWrapper}>
              <Logo width={330} height={100} />
            </div>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarFill} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NavigationLoader;


