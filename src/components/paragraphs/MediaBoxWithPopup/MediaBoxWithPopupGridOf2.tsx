"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { DrupalMedia } from "@/lib/drupal";
import type { MediaBoxWithPopupProps } from "./MediaBoxWithPopup";
import styles from "./MediaBoxWithPopupGridOf2.module.scss";
import clsx from "clsx";
import { toSafeEmbedUrl } from "@/lib/security/embed-url";
import { campusVideoOverride } from "@/lib/content-overrides";

export function PopupPlayer({ media, title, playerClassName }: { media: DrupalMedia; title: string; playerClassName?: string }) {
  const className = playerClassName || styles.player;

  if (media.kind === "video") {
    return (
      <video
        className={className}
        src={media.url}
        controls
        autoPlay
        playsInline
        aria-label={media.alt || title}
      />
    );
  }

  if (media.kind === "remote_video") {
    const src = toSafeEmbedUrl(media.url, { autoplay: true });
    if (!src) return null;

    return (
      <iframe
        className={className}
        src={src}
        title={media.alt || title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <Image
      src={media.url}
      alt={media.alt || title}
      width={media.width ?? 1600}
      height={media.height ?? 900}
      className={className}
    />
  );
}

export function PlayIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="31"
        fill="var(--color-primary)"
      />
      <path
        d="M26 20L46 32L26 44V20Z"
        fill="white"
      />
    </svg>
  );
}

export default function MediaBoxWithPopupGridOf2({ paragraph, image, responsiveMedia, children }: MediaBoxWithPopupProps) {
  const [open, setOpen] = useState(false);
  const heading = paragraph.attributes.field_header || null;
  const rawVideo = responsiveMedia?.desktop ?? responsiveMedia?.mobile ?? null;
  // Force the requested campus YouTube videos until they're corrected in Drupal.
  const videoOverrideUrl = campusVideoOverride(heading);
  const video: DrupalMedia | null = videoOverrideUrl
    ? ({ ...(rawVideo ?? {}), kind: "remote_video", url: videoOverrideUrl, alt: rawVideo?.alt ?? heading ?? "" } as DrupalMedia)
    : rawVideo;

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
    <article className={clsx(styles.card)}>
      <button
        type="button"
        className={styles.thumb}
        onClick={() => video && setOpen(true)}
        aria-label={heading ? `Play video: ${heading}` : "Play video"}>
        {image && (
          <Image
            src={image.url}
            alt={image.alt || heading || "Video thumbnail"}
            width={image.width ?? 800}
            height={image.height ?? 450}
            className={styles.thumbImage}
          />
        )}
        {video && (
          <span className={styles.play}>
            <PlayIcon />
          </span>
        )}
        <div className={styles.body}>
          {heading ? <h4 className={styles.heading}>{heading}</h4> : null}
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

export function MediaBoxWithPopupGridOf2Group({ children }: { children: React.ReactNode }) {
  return <div className={clsx(styles.grid, "animate-stagger")} data-animation-stagger="0.02">{children}</div>;
}
