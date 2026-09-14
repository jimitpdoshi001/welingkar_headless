"use client";
import type { HeadingAndDescriptionAttributes, JsonApiResource } from "@/lib/drupal";
import styles from "./HeadingAndDescription.module.scss";
import clsx from "clsx";
import {useIsMobile} from "@/util/useMediaQuery";
import { getAnimationClass } from "@/components/animations/registry";

type HeadingAndDescriptionProps = {
  paragraph: JsonApiResource<"paragraph--header_and_description", HeadingAndDescriptionAttributes>;
  children?: React.ReactNode;
};

export function HeadingAndDescription({ paragraph, children }: HeadingAndDescriptionProps) {
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;

  const isMobile = useIsMobile();

  const textColorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    white: "text-white",
    black: "text-black",
  } as const;

  const textAlignClasses = {
    center: "text-center",
    default: "text-left",
    right: "text-right",
  } as const;

  const textVerticalAlignClasses = {
    top: "ai-fs",
    center: "ai-c",
    bottom: "ai-fe",
  } as const;

  const maxWidthClasses = {
    30: "max-w-30",
    40: "max-w-40",
    50: "max-w-50",
    60: "max-w-60",
    70: "max-w-70",
    80: "max-w-80",
    90: "max-w-90",
  } as const;

  const componentStylesClasses = {
    button_right: styles.button_right,
  } as const;

  const headerSizeClasses = {
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


  const colorClass = textColorClasses[paragraph.attributes.field_text_color as keyof typeof textColorClasses] || null;
  const textAlignClass = textAlignClasses[paragraph.attributes.field_alignment as keyof typeof textAlignClasses] || null;
  const textVerticalAlignClass = textVerticalAlignClasses[paragraph.attributes.field_vertical_alignment as keyof typeof textVerticalAlignClasses] || null;

  const maxWidthClass = maxWidthClasses[paragraph.attributes.field_max_width as keyof typeof maxWidthClasses] || null;

  const headerSizeClass = headerSizeClasses[paragraph.attributes.field_header_size as keyof typeof headerSizeClasses] || null;
  const Component = headerSizeClass as React.ElementType || "h3";

  const animationClass = getAnimationClass(paragraph.attributes.field_animation);


  const componentStylesClass = componentStylesClasses[paragraph.attributes.field_header_style as keyof typeof componentStylesClasses] || null;

  return (
    <div className={clsx(colorClass, textAlignClass, textVerticalAlignClass, textVerticalAlignClass ? "g h-100" : "", animationClass)}>
      {componentStylesClass !== styles.button_right ? (
        <div className={clsx(maxWidthClass, maxWidthClass && textAlignClass === "text-center" && "mx-auto", isMobile ? "text-left" : "")}>
          <div>
            {heading ? <Component>{heading}</Component> : null}
            {description ? (
              <div
                className={clsx(styles.descriptionContent, children ? "mb-4" : "")}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
          </div>
          {children}
        </div>
      ) : (
        <div className={clsx(componentStylesClass)}>
          <div className={clsx(maxWidthClass, maxWidthClass && textAlignClass === "text-center" && "mx-auto")}>
            {heading ? <Component>{heading}</Component> : null}
            {description ? (
              <div
                className={clsx(styles.descriptionContent)}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
