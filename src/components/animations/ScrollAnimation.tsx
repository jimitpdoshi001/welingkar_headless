"use client";

import React, { createContext, useContext, useEffect, useRef, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ANIMATION_REGISTRY,
  getAnimationPreset,
  parseAnimationOptions,
} from "./registry";
import {
  COUNTER_ANIMATION_CLASS,
  initCounterAnimation,
} from "@/util/counterAnimation";

// Auto-reveal: inside any `[data-auto-reveal]` root, text and buttons fade up
// and media fades in, without tagging each element by hand.
const AUTO_TEXT = "h1, h2, h3, h4, h5, h6, p, li, blockquote, a.btn, .btn, button";
const AUTO_MEDIA = "img, video, picture";

function tagAutoReveal(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>("[data-auto-reveal]").forEach((root) => {
    const tag = (selector: string, cls: string) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        // Skip anything already animated, or nested in an animated element,
        // so an element is never moved by two tweens at once.
        if (el.closest("[class*='animate-'], [data-no-reveal]")) return;
        el.classList.add(cls);
        // Slower, softer easing than the default 0.8s power3 for a smooth reveal.
        el.dataset.animationDuration ??= "1.4";
        el.dataset.animationEase ??= "power2.out";
      });
    };
    // Drupal-driven animations inside the root get the same smooth timing.
    root.querySelectorAll<HTMLElement>("[class*='animate-'], [data-animation-stagger]").forEach((el) => {
      el.dataset.animationDuration ??= "1.4";
      el.dataset.animationEase ??= "power2.out";
    });
    tag(AUTO_TEXT, "animate-fade-in-soft");
    // Media: in a `data-auto-reveal="slide-right"` root, in-flow images slide in
    // from the right; absolutely/fixed-positioned media (hero/background and
    // overlapping insets) keep the opacity-only fade so the slide never exposes
    // a gap. Other roots keep the plain fade everywhere.
    const slideMedia = root.dataset.autoReveal === "slide-right";
    root.querySelectorAll<HTMLElement>(AUTO_MEDIA).forEach((el) => {
      if (el.closest("[class*='animate-'], [data-no-reveal]")) return;
      let cls = "animate-fade-in";
      if (slideMedia) {
        const pos = window.getComputedStyle(el).position;
        if (pos !== "absolute" && pos !== "fixed") cls = "animate-fade-in-right";
      }
      el.classList.add(cls);
      el.dataset.animationDuration ??= "1.4";
      el.dataset.animationEase ??= "power2.out";
    });
  });
}

// Ensure ScrollTrigger is registered safely on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationContextType {
  /**
   * Manually trigger a rescan for newly mounted or updated animated elements.
   */
  refreshAnimations: () => void;
}

const ScrollAnimationContext = createContext<ScrollAnimationContextType>({
  refreshAnimations: () => {},
});

export const useScrollAnimation = () => useContext(ScrollAnimationContext);

interface ScrollAnimationProviderProps {
  children: React.ReactNode;
  /**
   * Root element or ref to scope animations. Defaults to document body.
   */
  scope?: React.RefObject<HTMLElement | null>;
}

/**
 * ScrollAnimationProvider wraps the application or component subtree to enable
 * class-based GSAP ScrollTrigger animations.
 */
