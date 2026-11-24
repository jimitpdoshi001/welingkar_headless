import Link from "next/link";

import { PageShell } from "@/components/shell/PageShell";
import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import { youtubeEmbedUrl, type EventItem } from "@/lib/drupal/events";
import { EVENTS_PAGE } from "@/lib/medialist/media-data";
import styles from "./EventDetail.module.scss";

const CITY_LABEL = { mumbai: "Mumbai", bengaluru: "Bengaluru" } as const;

/** One event (Drupal node--events): date, campus, featured image, optional YouTube video, description. */
export function EventDetail({ event }: { event: EventItem }) {
  const video = youtubeEmbedUrl(event.youtubeUrl);
  const meta = [event.date, event.city ? CITY_LABEL[event.city] : ""].filter(Boolean).join(" · ");

  return (
    <PageShell
      title={event.title}
      subtitle={meta || undefined}
      image={EVENTS_PAGE.hero.image}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: event.title }]}>
      <article className={`container ${styles.detail}`}>
        {event.image ? (
          <img
            src={event.image}
            alt={event.imageAlt}
            className={styles.image}
          />
        ) : null}

        {video ? (
          <div className={styles.video}>
            <iframe
              src={video}
              title={`${event.title} video`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : null}

        {/* Drupal description HTML: only ever rendered through the sanitizer. */}
        <SafeHtml
          html={event.descriptionHtml}
          className={styles.body}
        />

        <Link
          href="/events"
          className={`btn accent-outline ${styles.back}`}>
          Back to Events
        </Link>
      </article>
    </PageShell>
  );
}
