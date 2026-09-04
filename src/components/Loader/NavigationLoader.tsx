"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
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

  const handleReset = useCallback(() => {
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

        if (targetUrl !== currentUrl) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
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


