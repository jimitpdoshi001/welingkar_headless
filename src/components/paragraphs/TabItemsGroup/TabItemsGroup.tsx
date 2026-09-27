"use client";

import { Children, useState } from "react";
import clsx from "clsx";
import { getAnimationClass } from "@/components/animations/registry";
import type { JsonApiResource, TabItemsGroupAttributes } from "@/lib/drupal";
import styles from "./TabItemsGroup.module.scss";
import { ArrowDown } from "@/assets/svg/Arrows";

export type TabItem = {
  id: string;
  title: string;
};

type TabItemsGroupProps = {
  paragraph: JsonApiResource<"paragraph--tab_items_group", TabItemsGroupAttributes>;
  tabs?: TabItem[];
  children?: React.ReactNode;
};

const textColorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  black: "text-black",
} as const;

const tabStyleClasses = {
  type_1: styles.type1,
  type_2: styles.type2,
  type_3: styles.type3,
  type_4: styles.type4,
  type_5: styles.type5,
  faqs: styles.faqs,
} as const;

function FaqIcon({ open }: { open: boolean }) {
  return (
    <span
      className={clsx(styles.faqIcon, open && styles.faqIconArrowOpen)}
      aria-hidden>
      <ArrowDown
        height={8}
        width={12}
      />
    </span>
  );
}

export function TabItemsGroup({ paragraph, tabs = [], children }: TabItemsGroupProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panels = Children.toArray(children);
  const colorClass = textColorClasses[paragraph.attributes.field_text_color as keyof typeof textColorClasses] || "";
  const tabStyle = paragraph.attributes.field_tab_style || "type_1";
  const isFaqs = tabStyle === "faqs";
  const styleClass = tabStyleClasses[tabStyle as keyof typeof tabStyleClasses] || styles.type1;
  const animationValue = paragraph.attributes.field_animation;
  const childAnimationClass = animationValue === "stagger" ? "animate-fade-in-up" : getAnimationClass(animationValue);

  const labels = tabs.length ? tabs : panels.map((_, index) => ({ id: `tab-${index}`, title: `Tab ${index + 1}` }));

  if (panels.length === 0) return null;

  const safeIndex = Math.min(activeIndex, panels.length - 1);

  if (isFaqs) {
    return (
      <div className={clsx(styles.root, styles.faqs, colorClass, childAnimationClass && "animate-stagger")}>
        {labels.map((tab, index) => {
          const open = index === safeIndex;

          return (
            <div
              key={tab.id}
              className={clsx(styles.faqItem, open && styles.faqItemOpen, childAnimationClass)}>
              <button
                type="button"
                className={styles.faqQuestion}
                aria-expanded={open}
                onClick={() => setActiveIndex(open ? -1 : index)}>
                <span className={styles.faqQuestionText}>{tab.title}</span>
                <FaqIcon open={open} />
              </button>
              <div
                className={clsx(styles.faqAnswer, open && styles.faqAnswerOpen)}
                aria-hidden={!open}>
                <div className={styles.faqAnswerInner}>{panels[index]}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={clsx(styles.root, colorClass, styleClass)}>
      <div
        className={clsx(styles.tabList, childAnimationClass && "animate-stagger")}
        role="tablist">
        {labels.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={index === safeIndex}
            className={clsx(styles.tab, index === safeIndex && styles.active, childAnimationClass)}
            onClick={() => setActiveIndex(index)}>
            {tab.title}
          </button>
        ))}
      </div>

      {panels.map((panel, index) => (
        <div
          key={labels[index]?.id || index}
          role="tabpanel"
          hidden={index !== safeIndex}
          className={styles.panel}>
          {panel}
        </div>
      ))}
    </div>
  );
}