export function ScrollAnimationProvider({
  children,
  scope,
}: ScrollAnimationProviderProps) {
  const pathname = usePathname();
  const ctxRef = useRef<gsap.Context | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterCleanupRef = useRef<(() => void) | null>(null);

  const scopeRef = useRef(scope);
  useEffect(() => {
    scopeRef.current = scope;
  }, [scope]);

  const initAnimations = useCallback((incremental = false) => {
    if (typeof window === "undefined") return;

    // Accessibility check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const currentScopeRef = scopeRef.current;
    const targetScope =
      currentScopeRef?.current || containerRef.current || document.body;

    if (!targetScope) return;

    tagAutoReveal(targetScope);

    if (prefersReducedMotion) {
      // In reduced motion mode, show elements immediately without animation
      counterCleanupRef.current?.();
      counterCleanupRef.current = null;
      initCounterAnimation(COUNTER_ANIMATION_CLASS, targetScope);

      const allAnimated = targetScope.querySelectorAll<HTMLElement>(
        "[class*='animate-']"
      );
      allAnimated.forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
      });
      return;
    }

    // Incremental rescans (new DOM nodes) add tweens for untouched elements only.
    // Reverting here would restart every running tween on each DOM change,
    // which kept the hero frozen mid-fade while the slider updated the DOM.
    const scan = () => {
      // 1. Process Parent Containers (`.animate-stagger` or `[data-animation-stagger]`)
      const staggerContainers = targetScope.querySelectorAll<HTMLElement>(
        ".animate-stagger, [data-animation-stagger]"
      );

      staggerContainers.forEach((container) => {
        if (container.getAttribute("data-animated") === "true") return;

        const options = parseAnimationOptions(container);

        // Find children with animation classes, or fallback to direct child elements
        let childrenElements = Array.from(
          container.querySelectorAll<HTMLElement>("[class*='animate-']")
        );
        if (childrenElements.length === 0) {
          childrenElements = Array.from(container.children) as HTMLElement[];
        }

        childrenElements = childrenElements.filter(
          (child) =>
            !(
              child.classList.contains(COUNTER_ANIMATION_CLASS) &&
              !getAnimationPreset(child)
            )
        );

        if (childrenElements.length === 0) return;

        // Group children elements by preset to avoid duplicate GSAP tweens
        const groupsByPreset = new Map<
          string,
          {
            preset: typeof ANIMATION_REGISTRY[keyof typeof ANIMATION_REGISTRY];
            elements: HTMLElement[];
            childOpts: ReturnType<typeof parseAnimationOptions>;
          }
        >();

        childrenElements.forEach((child) => {
          const matched = getAnimationPreset(child);
          const presetKey = matched ? matched.className : "animate-fade-in-up";
          const preset = matched
            ? matched.preset
            : ANIMATION_REGISTRY["animate-fade-in-up"];
          const childOpts = parseAnimationOptions(child);
          child.setAttribute("data-animated", "true");

          if (!groupsByPreset.has(presetKey)) {
            groupsByPreset.set(presetKey, { preset, elements: [], childOpts });
          }
          groupsByPreset.get(presetKey)!.elements.push(child);
        });

        // For each group, create a single GSAP tween with native stagger support
        groupsByPreset.forEach(({ preset, elements, childOpts }) => {
          gsap.fromTo(
            elements,
            { ...preset.from },
            {
              ...preset.to,
              duration: childOpts.duration || options.duration,
              delay: childOpts.delay || options.delay,
              ease: childOpts.ease || options.ease,
              // If data-animation-stagger is provided, options.stagger > 0 (staggered). Otherwise 0 (simultaneous).
              stagger: options.stagger,
              scrollTrigger: {
                trigger: container,
                start: options.start,
                toggleActions: options.once
                  ? "play none none none"
                  : "play reverse play reverse",
                once: options.once,
              },
            }
          );
        });

        container.setAttribute("data-animated", "true");
      });

      // 2. Process Individual Animated Elements (`[class*='animate-']`)
      const animatedElements = targetScope.querySelectorAll<HTMLElement>(
        "[class*='animate-']"
      );

      animatedElements.forEach((element) => {
        // Skip if already handled by parent container or previous scan
        if (element.getAttribute("data-animated") === "true") return;

        const match = getAnimationPreset(element);
        if (!match) return;

        const { preset } = match;
        const options = parseAnimationOptions(element);

        gsap.fromTo(
          element,
          { ...preset.from },
          {
            ...preset.to,
            duration: options.duration,
            delay: options.delay,
            ease: options.ease,
            scrollTrigger: {
              trigger: element,
              start: options.start,
              toggleActions: options.once
                ? "play none none none"
                : "play reverse play reverse",
              once: options.once,
            },
          }
        );

        element.setAttribute("data-animated", "true");
      });
    };

    if (incremental && ctxRef.current) {
      ctxRef.current.add(scan);
    } else {
      // Full (re)init: clean setup and teardown via a scoped GSAP context.
      if (ctxRef.current) {
        ctxRef.current.revert();
        // Revert removes the tweens but not our markers; clear them so the
        // scan re-animates those elements instead of skipping them.
        targetScope
          .querySelectorAll<HTMLElement>("[data-animated]")
          .forEach((el) => el.removeAttribute("data-animated"));
      }

      const stopCounters = initCounterAnimation(COUNTER_ANIMATION_CLASS, targetScope);
      const previousStop = counterCleanupRef.current;
      counterCleanupRef.current = () => {
        previousStop?.();
        stopCounters();
      };

      ctxRef.current = gsap.context(scan, targetScope);
    }
  }, []);

  // Initial setup and route change refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      initAnimations();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
      counterCleanupRef.current?.();
      counterCleanupRef.current = null;
    };
  }, [pathname, initAnimations]);

  // Handle Dynamic Content via MutationObserver
  useEffect(() => {
    if (typeof window === "undefined") return;

    let debounceTimer: NodeJS.Timeout;

    const observer = new MutationObserver((mutations) => {
      let hasNewAnimatedElements = false;

      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (
              element.matches?.("[class*='animate-'], .animate-stagger") ||
              element.querySelector?.("[class*='animate-'], .animate-stagger")
            ) {
              hasNewAnimatedElements = true;
            }
          }
        });
      });

      if (hasNewAnimatedElements) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          initAnimations(true);
        }, 100);
      }
    });

    const targetScope =
      scopeRef.current?.current || containerRef.current || document.body;
    observer.observe(targetScope, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [initAnimations]);

  // Trigger positions are measured when tweens are created. Images, carousels and
  // fonts can change the page height afterwards, which leaves later sections with
  // stale start points that are never reached. Re-measure when the height changes.
  useEffect(() => {
    if (typeof window === "undefined" || typeof ResizeObserver === "undefined") return;

    let timer: ReturnType<typeof setTimeout>;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Listen for prefers-reduced-motion toggle changes dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => initAnimations();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [initAnimations]);

  const refreshAnimations = useCallback(() => {
    // Reset data-animated flags so elements can be re-scanned if needed
    const targetScope =
      scopeRef.current?.current || containerRef.current || document.body;
    if (targetScope) {
      const elements = targetScope.querySelectorAll<HTMLElement>("[data-animated]");
      elements.forEach((el) => el.removeAttribute("data-animated"));
    }
    counterCleanupRef.current?.();
    counterCleanupRef.current = null;
    initAnimations();
    ScrollTrigger.refresh();
  }, [initAnimations]);

  const contextValue = useMemo(
    () => ({ refreshAnimations }),
    [refreshAnimations]
  );

  return (
    <ScrollAnimationContext.Provider value={contextValue}>
      <div ref={containerRef} style={{ display: "contents" }}>
        {children}
      </div>
    </ScrollAnimationContext.Provider>
  );
}
