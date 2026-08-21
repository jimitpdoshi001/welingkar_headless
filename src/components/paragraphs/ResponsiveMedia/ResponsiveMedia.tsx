import clsx from "clsx";
import Image from "next/image";
import type { DrupalImage, DrupalMedia, DrupalResponsiveMedia } from "@/lib/drupal";
import styles from "./ResponsiveMedia.module.scss";

type ResponsiveMediaProps = {
  media: DrupalResponsiveMedia;
  className?: string;
  fill?: boolean;
};

function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&playsinline=1`;
      }
    }

    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace(/^\//, "");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&playsinline=1`;
      }
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const videoId = parsed.pathname.split("/").filter(Boolean).pop();

      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&playsinline=1`;
      }
    }
  } catch {
    return url;
  }

  return url;
}

function MediaSlot({ media, className }: { media: DrupalMedia; className?: string }) {
  if (media.kind === "image") {
    return (
      <Image
        src={media.url}
        alt={media.alt}
        width={media.width ?? 1600}
        height={media.height ?? 900}
        className={clsx(styles.media, "d-block w-100 img-fluid", className)}
        sizes="100vw"
      />
    );
  }

  if (media.kind === "video") {
    return (
      <video
        className={clsx(styles.media, "d-block w-100", className)}
        src={media.url}
        autoPlay
        muted
        loop
        playsInline
        aria-label={media.alt}
      />
    );
  }

  return (
    <iframe
      className={clsx(styles.embed, className)}
      src={toEmbedUrl(media.url)}
      title={media.alt}
      allow="accelerometer; autoplay; muted; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

function ResponsiveImage({ desktop, mobile, className }: { desktop: DrupalMedia; mobile?: DrupalMedia; className?: string }) {
  const hasDifferentMobileImage = mobile && mobile.kind === "image" && desktop.kind === "image" && mobile.url !== desktop.url;

  return (
    <picture>
      {hasDifferentMobileImage && (
        <source
          media="(max-width: 767px)"
          srcSet={mobile.url}
        />
      )}

      <Image
        src={desktop.url}
        alt={desktop.alt}
        width={(desktop as DrupalImage).width ?? 1600}
        height={(desktop as DrupalImage).height ?? 900}
        className={clsx(styles.media, "d-block w-100 img-fluid", className)}
        sizes="100vw"
      />
    </picture>
  );
}

export function ResponsiveMedia({ media, className, fill = false }: ResponsiveMediaProps) {
  const { desktop, mobile } = media;
  const fallback = desktop ?? mobile;

  if (!fallback) return null;

  const desktopMedia = desktop ?? mobile;
  const mobileMedia = mobile ?? desktop;

  if (!desktopMedia || !mobileMedia) {
    return (
      <div className={clsx(styles.responsiveMedia, fill && styles.fill, className)}>
        <MediaSlot media={fallback} />
      </div>
    );
  }

  const isSameMedia = desktopMedia.url === mobileMedia.url && desktopMedia.kind === mobileMedia.kind;

  if (isSameMedia) {
    return (
      <div className={clsx(styles.responsiveMedia, fill && styles.fill, className)}>
        <MediaSlot media={desktopMedia} />
      </div>
    );
  }

  // Responsive images: browser chooses mobile/desktop source.
  if (desktopMedia.kind === "image" && mobileMedia.kind === "image") {
    return (
      <div className={clsx(styles.responsiveMedia, fill && styles.fill, className)}>
        <ResponsiveImage
          desktop={desktopMedia}
          mobile={mobileMedia}
        />
      </div>
    );
  }

  // Keep existing behavior for video/embed media.
  return (
    <div className={clsx(styles.responsiveMedia, fill && styles.fill, className)}>
      <MediaSlot media={desktopMedia} />
    </div>
  );
}

export default ResponsiveMedia;
