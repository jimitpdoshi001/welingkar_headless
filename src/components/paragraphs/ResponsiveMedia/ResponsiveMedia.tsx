import clsx from "clsx";
import Image from "next/image";
import type { DrupalImage, DrupalMedia, DrupalResponsiveMedia } from "@/lib/drupal";
import { toSafeEmbedUrl } from "@/lib/security/embed-url";
import styles from "./ResponsiveMedia.module.scss";

type ResponsiveMediaProps = {
  media: DrupalResponsiveMedia;
  className?: string;
  fill?: boolean;
};

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

  if (media.kind !== "remote_video") return null;

  const src = toSafeEmbedUrl(media.url, { autoplay: true, muted: true, loop: true });
  if (!src) return null;

  return (
    <iframe
      className={clsx(styles.embed, className)}
      src={src}
      title={media.alt}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
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
