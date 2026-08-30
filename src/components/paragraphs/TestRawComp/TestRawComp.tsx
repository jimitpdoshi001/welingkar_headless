import type {
  JsonApiResource,
  TestRawCompAttributes,
} from "@/lib/drupal";
import styles from "./TestRawComp.module.scss";
import Link from "next/link";

type TestRawCompProps = {
  paragraph: JsonApiResource<
    "paragraph--test_raw_comp",
    TestRawCompAttributes
  >;
  children?: React.ReactNode;
};

export function TestRawComp({
  paragraph,
  children,
}: TestRawCompProps) {
  const rawHtml =
    paragraph.attributes.field_raw_html?.processed ||
    paragraph.attributes.field_raw_html?.value ||
    null;

  if (!rawHtml && !children) return null;

  return (
    <div>
      {rawHtml && (
        <div
          dangerouslySetInnerHTML={{
            __html: rawHtml,
          }}
        />
      )}

      <div className={styles.mainGrid}>
        {/* Large left card */}
        <article className={`${styles.card} ${styles.featuredCard}`}>
          <img
            src="https://i.pravatar.cc/150?u=5"
            alt="Welingkar Institute event"
          />

          <div className={styles.featuredContent}>
            <h6>
              Welingkar Institute of Management Engages with
              Healthcare Innovators at DHN City Meetup Mumbai 2026
            </h6>

            <div className={styles.cardBottom}>
              <span>31 July 2026</span>

              <Link className="btn" href="#">
          Know More
          </Link>
            </div>
          </div>
        </article>

        {/* Middle top image */}
        <article className={`${styles.card} ${styles.imageCard}`}>
          <img
            src="https://i.pravatar.cc/150?u=5"
            alt="WeSchool event"
          />
        </article>

        {/* Right top text */}
        <article className={`${styles.card} ${styles.textCard}`}>
          <h6>
            WeSchool hosts Marketing Legend Prof.V.Kumar on
            aligning Academia, Industry and the Future Workforce
          </h6>

          <span className={styles.date}>
            29 July 2026
          </span>

          <Link className="btn" href="#">
          Know More
          </Link>
        </article>

        {/* Middle bottom image */}
        <article className={`${styles.card} ${styles.imageCard}`}>
          <img
            src="https://i.pravatar.cc/150?u=5"
            alt="WeSchool event"
          />
        </article>

        {/* Right bottom text */}
        <article className={`${styles.card} ${styles.textCard}`}>
          <h6>
            Nexus Select Malls and Welingkar Institute of
            Management Development and Research Launch India’s
            First Post Graduate Program in Mall Management
          </h6>

          <span className={styles.date}>
            29 July 2026
          </span>

          <Link className="btn" href="#">
          Know More
          </Link>
        </article>
      </div>

      {children}
    </div>
  );
}
