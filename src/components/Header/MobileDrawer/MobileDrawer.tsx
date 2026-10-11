"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import styles from "./MobileDrawer.module.scss";
import { Logo } from "@/assets/svg/Logos";
import { LightMode, DarkMode } from "@/assets/svg/Icons";
import { MAIN_NAV, UTILITY_NAV } from "@/lib/menu/menu-config";

const noopSubscribe = () => () => {};

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
};

// Left slide-in drawer for mobile/tablet. Rendered in a portal so the fixed
// header (which animates with transform) never becomes its containing block.
export function MobileDrawer({ open, onClose, onSearch }: MobileDrawerProps) {
  // True only on the client, so the portal never renders during SSR.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Collapse any open accordion so the drawer reopens in its default state.
  const close = useCallback(() => {
    setOpenGroup(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    // Lock page scroll behind the drawer and restore it on close.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      // Simple focus trap: wrap Tab between first and last focusable element.
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!mounted) return null;

  const handleSearch = () => {
    close();
    onSearch();
  };

  return createPortal(
    <div
      className={`${styles.root} ${open ? styles.rootOpen : ""}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className={styles.backdrop} onClick={close} />

      <div
        ref={panelRef}
        id="mobile-drawer"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className={styles.top}>
          <Link href="/" className={styles.logo} onClick={close}>
            <Logo width={160} height={40} />
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Close menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Opens the existing site search overlay. */}
        <button type="button" className={styles.search} onClick={handleSearch}>
          <span>Search</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15.3 15.3L10.5 10.5M13.5 7.5C13.5 10.5376 11.1376 13 8.1 13C5.06243 13 2.7 10.5376 2.7 7.5C2.7 4.46243 5.06243 2.1 8.1 2.1C11.1376 2.1 13.5 4.46243 13.5 7.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <nav className={styles.nav} aria-label="Mobile">
          {MAIN_NAV.map((item) => {
            if (!item.panel) {
              return (
                <Link
                  key={item.id}
                  className={styles.navItem}
                  href={item.href}
                  onClick={close}
                >
                  {item.label}
                </Link>
              );
            }

            const isOpen = openGroup === item.id;
            const subId = `mobile-sub-${item.id}`;
            return (
              <div key={item.id} className={styles.group}>
                <button
                  type="button"
                  className={styles.navItem}
                  aria-expanded={isOpen}
                  aria-controls={subId}
                  onClick={() => setOpenGroup(isOpen ? null : item.id)}
                >
                  {item.label}
                  <span className={styles.toggle} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div id={subId} className={styles.sub}>
                    <Link
                      className={styles.subLink}
                      href={item.href}
                      onClick={close}
                    >
                      Overview
                    </Link>

                    {item.panel.intro?.map((intro) =>
                      intro.href ? (
                        <Link
                          key={intro.title}
                          className={styles.introCard}
                          href={intro.href}
                          onClick={close}
                        >
                          <strong>{intro.title}</strong>
                          {intro.subtitle ? (
                            <span>{intro.subtitle}</span>
                          ) : null}
                        </Link>
                      ) : null,
                    )}

                    {item.panel.columns.map((col, ci) => (
                      <div key={ci} className={styles.subGroup}>
                        {col.heading ? (
                          col.headingHref ? (
                            <Link
                              className={styles.subHeading}
                              href={col.headingHref}
                              onClick={close}
                            >
                              {col.heading}
                            </Link>
                          ) : (
                            <span className={styles.subHeading}>
                              {col.heading}
                            </span>
                          )
                        ) : null}
                        {col.links.map((link) => (
                          <Link
                            key={`${link.href}-${link.label}`}
                            className={styles.subLink}
                            href={link.href}
                            onClick={close}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className={styles.bottom}>
          {/* TODO: replace "#" with the enquiry link once available. */}
          <Link href="#" className={styles.enquire} onClick={close}>
            Enquire Now
          </Link>

          <div className={styles.utility}>
            {UTILITY_NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.mode}>
            <span>Theme Mode</span>
            <span className={styles.modeToggle}>
              <span className={styles.modeActive}>
                <LightMode />
              </span>
              <span>
                <DarkMode />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
