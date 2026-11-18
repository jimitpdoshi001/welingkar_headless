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

/**
 * Footer links have no URL in Drupal yet: route each label to its site page.
 * A real Drupal URL always wins. Labels are matched case-insensitively.
 */
const FOOTER_ROUTES: Record<string, string> = {
  "full-time": "/programmes/all",
  executive: "/programmes/mdp",
  phd: "/programmes/phd",
  "who we are": "/about-us",
  "mumbai campus": "/campuses/mumbai",
  "bengaluru campus": "/campuses/bengaluru",
  "careers @ weschool": "/careers",
  wefactor: "/wefactor",
  testimonial: "/testimonials",
  "contact us": "/contact-us",
  "national academic depository (nad)": "/nad",
  blog: "/blogs",
  "mms 2025-26": "/programmes/mms",
  "we research @ mumbai": "/weresearch",
  "mandatory disclosure": "/mandatory-disclosure",
  autonomy: "/autonomy",
  "grievance redressal": "/grievance-redressal",
  "privacy policy": "/privacy-policy",
  "site map": "/site-map",
};

/** Site pages not in the Drupal footer, added under "Miscellaneous". */
const FOOTER_EXTRA_MISC: { title: string; url: string }[] = [{ title: "Tenders", url: "/tenders" }];

function withFooterRoutes(items: FooterLink[]): FooterLink[] {
  return items.map((group) => {
    const children = group.children.map((link) => {
      const route = FOOTER_ROUTES[link.title.trim().toLowerCase()];
      return link.url === "#" && route ? { ...link, url: route } : link;
    });
    if (group.title.trim().toLowerCase() === "miscellaneous") {
      for (const extra of FOOTER_EXTRA_MISC) {
        if (!children.some((c) => c.url === extra.url)) {
          children.push({ id: `extra-${extra.url}`, title: extra.title, url: extra.url, weight: "100", menu: group.menu, children: [] });
        }
      }
    }
    return { ...group, children };
  });
}

export const getTopMenu = cache(async (): Promise<TopMenu> => {
  try {
    const response = await fetch(`${drupalConfig.baseUrl}/api/top-menu`, {
      next: { revalidate: 300 },
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
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch footer menu: ${response.status}`);
    }

    // Display-text spelling fix (Programmes -> Programs); links are untouched.
    const result = fixProgramsSpelling(await response.json());

    if (result?.status && Array.isArray(result?.data)) {
      return withFooterRoutes(sanitizeMenuItems(result.data));
    }
  } catch (error) {
    console.error("Error fetching footer menu:", error);
  }

  return [];
});
