/**
 * MOCK DATA for the Research Publications page (Figma 2549:1783).
 * The Figma file repeats one sample paper; these entries reuse that copy until
 * the Drupal publications feed is connected. Not live CMS data.
 */

export type Publication = {
  id: string;
  area: string;
  year: string;
  title: string;
  authors: string;
  journal: string;
  abstract: string;
  href: string;
};

export const PUBLICATION_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027"];

/** Year selected on first load (Figma shows 2021 active). */
export const DEFAULT_PUBLICATION_YEAR = "2021";

export const PUBLICATIONS_PER_PAGE = 3;

const SAMPLE = {
  area: "Technology Management",
  title: "Artificial Intelligence in Supply Chain Management: Opportunities and Challenges for Indian Firms",
  authors: "Dr. Priya Sharma, Dr. Vivek Joshi",
  journal: "International Journal of Production Economics",
  abstract:
    "This paper examines the adoption of AI technologies in supply chain operations among Indian firms, identifying key drivers, barriers, and performance outcomes through a mixed-methods study.",
  href: "#",
};

// Nine sample papers per year gives three pages, matching the Figma pager (1 2 3).
export const PUBLICATIONS: Publication[] = PUBLICATION_YEARS.flatMap((year) =>
  Array.from({ length: 9 }, (_, i) => ({ ...SAMPLE, id: `${year}-${i + 1}`, year })),
);
