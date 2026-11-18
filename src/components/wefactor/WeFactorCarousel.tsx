import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import type { WeFactorItem } from "@/lib/wefactor/welearning-data";
import styles from "./WeFactorDetailPage.module.scss";

/**
 * Figma 3341:814 carousel component: cream band, heading with the site's
 * ScrollArrows on the right, photo slider left and text right.
 */
type Slide = {
  key: string;
  title?: string;
  image: string;
  paragraphs: string[];
  downloads?: { label: string; href: string }[];
};

export function WeFactorCarousel({ item, tinted }: { item: WeFactorItem; tinted: boolean }) {
  // Sub-topic slides (own heading each) or one text repeated with each photo.
  const slides: Slide[] = item.slides?.length
    ? item.slides.map((s) => ({ key: s.id, title: s.title, image: s.image, paragraphs: s.paragraphs, downloads: s.downloads }))
    : (item.images ?? []).map((src) => ({ key: src, image: src, paragraphs: item.paragraphs, downloads: item.downloads }));
  const trackId = `${item.id}-photos`;
  return (
    <section id={item.id} className={`${styles.carousel} ${tinted ? styles.tinted : ""}`}>
      <div className="container">
        <div className={styles.carouselHead}>
          <h2 className={styles.carouselTitle}>{item.title}</h2>
          {slides.length > 1 ? <ScrollArrows targetId={trackId} /> : null}
        </div>

        {/* Each slide = photo + text; the arrows move the whole slide. */}
        <ul id={trackId} className={styles.track}>
          {slides.map((slide, i) => {
            // Repeated text slides are hidden from screen readers after the first.
            const repeat = !item.slides?.length && i > 0;
            return (
              <li
                key={slide.key}
                id={item.slides?.length ? slide.key : undefined}
                className={`${styles.slide} ${styles.carouselBody}`}
                aria-hidden={repeat ? true : undefined}>
                <img
                  src={slide.image}
                  alt={slide.title ?? (slides.length > 1 ? `${item.title} ${i + 1} of ${slides.length}` : item.title)}
                  className={styles.photo}
                />
                <div className={styles.text}>
                  {slide.title ? <h3 className={styles.slideTitle}>{slide.title}</h3> : null}
                  {slide.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {slide.downloads?.length ? (
                    <div className={styles.downloads}>
                      {slide.downloads.map((d) => (
                        <a
                          key={d.href}
                          href={d.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={repeat ? -1 : undefined}
                          className="btn accent">
                          Download {d.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
