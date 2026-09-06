"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { MediaBoxWithPopupProps } from "./MediaBoxWithPopup";
import { PlayIcon, PopupPlayer } from "./MediaBoxWithPopupGridOf2";
import styles from "./MediaBoxWithPopupSingleImage.module.scss";

export default function MediaBoxWithPopupSingleImage({ paragraph, image, responsiveMedia, children }: MediaBoxWithPopupProps) {
  const [open, setOpen] = useState(false);
  const heading = paragraph.attributes.field_header || null;
  const video = responsiveMedia?.desktop ?? responsiveMedia?.mobile ?? null;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.thumb}
        onClick={() => video && setOpen(true)}
        aria-label={heading ? `Play video: ${heading}` : "Play video"}>
        {image && (
          <Image
            src={image.url}
            alt={image.alt || heading || "Video thumbnail"}
            width={image.width ?? 1200}
            height={image.height ?? 675}
            className={styles.thumbImage}
          />
        )}
        {video && (
          <span className={styles.play}>
            <PlayIcon />
          </span>
        )}
        <div className={styles.body}>
          {heading ? <h4 className="bold">{heading}</h4> : null}
          {children}
        </div>
      </button>

      {open && video && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          role="presentation">
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={heading || "Video"}
            onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close video">
              ×
            </button>
            <PopupPlayer
              media={video}
              title={heading || "Video"}
              playerClassName={styles.player}
            />
          </div>
        </div>
      )}
    </article>
  );
}

export function MediaBoxWithPopupSingleImageGroup({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
