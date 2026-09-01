import type { DrupalImage, TestimonialsDataAttributes, JsonApiResource } from "@/lib/drupal";
import clsx from "clsx";
import styles from "./TestimonialsData.module.scss";

type TestimonialsDataProps = {
  paragraph: JsonApiResource<"paragraph--testimonials_data", TestimonialsDataAttributes>;
  image?: DrupalImage | null;
  children?: React.ReactNode;
};

export function TestimonialsData({ paragraph, children }: TestimonialsDataProps) {
  const { attributes } = paragraph;

  return (
    <div className={clsx(styles.root)}>
      <div className={styles.card}>
        <div className={styles.quote}>&ldquo;</div>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: attributes.field_description?.processed || "",
          }}
        />

        <div className={styles.author}>
          <div className={styles.name}>{attributes.field_name}</div>
          <div className={styles.designation}>{attributes.field_designation}</div>
        </div>
      </div>

      {children}
    </div>
  );
}
