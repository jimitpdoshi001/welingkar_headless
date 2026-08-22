"use client";

import { useEffect, useState } from "react";
import style from "./ScrollToTop.module.scss";
import { ArrowUp } from "@/assets/svg/Icons";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      type="button"
      className={style.scrollToTop}
      onClick={scrollToTop}
      aria-label="Skip to top"
    >
      <span className={style.arrow}><ArrowUp /></span>
    </button>
  );
};

export default ScrollToTop;
