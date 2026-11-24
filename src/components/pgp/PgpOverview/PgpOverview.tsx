import { VideoPopup } from "@/components/campus/VideoPopup/VideoPopup";
import { PgdmReadMore } from "@/components/pgdm/common/PgdmReadMore";
import { sanitizeCmsHtml } from "@/lib/security/sanitize-html";
import type { PgpOverview as PgpOverviewData } from "@/lib/pgp/pgp-entrepreneurship-data";
import styles from "./PgpOverview.module.scss";

const PLAY = "/programmes/pgp-entrepreneurship/play-button.svg";

// Figma 3045:501 + 3045:500: text left, 610x591 photo right with play button,
// faint green arrow watermark on the left edge.
export function PgpOverview({ data }: { data: PgpOverviewData }) {
  const media = (
    <>
      <picture>
        {/* Phone-size photo from Drupal when present. */}
        {data.imageMobile ? <source media="(max-width: 767px)" srcSet={data.imageMobile} /> : null}
        <img src={data.image} alt="" className={styles.photo} />
      </picture>
      <img src={PLAY} alt="" className={styles.play} aria-hidden="true" />
    </>
  );

  return (
    <section id="overview" className={styles.section}>
      <img src="/programmes/pgp-entrepreneurship/arrow-decor.svg" alt="" className={styles.decor} aria-hidden="true" />
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          {data.heading ? <h2 className={styles.heading}>{data.heading}</h2> : null}
          {/* Drupal rich text (sanitized); the built-in copy uses plain paragraphs. */}
          {data.html ? (
            <PgdmReadMore html={sanitizeCmsHtml(data.html)} className={`${styles.body} ${styles.rich}`} />
          ) : (
            data.paragraphs.map((p, i) => (
              <p key={i} className={styles.body}>
                {p}
              </p>
            ))
          )}
        </div>
        {data.videoFile ? (
          // Drupal MP4 (vertical), cropped to the card. No poster: "#t=0.1" makes every browser
          // show the video's first frame (the speaker) as the thumbnail.
          <div className={styles.media}>
            <video
              className={`${styles.photo} ${styles.video}`}
              src={`${data.videoFile}#t=0.1`}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        ) : data.videoHref ? (
          <VideoPopup videoUrl={data.videoHref} title={data.heading} className={styles.media}>
            {media}
          </VideoPopup>
        ) : (
          <div className={styles.media}>{media}</div>
        )}
      </div>
    </section>
  );
}
