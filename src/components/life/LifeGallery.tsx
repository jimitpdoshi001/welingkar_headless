"use client";

import { useState } from "react";
import Link from "next/link";

import type { LifeData } from "@/lib/life/life-data";
import styles from "./LifePage.module.scss";

/**
 * Two years in pictures: the filter tabs switch which images show. Each view
 * renders two marquee rows (top scrolls left->right, bottom right->left).
 */
export function LifeGallery({ gallery }: { gallery: LifeData["gallery"] }) {
  const [active, setActive] = useState(0);

  // Placeholder mapping: "All" shows every image; each other tab rotates the
  // flat list so switching is visible. Swap for category-tagged images from
  // Drupal when available.
  const imgs =
    active === 0
      ? gallery.images
      : gallery.images.map((_, i) => gallery.images[(i + active * 2) % gallery.images.length]);

  const row1 = imgs.slice(0, 5);
  const row2 = imgs.slice(5);
  // Four copies so the -50% translate loops seamlessly.
  const loop = (a: string[]) => [...a, ...a, ...a, ...a];

  return (
    <section className={styles.gallery}>
      <div className={`container ${styles.galleryHead}`}>
        <div className={styles.galleryHeadText}>
          <h2 className={styles.headingLight}>{gallery.heading}</h2>
          <p className={styles.sectionBodyLight}>
            {gallery.subtitle[0]} {gallery.subtitle[1]}
          </p>
          <div
            className={styles.galleryFilters}
            role="tablist">
            {gallery.filters.map((f, i) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`${styles.galleryFilter} ${i === active ? styles.galleryFilterActive : ""}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <Link
          href={gallery.cta.href}
          className={styles.outlineBtn}>
          {gallery.cta.label}
        </Link>
      </div>

      {/* key per tab restarts the marquees cleanly when the images change. */}
      <div className={styles.galleryRows}>
        <div
          key={`r1-${active}`}
          className={`${styles.galleryRow} ${styles.galleryMarquee}`}
          aria-hidden="true">
          {loop(row1).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
            />
          ))}
        </div>
        <div
          key={`r2-${active}`}
          className={`${styles.galleryRow} ${styles.galleryRowOffset}`}
          aria-hidden="true">
          {loop(row2).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LifeGallery;
