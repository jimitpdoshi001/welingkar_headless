"use client";

import { useEffect } from "react";
import { CITY_PATTERN, fixCity } from "@/util/city";

/**
 * Safety net that rewrites any remaining "Bangalore" / "Banglore" in the
 * rendered DOM to "Bengaluru" — covers CMS content and structured Drupal
 * fields coming from the backend that still use the old spelling. Only
 * display text and a11y labels are touched; never href/src/slug attributes.
 */
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "NOSCRIPT", "CODE", "PRE"]);
const ATTRS = ["alt", "aria-label", "title", "placeholder"];

function hasCity(s: string | null | undefined): boolean {
  if (!s) return false;
  CITY_PATTERN.lastIndex = 0;
  return CITY_PATTERN.test(s);
}

function fixElementAttrs(el: Element) {
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (hasCity(v)) el.setAttribute(a, fixCity(v) as string);
  }
}

function walk(root: Node) {
  // Text nodes
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName) || parent.isContentEditable) return NodeFilter.FILTER_REJECT;
      return hasCity(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const texts: Text[] = [];
  let n: Node | null;
  while ((n = tw.nextNode())) texts.push(n as Text);
  for (const t of texts) t.nodeValue = fixCity(t.nodeValue);

  // Display attributes on the root + descendants
  if (root instanceof Element) fixElementAttrs(root);
  if (root instanceof Element || root instanceof Document) {
    (root as Element).querySelectorAll?.(`[${ATTRS.join("],[")}]`).forEach(fixElementAttrs);
  }
}

export function CityNormalizer() {
  useEffect(() => {
    walk(document.body);

    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData") {
          const t = m.target as Text;
          if (hasCity(t.nodeValue)) t.nodeValue = fixCity(t.nodeValue);
        } else if (m.type === "attributes") {
          if (m.target instanceof Element) fixElementAttrs(m.target);
        } else {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const t = node as Text;
              if (hasCity(t.nodeValue)) t.nodeValue = fixCity(t.nodeValue);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              walk(node as Element);
            }
          });
        }
      }
    });

    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    return () => obs.disconnect();
  }, []);

  return null;
}

export default CityNormalizer;
