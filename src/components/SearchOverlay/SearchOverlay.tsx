"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SearchPrimary, Mic, RightArrowWhite, CloseIconWhite } from "@/assets/svg/Icons";
import { useSearch } from "./search-context";
import styles from "./SearchOverlay.module.scss";
import { useIsMobile } from "@/util/useMediaQuery";

export const HOME_SEARCH_INPUT_ID = "home-search-input";

function SearchForm({ inputId, inputRef, query, setQuery, onSubmit, showClose, onClose }: { inputId: string; inputRef: React.RefObject<HTMLInputElement | null>; query: string; setQuery: (value: string) => void; onSubmit: () => void; showClose?: boolean; onClose?: () => void }) {
  const isMobile = useIsMobile();
  return (
    <>
      <div className={clsx(isMobile && "container")}>
        {showClose && onClose ? (
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close search"
            onClick={onClose}>
            <CloseIconWhite />
          </button>
        ) : null}
        <div className={styles.tags}>
          <span className={styles.tag}>Smart mining operations</span>
          <span className={styles.tag}>#WeAlsoMakeTomorrow campaign</span>
          <span className={styles.tag}>Sustainability & ESG goals</span>
        </div>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}>
          <label
            htmlFor={inputId}
            className={styles.srOnly}>
            Search
          </label>
          <span className={styles.searchIcon}>
            <SearchPrimary />
          </span>
          <input
            ref={inputRef}
            id={inputId}
            className={styles.input}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What are you looking for today?"
            autoComplete="off"
          />
          <span className={styles.micIcon}>
            <Mic />
          </span>
          <span className={styles.rightArrowIcon}>
            <RightArrowWhite />
          </span>
        </form>
      </div>
    </>
  );
}

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const [query, setQuery] = useState("");
  const [bannerTarget, setBannerTarget] = useState<HTMLElement | null>(null);

  // Homepage: keep search mounted on the banner by default.
  useEffect(() => {
    if (!isHome) {
      setTimeout(() => {
        setBannerTarget(null);
      }, 0);
      return;
    }

    const syncBanner = () => {
      setBannerTarget(document.getElementById("site-hero"));
    };

    syncBanner();
    const timer = window.setInterval(syncBanner, 250);
    return () => window.clearInterval(timer);
  }, [isHome]);

  // Other pages: modal open/close side effects.
  useEffect(() => {
    if (isHome || !isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [isHome, isOpen, closeSearch]);

  useEffect(() => {
    if (!isOpen && !isHome) {
      setQuery("");
    }
  }, [isOpen, isHome]);

  const submitSearch = () => {
    if (!query.trim()) return;
    // Wire to Drupal /search later.
    if (!isHome) closeSearch();
  };

  // Homepage: always-visible search on banner (no modal backdrop).
  if (isHome) {
    if (!bannerTarget) return null;

    return createPortal(
      <div className={clsx(styles.overlay, styles.onBanner, styles.alwaysVisible)}>
        <div className={styles.panel}>
          <SearchForm
            inputId={HOME_SEARCH_INPUT_ID}
            inputRef={inputRef}
            query={query}
            setQuery={setQuery}
            onSubmit={submitSearch}
          />
        </div>
      </div>,
      bannerTarget,
    );
  }

  // Other pages: popup only when opened from header.
  if (!isOpen) return null;

  return createPortal(
    <div
      className={clsx(styles.overlay, styles.fullscreenSearchOverlay)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={generatedId}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close search"
        onClick={closeSearch}
      />
      <div className={styles.panel}>
        <SearchForm
          inputId={generatedId}
          inputRef={inputRef}
          query={query}
          setQuery={setQuery}
          onSubmit={submitSearch}
          showClose
          onClose={closeSearch}
        />
      </div>
    </div>,
    document.body,
  );
}
