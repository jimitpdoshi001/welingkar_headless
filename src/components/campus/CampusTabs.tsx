"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./CampusPage.module.scss";

type Tab = { label: string; href: string };

/**
 * Campus section tabs. The active tab follows the section in view (scroll-spy) and
 * updates at once on click. Links that leave the page (e.g. MDP) are never active.
 */
export function CampusTabs({ tabs }: { tabs: Tab[] }) {
  const anchors = tabs.filter((t) => t.href.startsWith("#"));
  const [active, setActive] = useState(anchors[0]?.href ?? "");

  useEffect(() => {
    const ids = anchors.map((t) => t.href);
    const onScroll = () => {
      // Current section: the one whose top passed the header + tab bar (~180px) most recently,
      // i.e. the largest top <= 180. Tab order differs from page order, so compare positions.
      let current = ids[0];
      let best = -Infinity;
      for (const id of ids) {
        const top = document.querySelector(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= 180 && top > best) [best, current] = [top, id];
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // anchors derive from tabs; re-run only when the tab list changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  return (
    <>
      {tabs.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => item.href.startsWith("#") && setActive(item.href)}
          aria-current={item.href === active ? "true" : undefined}
          className={`${styles.inPageLink} ${item.href === active ? styles.inPageActive : ""}`}>
          {item.label}
        </Link>
      ))}
    </>
  );
}
