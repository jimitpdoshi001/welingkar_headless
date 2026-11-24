/**
 * Built-in content for the Mumbai PGP Entrepreneurship (EFMB) page (Figma 3045:135).
 * Live content comes from Drupal node 5799 (src/lib/drupal/pages/pgp-entrepreneurship.ts);
 * this copy shows only when Drupal cannot be reached.
 */
import type { PgdmCta, PgdmUspBand } from "@/lib/pgdm/pgdm-data";

const IMG = "/programmes/pgp-entrepreneurship"; // files live in public/programmes/pgp-entrepreneurship

export type PgpHero = {
  breadcrumb: string;
  title: string;
  tagline: string;
  description: string;
  /** Short key facts under the description (Drupal: third sub-title block, " · "-separated). */
  facts?: string[];
  image: string;
  cta: PgdmCta;
};

export type PgpOverview = {
  heading: string;
  paragraphs: string[];
  /** Drupal rich text (list with bold labels); rendered via SafeHtml instead of `paragraphs`. */
  html?: string;
  image: string;
  /** Video opened from the photo; without it the play button is decorative. */
  videoHref?: string;
};

/** Text with an optional bullet list (Drupal plain fields: a lead line, then "- " lines). */
export type PgpTextList = { body: string; items?: string[] };

export type PgpFees = {
  heading: string;
  description: string;
  /** Bullets after the description (e.g. "What's Included"). */
  descriptionItems?: string[];
  cards: { image: string; label: string; value: string[]; imagePosition?: string }[];
  info: ({ heading: string } & PgpTextList)[];
};

export type PgpIdealFor = {
  heading: string;
  description: string;
  items: string[];
  /** Bullets under each item, same order as `items` (Drupal h3 + ul). */
  itemDetails?: string[][];
  image: string;
  primaryCta: PgdmCta;
  secondaryCta: PgdmCta;
};

export type PgpData = {
  hero: PgpHero;
  overview: PgpOverview;
  uspBand: PgdmUspBand;
  fees: PgpFees;
  idealFor: PgpIdealFor;
};

export const PGP_ENTREPRENEURSHIP: PgpData = {
  hero: {
    breadcrumb: "Mumbai - Weentrepreneurship",
    title: "PGP in Entrepreneurship and Family Managed Business (EFMB)",
    tagline: "11 month program - Sessions for 1 week/ month",
    description:
      "Mentoring business owners to ideate, innovate, execute & prosper; this programme is designed for those, looking to add a professional edge to their existing businesses in order to reach new heights in the near future.",
    image: `${IMG}/hero-banner.webp`,
    cta: { label: "Know More", href: "#overview" },
  },
  overview: {
    heading: "Programe overview",
    paragraphs: [
      "WeSchool's PGP in Entrepreneurship and Family Managed Business (EFMB)(PGP-Entrepreneurship Management explores and analyzes the best management, governance practices, and family continuity challenges, including issues relating to first generation entrepreneurs.",
      "The Program structure is based on AAA (Acquisition, Application & Assimilation of Knowledge). The PGP in Entrepreneurship and Family Managed Business (EFMB) consists of two Semesters spread over a period of 11 months. In every month, one week is devoted to Acquisition of Knowledge, three weeks to Application of Knowledge in one's own business and one",
    ],
    image: `${IMG}/overview-video-thumb.webp`,
  },
  uspBand: {
    heading: "Program USPs",
    image: `${IMG}/program-usps.webp`,
    cards: [
      "Learn one week every month, apply it three weeks straight.",
      "Build strategic capabilities for a competitive, scalable business.",
      "Analyse financials, manage cash flow, make data-driven decisions.",
      "Boost operational productivity through live projects and proven techniques.",
      "Solve real business challenges through practical, strategic case studies.",
      "Track measurable top-line and bottom-line improvements through structured reviews.",
      "Gain insights into Indian and global businesses through immersive visits.",
    ],
  },
  fees: {
    heading: "Admission and Course Fees",
    description:
      "WeSchool intends to give more than what it takes, in order to offer a brighter future to our students. We try rising above the assured ROI which is just numbers, by adding value and making our students competitive enough to face real challenges, in the dynamic business world.",
    cards: [
      {
        image: `${IMG}/fees-tuition.webp`,
        label: "Tuition Fees & Other",
        value: ["₹7 lakhs + taxes as applicable", "for 11 months"],
        imagePosition: "center bottom",
      },
      {
        image: `${IMG}/fees-library.webp`,
        label: "Library Deposit",
        value: ["₹4,000/- (Refundable)"],
        imagePosition: "0% 40%",
      },
    ],
    info: [
      {
        heading: "Eligibility",
        body: "Graduates from a recognized university. Should own a business or should be an active member of the family business",
      },
      { heading: "Selection process", body: "In-depth Personal Interview" },
    ],
  },
  idealFor: {
    heading: "Ideal For",
    description:
      "This course is designed for those, who are looking at making an existing successful business even more competitive. And also for those who are keen on creating business turnarounds or starting new ventures besides their existing ones.",
    items: [
      "Next-Gen Family Business Scions",
      "Budding Entrepreneurs",
      "Business Family Millennial",
      "Young Business Owners",
    ],
    image: `${IMG}/ideal-for.webp`,
    primaryCta: { label: "Know More", href: "/contact-us" },
    secondaryCta: { label: "Download Brochure", href: "#" },
  },
};
