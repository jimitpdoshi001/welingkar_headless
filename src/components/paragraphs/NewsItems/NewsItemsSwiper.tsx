"use client";

import { CoverflowCarousel } from "@/components/coverflow/CoverflowCarousel";
import type { NewsItem } from "@/lib/drupal/news";

type NewsItemsSwiperProps = {
  items: NewsItem[];
};

// The "slider" news style renders as a 3D coverflow (fishermedia "Our Blog").
export function NewsItemsSwiper({ items }: NewsItemsSwiperProps) {
  if (!items || items.length === 0) return null;

  return (
    <CoverflowCarousel
      items={items.map((it) => ({
        id: it.id,
        image: it.image || "",
        title: it.title,
        meta: it.date,
        href: it.href || undefined,
      }))}
    />
  );
}
