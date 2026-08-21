"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./SiteHeader.module.scss";
import tatasteelLogoLeftDark from "@/assets/svg/Tata_Steel_Logo-Sold.svg";
import tatasteelLogoRightSolid from "@/assets/svg/TataSolid.svg";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

type MobileNavProps = {
  items: NavItem[];
  onClose: () => void;
};

export function MobileNav({ items, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // Trigger the slide-in on mount (needs a frame so the browser registers
  // the initial "off-screen" position before animating to 0).
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setVisible(false);
    // Waiting for the slide-out transition to finish before unmounting.
    window.setTimeout(onClose, 320);
  };

  const toggleExpanded = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <div className={style.overlayBackdrop} onClick={handleClose}>
      <div
        className={`${style.overlay} ${visible ? style.overlayVisible : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.topBar}>
          <Link href="/" onClick={handleClose} className={style.logoLink}>
            <Image
              src={tatasteelLogoLeftDark}
              alt="Tata Steel"
              width={130}
              height={26}
              style={{ height: "auto", width: "130px" }}
            />
          </Link>
          <div className={style.topBarRight}>
            <Image
              src={tatasteelLogoRightSolid}
              alt="Tata"
              width={70}
              height={16}
              style={{ height: "auto", width: "70px" }}
            />
            <button
              type="button"
              className={style.closeBtn}
              aria-label="Close menu"
              onClick={handleClose}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M1 1L17 17M17 1L1 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={style.searchBar}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64444 17.3333 8.66667 17.3333C6.24444 17.3333 4.19444 16.4944 2.51667 14.8167C0.838889 13.1389 0 11.0889 0 8.66667C0 6.24444 0.838889 4.19444 2.51667 2.51667C4.19444 0.838889 6.24444 0 8.66667 0C11.0889 0 13.1389 0.838889 14.8167 2.51667C16.4944 4.19444 17.3333 6.24444 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.75 14.0833 12.9167 12.9167C14.0833 11.75 14.6667 10.3333 14.6667 8.66667C14.6667 7 14.0833 5.58333 12.9167 4.41667C11.75 3.25 10.3333 2.66667 8.66667 2.66667C7 2.66667 5.58333 3.25 4.41667 4.41667C3.25 5.58333 2.66667 7 2.66667 8.66667C2.66667 10.3333 3.25 11.75 4.41667 12.9167C5.58333 14.0833 7 14.6667 8.66667 14.6667Z"
              fill="#004EE0"
            />
          </svg>

          <input type="text" placeholder="What are you looking for today?" />
          <span>
            <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.15789 14.0526C5.42105 13.3158 5.05263 12.4211 5.05263 11.3684V3.78947C5.05263 2.73684 5.42105 1.84211 6.15789 1.10526C6.89474 0.368421 7.78947 0 8.8421 0C9.89474 0 10.7895 0.368421 11.5263 1.10526C12.2632 1.84211 12.6316 2.73684 12.6316 3.78947V11.3684C12.6316 12.4211 12.2632 13.3158 11.5263 14.0526C10.7895 14.7895 9.89474 15.1579 8.8421 15.1579C7.78947 15.1579 6.89474 14.7895 6.15789 14.0526ZM7.57895 24V20.1158C5.38947 19.8211 3.57895 18.8421 2.14737 17.1789C0.715789 15.5158 0 13.5789 0 11.3684H2.52632C2.52632 13.1158 3.14211 14.6053 4.37368 15.8368C5.60526 17.0684 7.09474 17.6842 8.8421 17.6842C10.5895 17.6842 12.0789 17.0684 13.3105 15.8368C14.5421 14.6053 15.1579 13.1158 15.1579 11.3684H17.6842C17.6842 13.5789 16.9684 15.5158 15.5368 17.1789C14.1053 18.8421 12.2947 19.8211 10.1053 20.1158V24H7.57895ZM9.7421 12.2684C9.98421 12.0263 10.1053 11.7263 10.1053 11.3684V3.78947C10.1053 3.43158 9.98421 3.13158 9.7421 2.88947C9.5 2.64737 9.2 2.52632 8.8421 2.52632C8.48421 2.52632 8.18421 2.64737 7.9421 2.88947C7.7 3.13158 7.57895 3.43158 7.57895 3.78947V11.3684C7.57895 11.7263 7.7 12.0263 7.9421 12.2684C8.18421 12.5105 8.48421 12.6316 8.8421 12.6316C9.2 12.6316 9.5 12.5105 9.7421 12.2684Z"
                fill="#014D95"
              />
            </svg>
          </span>

          <span>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#004EE0" />
              <mask
                id="mask0_3258_5553"
                maskUnits="userSpaceOnUse"
                x="11"
                y="11"
                width="18"
                height="18"
              >
                <rect
                  x="28.7715"
                  y="28.7719"
                  width="16.8421"
                  height="16.8421"
                  transform="rotate(-180 28.7715 28.7719)"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_3258_5553)">
                <path
                  d="M23.2799 19.6491L19.3501 15.7192L20.3501 14.7368L25.9641 20.3508L20.3501 25.9648L19.3501 24.9824L23.2799 21.0526L14.736 21.0526L14.736 19.6491L23.2799 19.6491Z"
                  fill="white"
                />
              </g>
            </svg>
          </span>
        </div>

        <nav className={style.accordionNav} aria-label="Mobile">
          <div className={style.navRow}>
            <div className={style.navRowHead}>
              <Link href="/global" onClick={handleClose}>
                Global
              </Link>
            </div>
          </div>

          {items.map((item) => {
            const hasChildren = !!item.children?.length;
            const isOpen = expanded === item.label;

            return (
              <div key={item.href} className={style.navRow}>
                <div
                  className={style.navRowHead}
                  onClick={() =>
                    hasChildren ? toggleExpanded(item.label) : undefined
                  }
                >
                  {hasChildren ? (
                    <span>{item.label}</span>
                  ) : (
                    <Link href={item.href} onClick={handleClose}>
                      {item.label}
                    </Link>
                  )}
                  {hasChildren && (
                    <svg
                      className={`${style.chevron} ${isOpen ? style.chevronOpen : ""}`}
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {hasChildren && isOpen && (
                  <div className={style.subNav}>
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleClose}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className={style.footerRow}>
          <div className={style.langSelect}>
            <span>EN</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Link href="/accessibility" className={style.footerLink}>
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.82875 3.07125C6.47625 2.71875 6.3 2.295 6.3 1.8C6.3 1.305 6.47625 0.88125 6.82875 0.52875C7.18125 0.17625 7.605 0 8.1 0C8.595 0 9.01875 0.17625 9.37125 0.52875C9.72375 0.88125 9.9 1.305 9.9 1.8C9.9 2.295 9.72375 2.71875 9.37125 3.07125C9.01875 3.42375 8.595 3.6 8.1 3.6C7.605 3.6 7.18125 3.42375 6.82875 3.07125ZM5.4 18V6.3H0V4.5H16.2V6.3H10.8V18H9V12.6H7.2V18H5.4Z"
                fill="#004EE0"
              />
            </svg>

            <span>Accessibility</span>
          </Link>
          <Link href="/contact" className={style.footerLink}>
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.715649 0.290119C0.98859 0.102432 1.31377 0 1.64996 0H13.75C14.0862 0 14.4113 0.102437 14.6843 0.290119L8.0533 5.85964C7.8491 6.03151 7.55073 6.03151 7.34655 5.85964L0.715649 0.290119ZM15.3326 1.1818C15.3766 1.33237 15.4 1.4898 15.4 1.65V9.35C15.4 9.78794 15.2261 10.2073 14.9167 10.5167C14.6073 10.8261 14.1879 11 13.75 11H1.65C1.21206 11 0.792686 10.8261 0.483313 10.5167C0.173941 10.2073 0 9.78794 0 9.35V1.65C0 1.48981 0.0233745 1.33237 0.0673745 1.1818L6.63851 6.70169C7.25245 7.21732 8.14757 7.21732 8.76142 6.70169L15.3326 1.1818Z"
                fill="#004EE0"
              />
            </svg>

            <span>Contact us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
