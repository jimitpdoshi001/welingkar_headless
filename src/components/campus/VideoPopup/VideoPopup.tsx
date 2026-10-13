"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toSafeEmbedUrl } from "@/lib/security/embed-url";
import styles from "./VideoPopup.module.scss";

type VideoPopupProps = {
  /** YouTube/Vimeo URL; normalised to a safe embed URL before use. */
  videoUrl: string;
  title: string;
  className?: string;
  children: React.ReactNode;
};

/** Makes its children a play trigger that opens the video in a full-screen popup. */
export function VideoPopup({ videoUrl, title, className, children }: VideoPopupProps) {
  const [open, setOpen] = useState(false);
  const embed = toSafeEmbedUrl(videoUrl, { autoplay: true });

  // Escape closes the popup; page scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!embed) return <div className={className}>{children}</div>;

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${className ?? ""}`}
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${title}`}>
        {children}
      </button>
      {/* Portal: animated ancestors use transforms, which would trap a fixed overlay. */}
      {open
        ? createPortal(
            <div
              className={styles.overlay}
              onClick={() => setOpen(false)}
              role="presentation">
              <div
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={styles.close}
                  onClick={() => setOpen(false)}
                  aria-label="Close video">
                  ×
                </button>
                <iframe
                  className={styles.player}
                  src={embed}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
