"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./LogoMarquee.module.scss";

type Logo = { name: string; image: string };

/** One list: logos repeated until at least 12, so it is wider than the screen. */
const loopList = (logos: Logo[]) => Array.from({ length: Math.ceil(12 / logos.length) }, () => logos).flat();

/** Auto-scroll speed in px per second, and how far one arrow click moves. */
const SPEED = 40;
const STEP = 320;

/**
 * Continuous logo carousel (home "Our Placement Partners" look) with prev/next
 * arrows. The list is rendered twice; the track scrolls left and wraps by one
 * list width, so the loop is seamless. It pauses while a logo is hovered, and
 * an arrow click glides one step either way.
 */
export function LogoMarquee({ logos }: { logos: Logo[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const state = useRef({ x: 0, paused: false, tweenFrom: 0, tweenTo: 0, tweenStart: -1 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;
    // One list width = half the track (two copies), including the gap between copies.
    const loopWidth = () => (track.scrollWidth + parseFloat(getComputedStyle(track).columnGap || "0")) / 2;
    const wrap = (x: number) => {
      const w = loopWidth();
      if (!w) return x;
      return ((x % w) - w) % w; // keep x in (-w, 0]
    };
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (s.tweenStart >= 0) {
        // Arrow glide: ease-out over 450ms.
        const t = Math.min((now - s.tweenStart) / 450, 1);
        s.x = s.tweenFrom + (s.tweenTo - s.tweenFrom) * (1 - (1 - t) ** 3);
        if (t === 1) s.tweenStart = -1;
      } else if (!s.paused) {
        s.x -= (reduced ? SPEED / 4 : SPEED) * dt;
      }
      s.x = wrap(s.x);
      track.style.transform = `translate3d(${s.x}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [logos.length]);

  const move = (dir: 1 | -1) => {
    const s = state.current;
    s.tweenFrom = s.x;
    s.tweenTo = s.x - dir * STEP;
    s.tweenStart = performance.now();
  };

  if (!logos.length) return null;
  const list = loopList(logos);
  return (
    <div className={styles.root}>
      <div className={styles.marquee}>
        <ul
          ref={trackRef}
          className={styles.track}
          onPointerOver={(e) => (state.current.paused = !!(e.target as HTMLElement).closest("li"))}
          onPointerLeave={() => (state.current.paused = false)}>
          {[...list, ...list].map((logo, i) => (
            <li
              key={`${logo.image}-${i}`}
              className={styles.logo}
              // Second copy only completes the loop: hidden from screen readers.
              aria-hidden={i >= list.length ? true : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element -- Drupal/local logos of unknown size */}
              <img
                src={logo.image}
                alt={i >= list.length ? "" : logo.name}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.nav}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => move(-1)}
          aria-label="Previous logos">
          <ArrowLeft
            width={7}
            height={9}
          />
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={() => move(1)}
          aria-label="Next logos">
          <ArrowRight
            width={7}
            height={9}
          />
        </button>
      </div>
    </div>
  );
}
