"use client";

import { useRef, useState } from "react";

import styles from "./PgpOverview.module.scss";

const PLAY = "/programmes/pgp-entrepreneurship/play-button.svg";

/** Inline Drupal MP4 with a centre play button (hidden while playing); native controls stay. */
export function PgpInlineVideo({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.media}>
      <video
        ref={ref}
        className={`${styles.photo} ${styles.video}`}
        // "#t=0.1": every browser shows the first frame (the speaker) as the thumbnail.
        src={`${src}#t=0.1`}
        controls
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {playing ? null : (
        <button
          type="button"
          className={styles.playButton}
          aria-label={`Play video: ${title}`}
          onClick={() => ref.current?.play()}>
          <img src={PLAY} alt="" className={styles.playIcon} />
        </button>
      )}
    </div>
  );
}
