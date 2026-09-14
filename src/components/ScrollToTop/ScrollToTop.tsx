"use client";

import style from "./ScrollToTop.module.scss";
import { ArrowUp } from "@/assets/svg/Arrows";
import { Whatsapp, Share } from "@/assets/svg/Icons";
import Link from "next/link";
import { useIsMobile } from "@/util/useMediaQuery";

const ScrollToTop = () => {
  const isMobile = useIsMobile();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

        {
          !isMobile && <Link
          className={style.enquireNow}
          href="/enquire-now"
          aria-label="Enquire now">
          Enquire Now
        </Link>
}

        <div
          className={style.share}
          onClick={sharePage}
          aria-label="Share page">
          <Share />
        </div>

        <div
          className={style.scrollToTop}
          onClick={scrollToTop}
          aria-label="Skip to top">
          <ArrowUp />
        </div>

        <div
          className={style.whatsapp}
          onClick={contactWhatsapp}
          aria-label="connect on whatsapp">
          <Whatsapp />
        </div>
      </div>
      {
          isMobile && <Link
          className={style.enquireNowMob}
          href="/enquire-now"
          aria-label="Enquire now">
          Enquire Now
        </Link>
}
    </>
  );
};

export default ScrollToTop;
