"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import type { FacultyProfile as FacultyProfileData } from "@/lib/drupal/faculty";
import { DEFAULT_FACULTY_PROFILE } from "@/lib/drupal/faculty";
import styles from "./FacultyProfile.module.scss";

type FacultyProfileProps = {
  data?: FacultyProfileData;
};

export function FacultyProfile({ data = DEFAULT_FACULTY_PROFILE }: FacultyProfileProps) {
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0]?.id ?? "");
  const current = data.tabs.find((tab) => tab.id === activeTab) ?? data.tabs[0];

  return (
    <>
      <section className={styles.profileHeader}>
        <div className="container">
          <nav
            className={styles.breadcrumb}
            aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">–</span>
            <Link href="/faculty">Faculty</Link>
          </nav>

          <div className={styles.headerLayout}>
            <div className={styles.imageContainer}>
              <img
                src={data.image}
                alt={data.imageAlt || data.name}
                className={styles.image}
              />
            </div>

            <div className={styles.headerContent}>
              <h1 className={styles.name}>{data.name}</h1>
              <p className={styles.designation}>{data.designation}</p>
              <p className={styles.body}>{data.body}</p>

              {data.link ? (
                <Link
                  href={data.link}
                  className="btn accent">
                  {data.linkLabel || "Read More"}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.detail}`}>
        <div
          className={styles.tabsList}
          role="tablist">
          {data.tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(styles.tabBtn, isActive && styles.activeTab)}>
                {tab.title}
              </button>
            );
          })}
        </div>

        <div className={styles.tabPanel}>
          {current?.blocks.map((block, index) => (
            <div
              key={index}
              className={styles.block}>
              {block.heading ? <h3 className={styles.blockHeading}>{block.heading}</h3> : null}

              {block.layout === "list" ? (
                <ul className={styles.list}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              ) : (
                block.items.map((item, itemIndex) => (
                  <p
                    key={itemIndex}
                    className={styles.text}>
                    {item}
                  </p>
                ))
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FacultyProfile;
