"use client";

import { useEffect, useRef, useState } from "react";

import style from "./SocialBar.module.scss";

type Social = { label: string; href: string; icon: React.ReactNode };

// 24x24 brand marks; colour comes from `currentColor`.
const SOCIALS: Social[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/Welingkar",
    icon: <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.93 2 14.62 2 11.9 2 10 3.66 10 6.7v2.8H7v4h3V22h4z" />,
  },
  {
    // Current X logo (not the old bird).
    label: "X",
    href: "https://x.com/welingkarinst",
    icon: <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />,
  },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/welingkar-fmb",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/WelingkarInstitute",
    icon: <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8M9.6 15.6V8.4l6.3 3.6z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/welingkareducation/",
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88" />
    ),
  },
];

/**
 * Slide-out social bar: only the share square shows; hover (desktop) or tap
 * (touch) slides the 5 social links out to the left. Tap outside or Escape closes.
 */
export function SocialBar() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={`${style.bar} ${open ? style.open : ""}`}>
      <ul
        id="social-bar-links"
        className={style.links}>
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={style.item}
              aria-label={`WeSchool on ${s.label}`}
              tabIndex={open ? 0 : -1}>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true">
                {s.icon}
              </svg>
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={style.item}
        aria-label="Follow WeSchool on social media"
        aria-expanded={open}
        aria-controls="social-bar-links"
        onClick={() => setOpen((v) => !v)}>
        <svg
          viewBox="0 0 20 23"
          width="17"
          height="19"
          fill="currentColor"
          aria-hidden="true">
          <path d="M15.9 0a3.53 3.53 0 0 0-3.28 4.85L5.9 8.58a3.53 3.53 0 1 0 0 5.22l6.72 3.73a3.53 3.53 0 1 0 .62-1l-6.6-3.67a3.5 3.5 0 0 0 0-3.35l6.6-3.66A3.53 3.53 0 1 0 15.9 0" />
        </svg>
      </button>
    </div>
  );
}

export default SocialBar;
