"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "@/assets/svg/Arrows";
import type {
  HomeCommunitySectionAttributes,
  JsonApiResource,
} from "@/lib/drupal";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./HomeCommunitySection.module.scss";
import clsx from "clsx";
import { toSafeEmbedUrl } from "@/lib/security/embed-url";
import { PlayIcon } from "@/components/paragraphs/MediaBoxWithPopup/MediaBoxWithPopupGridOf2";

export type CommunityTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  /** YouTube/Vimeo link; when set the card shows the photo with a play button (Figma). */
  videoUrl?: string;
  /** YouTube/Vimeo link for a quote card: adds a "Watch Video" link under the author. */
  watchUrl?: string;
};

type HomeCommunitySectionProps = {
  paragraph?: JsonApiResource<
    "paragraph--home_community_section",
    HomeCommunitySectionAttributes
  >;
  testimonials?: CommunityTestimonial[];
  children?: React.ReactNode;
  /** Program pages: compact mobile cards + Show More / Show Less on long quotes. */
  compactMobile?: boolean;
};

const CARD_HEIGHT = 380;
const GAP = 30;
const STEP_SIZE = CARD_HEIGHT + GAP;
const HALF_STEP = STEP_SIZE / 2;
const TRACK_SLOTS = Array.from({ length: 11 }, (_, i) => i - 5);
const ZERO_SLOT_OFFSET = 5;
const COL1_BASE_Y = -(ZERO_SLOT_OFFSET * STEP_SIZE) - CARD_HEIGHT / 2;
const COL2_BASE_Y = COL1_BASE_Y - HALF_STEP;
const COL3_BASE_Y = COL1_BASE_Y;

// Tiles ask the section to open a video. The player is rendered by the section,
// not the tile, so the auto-scrolling columns cannot swap or close it.
const OpenVideoContext = createContext<(item: CommunityTestimonial) => void>(
  () => {},
);

// Program pages turn on the quote Show More / Show Less toggle (mobile).
const QuoteToggleContext = createContext(false);

/**
 * Quote text. With the toggle on, mobile shows 7 lines and a Show More / Show Less
 * button, but only when the quote is actually longer than that (measured).
 */
function QuoteText({ quote }: { quote: string }) {
  const toggle = useContext(QuoteToggleContext);
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!toggle || !el) return;
    // Only measured while clamped; re-checked when the card resizes.
    const check = () => {
      if (!expanded) setOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [toggle, expanded, quote]);

  if (!toggle) return <p className={styles.quote}>{quote}</p>;

  return (
    <>
      <p ref={ref} className={clsx(styles.quote, !expanded && styles.quoteClamp)}>
        {quote}
      </p>
      {overflows || expanded ? (
        <button
          type="button"
          className={styles.quoteToggle}
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}>
          {expanded ? "Show Less" : "Show More"}
        </button>
      ) : null}
    </>
  );
}

// Figma video card: full-bleed photo, centred play button, video opens in a dialog.
function VideoTile({ item }: { item: CommunityTestimonial }) {
  const openVideo = useContext(OpenVideoContext);
  const embed = item.videoUrl
    ? toSafeEmbedUrl(item.videoUrl, { autoplay: true })
    : null;

  if (!embed) return null;

  return (
    <>
      <button
        type="button"
        className={styles.videoTile}
        onClick={() => openVideo(item)}
        aria-label={`Play video: ${item.name || "testimonial"}`}
      >
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.avatarAlt || item.name}
            fill
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.videoImage}
          />
        ) : null}
        <span className={styles.videoPlay}>
          <PlayIcon />
        </span>
      </button>
    </>
  );
}

// Section-level video dialog (portal: the animated columns use transforms,
// which would trap a fixed overlay).
function VideoDialog({
  item,
  onClose,
}: {
  item: CommunityTestimonial;
  onClose: () => void;
}) {
  const embed = item.videoUrl
    ? toSafeEmbedUrl(item.videoUrl, { autoplay: true })
    : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!embed) return null;

  return createPortal(
    <div className={styles.videoOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.videoDialog}
        role="dialog"
        aria-modal="true"
        aria-label={item.name || "Video"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.videoClose}
          onClick={onClose}
          aria-label="Close video"
        >
          ×
        </button>
        <iframe
          className={styles.videoPlayer}
          src={embed}
          title={item.name || "Testimonial video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>,
    document.body,
  );
}

