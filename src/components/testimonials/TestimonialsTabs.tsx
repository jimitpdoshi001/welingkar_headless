"use client";

import { useState } from "react";

import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import { VideoPopup } from "@/components/campus/VideoPopup/VideoPopup";
import type { TestimonialTab } from "@/lib/testimonials/testimonials-data";
import styles from "./TestimonialsPage.module.scss";

/** Tabs + one-at-a-time slider; only the active tab's track is rendered. */
export function TestimonialsTabs({ tabs }: { tabs: TestimonialTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  if (!active) return null;
  const trackId = `testimonials-${active.id}`;

  return (
    <section className={`container ${styles.slider}`}>
      <div className={styles.head}>
        <div className={styles.tabs} role="tablist" aria-label="Testimonials">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={t.id === active.id}
              aria-controls={trackId}
              className={`${styles.tab} ${t.id === active.id ? styles.tabActive : ""}`}
              onClick={() => setActiveId(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        {/* key: re-measure scroll edges when the track changes. */}
        <ScrollArrows key={trackId} targetId={trackId} />
      </div>

      <ul id={trackId} className={styles.track} role="tabpanel" aria-labelledby={`tab-${active.id}`}>
        {active.items.map((item, i) => (
          <li key={`${item.name}-${i}`} className={styles.slide}>
            <div className={styles.media}>
              {item.video ? (
                <VideoPopup videoUrl={item.video} title={item.name} className={styles.play}>
                  <img src={`/testimonials/${item.image}`} alt={item.name} className={styles.photo} loading="lazy" />
                  <img src="/testimonials/play.svg" alt="" className={styles.playIcon} aria-hidden="true" />
                </VideoPopup>
              ) : (
                <img src={`/testimonials/${item.image}`} alt={item.name} className={styles.photo} loading="lazy" />
              )}
            </div>
            <blockquote className={styles.panel}>
              {item.quote ? <p className={styles.quote}>{item.quote}</p> : null}
              <footer className={styles.author}>
                <cite className={styles.name}>{item.name}</cite>
                {item.role ? <span className={styles.role}>{item.role}</span> : null}
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
