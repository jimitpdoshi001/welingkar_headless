"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { DrupalImage, DrupalMedia, DrupalResponsiveMedia, JsonApiResource, MediaBoxWithPopupAttributes } from "@/lib/drupal";
import styles from "./MediaBoxWithPopup.module.scss";

type MediaBoxWithPopupProps = {
  paragraph: JsonApiResource<"paragraph--media_box_with_popup", MediaBoxWithPopupAttributes>;
  image?: DrupalImage | null;
  responsiveMedia?: DrupalResponsiveMedia | null;
  children?: React.ReactNode;
};

function toPopupEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
      }
    }

    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace(/^\//, "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
      }
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const videoId = parsed.pathname.split("/").filter(Boolean).pop();
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1&playsinline=1`;
      }
    }
  } catch {
    return url;
  }

  return url;
}

function PopupPlayer({ media, title }: { media: DrupalMedia; title: string }) {
  if (media.kind === "video") {
    return (
      <video
        className={styles.player}
        src={media.url}
        controls
        autoPlay
        playsInline
        aria-label={media.alt || title}
      />
    );
  }

  if (media.kind === "remote_video") {
    return (
      <iframe
        className={styles.player}
        src={toPopupEmbedUrl(media.url)}
        title={media.alt || title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <Image
      src={media.url}
      alt={media.alt || title}
      width={media.width ?? 1600}
      height={media.height ?? 900}
      className={styles.player}
    />
  );
}

function PlayIcon() {
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

export function MediaBoxWithPopupGroup({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function MediaBoxWithPopup({ paragraph, image, responsiveMedia, children }: MediaBoxWithPopupProps) {
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
            />
          </div>
        </div>
      )}
    </article>
  );
}
