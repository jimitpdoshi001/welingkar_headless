import clsx from "clsx";
import type { ContentFieldAttributes, DrupalResponsiveMedia, JsonApiResource } from "@/lib/drupal";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import styles from "./ContentField.module.scss";

export type ContentFieldResource = JsonApiResource<"paragraph--content_field", ContentFieldAttributes>;

export type ContentFieldItem = {
  id: string;
  paragraph: ContentFieldResource;
  media: DrupalResponsiveMedia | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  shortText1: string | null;
  shortText2: string | null;
};

export type ContentFieldProps = {
  paragraph: ContentFieldResource;
  responsiveMedia?: DrupalResponsiveMedia | null;
  children?: React.ReactNode;
};

export function toContentFieldItem(
  paragraph: ContentFieldResource,
  media?: DrupalResponsiveMedia | null
): ContentFieldItem {
  const { attributes } = paragraph;

  return {
    id: paragraph.id,
    paragraph,
    media: media ?? null,
    title: attributes.field_title || null,
    subtitle: attributes.field_subtitle || null,
    description: attributes.field_description?.processed || attributes.field_description?.value || null,
    shortText1: attributes.field_short_text_1 || null,
    shortText2: attributes.field_short_text_2 || null,
  };
}

export function ContentField({ paragraph, responsiveMedia, children }: ContentFieldProps) {
  const item = toContentFieldItem(paragraph, responsiveMedia);
  const hasMedia = Boolean(item.media?.desktop || item.media?.mobile);

  return (
    <article className={clsx("content-field", styles.root)}>
      {hasMedia && item.media ? (
        <div className={clsx("content-field__media", styles.media)}>
          <ResponsiveMedia
            media={item.media}
            fill
            className={styles.mediaFill}
          />
        </div>
      ) : null}

      <div className="content-field__content">
        {item.title ? <h3 className="content-field__title">{item.title}</h3> : null}
        {item.subtitle ? <p className="content-field__subtitle">{item.subtitle}</p> : null}

        {item.description ? (
          <div className="content-field__description">
            <SafeHtml html={item.description} />
          </div>
        ) : null}

        {item.shortText1 ? <p className="content-field__short-text-1">{item.shortText1}</p> : null}
        {item.shortText2 ? <p className="content-field__short-text-2">{item.shortText2}</p> : null}
      </div>

      {children}
    </article>
  );
}
