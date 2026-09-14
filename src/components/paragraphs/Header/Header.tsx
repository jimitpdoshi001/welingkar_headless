import type { HeaderAttributes, JsonApiResource } from "@/lib/drupal";
import clsx from "clsx";
import { getAnimationClass } from "@/components/animations/registry";


type HeaderProps = {
  paragraph: JsonApiResource<"paragraph--header", HeaderAttributes>;
  children?: React.ReactNode;
};

const textColorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  black: "text-black",
} as const;

const textAlignClasses = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
} as const;

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

 const maxWidthClasses = {
    30: "max-w-30",
    40: "max-w-40",
    50: "max-w-50",
    60: "max-w-60",
    70: "max-w-70",
    80: "max-w-80",
    90: "max-w-90",
  } as const;

export function Header({ paragraph, children }: HeaderProps) {
  const heading = paragraph.attributes.field_header || null;
  if (!heading) return null;

  const colorClass = textColorClasses[paragraph.attributes.field_text_color as keyof typeof textColorClasses] || "";
  const alignClass = textAlignClasses[paragraph.attributes.field_alignment as keyof typeof textAlignClasses] || "";
  const sizeClass = textHeaderSizeClasses[paragraph.attributes.field_header_size as keyof typeof textHeaderSizeClasses] || "";
  const maxWidthClass = maxWidthClasses[paragraph.attributes.field_max_width as keyof typeof maxWidthClasses] || "";

  const Component = sizeClass as React.ElementType || "h3";

  const animationClass = getAnimationClass(paragraph.attributes.field_animation || "");

  return (
    <div className={clsx(alignClass, colorClass, maxWidthClass, maxWidthClass && alignClass === "text-center" && "mx-auto", animationClass)}>
      <Component>{heading}</Component>
      {children}
    </div>
  );
}
