"use client";

import type { DrupalImage, JsonApiResource, PlacementPartnersAttributes } from "@/lib/drupal";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./PlacementPartners.module.scss";

type PlacementPartnersProps = {
  paragraph: JsonApiResource<"paragraph--placement_partners", PlacementPartnersAttributes>;
  images?: DrupalImage[];
  children?: React.ReactNode;
};

export function PlacementPartners({ paragraph, images = [], children }: PlacementPartnersProps) {
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;

  return (
    <div>
      {(heading || description) && (
        <div className={styles.intro}>
          {heading ? <h1 className="mb-2">{heading}</h1> : null}

          {description ? (
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
        </div>
      )}

      {images.length > 0 && (
        <div className={styles.logos}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={6}
            slidesPerGroup={1}
            spaceBetween={20}
            navigation
            loop={images.length > 6}
            className={styles.swiper}>
            {images.map((image) => (
              <SwiperSlide key={image.url}>
                <div className={styles.logo}>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={image.width ?? 160}
                    height={image.height ?? 80}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {children}
    </div>
  );
}
