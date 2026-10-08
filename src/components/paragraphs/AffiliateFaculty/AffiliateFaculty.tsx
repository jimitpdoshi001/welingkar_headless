"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import type { AffiliateMember, FacultyCategory } from "@/lib/drupal/faculty";
import { AFFILIATE_FACULTY_CATEGORIES, DEFAULT_AFFILIATE_MEMBERS } from "@/lib/drupal/faculty";
import type { AffiliateFacultyAttributes, JsonApiResource } from "@/lib/drupal";
import styles from "./AffiliateFaculty.module.scss";

type AffiliateFacultyProps = {
  paragraph?: JsonApiResource<"paragraph--affiliate_faculty", AffiliateFacultyAttributes>;
  categories?: FacultyCategory[];
  members?: AffiliateMember[];
  initialCount?: number;
  step?: number;
};

const DEFAULT_HEADING = "Affiliate faculty";
const DEFAULT_DESCRIPTION =
  "Our academic prowess is further enriched by the presence of visiting faculty members from India as well as abroad.";

export function AffiliateFaculty({
  paragraph,
  categories = AFFILIATE_FACULTY_CATEGORIES,
  members = DEFAULT_AFFILIATE_MEMBERS,
  initialCount = 15,
  step = 10,
}: AffiliateFacultyProps) {
  const attributes = paragraph?.attributes;
  const heading = attributes?.field_header || DEFAULT_HEADING;
  const description = attributes?.field_description?.value || DEFAULT_DESCRIPTION;
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
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.description}>{description}</p>

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
            </button>
          );
        })}
      </div>

      <div className={styles.grid}>
        {visibleMembers.map((member) => (
          <div
            key={member.id}
            className={styles.item}>
            <h4 className={styles.name}>{member.name}</h4>
            <p className={styles.designation}>{member.designation}</p>

            <Link
              href={member.link || "#"}
              className={styles.readMore}>
              Read More
            </Link>
          </div>
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

export default AffiliateFaculty;
