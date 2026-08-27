import type { HomeCommunitySectionAttributes, JsonApiResource } from "@/lib/drupal";

import styles from "./HomeCommunitySection.module.scss";
type HomeCommunitySectionProps = {
  paragraph: JsonApiResource<"paragraph--home_community_section", HomeCommunitySectionAttributes>;
  children?: React.ReactNode;
};

const data = [
  {
    title: "Community",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Community",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Community",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];

export function HomeCommunitySection({ children }: HomeCommunitySectionProps) {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>{children}</div>

        <div className={styles.rightSide}>
          <div className={styles.column1}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
          </div>
          <div className={styles.column1}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
          </div>
          <div className={styles.column1}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
          </div>
        </div>
      </div>
    </>
  );
}
