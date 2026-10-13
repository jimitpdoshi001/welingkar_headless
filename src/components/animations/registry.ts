import type { gsap } from "gsap";

export interface AnimationPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

export interface ParsedAnimationOptions {
  duration: number;
  delay: number;
  ease: string;
  start: string;
  once: boolean;
  stagger: number;
}

export const DEFAULT_ANIMATION_OPTIONS: ParsedAnimationOptions = {
  duration: 0.8,
  delay: 0,
  ease: "power3.out",
  start: "top 85%",
  once: true,
  stagger: 0.2,
};

/**
 * Centralized registry mapping CSS animation classes to GSAP tween properties.
 * Transforms (x, y, scale) are used for optimal performance and sub-pixel smoothness.
 */
export const ANIMATION_REGISTRY: Record<string, AnimationPreset> = {
  // Fade animations
  "animate-fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "animate-fade-in-up": {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },
  // Gentle reveal used by auto-reveal pages: short travel so it reads as a fade.
  "animate-fade-in-soft": {
    from: { opacity: 0, y: 24 },
    to: { opacity: 1, y: 0 },
  },
  "animate-fade-in-down": {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0 },
  },
  "animate-fade-in-left": {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  "animate-fade-in-right": {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },

  // Scale & Zoom animations
  "animate-scale-in": {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  },
  "animate-scale-up": {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
  "animate-zoom-in": {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
  },

  // Slide animations
  "animate-slide-up": {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },
  "animate-slide-down": {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0 },
  },
  "animate-slide-left": {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  "animate-slide-right": {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
};

/**
 * Matches an element's class list against the ANIMATION_REGISTRY.
 */
export function getAnimationPreset(
  element: HTMLElement
): { className: string; preset: AnimationPreset } | null {
  const classList = element.classList;
  for (const className of Object.keys(ANIMATION_REGISTRY)) {
    if (classList.contains(className)) {
      return { className, preset: ANIMATION_REGISTRY[className] };
    }
  }
  return null;
}

/**
 * Extracts configuration options from element data attributes, falling back to defaults.
 *
 * Supported attributes:
 * - data-animation-duration="1.2"
 * - data-animation-delay="0.2"
 * - data-animation-ease="power3.out"
 * - data-animation-start="top 90%"
 * - data-animation-once="true" / "false"
 * - data-animation-stagger="0.2"
 */
export function parseAnimationOptions(
  element: HTMLElement
): ParsedAnimationOptions {
  const dataset = element.dataset;

  const duration = dataset.animationDuration
    ? parseFloat(dataset.animationDuration)
    : DEFAULT_ANIMATION_OPTIONS.duration;

  const delay = dataset.animationDelay
    ? parseFloat(dataset.animationDelay)
    : DEFAULT_ANIMATION_OPTIONS.delay;

  const ease = dataset.animationEase || DEFAULT_ANIMATION_OPTIONS.ease;
  const start = dataset.animationStart || DEFAULT_ANIMATION_OPTIONS.start;

  const once = dataset.animationOnce !== undefined
    ? dataset.animationOnce === "true"
    : DEFAULT_ANIMATION_OPTIONS.once;

  // Stagger defaults to 0.2 if animate-stagger class or data-animation-stagger attribute is present, 0 otherwise
  const isStaggerContainer = element.classList.contains("animate-stagger") || dataset.animationStagger !== undefined;
  const defaultStagger = isStaggerContainer ? DEFAULT_ANIMATION_OPTIONS.stagger : 0;

  const stagger = dataset.animationStagger
    ? parseFloat(dataset.animationStagger)
    : defaultStagger;

  return {
    duration: Number.isNaN(duration) ? DEFAULT_ANIMATION_OPTIONS.duration : duration,
    delay: Number.isNaN(delay) ? DEFAULT_ANIMATION_OPTIONS.delay : delay,
    ease,
    start,
    once,
    stagger: Number.isNaN(stagger) ? defaultStagger : stagger,
  };
}



export const animationClasses = {
  fade_in: "animate-fade-in",
  fade_in_up: "animate-fade-in-up",
  fade_in_down: "animate-fade-in-down",
  fade_in_left: "animate-fade-in-left",
  fade_in_right: "animate-fade-in-right",
  scale_in: "animate-scale-in",
  scale_up: "animate-scale-up",
  zoom_in: "animate-zoom-in",
  slide_up: "animate-slide-up",
  slide_down: "animate-slide-down",
  slide_left: "animate-slide-left",
  slide_right: "animate-slide-right",
} as const;

export type AnimationType = keyof typeof animationClasses;

export function getAnimationClass(
  animation?: string | null
): string | null {
  if (!animation) {
    return null;
  }

  return (
    animationClasses[animation as AnimationType] ?? null
  );
}