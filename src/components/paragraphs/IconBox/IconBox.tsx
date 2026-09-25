import Image from "next/image";
import type { DrupalImage, IconBoxAttributes, JsonApiResource } from "@/lib/drupal";
import styles from "./IconBox.module.scss";
import clsx from "clsx";

type IconBoxProps = {
  paragraph: JsonApiResource<"paragraph--icon_box", IconBoxAttributes>;
  image?: DrupalImage | null;
};

export function IconBox({ paragraph, image }: IconBoxProps) {
  const title = paragraph.attributes.field_title || null;
  const subtitle = paragraph.attributes.field_subtitle || null;

  return (
    <article className={styles.card}>
      {image ? (
        <Image
          src={image.url}
          alt={image.alt || title || ""}
          height={image.height}
          width={image.width}
          className={clsx(styles.iconImage, "mb-2")}
        />
      ) : null}
      {title ? <h6 className="bold mb-1">{title}</h6> : null}
      {subtitle ? <p>{subtitle}</p> : null}
    </article>
  );
}
