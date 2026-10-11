import Link from "next/link";

import type { DirectorMessageAttributes, JsonApiResource } from "@/lib/drupal";
import type { DirectorMessage as DirectorMessageData } from "@/lib/drupal/faculty";
import { DEFAULT_DIRECTOR_MESSAGE } from "@/lib/drupal/faculty";
import styles from "./DirectorMessage.module.scss";

type DirectorMessageProps = {
  paragraph?: JsonApiResource<"paragraph--director_message", DirectorMessageAttributes>;
  data?: DirectorMessageData;
  children?: React.ReactNode;
};

export function DirectorMessage({ paragraph, data = DEFAULT_DIRECTOR_MESSAGE }: DirectorMessageProps) {
  const attributes = paragraph?.attributes;

  const heading = attributes?.field_header || data.heading;
  const name = attributes?.field_name || data.name;
  const designation = attributes?.field_designation || data.designation;
  const body = attributes?.field_description?.value || data.body;

  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>{heading}</h2>

      <div className={styles.layout}>
        <div className={styles.imageContainer}>
          <img
            src={data.image}
            alt={data.imageAlt || name}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.designation}>{designation}</p>
          <p className={styles.body}>{body}</p>

          {data.link ? (
            <Link
              href={data.link}
              className={`btn accent ${styles.cta}`}>
              {data.linkLabel || "Read More"}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default DirectorMessage;
