import type { GroupSliderAttributes, JsonApiResource } from "@/lib/drupal";
import type { ContentFieldItem } from "../ContentField/ContentField";

export type GroupSliderProps = {
  paragraph: JsonApiResource<"paragraph--group_slider", GroupSliderAttributes>;
  items?: ContentFieldItem[];
  children?: React.ReactNode;
};

export function getGroupSliderConfig(paragraph: GroupSliderProps["paragraph"]) {
  const seconds = Number(paragraph.attributes.field_autoplay_speed) || 4;

  return {
    showArrows: Boolean(paragraph.attributes.field_show_arrows),
    showPaginations: Boolean(paragraph.attributes.field_show_paginations),
    autoplay: paragraph.attributes.field_enable_autoplay
      ? { delay: seconds * 1000, disableOnInteraction: false as const }
      : false,
  };
}
