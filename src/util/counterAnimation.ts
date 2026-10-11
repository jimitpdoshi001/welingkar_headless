import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Add this class to an element whose text contains a number. */
export const COUNTER_ANIMATION_CLASS = "animate-counter";

const DEFAULT_DURATION = 3.2;
// Start the count-up partway to the target (not from 0/1) so the reel travels a
// shorter distance and the animation reads as smooth rather than a fast spin.
const START_FRACTION = 0.6;
const DEFAULT_EASE = "power3.out";
const DEFAULT_START = "top 85%";
const REEL_EASE = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";

type Grouping = "none" | "en-US" | "en-IN";

interface ParsedCounter {
  prefix: string;
  suffix: string;
  value: number;
  decimals: number;
  grouping: Grouping;
}

interface CounterOptions {
  duration: number;
  delay: number;
  ease: string;
  start: string;
  once: boolean;
}

const COUNTER_TEXT =
  /^(\D*?)(-?(?:\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?)(.*)$/;

function toSelector(className: string): string {
  const name = className.trim().replace(/^\./, "");
  const escaped =
    typeof CSS !== "undefined" && typeof CSS.escape === "function"
      ? CSS.escape(name)
      : name;
  return `.${escaped}`;
}

function detectGrouping(raw: string): Grouping {
  const intPart = raw.replace(/^-/, "").split(".")[0];
  if (!intPart.includes(",")) return "none";

  const groups = intPart.split(",");
  const hasIndianGroup = groups.slice(0, -1).some((group) => group.length === 2);
  return hasIndianGroup ? "en-IN" : "en-US";
}

function parseCounterText(text: string): ParsedCounter | null {
  const match = text.trim().match(COUNTER_TEXT);
  if (!match) return null;

  const [, prefix, raw, suffix] = match;
  const value = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;

  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;

  return {
    prefix,
    suffix,
    value,
    decimals,
    grouping: detectGrouping(raw),
  };
}

function formatCounter(parsed: ParsedCounter, value: number): string {
  const negative = value < 0;
  const absolute = Math.abs(value);
  let formatted: string;

  if (parsed.grouping === "none") {
    formatted =
      parsed.decimals > 0
        ? absolute.toFixed(parsed.decimals)
        : String(Math.trunc(absolute));
  } else {
    formatted = absolute.toLocaleString(
      parsed.grouping === "en-IN" ? "en-IN" : "en-US",
      {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
        useGrouping: true,
      }
    );
  }

  return `${parsed.prefix}${negative ? "-" : ""}${formatted}${parsed.suffix}`;
}

function displayedValue(value: number, parsed: ParsedCounter): number {
  if (parsed.decimals === 0) return Math.trunc(value);

  const factor = 10 ** parsed.decimals;
  return Math.round(value * factor) / factor;
}

function coreText(parsed: ParsedCounter, value: number): string {
  const full = formatCounter(parsed, value);
  const withoutPrefix = parsed.prefix ? full.slice(parsed.prefix.length) : full;
  return parsed.suffix
    ? withoutPrefix.slice(0, withoutPrefix.length - parsed.suffix.length)
    : withoutPrefix;
}

/** Fits the in-progress value into the final number's shape, including commas. */
function maskValue(parsed: ParsedCounter, value: number): string {
  const finalCore = coreText(parsed, parsed.value);
  const digitCount = finalCore.replace(/\D/g, "").length;
  const currentDigits = coreText(parsed, Math.max(0, value)).replace(/\D/g, "");
  const padded = currentDigits.padStart(digitCount, "0").slice(-digitCount);
  let index = 0;

  return finalCore.replace(/\d/g, () => padded[index++] ?? "0");
}

function measureLineHeight(element: HTMLElement): number {
  const style = getComputedStyle(element);
  const lineHeight = parseFloat(style.lineHeight);
  if (Number.isFinite(lineHeight) && lineHeight > 0) return lineHeight;

  const fontSize = parseFloat(style.fontSize);
  return Number.isFinite(fontSize) ? fontSize * 1.2 : 24;
}

interface ReelSlot {
  kind: "digit" | "symbol";
  element: HTMLElement;
  strip?: HTMLElement;
  inFraction: boolean;
  isLastIntegerDigit: boolean;
}

interface CounterReel {
  root: HTMLElement;
  slots: ReelSlot[];
  digits: number[];
  lineHeight: number;
}

function mountCounterReel(
  textElement: HTMLElement,
  parsed: ParsedCounter
): CounterReel {
  const lineHeight = measureLineHeight(textElement);
  const finalText = formatCounter(parsed, parsed.value);
  const mask = maskValue(parsed, 0);

  textElement.textContent = "";
  if (!textElement.hasAttribute("aria-label")) {
    textElement.setAttribute("aria-label", finalText);
  }

  const root = document.createElement("span");
  root.dataset.counterStage = "true";
  root.setAttribute("aria-hidden", "true");
  root.style.display = "inline-flex";
  root.style.alignItems = "flex-end";
  root.style.fontVariantNumeric = "tabular-nums";
  root.style.verticalAlign = "bottom";

  if (parsed.prefix) {
    const prefix = document.createElement("span");
    prefix.textContent = parsed.prefix;
    prefix.style.lineHeight = `${lineHeight}px`;
    root.append(prefix);
  }

  const slots: ReelSlot[] = [];
  const digits: number[] = [];
  const fractionStart = mask.indexOf(".");
  let integerDigits = 0;
  for (let index = 0; index < mask.length; index += 1) {
    if (fractionStart !== -1 && index >= fractionStart) break;
    if (/\d/.test(mask[index])) integerDigits += 1;
  }
  let seenIntegerDigits = 0;

  for (let index = 0; index < mask.length; index += 1) {
    const character = mask[index];
    const inFraction = fractionStart !== -1 && index >= fractionStart;

    if (!/\d/.test(character)) {
      const symbol = document.createElement("span");
      symbol.textContent = character;
      symbol.style.display = "inline-block";
      symbol.style.lineHeight = `${lineHeight}px`;
      symbol.style.overflow = "hidden";
      symbol.style.transition = "max-width 0.35s ease, opacity 0.25s ease";
      root.append(symbol);
      slots.push({
        kind: "symbol",
        element: symbol,
        inFraction,
        isLastIntegerDigit: false,
      });
      continue;
    }

    seenIntegerDigits += inFraction ? 0 : 1;
    const isLastIntegerDigit = !inFraction && seenIntegerDigits === integerDigits;

    const window = document.createElement("span");
    window.style.display = "inline-block";
    window.style.height = `${lineHeight}px`;
    window.style.overflow = "hidden";
    window.style.verticalAlign = "bottom";
    window.style.transition = "max-width 0.35s ease, opacity 0.25s ease";

    const strip = document.createElement("span");
    strip.style.display = "block";
    strip.style.willChange = "transform";

    for (let digit = 0; digit <= 9; digit += 1) {
      const cell = document.createElement("span");
      cell.textContent = String(digit);
      cell.style.display = "block";
      cell.style.height = `${lineHeight}px`;
      cell.style.lineHeight = `${lineHeight}px`;
      strip.append(cell);
    }

    window.append(strip);
    root.append(window);
    slots.push({
      kind: "digit",
      element: window,
      strip,
      inFraction,
      isLastIntegerDigit,
    });
    digits.push(0);
  }

  if (parsed.suffix) {
    const suffix = document.createElement("span");
    suffix.textContent = parsed.suffix;
    suffix.style.lineHeight = `${lineHeight}px`;
    root.append(suffix);
  }

  textElement.append(root);

  return { root, slots, digits, lineHeight };
}

function setSlotVisible(element: HTMLElement, visible: boolean) {
  element.style.maxWidth = visible ? "1.2em" : "0px";
  element.style.opacity = visible ? "1" : "0";
}

function paintReel(reel: CounterReel, mask: string, glide: boolean) {
  let digitIndex = 0;
  let seenSignificant = false;

  reel.slots.forEach((slot, index) => {
    const character = mask[index];
    if (slot.kind === "symbol" || !slot.strip) {
      setSlotVisible(slot.element, slot.inFraction || seenSignificant);
      return;
    }

    const digit = Number(character);
    const hideLeadingZero =
      !slot.inFraction &&
      !slot.isLastIntegerDigit &&
      !seenSignificant &&
      digit === 0;

    if (digit !== 0) seenSignificant = true;
    setSlotVisible(slot.element, !hideLeadingZero);

    const previous = reel.digits[digitIndex];
    if (previous !== digit) {
      const nextTransition = glide ? REEL_EASE : "none";
      const transitionChanged = slot.strip.style.transition !== nextTransition;
      slot.strip.style.transition = nextTransition;
      if (transitionChanged) {
        void slot.strip.offsetWidth;
      }
      slot.strip.style.transform = `translate3d(0, ${-digit * reel.lineHeight}px, 0)`;
      reel.digits[digitIndex] = digit;
    }

    digitIndex += 1;
  });
}

function clearReelMotion(reel: CounterReel) {
  reel.root.style.filter = "none";
  reel.root.style.transform = "none";
}

function readOptions(element: HTMLElement): CounterOptions {
  const duration = parseFloat(element.dataset.animationDuration ?? "");
  const delay = parseFloat(element.dataset.animationDelay ?? "");

  return {
    duration: Number.isFinite(duration) ? duration : DEFAULT_DURATION,
    delay: Number.isFinite(delay) ? delay : 0,
    ease: element.dataset.animationEase || DEFAULT_EASE,
    start: element.dataset.animationStart || DEFAULT_START,
    once:
      element.dataset.animationOnce !== undefined
        ? element.dataset.animationOnce === "true"
        : true,
  };
}

/**
 * The node whose text is counted. The class may sit on that node or a parent
 * that wraps it, including a single nested tag from the CMS.
 */
function resolveTextElement(host: HTMLElement): HTMLElement | null {
  if (host.children.length === 0) {
    return /\d/.test(host.textContent ?? "") ? host : null;
  }

  const leaves = Array.from(host.querySelectorAll<HTMLElement>("*")).filter(
    (node) => node.children.length === 0 && /\d/.test(node.textContent ?? "")
  );

  return leaves[0] ?? null;
}

function collectHosts(root: ParentNode, selector: string): HTMLElement[] {
  const hosts: HTMLElement[] = [];

  if (root instanceof Element && root.matches(selector)) {
    hosts.push(root as HTMLElement);
  }

  hosts.push(...Array.from(root.querySelectorAll<HTMLElement>(selector)));
  return hosts;
}

/**
 * Counts every element with `className` from 0 up to the number already in its
 * text. Prefixes, suffixes, decimals, and thousands separators stay as written.
 *
 * @example
 * initCounterAnimation("animate-counter")
 *
 * <span class="animate-counter">1,250+</span>
 * <span class="animate-counter">98%</span>
 * <span class="animate-counter">$2.5M</span>
 *
 * Optional data attributes on the same element:
 * data-animation-duration, data-animation-delay, data-animation-ease,
 * data-animation-start, data-animation-once
 *
 * Returns a cleanup function that stops the tweens it started.
 */
export function initCounterAnimation(
  className: string = COUNTER_ANIMATION_CLASS,
  root: ParentNode = document
): () => void {
  if (typeof window === "undefined") return () => {};

  gsap.registerPlugin(ScrollTrigger);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const hosts = collectHosts(root, toSelector(className));
  const bound: HTMLElement[] = [];
  const tweens: gsap.core.Tween[] = [];

  hosts.forEach((host) => {
    const textElement = resolveTextElement(host);
    if (!textElement) return;

    const source =
      textElement.getAttribute("data-counter-target") ??
      textElement.textContent ??
      "";

    if (!textElement.hasAttribute("data-counter-target")) {
      textElement.setAttribute("data-counter-target", source);
    }

    const parsed = parseCounterText(source);
    if (!parsed) return;

    if (reducedMotion) {
      textElement.textContent = formatCounter(parsed, parsed.value);
      return;
    }

    if (textElement.getAttribute("data-counter-bound") === "true") return;

    textElement.setAttribute("data-counter-bound", "true");
    bound.push(textElement);

    const options = readOptions(host);
    const startValue = Math.round(parsed.value * START_FRACTION);
    const state = { value: startValue };
    let reel: CounterReel | null = mountCounterReel(textElement, parsed);
    let lastValue = startValue;
    paintReel(reel, maskValue(parsed, startValue), false);

    const tween = gsap.fromTo(
      state,
      { value: startValue },
      {
        value: parsed.value,
        duration: options.duration,
        delay: options.delay,
        ease: options.ease,
        immediateRender: false,
        scrollTrigger: {
          trigger: host,
          start: options.start,
          once: options.once,
          toggleActions: options.once
            ? "play none none none"
            : "play reverse play reverse",
        },
        onStart: () => {
          if (!reel) {
            reel = mountCounterReel(textElement, parsed);
          }
          lastValue = startValue;
          paintReel(reel, maskValue(parsed, startValue), false);
        },
        onUpdate: () => {
          if (!reel) return;

          const shown = displayedValue(state.value, parsed);
          paintReel(reel, maskValue(parsed, shown), true);

          const speed = Math.abs(state.value - lastValue);
          lastValue = state.value;
          const blur = Math.min(3.5, speed * 0.12);
          const progress = parsed.value === 0 ? 1 : state.value / parsed.value;
          reel.root.style.filter = blur > 0.35 ? `blur(${blur.toFixed(2)}px)` : "none";
          reel.root.style.transform =
            progress < 1 ? `translateY(${((1 - progress) * 0.08).toFixed(3)}em)` : "none";
        },
        onComplete: () => {
          if (!reel) return;

          paintReel(reel, maskValue(parsed, parsed.value), true);
          clearReelMotion(reel);
          tweens.push(
            gsap.fromTo(
              reel.root,
              { scale: 1.035 },
              {
                scale: 1,
                duration: 0.55,
                ease: "power3.out",
                transformOrigin: "50% 100%",
              }
            )
          );
        },
        onReverseComplete: () => {
          if (!reel) return;
          paintReel(reel, maskValue(parsed, 0), false);
          clearReelMotion(reel);
        },
      }
    );

    tweens.push(tween);
  });

  if (tweens.length > 0) {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      tweens.forEach((tween) => {
        const trigger = tween.scrollTrigger;
        const triggerElement = trigger?.trigger as HTMLElement | undefined;
        if (!trigger || !triggerElement || tween.progress() > 0) return;

        const start = typeof trigger.vars.start === "string" ? trigger.vars.start : DEFAULT_START;
        const ratioMatch = start.match(/(\d+(?:\.\d+)?)%/);
        const ratio = ratioMatch ? Number(ratioMatch[1]) / 100 : 0.85;

        if (triggerElement.getBoundingClientRect().top <= window.innerHeight * ratio) {
          tween.play();
        }
      });
    });
  }

  return () => {
    tweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
    bound.forEach((element) => {
      const target = element.getAttribute("data-counter-target");
      if (target != null) element.textContent = target;
      element.style.filter = "";
      element.style.transform = "";
      element.removeAttribute("data-counter-bound");
    });
  };
}
