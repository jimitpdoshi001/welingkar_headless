import type { ButtonAttributes, JsonApiResource } from "@/lib/drupal";
import { getNodePathMap } from "@/lib/drupal/pages";
import { drupalLinkTarget, isAppPath, isHashHref, resolveDrupalHref } from "@/lib/drupal/link";
import clsx from "clsx";
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
} as const;

function ButtonInner({ title }: { title?: string }) {
  return (
    <>
      <span className="text">{title}</span>
      <span className="arrow">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.43934 15.996C-0.146447 16.5818 -0.146447 17.5315 0.43934 18.1173C1.02513 18.7031 1.97487 18.7031 2.56066 18.1173L1.5 17.0566L0.43934 15.996ZM18.5563 1.50029C18.5563 0.671865 17.8848 0.000292009 17.0563 0.000292304L3.55635 0.000291461C2.72792 0.000291461 2.05635 0.671864 2.05635 1.50029C2.05635 2.32872 2.72792 3.00029 3.55635 3.00029H15.5563V15.0003C15.5563 15.8287 16.2279 16.5003 17.0563 16.5003C17.8848 16.5003 18.5563 15.8287 18.5563 15.0003L18.5563 1.50029ZM1.5 17.0566L2.56066 18.1173L18.117 2.56095L17.0563 1.50029L15.9957 0.439632L0.43934 15.996L1.5 17.0566Z"
            fill="white"
          />
        </svg>
      </span>
    </>
  );
}

export async function Button({ paragraph }: ButtonProps) {
  const { attributes } = paragraph;
  const link = firstLink(attributes.field_url);
  const nodePaths = await getNodePathMap();
  const href = resolveDrupalHref(link?.uri, nodePaths) ?? "#";
  const target = drupalLinkTarget(attributes.field_target);
  const styleKey = attributes.field_button_style as keyof typeof buttonStyleClasses | null;
  const buttonStyleClass = (styleKey && buttonStyleClasses[styleKey]) || "primary";
  const className = clsx("btn", buttonStyleClass);

  if (!link?.uri && !link?.title) return null;

  const inner = <ButtonInner title={link?.title} />;

  if (isHashHref(href) || !isAppPath(href)) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}>
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}>
      {inner}
    </Link>
  );
}
