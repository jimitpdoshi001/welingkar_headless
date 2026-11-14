"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import type { FacultyCategory, FacultyMember } from "@/lib/drupal/faculty";
import { DEFAULT_FACULTY_GRID_CATEGORIES, DEFAULT_FACULTY_GRID_MEMBERS } from "@/lib/drupal/faculty";
import type { FacultyGridAttributes, JsonApiResource } from "@/lib/drupal";
import styles from "./FacultyGrid.module.scss";

type FacultyGridProps = {
  paragraph?: JsonApiResource<"paragraph--faculty_grid", FacultyGridAttributes>;
  categories?: FacultyCategory[];
  members?: FacultyMember[];
  initialCount?: number;
  step?: number;
};

// First three tabs, in this order of preference; shown with the Figma labels.
const PRIMARY_TAB_SLUGS = ["deans", "associate-deans", "faculty"];
const TAB_LABELS: Record<string, string> = {
  deans: "Deans",
  "associate-deans": "Associate Deans & Heads",
  faculty: "Faculty",
};

export function FacultyGrid({
  categories = DEFAULT_FACULTY_GRID_CATEGORIES,
  members = DEFAULT_FACULTY_GRID_MEMBERS,
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

  // Close the dropdown on an outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleTabChange = (slug: string) => {
    setActiveTab(slug);
    setVisibleCount(baseCount);
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabsList} role="tablist">
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
              onClick={() => setMenuOpen((open) => !open)}
              className={clsx(styles.tabBtn, specialisationActive && styles.activeTab)}>
              {specialisationActive ? activeSpecialisation?.name : "Specialization / Programs"}
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
              <ul className={styles.menu} role="listbox" aria-label="Specialization">
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
