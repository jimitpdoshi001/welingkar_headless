import type { Metadata } from "next";
import { getSitePage } from "./site-pages";

export function sitePageMetadata(path: string): Metadata {
  const page = getSitePage(path);
  if (!page) return { title: "Page not found" };
  return { title: `${page.title} — Welingkar`, description: page.subtitle };
}
