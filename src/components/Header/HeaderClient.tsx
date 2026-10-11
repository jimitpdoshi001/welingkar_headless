"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { Logo } from "@/assets/svg/Logos";
import { Search, LightMode, DarkMode } from "@/assets/svg/Icons";
import Link from "next/link";
import { useIsDesktop } from "@/util/useMediaQuery";
import { useOptionalSearch } from "@/components/SearchOverlay/search-context";
import { MAIN_NAV, UTILITY_NAV } from "@/lib/menu/menu-config";
import { MegaMenu } from "./MegaMenu/MegaMenu";
import { MobileDrawer } from "./MobileDrawer/MobileDrawer";

export function HeaderClient({
  transparentHero = false,
}: { transparentHero?: boolean } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const isDesktop = useIsDesktop();
  const isMobile = !isDesktop;

  const searchContext = useOptionalSearch();

  const handleSearchClick = () => {
    searchContext?.openSearch();
  };

  useEffect(() => {
    const threshold = isHomePage ? 700 : 420;
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Stable reference so the drawer's keydown effect isn't re-bound each render.
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const openPanel = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenNav(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenNav(null), 140);
  };
  const closeNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenNav(null);
  };

  const activeItem = MAIN_NAV.find((item) => item.id === openNav);

  const megaMenu =
    isDesktop && activeItem?.panel ? (
      <div
        className={styles.megaMenuContainer}
        onMouseEnter={() => openPanel(activeItem.id)}
        onMouseLeave={scheduleClose}
      >
        <div className="container">
          <MegaMenu panel={activeItem.panel} onNavigate={closeNow} />
        </div>
      </div>
    ) : null;

  const renderDesktopNav = (itemClass: string, withCaret: boolean) => (
    <>
      {MAIN_NAV.map((item) => {
        const isActive = item.id === openNav || pathname.startsWith(item.href);
        return (
          <div
            key={item.id}
            className={styles.navItemWrap}
            onMouseEnter={() => openPanel(item.id)}
            onMouseLeave={scheduleClose}
          >
            <Link
              className={`${itemClass} ${isActive ? styles.navItemActive : ""}`}
              href={item.href}
              aria-expanded={item.panel ? item.id === openNav : undefined}
            >
              <span>{item.label}</span>
              {withCaret && item.panel ? (
                <span className={styles.navPlus} aria-hidden="true">
                  +
                </span>
              ) : null}
            </Link>
          </div>
        );
      })}
    </>
  );

  // The glass/transparent header is used over a dark hero (homepage, or any
  // page that opts in via `transparentHero`). Mobile/Tablet and the scrolled
  // state always use the solid white bar.
  const useGlassHero = isHomePage || transparentHero;
  const isStickyMode = !useGlassHero || isScrolled || isMobile;
  // On mobile the solid bar is used, but over a dark hero it floats transparent
  // with a white logo + white hamburger (Figma), until scrolled or menu opened.
  const mobileGlass = isMobile && useGlassHero && !isScrolled && !isMenuOpen;

  if (isStickyMode) {
    return (
      <header
        className={`${styles.header} ${styles.headerSticky} ${mobileGlass ? styles.mobileGlass : ""}`}
      >
        <div className={styles.stickyTopBar}>
          <div className={styles.stickyTopBarContainer}>
            <div className={styles.stickyPrimaryNav}>
              {UTILITY_NAV.map((item) => (
                <Link
                  className={styles.stickyPrimaryNavItem}
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className={styles.stickyTopRight}>
              <span className={styles.stickyModeButton}>
                <span className={styles.activeMode}>
                  <LightMode />
                </span>
                <span>
                  <DarkMode />
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.stickyMainBar}>
          <div className={styles.stickyMainBarContainer}>
            <div className={styles.stickyLeftContent}>
              <Link href="/" className={styles.stickyLogo}>
                <Logo width={200} height={50} />
              </Link>
            </div>

            {isDesktop && (
              <nav className={styles.stickySecondaryNav}>
                {renderDesktopNav(styles.stickySecondaryNavItem, true)}
              </nav>
            )}

            <div className={styles.stickyRightContent}>
              {isDesktop && (
                <button
                  type="button"
                  className={styles.stickySearchButton}
                  onClick={handleSearchClick}
                  aria-label="Open search"
                >
                  <Search />
                </button>
              )}

              {isMobile && (
                <button
                  type="button"
                  className={`${styles.hamburger} ${styles.stickyHamburger} ${isMenuOpen ? styles.open : ""}`}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-drawer"
                >
                  <span />
                  <span />
                  <span />
                </button>
              )}
            </div>
          </div>
        </div>

        {megaMenu}

        {isMobile && (
          <MobileDrawer
            open={isMenuOpen}
            onClose={closeMenu}
            onSearch={handleSearchClick}
          />
        )}
      </header>
    );
  }

  // Desktop Homepage Top Banner Glass Header
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.leftContent}>
            <Link href="/" className={styles.logo}>
              <Logo width={220} height={55} />
            </Link>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.headerRow1}>
              <div className={styles.headerRow1Left}>
                <span className={styles.modeButton}>
                  <span>
                    <LightMode />
                  </span>
                  <span>
                    <DarkMode />
                  </span>
                </span>
              </div>

              <div className={styles.headerRow1Right}>
                {UTILITY_NAV.map((item) => (
                  <Link
                    className={styles.navItem}
                    key={item.href}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.headerRow2}>
              <nav className={styles.navItems}>
                {renderDesktopNav(styles.navItem, true)}
              </nav>

              <button
                type="button"
                className={styles.searchButton}
                onClick={handleSearchClick}
                aria-label="Open search"
              >
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>

      {megaMenu}
    </header>
  );
}

export default HeaderClient;
