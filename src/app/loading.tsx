import styles from "@/components/Loader/NavigationLoader.module.scss";
import { Logo } from "@/assets/svg/Logos";

export default function Loading() {
  return (
    <div className={styles.fullScreenLoader} role="progressbar" aria-label="Loading page">
      <div className={styles.loaderCenter}>
        <div className={styles.logoWrapper}>
          <Logo width={220} height={55} />
        </div>
        <div className={styles.progressBarTrack}>
          <div className={styles.progressBarFill} />
        </div>
      </div>
    </div>
  );
}

