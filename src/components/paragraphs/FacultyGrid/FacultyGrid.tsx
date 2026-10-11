"use client";

import { useMemo, useState } from "react";
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

export function FacultyGrid({
  categories = DEFAULT_FACULTY_GRID_CATEGORIES,
  members = DEFAULT_FACULTY_GRID_MEMBERS,
  initialCount = 10,
  step = 5,
}: FacultyGridProps) {
  const baseCount = initialCount;

  const [activeTab, setActiveTab] = useState<string>(categories[0]?.slug ?? "");
  const [visibleCount, setVisibleCount] = useState<number>(baseCount);

  const filteredMembers = useMemo(
    () => members.filter((member) => member.categorySlug === activeTab),
    [members, activeTab],
  );

  const visibleMembers = filteredMembers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMembers.length;

  const handleTabChange = (slug: string) => {
    setActiveTab(slug);
    setVisibleCount(baseCount);
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabsList}>
        {categories.map((cat) => {
          const isActive = cat.slug === activeTab;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleTabChange(cat.slug)}
              className={clsx(styles.tabBtn, isActive && styles.activeTab)}>
              {cat.name}
              {/* Figma 1726:669: accent caret marks the Specialisation dropdown tab. */}
              {cat.slug === "specialization" ? (
                <svg
                  className={styles.caret}
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  aria-hidden="true">
                  <path
                    d="M7 12L0 0h14z"
                    fill="currentColor"
                  />
                </svg>
              ) : null}
            </button>
          );
        })}
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
