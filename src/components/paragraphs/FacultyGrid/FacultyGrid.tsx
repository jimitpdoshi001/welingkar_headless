"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import Link from "next/link";
import clsx from "clsx";

import type { FacultyCategory, FacultyMember } from "@/lib/drupal/faculty";
import type { FacultyGridAttributes, JsonApiResource } from "@/lib/drupal";
import styles from "./FacultyGrid.module.scss";

type FacultyGridProps = {
  paragraph?: JsonApiResource<"paragraph--faculty_grid", FacultyGridAttributes>;
  categories?: FacultyCategory[];
  members?: FacultyMember[];
  initialCount?: number;
  step?: number;
};

// Main tabs, in this order; the role tabs (Campus Mumbai) replace "faculty".
const PRIMARY_TAB_SLUGS = ["deans", "associate-deans", "faculty", "associate-professor", "assistant-professor", "registrar", "role-librarian"];
const TAB_LABELS: Record<string, string> = {
  deans: "Dean",
  "associate-deans": "Professor and Senior Professor",
  faculty: "Faculty",
};

export function FacultyGrid({
  categories = [],
  members = [],
  initialCount = 10,
  step = 5,
}: FacultyGridProps) {
  const baseCount = initialCount;

  const [activeTab, setActiveTab] = useState<string>(
    (categories.find((cat) => PRIMARY_TAB_SLUGS.includes(cat.slug)) ?? categories[0])?.slug ?? "",
  );
  const [visibleCount, setVisibleCount] = useState<number>(baseCount);

  const filteredMembers = useMemo(
    () => members.filter((member) => (member.categorySlugs ?? [member.categorySlug]).includes(activeTab)),
    [members, activeTab],
  );

  const visibleMembers = filteredMembers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMembers.length;

  // Tabs 1–3 (Figma labels); every other category goes in the Specialisation dropdown.
  const primaryTabs = categories.filter((cat) => PRIMARY_TAB_SLUGS.includes(cat.slug));
  const specialisations = categories.filter((cat) => !PRIMARY_TAB_SLUGS.includes(cat.slug));
  const activeSpecialisation = specialisations.find((cat) => cat.slug === activeTab);
  const specialisationActive = Boolean(activeSpecialisation);

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // The tab bar scrolls sideways, which would clip an absolutely placed menu,
  // so the menu is fixed to the viewport just under its button.
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  // Tab row scroll hints: arrows show only while there is more row to that side.
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const update = () =>
      setCanScroll({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [members.length]);
  const scrollTabs = (dir: 1 | -1) => tabsRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  const toggleMenu = (button: HTMLButtonElement) => {
    if (menuOpen) return setMenuOpen(false);
    const rect = button.getBoundingClientRect();
    // Keep the menu (max 28rem = 280px wide) inside the screen with a 16px gutter.
    const left = Math.max(16, Math.min(rect.left, window.innerWidth - 280 - 16));
    setMenuPos({ top: rect.bottom + 8, left });
    setMenuOpen(true);
  };

  // Close the dropdown on an outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    // A fixed menu would drift from its button, so close it on any scroll or resize.
    const close = () => setMenuOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, { capture: true, passive: true });
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, { capture: true });
      window.removeEventListener("resize", close);
    };
  }, [menuOpen]);

  const handleTabChange = (slug: string) => {
    setActiveTab(slug);
    setVisibleCount(baseCount);
  };

  // No Drupal faculty: render nothing (no built-in list).
  if (members.length === 0) return null;

  return (
    <div className={styles.root}>
      <div className={styles.tabsWrap}>
      {canScroll.left ? (
        <button type="button" className={clsx(styles.tabsArrow, styles.tabsArrowLeft)} onClick={() => scrollTabs(-1)} aria-label="Scroll tabs left">
          <ArrowLeft width={7} height={9} />
        </button>
      ) : null}
      <div className={styles.tabsList} role="tablist" ref={tabsRef}>
        {primaryTabs.map((cat) => {
          const isActive = cat.slug === activeTab;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(cat.slug)}
              className={clsx(styles.tabBtn, isActive && styles.activeTab)}>
              {TAB_LABELS[cat.slug] ?? cat.name}
            </button>
          );
        })}

        {/* Figma 1726:669: 4th tab "Specialization" opens a dropdown with every other category. */}
        {specialisations.length > 0 ? (
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              onClick={(event) => toggleMenu(event.currentTarget)}
              className={clsx(styles.tabBtn, specialisationActive && styles.activeTab)}>
              {specialisationActive ? activeSpecialisation?.name : "Specialization"}
              <svg
                className={clsx(styles.caret, menuOpen && styles.caretOpen)}
                width="14"
                height="12"
                viewBox="0 0 14 12"
                aria-hidden="true">
                <path
                  d="M7 12L0 0h14z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {menuOpen ? (
              <ul className={styles.menu} style={menuPos ?? undefined} role="listbox" aria-label="Specialization">
                {specialisations.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={cat.slug === activeTab}
                      className={clsx(styles.menuItem, cat.slug === activeTab && styles.menuItemActive)}
                      onClick={() => {
                        handleTabChange(cat.slug);
                        setMenuOpen(false);
                      }}>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
      {canScroll.right ? (
        <button type="button" className={clsx(styles.tabsArrow, styles.tabsArrowRight)} onClick={() => scrollTabs(1)} aria-label="Scroll tabs right">
          <ArrowRight width={7} height={9} />
        </button>
      ) : null}
      </div>

      <div className={styles.grid}>
        {visibleMembers.map((member) => (
          <article
            key={member.id}
            className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={member.image}
                alt={member.imageAlt || member.name}
                className={styles.cardImage}
              />
            </div>

            <div className={styles.cardBody}>
              <h4 className={styles.name}>{member.name}</h4>
              <p className={styles.designation}>{member.designation}</p>

              <Link
                href={member.link || "#"}
                className={styles.readMore}>
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className={styles.loadMoreWrap}>
          <button
            type="button"
            className="btn accent-outline"
            onClick={() => setVisibleCount((count) => count + step)}>
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default FacultyGrid;
