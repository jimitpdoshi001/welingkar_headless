// Tenders content. Placeholder copy from Figma (3077:129 / 3193:137) until the
// Drupal endpoint exists; swap these exports for a fetch later.

export type Tender = {
  id: string;
  title: string;
  status: string;
  /** DD/MM/YYYY */
  startDate: string;
  /** DD/MM/YYYY */
  endDate: string;
  endTime: string;
  documentLabel: string;
  /** Tender document URL ("#" until real documents are available). */
  documentUrl: string;
};

export type TendersPageData = {
  breadcrumb: string;
  heading: string;
  intro: string[];
  columns: { particulars: string; status: string; startDate: string; endDate: string };
  searchPlaceholder: string;
  monthLabel: string;
  yearLabel: string;
  emptyText: string;
  pageSize: number;
  cta: { label: string; href: string };
  items: Tender[];
};

const INTRO = [
  "Know more about the various tenders invited by Prin. L. N. Welingkar Institute of Management Development & Research (WeSchool) for its Mumbai and Bengaluru campuses.",
  "Interested parties can access tender notices, submission guidelines, important dates & related updates for various procurement, works, and/or service requirements.",
  "Interested parties are requested to review the respective tender documents carefully and adhere to the specified terms and deadlines mentioned therein.",
];

const COLUMNS = { particulars: "Particulars", status: "Status", startDate: "Start Date", endDate: "End Date" };

function placeholderTenders(prefix: string, count: number, status: string): Tender[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status,
    startDate: "11/11/2026",
    endDate: "21/11/2026",
    endTime: "08:00 PM IST",
    documentLabel: "Lorem Ipsum",
    documentUrl: "#",
  }));
}

const SHARED = {
  breadcrumb: "Mumbai - Tenders",
  heading: "Tenders",
  intro: INTRO,
  columns: COLUMNS,
  searchPlaceholder: "Keyword Search",
  monthLabel: "Month",
  yearLabel: "Year",
  emptyText: "No tenders match your search.",
  pageSize: 6,
};

export const TENDERS: TendersPageData = {
  ...SHARED,
  cta: { label: "Go to Archives", href: "/tenders/archives" },
  items: placeholderTenders("tender", 18, "Open"),
};

export const TENDERS_ARCHIVE: TendersPageData = {
  ...SHARED,
  cta: { label: "Go to Tenders", href: "/tenders" },
  items: placeholderTenders("archive", 18, "Open"),
};
