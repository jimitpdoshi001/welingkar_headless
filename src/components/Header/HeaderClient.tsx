"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { Logo } from "@/assets/svg/Logos";
import { Search, LightMode, DarkMode } from "@/assets/svg/Icons";
import Link from "next/link";
import { useIsDesktop } from "@/util/useMediaQuery";
import { useOptionalSearch } from "@/components/SearchOverlay/search-context";
import { MAIN_NAV, UTILITY_NAV } from "@/lib/menu/menu-config";
import { MegaMenu } from "./MegaMenu/MegaMenu";

export function HeaderClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [openMobileNav, setOpenMobileNav] = useState<string | null>(null);
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
    const handleScroll = () => setIsScrolled(window.scrollY > 700);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileNav(null);
  };

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
        onMouseLeave={scheduleClose}>
        <div className="container">
          <MegaMenu
            panel={activeItem.panel}
            onNavigate={closeNow}
          />
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
            onMouseLeave={scheduleClose}>
            <Link
              className={`${itemClass} ${isActive ? styles.navItemActive : ""}`}
              href={item.href}
              aria-expanded={item.panel ? item.id === openNav : undefined}>
              <span>{item.label}</span>
              {withCaret && item.panel ? (
                <span
                  className={styles.navPlus}
                  aria-hidden="true">
                  +
                </span>
              ) : null}
            </Link>
          </div>
        );
      })}
    </>
  );

  // Mobile/Tablet ALWAYS uses full site header style (solid white bar)
  const isStickyMode = !isHomePage || isScrolled || isMobile;

  if (isStickyMode) {
    return (
      <header className={`${styles.header} ${styles.headerSticky}`}>
        <div className={styles.stickyTopBar}>
          <div className={styles.stickyTopBarContainer}>
            <div className={styles.stickyPrimaryNav}>
              {UTILITY_NAV.map((item) => (
                <Link
                  className={styles.stickyPrimaryNavItem}
                  key={item.href}
                  href={item.href}>
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
              <Link
                href="/"
                className={styles.stickyLogo}>
                <Logo
                  width={200}
                  height={50}
                />
              </Link>
            </div>

            {isDesktop && <nav className={styles.stickySecondaryNav}>{renderDesktopNav(styles.stickySecondaryNavItem, true)}</nav>}

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
                  className={`${styles.hamburger} ${styles.stickyHamburger} ${isMenuOpen ? styles.open : ""}`}
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

        {megaMenu}

        {isMobile && (
          <nav className={`${styles.mobileMenu} ${styles.stickyMobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
            <div className={styles.mobileMenuInner}>
              {MAIN_NAV.map((item) => {
                const isOpen = openMobileNav === item.id;
                if (!item.panel) {
                  return (
                    <Link
                      className={styles.mobileNavItem}
                      key={item.id}
                      href={item.href}
                      onClick={closeMenu}>
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <div
                    key={item.id}
                    className={styles.mobileNavGroup}>
                    <button
                      type="button"
                      className={styles.mobileNavItem}
                      aria-expanded={isOpen}
                      onClick={() => setOpenMobileNav(isOpen ? null : item.id)}>
                      {item.label}
                      <span className={`${styles.mobileCaret} ${isOpen ? styles.mobileCaretOpen : ""}`} aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div className={styles.mobileSubMenu}>
                        <Link
                          className={styles.mobileSubLink}
                          href={item.href}
                          onClick={closeMenu}>
                          {item.label} — Overview
                        </Link>
                        {item.panel.intro?.map((intro) =>
                          intro.href ? (
                            <Link
                              key={intro.title}
                              className={styles.mobileSubLink}
                              href={intro.href}
                              onClick={closeMenu}>
                              {intro.title}
                            </Link>
                          ) : null
                        )}
                        {item.panel.columns.map((col, ci) => (
                          <div
                            key={ci}
                            className={styles.mobileSubGroup}>
                            {col.heading ? <span className={styles.mobileSubHeading}>{col.heading}</span> : null}
                            {col.links.map((link) => (
                              <Link
                                key={`${link.href}-${link.label}`}
                                className={styles.mobileSubLink}
                                href={link.href}
                                onClick={closeMenu}>
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

              <div className={styles.mobileDivider} />

              {UTILITY_NAV.map((item) => (
                <Link
                  className={styles.mobileSecondaryItem}
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}>
                  {item.label}
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
                    href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.headerRow2}>
              <nav className={styles.navItems}>{renderDesktopNav(styles.navItem, true)}</nav>

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

      {megaMenu}
    </header>
  );
}

export default HeaderClient;
