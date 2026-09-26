"use client";

import { Children, useState } from "react";
import clsx from "clsx";
import { getAnimationClass } from "@/components/animations/registry";
import type { JsonApiResource, TabItemsGroupAttributes } from "@/lib/drupal";
import styles from "./TabItemsGroup.module.scss";

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
} as const;

export function TabItemsGroup({ paragraph, tabs = [], children }: TabItemsGroupProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panels = Children.toArray(children);
  const colorClass = textColorClasses[paragraph.attributes.field_text_color as keyof typeof textColorClasses] || "";
  const styleClass = tabStyleClasses[paragraph.attributes.field_tab_style as keyof typeof tabStyleClasses] || styles.type1;
  const animationValue = paragraph.attributes.field_animation;
  const childAnimationClass =
    animationValue === "stagger" ? "animate-fade-in-up" : getAnimationClass(animationValue);

  const labels = tabs.length
    ? tabs
    : panels.map((_, index) => ({ id: `tab-${index}`, title: `Tab ${index + 1}` }));

  if (panels.length === 0) return null;

  const safeIndex = Math.min(activeIndex, panels.length - 1);

  return (
    <div className={clsx(styles.root, colorClass, styleClass)}>
      <div className={styles.tabList} role="tablist">
        {labels.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={index === safeIndex}
            className={clsx(styles.tab, index === safeIndex && styles.active)}
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
          className={clsx(styles.panel, index === safeIndex && childAnimationClass)}>
          {panel}
        </div>
      ))}
    </div>
  );
}
