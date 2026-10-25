"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

import styles from "./CoverflowCarousel.module.scss";

export type CoverflowItem = {
  id: string;
  image: string;
  title?: string;
  meta?: string;
  href?: string;
};

/**
 * 3D coverflow carousel (reference: fishermedia.in "Our Blog"). Cards are fanned
 * in 3D around the centre; the active card sits forward and bright, side cards
 * rotate back and dim. The active card floats gently and tilts to the pointer.
 * Drag/swipe or the arrows move through the set.
 */
export function CoverflowCarousel({ items, className }: { items: CoverflowItem[]; className?: string }) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const dragX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setActive((a) => (((a + dir) % count) + count) % count),
    [count],
  );

  // Signed distance from the active card, wrapped into [-count/2, count/2].
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 10 });
  };
  const endDrag = (e: React.PointerEvent) => {
    if (dragX.current != null) {
      const dx = e.clientX - dragX.current;
      if (dx > 50) go(-1);
      else if (dx < -50) go(1);
      dragX.current = null;
    }
  };
  const onPointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    dragX.current = null;
  };

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div
        className={styles.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={onPointerLeave}>
        {items.map((it, i) => {
          const off = offsetOf(i);
          const abs = Math.abs(off);
          const hidden = abs > 2;
          const isActive = off === 0;
          const rotateY = off === 0 ? 0 : off > 0 ? -34 : 34;
          const scale = isActive ? 1 : abs === 1 ? 0.84 : 0.7;
          const cardStyle: React.CSSProperties = {
            transform: `translate(-50%, -50%) translateX(${off * 56}%) translateZ(${-abs * 210}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity: hidden ? 0 : 1,
            zIndex: 100 - abs,
            pointerEvents: hidden ? "none" : "auto",
          };
          const media = (
            <div
              className={styles.media}
              style={isActive ? ({ ["--rx"]: `${tilt.rx}deg`, ["--ry"]: `${tilt.ry}deg` } as React.CSSProperties) : undefined}>
              <img
                src={it.image}
                alt={it.title ?? ""}
                draggable={false}
              />
              {it.title || it.meta ? (
                <div className={styles.caption}>
                  {it.meta ? <span className={styles.meta}>{it.meta}</span> : null}
                  {it.title ? <h3>{it.title}</h3> : null}
                </div>
              ) : null}
            </div>
          );
          return (
            <div
              key={it.id}
              className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
              style={cardStyle}
              aria-hidden={hidden}
              onClick={() => (isActive ? undefined : setActive(i))}>
              <div className={styles.float}>
                {it.href && isActive ? <Link href={it.href}>{media}</Link> : media}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.nav}>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous">
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next">
          →
        </button>
      </div>
    </div>
  );
}

export default CoverflowCarousel;
