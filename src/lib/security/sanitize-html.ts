import sanitizeHtml from "sanitize-html";
import { drupalConfig } from "@/lib/drupal/config";

/** Prepend the Drupal base URL to a root-relative media/asset path. */
function toAbsoluteAsset(url: string | undefined): string | undefined {
  if (!url) return url;
  // Only rewrite root-relative paths (keep absolute URLs, data:, and anchors as-is).
  if (!url.startsWith("/") || url.startsWith("//")) return url;
  return `${drupalConfig.baseUrl}${url}`;
}

/** Rewrite each candidate URL in a srcset ("url 1x, url 2x") to an absolute asset URL. */
function absolutizeSrcset(srcset: string | undefined): string | undefined {
  if (!srcset) return srcset;
  return srcset
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      const [u, ...rest] = trimmed.split(/\s+/);
      return [toAbsoluteAsset(u), ...rest].join(" ");
    })
    .join(", ");
}

// Root-relative hrefs that are Drupal assets (downloads) rather than site pages.
const ASSET_HREF = /^\/(sites|system\/files|files|themes|modules|libraries|core)\//;

const IFRAME_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "youtube.com",
  "player.vimeo.com",
  "www.google.com",
  "google.com",
  "maps.google.com",
];

const COLOR = [/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i, /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(?:0|1|0?\.\d+)\s*\)$/i];

const LENGTH = [/^(?:0|\d+(?:\.\d+)?)(?:px|%|em|rem)$/];

const BOX = [/^(?:0|\d+(?:\.\d+)?(?:px|%|em|rem))(?:\s+(?:0|\d+(?:\.\d+)?(?:px|%|em|rem))){0,3}$/];

/** Strip scripts, event handlers, and unsafe URLs from CMS HTML. */
export function sanitizeCmsHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe", "picture", "video", "source", "figcaption", "figure"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id", "style"],
      a: ["href", "name", "target", "rel", "title", "class", "id"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading", "class", "id"],
      iframe: ["src", "width", "height", "title", "allow", "allowfullscreen", "loading", "referrerpolicy", "frameborder", "class"],
      video: ["src", "poster", "controls", "width", "height", "class"],
      source: ["src", "type", "srcset", "media"],
    },
    allowedStyles: {
      "*": {
        color: COLOR,
        "background-color": COLOR,
        "text-align": [/^(?:left|right|center|justify)$/],
        "text-decoration": [/^(?:none|underline|line-through)$/],
        "font-weight": [/^(?:normal|bold|[1-9]00)$/],
        "font-style": [/^(?:normal|italic)$/],
        width: LENGTH,
        height: LENGTH,
        margin: BOX,
        padding: BOX,
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["http", "https"],
      iframe: ["https"],
      video: ["https"],
      source: ["https"],
    },
    allowProtocolRelative: false,
    allowedIframeHostnames: IFRAME_HOSTS,
    exclusiveFilter: (frame) => {
      if (frame.tag !== "iframe") return false;
      return !frame.attribs.src?.startsWith("https://");
    },
    transformTags: {
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.href && ASSET_HREF.test(next.href)) next.href = toAbsoluteAsset(next.href) as string;
        if (next.target === "_blank") {
          next.rel = "noopener noreferrer";
        } else {
          delete next.target;
        }
        return { tagName, attribs: next };
      },
      img: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.src) next.src = toAbsoluteAsset(next.src) as string;
        if (next.srcset) next.srcset = absolutizeSrcset(next.srcset) as string;
        return { tagName, attribs: next };
      },
      source: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.src) next.src = toAbsoluteAsset(next.src) as string;
        if (next.srcset) next.srcset = absolutizeSrcset(next.srcset) as string;
        return { tagName, attribs: next };
      },
      video: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.src) next.src = toAbsoluteAsset(next.src) as string;
        if (next.poster) next.poster = toAbsoluteAsset(next.poster) as string;
        return { tagName, attribs: next };
      },
    },
  });
}

/** Drop CSS constructs that can execute script or pull in remote stylesheets. */
export function sanitizeCss(css: string): string {
  return css
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/expression\s*\([^)]*\)/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/@import[^;]*;?/gi, "")
    .replace(/behavior\s*:[^;]*;?/gi, "")
    .replace(/-moz-binding\s*:[^;]*;?/gi, "")
    .replace(/@charset[^;]*;?/gi, "")
    .trim();
}
