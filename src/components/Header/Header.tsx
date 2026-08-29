"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Logo } from "@/assets/svg/Logos";
import { Search, LightMode, DarkMode } from "@/assets/svg/Icons";
import Link from "next/link";

interface MenuItem {
  id: string;
  title: string;
  url: string;
  weight: string;
  menu: string;
  children: MenuItem[];
}

interface TopMenu {
  primary: MenuItem[];
  secondary: MenuItem[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [topMenu, setTopMenu] = useState<TopMenu>({
    primary: [],
    secondary: [],
  });

  useEffect(() => {
    const fetchTopMenu = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/top-menu`);

        if (!response.ok) {
          throw new Error("Failed to fetch top menu");
        }

        const result = await response.json();

        if (result?.status && result?.data) {
          setTopMenu(result.data);
        }
      } catch (error) {
        console.error("Error fetching top menu:", error);
      }
    };

    fetchTopMenu();
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
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

        {/* Main Header */}
        <div className={styles.headerContent}>
          <div className={styles.leftContent}>
            <Link
              href="/"
              className={styles.logo}>
              <Logo
                width={300}
                height={90}
              />
            </Link>

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
          </div>

          {/* Desktop Search */}
          <div className={styles.rightContent}>
            <span className={styles.searchButton}>
              <Search />
            </span>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}>
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        <nav className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
