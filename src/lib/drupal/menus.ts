import { cache } from "react";
import { drupalConfig } from "./config";

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

export const getTopMenu = cache(async (): Promise<TopMenu> => {
  try {
    const response = await fetch(`${drupalConfig.baseUrl}/api/top-menu`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch top menu: ${response.status}`);
    }

    const result = await response.json();

    if (result?.status && result?.data) {
      return {
        primary: Array.isArray(result.data.primary) ? result.data.primary : [],
        secondary: Array.isArray(result.data.secondary) ? result.data.secondary : [],
        social: Array.isArray(result.data.social) ? result.data.social : [],
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
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch footer menu: ${response.status}`);
    }

    const result = await response.json();

    if (result?.status && Array.isArray(result?.data)) {
      return result.data;
    }
  } catch (error) {
    console.error("Error fetching footer menu:", error);
  }

  return [];
});
