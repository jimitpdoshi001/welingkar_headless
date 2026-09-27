"use client";

import { Children } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { SafeHtml } from "@/components/SafeHtml/SafeHtml";
import { resolveDrupalHref } from "@/lib/drupal/link";
import type { ImageBoxProps } from "./ImageBox";
import styles from "./ImageBoxWefactor.module.scss";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";

export default function ImageBoxWefactor({ paragraph, children }: ImageBoxProps) {
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;

  return (
    <Link
      href={resolveDrupalHref(paragraph.attributes.field_link?.uri) || "#"}
      className={styles.imageBox}>
      <div className={styles.body}>
        {heading ? <h4 className="bold mb-6">{heading}</h4> : null}
        {description ? (
          <SafeHtml
            className={styles.description}
            html={description}
          />
        ) : null}
        {children}
      </div>
    </Link>
  );
}

export function ImageBoxWefactorGroup({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);

  if (slides.length < 2) {
    return <div className={styles.group}>{slides}</div>;
  }

  return (
    <div className={styles.group}>
      <div className={styles.grid}>{slides}</div>
      <div className={styles.slider}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1.15}
          spaceBetween={16}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          className={styles.swiper}
          watchOverflow>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))}

          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            aria-label="Previous">
            <ArrowLeft
              height={7}
              width={9}
            />
          </button>

          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            aria-label="Next">
            <ArrowRight
              height={7}
              width={9}
            />
          </button>
        </Swiper>
      </div>
    </div>
  );
}
