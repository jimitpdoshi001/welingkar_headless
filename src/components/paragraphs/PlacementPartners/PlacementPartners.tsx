"use client";

import type { DrupalImage, JsonApiResource, PlacementPartnersAttributes } from "@/lib/drupal";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useIsMobile } from "@/util/useMediaQuery";

import styles from "./PlacementPartners.module.scss";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";

type PlacementPartnersProps = {
  paragraph: JsonApiResource<"paragraph--placement_partners", PlacementPartnersAttributes>;
  images?: DrupalImage[];
  children?: React.ReactNode;
};

export function PlacementPartners({ paragraph, images = [], children }: PlacementPartnersProps) {
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;
  const isMobile = useIsMobile();

  return (
    <div>
      {(heading || description) && (
        <div className={styles.intro}>
          {heading ? <h3 className="mb-2">{heading}</h3> : null}

          {description ? (
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
        </div>
      )}

      {images.length > 0 && !isMobile && (
        <div className={styles.logos}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={6}
            slidesPerGroup={1}
            spaceBetween={20}
            // navigation
            loop={images.length > 6}
            navigation={{
              prevEl: `.${styles.prev}`,
              nextEl: `.${styles.next}`,
            }}
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
      )}

      {images.length > 0 && isMobile && (
        <div className={styles.logos}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={20}
            loop={images.length > 6}
            navigation={{
              prevEl: `.${styles.prev}`,
              nextEl: `.${styles.next}`,
            }}
            className={styles.swiper}>
            {Array.from({ length: Math.ceil(images.length / 6) }).map((_, slideIndex) => {
              const slideImages = images.slice(slideIndex * 6, slideIndex * 6 + 6);

              return (
                <SwiperSlide key={slideIndex}>
                  <div className={styles.logoGrid}>
                    {slideImages.map((image) => (
                      <div
                        className={styles.logo}
                        key={image.url}>
                        <Image
                          src={image.url}
                          alt={image.alt}
                          width={image.width ?? 160}
                          height={image.height ?? 80}
                        />
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              );
            })}

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
      )}

      {children}
    </div>
  );
}