function TestimonialBody({ item }: { item: CommunityTestimonial }) {
  const openVideo = useContext(OpenVideoContext);
  if (item.videoUrl) return <VideoTile item={item} />;
  const canWatch = item.watchUrl ? Boolean(toSafeEmbedUrl(item.watchUrl)) : false;
  return (
    <>
      <QuoteText quote={item.quote} />
      <div className={styles.author}>
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.avatarAlt || item.name}
            width={50}
            height={50}
            className={styles.avatar}
          />
        ) : null}
        <div>
          {item.name ? <h4 className={styles.name}>{item.name}</h4> : null}
          {item.role ? <span className={styles.role}>{item.role}</span> : null}
          {/* Video testimonial: opens the section video dialog. */}
          {canWatch ? (
            <button
              type="button"
              className={styles.watchVideo}
              onClick={() => openVideo({ ...item, videoUrl: item.watchUrl })}
              aria-label={`Watch video: ${item.name || "testimonial"}`}>
              Watch Video
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function TestimonialCard({
  item,
  opacity,
  transitioning,
}: {
  item: CommunityTestimonial;
  opacity: number;
  transitioning: boolean;
}) {
  return (
    <div
      className={styles.activeCardOverlay}
      style={{
        opacity,
        transition: transitioning
          ? "opacity 0.75s cubic-bezier(0.25, 1, 0.5, 1)"
          : "none",
      }}
    >
      <TestimonialBody item={item} />
    </div>
  );
}

export function HomeCommunitySection({
  testimonials = [],
  children,
  compactMobile = false,
}: HomeCommunitySectionProps) {
  const count = testimonials.length;
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Open video: auto-scroll pauses until the dialog closes.
  const [activeVideo, setActiveVideo] = useState<CommunityTestimonial | null>(
    null,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (count === 0 || isMobile || activeVideo) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [count, isMobile, activeVideo]);

  useEffect(() => {
    if (!isTransitioning || count === 0 || isMobile) return;

    const resetTimer = setTimeout(() => {
      setIsTransitioning(false);
      setStep((prev) => (prev + 1) % count);
    }, 750);

    return () => clearTimeout(resetTimer);
  }, [isTransitioning, count, isMobile]);

  const transitionStyle = isTransitioning
    ? "transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)"
    : "none";
  const col1TranslateY = COL1_BASE_Y + (isTransitioning ? STEP_SIZE : 0);
  const col2TranslateY = COL2_BASE_Y - (isTransitioning ? STEP_SIZE : 0);
  const col3TranslateY = COL3_BASE_Y + (isTransitioning ? STEP_SIZE : 0);

  const itemAt = (offset: number) =>
    count ? testimonials[(step + offset) % count] : null;

  return (
    <OpenVideoContext.Provider value={setActiveVideo}>
      <QuoteToggleContext.Provider value={compactMobile}>
      <div className={clsx(styles.root, isMobile ? styles.mobile : "", compactMobile && styles.compactMobile, count <= 1 && styles.singleSlide)}>
        {children ? <div className={styles.header}>{children}</div> : null}

        <div className={styles.rightSide}>
          <div className={styles.columnContainer}>
            <div
              className={styles.columnTrack}
              style={{
                transform: `translateY(${col1TranslateY}px)`,
                transition: transitionStyle,
              }}
            >
              {TRACK_SLOTS.map((idx) => {
                const isCurrentSlot = idx === 0;
                const isIncomingSlot = idx === -1;
                const item = isCurrentSlot ? itemAt(0) : itemAt(1);
                const cardOpacity = isCurrentSlot
                  ? isTransitioning
                    ? 0
                    : 1
                  : isTransitioning
                    ? 1
                    : 0;

                return (
                  <div
                    key={`col1-slot-${idx}`}
                    className={styles.placeholderCard}
                  >
                    {item && (isCurrentSlot || isIncomingSlot) ? (
                      <TestimonialCard
                        item={item}
                        opacity={cardOpacity}
                        transitioning={isTransitioning}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.columnContainer}>
            <div
              className={styles.columnTrack}
              style={{
                transform: `translateY(${col2TranslateY}px)`,
                transition: transitionStyle,
              }}
            >
              {TRACK_SLOTS.map((idx) => {
                const isTopSlot = idx === 0;
                const isBottomSlot = idx === 1;
                const isIncomingSlot = idx === 2;
                let item = itemAt(1);
                let cardOpacity = 1;

                if (isTopSlot) {
                  item = itemAt(1);
                  cardOpacity = isTransitioning ? 0 : 1;
                } else if (isBottomSlot) {
                  item = itemAt(2);
                  cardOpacity = 1;
                } else if (isIncomingSlot) {
                  item = itemAt(3);
                  cardOpacity = isTransitioning ? 1 : 0;
                }

                return (
                  <div
                    key={`col2-slot-${idx}`}
                    className={styles.placeholderCard}
                  >
                    {item && (isTopSlot || isBottomSlot || isIncomingSlot) ? (
                      <TestimonialCard
                        item={item}
                        opacity={cardOpacity}
                        transitioning={isTransitioning}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.columnContainer}>
            <div
              className={styles.columnTrack}
              style={{
                transform: `translateY(${col3TranslateY}px)`,
                transition: transitionStyle,
              }}
            >
              {TRACK_SLOTS.map((idx) => (
                <div
                  key={`col3-slot-${idx}`}
                  className={styles.placeholderCard}
                />
              ))}
            </div>
          </div>
        </div>

        {count > 0 ? (
          <div className={styles.slider}>
            {count < 2 ? (
              <div className={styles.slideCard}>
                <TestimonialBody item={testimonials[0]} />
              </div>
            ) : (
              <Swiper
                modules={[Navigation]}
                slidesPerView={1.15}
                spaceBetween={20}
                breakpoints={{ 768: { slidesPerView: 2.2 } }}
                navigation={{
                  prevEl: `.${styles.prev}`,
                  nextEl: `.${styles.next}`,
                }}
                className={styles.swiper}
                watchOverflow
              >
                {testimonials.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className={styles.slideCard}>
                      <TestimonialBody item={item} />
                    </div>
                  </SwiperSlide>
                ))}
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.prev}`}
                  aria-label="Previous"
                >
                  <ArrowLeft height={7} width={9} />
                </button>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.next}`}
                  aria-label="Next"
                >
                  <ArrowRight height={7} width={9} />
                </button>
              </Swiper>
            )}
          </div>
        ) : null}
      </div>
      {activeVideo ? (
        <VideoDialog item={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
      </QuoteToggleContext.Provider>
    </OpenVideoContext.Provider>
  );
}
