"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { SearchPrimary } from "@/assets/svg/Icons";
import type { DrupalSearchHit } from "@/lib/drupal";
import { useSearch } from "./search-context";
import styles from "./SearchOverlay.module.scss";
import { useIsMobile } from "@/util/useMediaQuery";

export const HOME_SEARCH_INPUT_ID = "home-search-input";

type SearchFormProps = {
  inputId: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
  showClose?: boolean;
  onClose?: () => void;
  results: DrupalSearchHit[];
  total: number;
  loading: boolean;
  onShowAll: () => void;
};

function SearchForm({
  inputId,
  inputRef,
  query,
  setQuery,
  onSubmit,
  showClose,
  onClose,
  results,
  total,
  loading,
  onShowAll,
}: SearchFormProps) {
  const isMobile = useIsMobile();
  const trimmed = query.trim();
  const showResults = trimmed.length >= 2;

  return (
    <>
      <div className={clsx(isMobile && "container")}>
        {showClose && onClose ? (
          <button type="button" className={styles.closeBtn} aria-label="Close search" onClick={onClose} />
        ) : null}

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}>
          <label htmlFor={inputId} className={styles.srOnly}>
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
        </form>

        {showResults ? (
          <div className={styles.results} role="listbox" aria-label="Search suggestions">
            {loading && results.length === 0 ? <p className={styles.resultsStatus}>Searching…</p> : null}
            {!loading && results.length === 0 ? <p className={styles.resultsStatus}>No matches found.</p> : null}

            {results.length > 0 ? (
              <ul className={styles.resultsList}>
                {results.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className={styles.resultLink}>
                      <span className={styles.resultType}>{item.typeLabel}</span>
                      <span className={styles.resultTitle}>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {total > 0 ? (
              <button type="button" className={styles.showAll} onClick={onShowAll}>
                Show all results{total > results.length ? ` (${total})` : ""}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const [query, setQuery] = useState("");
  const [bannerTarget, setBannerTarget] = useState<HTMLElement | null>(null);
  const [results, setResults] = useState<DrupalSearchHit[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setResults([]);
      setTotal(0);
    }
  }, [isOpen, isHome]);

  useEffect(() => {
    const keys = query.trim();
    if (keys.length < 2) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(keys)}&limit=5`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Search failed");
        const payload = (await response.json()) as { items?: DrupalSearchHit[]; total?: number };
        setResults(payload.items ?? []);
        setTotal(payload.total ?? 0);
      } catch (error) {
        if ((error as { name?: string }).name === "AbortError") return;
        setResults([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const goToSearchPage = () => {
    const keys = query.trim();
    if (!keys) return;
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(keys)}`);
  };

  const canPreview = query.trim().length >= 2;
  const formProps = {
    inputRef,
    query,
    setQuery,
    onSubmit: goToSearchPage,
    results: canPreview ? results : [],
    total: canPreview ? total : 0,
    loading: canPreview && loading,
    onShowAll: goToSearchPage,
  };

  if (isHome) {
    if (!bannerTarget) return null;

    return createPortal(
      <div className={clsx(styles.overlay, styles.onBanner, styles.alwaysVisible)}>
        <div className={styles.panel}>
          <SearchForm inputId={HOME_SEARCH_INPUT_ID} {...formProps} />
        </div>
      </div>,
      bannerTarget,
    );
  }

  if (!isOpen) return null;

  return createPortal(
    <div
      className={clsx(styles.overlay, styles.fullscreenSearchOverlay)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={generatedId}>
      <button type="button" className={styles.backdrop} aria-label="Close search" onClick={closeSearch} />
      <div className={styles.panel}>
        <SearchForm inputId={generatedId} {...formProps} showClose onClose={closeSearch} />
      </div>
    </div>,
    document.body,
  );
}
