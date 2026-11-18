import { ScrollArrows } from "@/components/campus/ScrollArrows/ScrollArrows";
import styles from "./WeFactorDetailPage.module.scss";

type Props = { id: string; images: string[]; alt: string; className?: string };

/**
 * Photo slot for a WeFactor section. Several photos = a snap-scrolling row with
 * the site's existing ScrollArrows (same as the WeResearch publications row).
 */
export function PhotoSlider({ id, images, alt, className = "" }: Props) {
  if (images.length === 1) return <img src={images[0]} alt={alt} className={className} />;
  const trackId = `${id}-photos`;
  return (
    <div className={styles.slider}>
      <ul id={trackId} className={styles.track}>
        {images.map((src, i) => (
          <li key={src} className={styles.slide}>
            <img src={src} alt={`${alt} ${i + 1} of ${images.length}`} className={className} />
          </li>
        ))}
      </ul>
      <div className={styles.sliderArrows}>
        <ScrollArrows targetId={trackId} />
      </div>
    </div>
  );
}
