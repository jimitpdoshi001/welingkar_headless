"use client";

import { Children, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { getAnimationClass } from "@/components/animations/registry";

import "swiper/css";
import "swiper/css/navigation";

import type { GroupItemsAttributes, JsonApiResource } from "@/lib/drupal";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import styles from "./GroupItems.module.scss";

type GroupItemsProps = {
  paragraph: JsonApiResource<"paragraph--group_items", GroupItemsAttributes>;
  children?: React.ReactNode;
};

const textColorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  black: "text-black",
} as const;

function wrapAnimatedChildren(children: React.ReactNode, animationClass: string) {
  return Children.map(children, (child) => <div className={animationClass}>{child}</div>);
}

function GroupSlider({
  children,
  columns,
}: {
  children: React.ReactNode;
  columns: number;
}) {
  const slides = Children.toArray(children);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperInstance?.navigation) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={16}
        watchOverflow
        breakpoints={{
          768: {
            slidesPerView: Math.min(2, columns),
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: columns,
            spaceBetween: 30,
          },
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSwiper={setSwiperInstance}>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
        <button
          ref={prevRef}
          type="button"
          className={clsx(styles.arrow, styles.prev)}
          aria-label="Previous">
          <ArrowLeft
            height={7}
            width={9}
          />
        </button>
        <button
          ref={nextRef}
          type="button"
          className={clsx(styles.arrow, styles.next)}
          aria-label="Next">
          <ArrowRight
            height={7}
            width={9}
          />
        </button>
      </Swiper>
    </div>
  );
}

export function GroupItems({ paragraph, children }: GroupItemsProps) {
  const displayType = paragraph.attributes.field_display_type || "grid";
  const columns = Number(paragraph.attributes.field_number_of_columns) || 3;
  const colorClass = textColorClasses[paragraph.attributes.field_text_color as keyof typeof textColorClasses] || "";
  const animationValue = paragraph.attributes.field_animation;
  const childAnimationClass =
    animationValue === "stagger"
      ? "animate-fade-in-up"
      : getAnimationClass(animationValue);
  const animatedChildren = childAnimationClass ? wrapAnimatedChildren(children, childAnimationClass) : children;

  return (
    <div
      className={clsx(
        styles.root,
        colorClass,
        displayType === "grid" && styles.grid,
        displayType === "list" && styles.list,
        childAnimationClass && "animate-stagger"
      )}
      style={{ "--columns": columns } as React.CSSProperties}>
      {displayType === "slider" ? <GroupSlider columns={columns}>{animatedChildren}</GroupSlider> : animatedChildren}
    </div>
  );
}
