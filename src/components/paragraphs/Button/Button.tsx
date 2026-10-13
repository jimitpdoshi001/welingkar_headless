import type { ButtonAttributes, JsonApiResource } from "@/lib/drupal";
import { getNodePathMap } from "@/lib/drupal/pages";
import { drupalLinkTarget, isAppPath, isHashHref, resolveDrupalHref } from "@/lib/drupal/link";
import clsx from "clsx";
import { overrideButtonLink } from "@/lib/content-overrides";
import Link from "next/link";

type ButtonProps = {
  paragraph: JsonApiResource<"paragraph--button", ButtonAttributes>;
};

type DrupalLink = {
  uri: string;
  title: string;
};

function firstLink(value: ButtonAttributes["field_url"]): DrupalLink | null {
  if (!value) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

const buttonStyleClasses = {
  primary: "primary",
  secondary: "secondary",
  primary_link: "primary-link",
  secondary_link: "secondary-link",
  primary_outline: "primary-outline",
  secondary_outline: "secondary-outline",
  white_primary: "white-outline",
} as const;

const alignmentClasses = {
  left: "left",
  center: "text-center",
  right: "right",
} as const;

function ButtonInner({ title }: { title?: string }) {
  return <>{title}</>;
}

export async function Button({ paragraph }: ButtonProps) {
  const { attributes } = paragraph;
  const link = overrideButtonLink(paragraph.id, firstLink(attributes.field_url));
  const nodePaths = await getNodePathMap();
  const href = resolveDrupalHref(link?.uri, nodePaths) ?? "#";
  const target = drupalLinkTarget(attributes.field_target);
  const styleKey = attributes.field_button_style as keyof typeof buttonStyleClasses | null;
  const buttonStyleClass = (styleKey && buttonStyleClasses[styleKey]) || "primary";
  const className = clsx("btn", buttonStyleClass);

  const alignmentClass = alignmentClasses[attributes.field_alignment as keyof typeof alignmentClasses] || "";

  if (!link?.uri && !link?.title) return null;

  const inner = <ButtonInner title={link?.title} />;

  if (isHashHref(href) || !isAppPath(href)) {
    return (
      <a
        href={href}
        className={clsx(className)}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}>
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={clsx(className, alignmentClass)}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}>
      {inner}
    </Link>
  );
}
