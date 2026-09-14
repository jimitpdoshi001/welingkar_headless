"use client";
import type { DrupalImage, DrupalResponsiveMedia, JsonApiResource, SectionAttributes } from "@/lib/drupal";
import styles from "./Section.module.scss";
import clsx from "clsx";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import Image from "next/image";
import { ArrowDark, ArrowLight } from "@/assets/svg/Arrows";
import { getAnimationClass } from "@/components/animations/registry";

type SectionProps = {
  paragraph: JsonApiResource<"paragraph--section", SectionAttributes>;
  image?: DrupalImage | null;
  responsiveMedia?: DrupalResponsiveMedia | null;
  children: React.ReactNode;
};

const widthClasses = {
  container: "container",
  fullwidth: "w-100",
  container80: "container-w80",
  container70: "container-w70",
  container60: "container-w60",
  container50: "container-w50",
} as const;

const paddingClasses = {
  40: "p-4",
  60: "p-6",
  80: "p-8",
  100: "p-10",
  120: "p-12",
} as const;

const paddingXClasses = {
  40: "px-4",
  60: "px-6",
  80: "px-8",
  100: "px-10",
  120: "px-12",
} as const;

const paddingYClasses = {
  40: "py-4",
  60: "py-6",
  80: "py-8",
  100: "py-10",
  120: "py-12",
} as const;

const backgroundColorClasses = {
  white: "bg-white",
  black: "bg-black",
  primary: "bg-primary",
  secondary: "bg-secondary",
  gray: "bg-gray",
  light_yellow: "bg-light-yellow",
} as const;

const heightClasses = {
  120: "h-120dvh",
  110: "h-110dvh",
  100: "h-100dvh",
  90: "h-90dvh",
  80: "h-80dvh",
  70: "h-70dvh",
  60: "h-60dvh",
  50: "h-50dvh",
  40: "h-40dvh",
  0: "",
} as const;

const arrowStyleClasses = {
  top: "arrow-top",
  bottom: "arrow-bottom",
  left: "arrow-left",
  right: "arrow-right",
  center: "arrow-center",
} as const;

export function Section({ paragraph, image, responsiveMedia, children }: SectionProps) {
  const { attributes } = paragraph;

  const widthClass = widthClasses[attributes.field_width as keyof typeof widthClasses] ?? "";
  const paddingClass = paddingClasses[attributes.field_padding as keyof typeof paddingClasses] ?? "";
  const paddingXClass = paddingXClasses[attributes.field_padding_x as keyof typeof paddingXClasses] ?? "";
  const paddingYClass = paddingYClasses[attributes.field_padding_y as keyof typeof paddingYClasses] ?? "";
  const backgroundColorClass = backgroundColorClasses[attributes.field_background_color as keyof typeof backgroundColorClasses] ?? "";
  const heightClass = heightClasses[attributes.field_height as keyof typeof heightClasses] ?? "";
  const arrowStyleClass = arrowStyleClasses[attributes.field_arrow_style as keyof typeof arrowStyleClasses] ?? "";
  const hasBackground = Boolean(responsiveMedia?.desktop || responsiveMedia?.mobile || image);

  const animationClass = getAnimationClass(paragraph.attributes.field_animation || "");

  const hasStickyChild = Boolean(
    attributes.field_section_content?.some((item: { type?: string }) => item.type === "paragraph--in_page_links")
  );

  return (
    <section id={attributes.field_section_id || undefined} className={clsx("relative", heightClass, hasStickyChild ? undefined : "overflow-hidden", arrowStyleClass)}>
      <div className={clsx(paddingClass, paddingXClass, paddingYClass, widthClass, hasBackground, "h-100", animationClass)}>{children}</div>

      <div className={clsx(styles.backgroundColorOverlay, backgroundColorClass)} />

      {responsiveMedia && (
        <ResponsiveMedia
          media={responsiveMedia}
          className={styles.backgroundMedia}
          fill
        />
      )}
      {image && !responsiveMedia && (
        <Image
          src={image.url}
          alt={image.alt}
          className={styles.backgroundMedia}
          fill
          style={{ objectFit: "cover" }}
        />
      )}
      {arrowStyleClass === "arrow-top" && (
        <div className={styles.arrowTop}>
          <span className={styles.arrowLight}>
            <ArrowLight />
          </span>
          <span className={styles.arrowDark}>
            <ArrowDark />
          </span>
        </div>
      )}
      {arrowStyleClass === "arrow-bottom" && (
        <div className={styles.arrowDown}>
          <span className={styles.arrowLight}>
            <ArrowLight />
          </span>
          <span className={styles.arrowDark}>
            <ArrowDark />
          </span>
        </div>
      )}
      {arrowStyleClass === "arrow-left" && (
        <div className={styles.arrowLeft}>
          <span className={styles.arrowLight}>
            <ArrowLight />
          </span>
          <span className={styles.arrowDark}>
            <ArrowDark />
          </span>
        </div>
      )}
      {arrowStyleClass === "arrow-right" && (
        <div className={styles.arrowRight}>
          <span className={styles.arrowLight}>
            <ArrowLight />
          </span>
          <span className={styles.arrowDark}>
            <ArrowDark />
          </span>
        </div>
      )}
      {arrowStyleClass === "arrow-center" && (
        <div className={styles.arrowCenter}>
          <span className={styles.arrowLight}>
            <ArrowLight />
          </span>
          <span className={styles.arrowDark}>
            <ArrowDark />
          </span>
        </div>
      )}
    </section>
  );
}
