"use client";

import { Children } from "react";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./ImageBox.module.scss";

type ImageBoxGroupProps = {
  children: React.ReactNode;
};

export function ImageBoxGroup({ children }: ImageBoxGroupProps) {
  const slides = Children.toArray(children);

  if (slides.length < 2) {
    return <div className={styles.group}>{slides}</div>;
  }

  return (
    <div className={""}>
      <div className={styles.grid}>{slides}</div>
      <div className={styles.slider}>
        <Swiper
          modules={[Pagination, A11y]}
          slidesPerView={1.15}
          spaceBetween={16}
          pagination={{ clickable: true }}
          watchOverflow>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
