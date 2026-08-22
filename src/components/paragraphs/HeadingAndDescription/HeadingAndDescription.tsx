import type { HeadingAndDescriptionAttributes, JsonApiResource } from "@/lib/drupal";
import styles from "./HeadingAndDescription.module.scss";
import clsx from "clsx";

type HeadingAndDescriptionProps = {
  paragraph: JsonApiResource<"paragraph--header_and_description", HeadingAndDescriptionAttributes>;
  children?: React.ReactNode;
};

export function HeadingAndDescription({ paragraph, children }: HeadingAndDescriptionProps) {
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;

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

  const colorClass = textColorClasses[paragraph.attributes.field_text_color as keyof typeof textColorClasses] || null;
  const textAlignClass = textAlignClasses[paragraph.attributes.field_alignment as keyof typeof textAlignClasses] || null;
  const textVerticalAlignClass = textVerticalAlignClasses[paragraph.attributes.field_vertical_alignment as keyof typeof textVerticalAlignClasses] || null;

  // console.log("heading and description", paragraph.attributes);

  return (
    <div className={clsx(colorClass, textAlignClass, textVerticalAlignClass, textVerticalAlignClass ? "g h-100" : "", textAlignClass === "text-center" ? "mx-auto max-w-50" : "")}>
      <div>
        {heading ? <h2 className="h1 mb-2">{heading}</h2> : null}
        {description ? (
          <div
            className={clsx(styles.descriptionContent, "mb-3")}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
