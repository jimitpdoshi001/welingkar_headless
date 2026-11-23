"use client";

import { useState } from "react";

import newsStyles from "@/components/paragraphs/NewsItems/NewsItems.module.scss";
import type { MdcData } from "@/lib/mdc/mdc-data";
import styles from "./MdcPage.module.scss";

type Photo = { image: string; caption: string };
const PAGE = 5;

/**
 * Gallery in the home News & Events grid: each set of 5 photos = 1 featured + 4 small.
 * With `rules`: first view = captioned photos (up to 5, minus hidden captions); Load More then
 * reveals the rest (uncaptioned + hidden-caption photos) 5 at a time.
 */
export function MdcGallery({ images, rules }: { images: Photo[]; rules?: MdcData["galleryRules"] }) {
  const hidden = new Set((rules?.hiddenCaptions ?? []).map((c) => c.trim().toLowerCase()));
  const isFirst = (g: Photo) => (!rules?.captionedOnly || g.caption.trim()) && !hidden.has(g.caption.trim().toLowerCase());
  const first = rules ? images.filter(isFirst) : images;
  const later = rules ? images.filter((g) => !isFirst(g)) : [];
  const photos = [...first, ...later];
  const [count, setCount] = useState(rules ? Math.min(PAGE, first.length) || PAGE : photos.length);
  const shown = photos.slice(0, count);

  return (
    <>
      {Array.from({ length: Math.ceil(shown.length / PAGE) }, (_, c) => shown.slice(c * PAGE, c * PAGE + PAGE)).map((chunk, c) => (
        <div
          key={c}
          className={`${newsStyles.mainGrid} ${styles.galleryGrid}`}>
          {chunk.map((g, k) => (
            <figure
              key={g.image}
              className={`${newsStyles.card} ${k === 0 ? newsStyles.featuredCard : newsStyles.imageCard} ${styles.galleryItem}`}>
              <img
                src={g.image}
                alt={g.caption}
                loading="lazy"
              />
              {g.caption ? (
                k === 0 ? (
                  <figcaption className={newsStyles.featuredContent}>
                    <h6>{g.caption}</h6>
                  </figcaption>
                ) : (
                  <figcaption className={styles.galleryCaption}>{g.caption}</figcaption>
                )
              ) : null}
            </figure>
          ))}
        </div>
      ))}
      {count < photos.length ? (
        <div className={styles.galleryMore}>
          <button
            type="button"
            className="btn"
            onClick={() => setCount((n) => n + PAGE)}>
            Load More
          </button>
        </div>
      ) : null}
    </>
  );
}
