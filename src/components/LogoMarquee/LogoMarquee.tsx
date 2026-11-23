import styles from "@/components/paragraphs/PlacementPartners/PlacementPartners.module.scss";

type Logo = { name: string; image: string };

/** One marquee list: logos repeated until at least 12, so it is wider than the screen. */
const loopList = (logos: Logo[]) => Array.from({ length: Math.ceil(12 / logos.length) }, () => logos).flat();

/**
 * Continuous logo carousel with the home "Our Placement Partners" styles and
 * animation: the list is rendered twice and the track moves left by one list
 * width, so the loop is seamless; it pauses while a logo is hovered.
 */
export function LogoMarquee({ logos }: { logos: Logo[] }) {
  if (!logos.length) return null;
  const list = loopList(logos);
  return (
    <div className={styles.marquee}>
      <ul
        className={styles.track}
        style={{ ["--marquee-duration" as string]: `${Math.max(20, logos.length * 3)}s` }}>
        {[...list, ...list].map((logo, i) => (
          <li
            key={`${logo.image}-${i}`}
            className={styles.logo}
            // Second copy is only for the seamless loop: hidden from screen readers.
            aria-hidden={i >= list.length ? true : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Drupal/local logos of unknown size */}
            <img
              src={logo.image}
              alt={i >= list.length ? "" : logo.name}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
