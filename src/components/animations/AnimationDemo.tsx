"use client";

import React, { useState } from "react";
import styles from "./AnimationDemo.module.scss";

export function AnimationDemo() {
  const [dynamicItems, setDynamicItems] = useState<string[]>([]);

  const addDynamicItem = () => {
    setDynamicItems((prev) => [
      ...prev,
      `Dynamic Card #${prev.length + 1} (rendered dynamically via state)`,
    ]);
  };

  return (
    <div className={styles.container}>
      <header className={`${styles.header} animate-fade-in-down`}>
        <h1 className="animate-fade-in-up">GSAP Scroll Animation Utility</h1>
        <p className="animate-fade-in" data-animation-delay="0.2">
          Class-based, SSR-safe scroll animations powered by GSAP &amp; ScrollTrigger in Next.js.
        </p>
      </header>

      {/* Core Fade Animations */}
      <section className={styles.section}>
        <h2 className="animate-fade-in-left">1. Core Directional Fade Animations</h2>
        <div className={styles.grid}>
          <div className={`${styles.card} animate-fade-in`}>
            <h3>animate-fade-in</h3>
            <p>Simple opacity entrance</p>
          </div>
          <div className={`${styles.card} animate-fade-in-up`}>
            <h3>animate-fade-in-up</h3>
            <p>Fades in from 40px below</p>
          </div>
          <div className={`${styles.card} animate-fade-in-down`}>
            <h3>animate-fade-in-down</h3>
            <p>Fades in from 40px above</p>
          </div>
          <div className={`${styles.card} animate-fade-in-left`}>
            <h3>animate-fade-in-left</h3>
            <p>Fades in from 40px left</p>
          </div>
          <div className={`${styles.card} animate-fade-in-right`}>
            <h3>animate-fade-in-right</h3>
            <p>Fades in from 40px right</p>
          </div>
        </div>
      </section>

      {/* Extended Scale & Slide Variants */}
      <section className={styles.section}>
        <h2 className="animate-fade-in-right">2. Scale, Zoom &amp; Slide Variants</h2>
        <div className={styles.grid}>
          <div className={`${styles.card} animate-scale-in`}>
            <h3>animate-scale-in</h3>
            <p>Scales up from 0.9</p>
          </div>
          <div className={`${styles.card} animate-scale-up`}>
            <h3>animate-scale-up</h3>
            <p>Scales up from 0.8</p>
          </div>
          <div className={`${styles.card} animate-zoom-in`}>
            <h3>animate-zoom-in</h3>
            <p>Zooms in from 0.5</p>
          </div>
          <div className={`${styles.card} animate-slide-up`}>
            <h3>animate-slide-up</h3>
            <p>Slides up 60px with opacity</p>
          </div>
          <div className={`${styles.card} animate-slide-left`}>
            <h3>animate-slide-left</h3>
            <p>Slides left 60px with opacity</p>
          </div>
          <div className={`${styles.card} animate-slide-right`}>
            <h3>animate-slide-right</h3>
            <p>Slides right 60px with opacity</p>
          </div>
        </div>
      </section>

      {/* Custom Data Attributes */}
      <section className={styles.section}>
        <h2 className="animate-fade-in-up">3. Custom Configuration via Data Attributes</h2>
        <div className={styles.grid}>
          <div
            className={`${styles.card} animate-fade-in-up`}
            data-animation-duration="1.5"
            data-animation-delay="0.3"
          >
            <h3>Custom Duration &amp; Delay</h3>
            <p>duration: 1.5s, delay: 0.3s</p>
          </div>
          <div
            className={`${styles.card} animate-scale-in`}
            data-animation-ease="back.out(1.7)"
            data-animation-duration="1.0"
          >
            <h3>Custom Easing</h3>
            <p>ease: &quot;back.out(1.7)&quot;</p>
          </div>
          <div
            className={`${styles.card} animate-slide-up`}
            data-animation-start="top 95%"
          >
            <h3>Custom Trigger Point</h3>
            <p>start: &quot;top 95%&quot;</p>
          </div>
        </div>
      </section>

      {/* Stagger Container */}
      <section className={styles.section}>
        <h2 className="animate-fade-in-left">4. Sequential Stagger Container</h2>
        <p className="animate-fade-in">
          Parent container has <code>className=&quot;animate-stagger&quot;</code> and <code>data-animation-stagger=&quot;0.15&quot;</code>:
        </p>
        <div
          className={`${styles.grid} animate-stagger`}
          data-animation-stagger="0.15"
        >
          <div className={`${styles.card} animate-fade-in-up`}>
            <h3>Stagger Child #1</h3>
            <p>Animates 1st</p>
          </div>
          <div className={`${styles.card} animate-scale-in`}>
            <h3>Stagger Child #2</h3>
            <p>Animates 2nd (+0.15s)</p>
          </div>
          <div className={`${styles.card} animate-slide-right`}>
            <h3>Stagger Child #3</h3>
            <p>Animates 3rd (+0.30s)</p>
          </div>
          <div className={`${styles.card} animate-zoom-in`}>
            <h3>Stagger Child #4</h3>
            <p>Animates 4th (+0.45s)</p>
          </div>
        </div>
      </section>

      {/* Dynamic Content Detection */}
      <section className={styles.section}>
        <h2 className="animate-fade-in-up">5. Dynamic Content (MutationObserver)</h2>
        <p className="animate-fade-in">
          Click the button below to dynamically add new cards to the DOM. The utility automatically detects new elements using <code>MutationObserver</code>.
        </p>
        <button
          onClick={addDynamicItem}
          className={`${styles.button} animate-scale-in`}
        >
          + Add Dynamic Item
        </button>

        <div className={styles.grid} style={{ marginTop: "1rem" }}>
          {dynamicItems.map((item, idx) => (
            <div key={idx} className={`${styles.card} animate-fade-in-up`}>
              <h3>{item}</h3>
              <p>Automatically animated on mount!</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
