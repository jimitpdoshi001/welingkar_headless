"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { Logo } from "@/assets/svg/Logos";
import { Search, SearchHeader, LightMode, DarkMode } from "@/assets/svg/Icons";
import Link from "next/link";
import { useIsDesktop } from "@/util/useMediaQuery";
import type { TopMenu } from "@/lib/drupal";
import { useSearch } from "@/components/SearchOverlay/search-context";
import { ArrowDown } from "@/assets/svg/Arrows";

interface HeaderClientProps {
  topMenu: TopMenu;
}

export function HeaderClient({ topMenu }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const isDesktop = useIsDesktop();
  const isMobile = !isDesktop;

  let searchContext: ReturnType<typeof useSearch> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    searchContext = useSearch();
  } catch {
    searchContext = null;
  }

  const handleSearchClick = () => {
    if (searchContext) {
      searchContext.openSearch();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Mobile/Tablet ALWAYS uses full site header style (solid white bar)
  const isStickyMode = !isHomePage || isScrolled || isMobile;

  if (isStickyMode) {
    return (
      <header className={`${styles.header} ${styles.headerSticky}`}>
        {/* Sticky Header Top Green Bar (Desktop only) */}
        <div className={styles.stickyTopBar}>
          <div className={styles.stickyTopBarContainer}>
            <div className={styles.stickyPrimaryNav}>
              {topMenu.primary.map((item) => (
                <Link
                  className={styles.stickyPrimaryNavItem}
                  key={item.id}
                  href={item.url || "#"}>
                  {item.title}
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

        {/* Sticky Header Main White Bar */}
        <div className={styles.stickyMainBar}>
          <div className={styles.stickyMainBarContainer}>
            <div className={styles.stickyLeftContent}>
              <Link
                href="/"
                className={styles.stickyLogo}>
                <Logo
                  width={200}
                  height={50}
                />
              </Link>
            </div>

            {isDesktop && (
              <nav className={styles.stickySecondaryNav}>
                {topMenu.secondary.map((item, index) => (
                  <Link
                    className={`${styles.stickySecondaryNavItem} ${
                      index === 0 ? styles.stickyActiveItem : ""
                    }`}
                    key={item.id}
                    href={item.url || "#"}>
                    <span>{item.title}</span>
                    <ArrowDown width={10} height={6} />
                  </Link>
                ))}
              </nav>
            )}

            <div className={styles.stickyRightContent}>
              <button
                type="button"
                className={styles.stickySearchButton}
                onClick={handleSearchClick}
                aria-label="Open search">
                  <Search />
              </button>

              {isMobile && (
                <button
                  type="button"
                  className={`${styles.hamburger} ${styles.stickyHamburger} ${
                    isMenuOpen ? styles.open : ""
                  }`}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}>
                  <span />
                  <span />
                  <span />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobile && (
          <nav
            className={`${styles.mobileMenu} ${styles.stickyMobileMenu} ${
              isMenuOpen ? styles.mobileMenuOpen : ""
            }`}>
            <div className={styles.mobileMenuInner}>
              {topMenu.secondary.map((item) => (
                <Link
                  className={styles.mobileNavItem}
                  key={item.id}
                  href={item.url || "#"}
                  onClick={closeMenu}>
                  {item.title}
                </Link>
              ))}

              <div className={styles.mobileDivider} />

              {topMenu.primary.map((item) => (
                <Link
                  className={styles.mobileSecondaryItem}
                  key={item.id}
                  href={item.url || "#"}
                  onClick={closeMenu}>
                  {item.title}
                </Link>
              ))}

              <div className={styles.mobileDivider} />

              <div className={styles.mobileModeContainer}>
                <span className={styles.mobileModeText}>Theme Mode</span>
                <span className={styles.modeButton}>
                  <span className={styles.active}>
                    <LightMode />
                  </span>
                  <span>
                    <DarkMode />
                  </span>
                </span>
              </div>
            </div>
          </nav>
        )}
      </header>
    );
  }

  // Desktop Homepage Top Banner Glass Header
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Main Header */}
        <div className={styles.headerContent}>
          <div className={styles.leftContent}>
            <Link
              href="/"
              className={styles.logo}>
              <Logo
                width={220}
                height={55}
              />
            </Link>
          </div>

          <div className={styles.rightContent}>
            {/* Desktop Row 1 */}
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
                {topMenu.primary.map((item) => (
                  <Link
                    className={styles.navItem}
                    key={item.id}
                    href={item.url || "#"}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.headerRow2}>
              {/* Desktop Navigation */}
              <nav className={styles.navItems}>
                {topMenu.secondary.map((item) => (
                  <Link
                    className={styles.navItem}
                    key={item.id}
                    href={item.url || "#"}>
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Desktop Search */}
              <button
                type="button"
                className={styles.searchButton}
                onClick={handleSearchClick}
                aria-label="Open search">
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderClient;



