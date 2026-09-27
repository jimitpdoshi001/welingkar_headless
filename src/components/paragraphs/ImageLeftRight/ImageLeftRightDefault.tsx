import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import type { ImageLeftRightProps } from "./ImageLeftRight";
import clsx from "clsx";
import styles from "./ImageLeftRight.module.scss";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";

const textHeaderSizeClasses = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
  small: "small",
  big: "big",
  tiny: "tiny",
} as const;

export default function ImageLeftRightDefault({ paragraph, children, responsiveMedia, image }: ImageLeftRightProps) {
  const { attributes } = paragraph;
  const hasMedia = responsiveMedia || image;
  const isRight = attributes.field_image_right === true;
  const sizeClass = textHeaderSizeClasses[paragraph.attributes.field_header_size as keyof typeof textHeaderSizeClasses] || "h3";
  const Component = sizeClass as React.ElementType;

  return (
    <section className={clsx(styles.root, isRight && styles.isRight)}>
      {hasMedia && !isRight && (
        <div className={styles.media}>
          {responsiveMedia && (
            <ResponsiveMedia
              media={responsiveMedia}
              fill
              className={styles.mediaFill}
            />
          )}
        </div>
      )}

      <div className={styles.content}>
        {attributes.field_title && <Component className="mb-05 bold">{attributes.field_title}</Component>}
        {attributes.field_subtitle && <p className="h6">{attributes.field_subtitle}</p>}
        {attributes.field_description?.processed ? <SafeHtml html={attributes.field_description.processed} /> : null}
        <div className="mt-4">{children}</div>
      </div>

      {hasMedia && isRight && (
        <div className={clsx(styles.media)}>
          {responsiveMedia && (
            <ResponsiveMedia
              media={responsiveMedia}
              fill
              className={styles.mediaFill}
            />
          )}
        </div>
      )}
    </section>
  );
}

export function ImageLeftRightDefaultGroup({ children }: { children: React.ReactNode }) {
  return <div className="image-left-right-group">{children}</div>;
}
