"use client";

import style from "./ScrollToTop.module.scss";
import { Whatsapp, Share } from "@/assets/svg/Icons";
import Link from "next/link";

const ScrollToTop = () => {
  const contactWhatsapp = () => {
    window.location.href = "https://wa.me/919876543210";
  };

  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // if (!showButton) return null;

  return (
    <>
      <div className={style.FloatingButtons}>
        <div
          className={style.share}
          onClick={sharePage}
          aria-label="Share page"
        >
          <Share />
        </div>

        <div
          className={style.whatsapp}
          onClick={contactWhatsapp}
          aria-label="connect on whatsapp"
        >
          <Whatsapp />
        </div>

        {/* Enquire Now as a compact icon below WhatsApp (replaces the pill/bottom bar). */}
        <Link
          className={style.enquire}
          href="/enquire-now"
          aria-label="Enquire now"
          title="Enquire Now"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M13.5 8.5l2 2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default ScrollToTop;
