"use client";

import React, { useEffect, useRef, useState } from "react";
import type { DrupalPage } from "@/lib/drupal";
import clsx from "clsx";
import style from "./SiteHeader.module.scss";
import Image from "next/image";
import Link from "next/link";
import tatasteelLogoRight from "@/assets/svg/Tata.svg";
import tatasteelLogoRightSolid from "@/assets/svg/TataSolid.svg";
import tatasteelLogoLeft from "@/assets/svg/Tata-Steel.svg";
import tatasteelLogoLeftDark from "@/assets/svg/Tata_Steel_Logo-Sold.svg";
import { Accessibility, AccessibilityDark, ArrowDown, ArrowDownDark, CaptiveGlobalBlack, CaptiveGlobalWhite, MailIcon, MailIconDark, Search, SearchDark } from "@/assets/svg/Icons";
import { useSearch } from "@/components/SearchOverlay/search-context";
import { HOME_SEARCH_INPUT_ID } from "@/components/SearchOverlay/SearchOverlay";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";

/** Past this offset we treat the page as "scrolled away" from the hero (reference: Header-ref scroll UX). */
const SCROLL_TOP_ZONE = 48;
const SCROLL_DELTA = 6;

type SiteHeaderProps = {
  pages: DrupalPage[];
};

type NavItem = {
  href: string;
  label: string;
  children?: {
    href: string;
    label: string;
  }[];
};

type HeaderMenuItem = {
  label: string;
  link: string;
  icon: {
    url: string;
    alt: string;
  };
  target: string;
  submenu: HeaderMenuItem[];
};

const languageOptions = [
  { label: "EN", value: "en" },
  { label: "ES", value: "es" },
  { label: "FR", value: "fr" },
  { label: "DE", value: "de" },
  { label: "IT", value: "it" },
  { label: "PT", value: "pt" },
];
const accessibilityOptions = [
  { label: "Accessibility", value: "accessibility" },
  { label: "Privacy", value: "privacy" },
  { label: "Terms", value: "terms" },
  { label: "Cookies", value: "cookies" },
  { label: "Contact", value: "contact" },
];



export function SiteHeader({ pages }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isOpen: searchOpen, toggleSearch } = useSearch();
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const lastScrollY = useRef(0);


  const onSearchClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.setTimeout(() => {
        document.getElementById(HOME_SEARCH_INPUT_ID)?.focus();
      }, 200);
      return;
    }
    toggleSearch();
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (y <= SCROLL_TOP_ZONE) {
        setHeaderHidden(false);
        setHeaderSolid(false);
        return;
      }

      if (delta > SCROLL_DELTA) {
        setHeaderHidden(true);
      } else if (delta < -SCROLL_DELTA) {
        setHeaderHidden(false);
        setHeaderSolid(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);


useEffect(() => {
  const fetchHeaderMenu = async () => {
    try {

       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(
        `${API_BASE_URL}/api/header-menu`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("HEADER MENU RAW DATA:", responseData);
      const data: HeaderMenuItem[] = responseData.menu || [];
      const mappedNavItems: NavItem[] = data.map((item) => ({
        label: item.label.trim(),
        href: item.link,
        children: item.submenu?.length
          ? item.submenu.map((child) => ({
              label: child.label.trim(),
              href: child.link,
            }))
          : undefined,
      }));
      setNavItems(mappedNavItems);
      console.log("MAPPED NAV ITEMS:", mappedNavItems);
    } catch (error) {
      console.error("HEADER MENU ERROR:", error);
    }
  };
  fetchHeaderMenu();
}, []);



  return (
    <>
      <header className={`${style.header} ${headerSolid ? style.headerSolid : ""} ${headerHidden ? "header-hidden" : ""}`}>
        <div className={`${style.header_container}`}>
          <div className={style.header_logo}>
            <Link href="/">
              <Image
                src={tatasteelLogoLeft}
                alt="Tata Steel"
                width={140}
                className={style.non_solid_item}
              />
              <Image
                src={tatasteelLogoLeftDark}
                alt="Tata Steel"
                width={140}
                className={style.solid_item}
              />
            </Link>
            <div className={style.header_logo_global}>
              {headerSolid ? <CaptiveGlobalBlack /> : <CaptiveGlobalWhite />}
              Global <i className={style.header_logo_global__icon__arrow}></i>
            </div>
          </div>
          <nav
            className={clsx("f", style.nav)}
            aria-label="Main">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={style.right_block}>
            <div className={style.language_selector}>
              <div className={style.lang_btn}>
                <span>EN</span>
                {headerSolid ? <ArrowDownDark /> : <ArrowDown />}
              </div>
            </div>
            <div className={style.accessibility_btn_icon}>{headerSolid ? <AccessibilityDark /> : <Accessibility />}</div>
            <div className={style.accessibility_btn_icon}>{headerSolid ? <MailIconDark /> : <MailIcon />}</div>
            <button
              type="button"
              className={style.accessibility_btn_icon}
              aria-label={isHome ? "Focus search" : searchOpen ? "Close search" : "Open search"}
              aria-expanded={isHome ? undefined : searchOpen}
              onClick={onSearchClick}>
              {headerSolid ? <SearchDark /> : <Search />}
            </button>
           
            <div className={style.logo}>
              <Image
                src={tatasteelLogoRight}
                alt="Tata"
                width={120}
                height={24}
                className={`img-fluid ${style.non_solid_item}`}
              />
              <Image
                src={tatasteelLogoRightSolid}
                alt="Tata"
                width={120}
                height={24}
                className={`img-fluid ${style.solid_item}`}
              />
            </div>

             <button
              type="button"
              className={style.hamburger_btn}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}>
              <span />
              <span />
              <span />
            </button>

          </div>
        </div>
      </header>
      {mobileOpen && <MobileNav items={navItems} onClose={() => setMobileOpen(false)} />}
    </>
  );
}