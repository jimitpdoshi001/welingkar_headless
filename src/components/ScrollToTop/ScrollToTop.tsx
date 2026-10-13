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
            aria-hidden="true">
            {/* Paper-plane "send" icon (Instagram style). */}
            <path
              d="M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8-8-4 19-7Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default ScrollToTop;
