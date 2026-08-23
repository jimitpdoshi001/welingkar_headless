"use client";
import { useState } from "react";
import styles from "./Header.module.scss";
import { Logo } from "@/assets/svg/Logos";
import { Search } from "@/assets/svg/Icons";
import Link from "next/link";

const navItems = [
  {
    label: "Who We Are",
    href: "/who-we-are",
  },
  {
    label: "Campus",
    href: "/campus",
  },
  {
    label: "Programmes",
    href: "/programmes",
  },
  {
    label: "Corporate",
    href: "/corporate",
  },
  {
    label: "WeResearch",
    href: "/weresearch",
  },
  {
    label: "WeFactor",
    href: "/wefactor",
  },
];

const headerRow1Right = [
  {
    label: "WeGlobal",
    href: "/",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Media",
    href: "/media",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <Search />
              </span>
              <span>
                <Search />
              </span>
            </span>
          </div>

          <div className={styles.headerRow1Right}>
            {headerRow1Right.map((item) => (
              <a
                className={styles.navItem}
                key={item.href}
                href={item.href}>
                {item.label}
              </a>
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
              {navItems.map((item) => (
                <a
                  className={styles.navItem}
                  key={item.href}
                  href={item.href}>
                  {item.label}
                </a>
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
            {navItems.map((item) => (
              <a
                className={styles.mobileNavItem}
                key={item.href}
                href={item.href}
                onClick={closeMenu}>
                {item.label}
              </a>
            ))}

            <div className={styles.mobileDivider} />

            {headerRow1Right.map((item) => (
              <a
                className={styles.mobileSecondaryItem}
                key={item.href}
                href={item.href}
                onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
