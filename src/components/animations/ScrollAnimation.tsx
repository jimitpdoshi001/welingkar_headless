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

  const scopeRef = useRef(scope);
  useEffect(() => {
    scopeRef.current = scope;
  }, [scope]);

  const initAnimations = useCallback(() => {
    if (typeof window === "undefined") return;

    // Accessibility check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const currentScopeRef = scopeRef.current;
    const targetScope =
      currentScopeRef?.current || containerRef.current || document.body;

    if (!targetScope) return;

    if (prefersReducedMotion) {
      // In reduced motion mode, show elements immediately without animation
      const allAnimated = targetScope.querySelectorAll<HTMLElement>(
        "[class*='animate-']"
      );
      allAnimated.forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
      });
      return;
    }

    // Scoped GSAP Context handles clean setup & teardown
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    ctxRef.current = gsap.context(() => {
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
    }, targetScope);
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
          initAnimations();
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
