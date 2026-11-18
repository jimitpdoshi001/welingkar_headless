import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import type { WeFactorItem } from "@/lib/wefactor/welearning-data";
import styles from "./WeFactorDetailPage.module.scss";

/**
 * Figma 3341:814 carousel component: cream band, heading with the site's
 * ScrollArrows on the right, photo slider left and text right.
 */
export function WeFactorCarousel({ item, tinted }: { item: WeFactorItem; tinted: boolean }) {
  const images = item.images ?? [];
  const trackId = `${item.id}-photos`;
  return (
    <section id={item.id} className={`${styles.carousel} ${tinted ? styles.tinted : ""}`}>
      <div className="container">
        <div className={styles.carouselHead}>
          <h2 className={styles.carouselTitle}>{item.title}</h2>
          {images.length > 1 ? <ScrollArrows targetId={trackId} /> : null}
        </div>

        {/* Each slide = photo + text (as on the live site, the text repeats with each photo). */}
        <ul id={trackId} className={styles.track}>
          {images.map((src, i) => (
            <li
              key={src}
              className={`${styles.slide} ${styles.carouselBody}`}
              aria-hidden={i > 0 ? true : undefined}>
              <img
                src={src}
                alt={images.length > 1 ? `${item.title} ${i + 1} of ${images.length}` : item.title}
                className={styles.photo}
              />
              <div className={styles.text}>
                {item.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {item.downloads?.length ? (
                  <div className={styles.downloads}>
                    {item.downloads.map((d) => (
                      <a
                        key={d.href}
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={i > 0 ? -1 : undefined}
                        className="btn accent">
                        Download {d.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
