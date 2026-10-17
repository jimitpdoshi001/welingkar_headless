import { cache } from "react";
import { drupalConfig } from "./config";
import { isSafeHref } from "./link";
import { fixProgramsSpelling } from "@/lib/content-overrides";

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  weight: string;
  menu: string;
  children: MenuItem[];
}

export interface TopMenu {
  primary: MenuItem[];
  secondary: MenuItem[];
  social?: MenuItem[];
}

export interface FooterLink {
  id: string;
  title: string;
  url: string;
  weight: string;
  menu: string;
  children: FooterLink[];
}

function safeMenuUrl(url: unknown): string {
  if (typeof url !== "string") return "#";
  const trimmed = url.trim();
  return trimmed && isSafeHref(trimmed) ? trimmed : "#";
}

function sanitizeMenuItems<T extends { url: string; children?: T[] }>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    url: safeMenuUrl(item.url),
    children: Array.isArray(item.children) ? sanitizeMenuItems(item.children) : [],
  }));
}

export const getTopMenu = cache(async (): Promise<TopMenu> => {
  try {
    const response = await fetch(`${drupalConfig.baseUrl}/api/top-menu`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch top menu: ${response.status}`);
    }

    // Display-text spelling fix (Programmes -> Programs); links are untouched.
    const result = fixProgramsSpelling(await response.json());

    if (result?.status && result?.data) {
      return {
        primary: sanitizeMenuItems(Array.isArray(result.data.primary) ? result.data.primary : []),
        secondary: sanitizeMenuItems(Array.isArray(result.data.secondary) ? result.data.secondary : []),
        social: sanitizeMenuItems(Array.isArray(result.data.social) ? result.data.social : []),
      };
    }
  } catch (error) {
    console.error("Error fetching top menu:", error);
  }

  return { primary: [], secondary: [], social: [] };
});

export const getFooterMenu = cache(async (): Promise<FooterLink[]> => {
  try {
    const response = await fetch(`${drupalConfig.baseUrl}/api/footer-menu`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch footer menu: ${response.status}`);
    }

    // Display-text spelling fix (Programmes -> Programs); links are untouched.
    const result = fixProgramsSpelling(await response.json());

    if (result?.status && Array.isArray(result?.data)) {
      return sanitizeMenuItems(result.data);
    }
  } catch (error) {
    console.error("Error fetching footer menu:", error);
  }

  return [];
});
