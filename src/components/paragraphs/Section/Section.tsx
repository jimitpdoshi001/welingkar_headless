"use client";
import type { DrupalImage, DrupalResponsiveMedia, JsonApiResource, SectionAttributes } from "@/lib/drupal";
import styles from "./Section.module.scss";
import clsx from "clsx";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import Image from "next/image";


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
  gradient_blue: "bg-gradient-blue",
  gradient_white: "bg-gradient-white",
  gray: "bg-gray",
  dark_gray: "bg-dark-gray",
  light_gray: "bg-light-gray",
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

export function Section({ paragraph, image, responsiveMedia, children }: SectionProps) {
  const { attributes } = paragraph;

  const widthClass = widthClasses[attributes.field_width as keyof typeof widthClasses] ?? "";
  const paddingClass = paddingClasses[attributes.field_padding as keyof typeof paddingClasses] ?? "";
  const paddingXClass = paddingXClasses[attributes.field_padding_x as keyof typeof paddingXClasses] ?? "";
  const paddingYClass = paddingYClasses[attributes.field_padding_y as keyof typeof paddingYClasses] ?? "";
  const backgroundColorClass = backgroundColorClasses[attributes.field_background_color as keyof typeof backgroundColorClasses] ?? "";
  const heightClass = heightClasses[attributes.field_height as keyof typeof heightClasses] ?? "";
  
  const hasBackground = Boolean(responsiveMedia?.desktop || responsiveMedia?.mobile || image);


  return (
    <section
      className={clsx("relative", backgroundColorClass, heightClass, "overflow-hidden")}>
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
      <div className={clsx(paddingClass, paddingXClass, paddingYClass, widthClass, hasBackground, "h-100")}>{children}</div>
    </section>
  );
}
