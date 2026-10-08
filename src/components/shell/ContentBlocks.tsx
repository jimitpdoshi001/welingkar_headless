import Link from "next/link";
import clsx from "clsx";

import styles from "./ContentBlocks.module.scss";

/** A padded container section, optionally tinted, with a heading + paragraphs. */
export function ContentSection({
  heading,
  lead,
  paragraphs,
  tint,
  align = "left",
  children,
}: {
  heading?: string;
  lead?: string;
  paragraphs?: string[];
  tint?: "cream" | "purple";
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const bgClass = tint === "cream" ? "bg-light-yellow" : tint === "purple" ? "bg-secondary" : "";
  const onDark = tint === "purple";

  return (
    <section className={bgClass}>
      <div className={clsx("container", styles.section, align === "center" && styles.center, onDark && styles.onDark)}>
        {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {paragraphs?.map((p, i) => (
          <p
            key={i}
            className={styles.body}>
            {p}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}

/** A presentational filter bar (search + selects) matching the Figma listings. */
export function FilterBar({ search, selects }: { search?: boolean; selects?: { label: string; options: string[] }[] }) {
  return (
    <section>
      <div className={clsx("container", styles.filterBar)}>
        {search ? (
          <input
            type="search"
            placeholder="Search…"
            aria-label="Search"
            className={styles.filterSearch}
          />
        ) : null}
        {selects?.map((sel) => (
          <select
            key={sel.label}
            aria-label={sel.label}
            defaultValue=""
            className={styles.filterSelect}>
            <option value="">{sel.label}</option>
            {sel.options.map((o) => (
              <option
                key={o}
                value={o}>
                {o}
              </option>
            ))}
          </select>
        ))}
      </div>
    </section>
  );
}

export type LinkCard = { title: string; text?: string; href: string; image?: string; meta?: string };

/** A responsive grid of link cards — used for listing / index pages. */
export function LinkCardGrid({ heading, cards, columns = 3, tint }: { heading?: string; cards: LinkCard[]; columns?: 2 | 3 | 4; tint?: "cream" | "purple" }) {
  const bgClass = tint === "cream" ? "bg-light-yellow" : tint === "purple" ? "bg-secondary" : "";
  const onDark = tint === "purple";

  return (
    <section className={bgClass}>
      <div className={clsx("container", styles.section, onDark && styles.onDark)}>
        {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
        <div className={clsx(styles.grid, styles[`cols${columns}`])}>
          {cards.map((card) => (
            <Link
              key={card.href + card.title}
              href={card.href}
              className={styles.card}>
              {card.image ? (
                <span className={styles.cardImageWrap}>
                  <img
                    src={card.image}
                    alt=""
                    className={styles.cardImage}
                  />
                </span>
              ) : null}
              <span className={styles.cardBody}>
                {card.meta ? <span className={styles.cardMeta}>{card.meta}</span> : null}
                <span className={styles.cardTitle}>{card.title}</span>
                {card.text ? <span className={styles.cardText}>{card.text}</span> : null}
                <span className={styles.cardLink}>Learn more →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
