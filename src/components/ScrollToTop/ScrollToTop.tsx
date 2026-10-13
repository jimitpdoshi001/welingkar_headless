"use client";

import style from "./ScrollToTop.module.scss";
import { Whatsapp, Share } from "@/assets/svg/Icons";
import Link from "next/link";
import { useMediaQuery } from "@/util/useMediaQuery";

const ScrollToTop = () => {
  // Tablet and below use the full-width bottom "Enquire Now" bar instead of the
  // vertical side button, so the floating rail stays clear of page content.
  const isCompact = useMediaQuery("(max-width: 1023px)");

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
        {!isCompact && (
          <Link
            className={style.enquireNow}
            href="/enquire-now"
            aria-label="Enquire now"
          >
            Enquire Now
          </Link>
        )}

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

        {/* Mobile only: compact Enquire icon below WhatsApp (replaces the bottom bar). */}
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
      {isCompact && (
        <Link
          className={style.enquireNowMob}
          href="/enquire-now"
          aria-label="Enquire now"
        >
          Enquire Now
        </Link>
      )}
    </>
  );
};

export default ScrollToTop;
