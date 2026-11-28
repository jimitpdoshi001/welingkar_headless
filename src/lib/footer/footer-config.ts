import type { FooterLink } from "@/lib/drupal";

/**
 * Footer layout from the approved sheet (Footer_Page.xlsx). Replaces the Drupal
 * footer menu; the old version is kept as `FooterLegacy`. An empty url means
 * no page exists yet: the item shows as plain text until a page is added.
 */
type Item = [title: string, url: string];

const COLUMNS: { title: string; items: Item[] }[] = [
  {
    title: "Programs",
    items: [
      ["Full Time", "/programs/full-time-program-in-mumbai"],
      ["Executive", "/programs/mdp"],
      ["MMS", "/programs/full-time-program-in-mumbai/masters-in-management-studies"],
      ["PGP in Entrepreneurship & Family Managed Business (EFMB)", "/programs/executive-program-in-mumbai/entrepreneurship-management"],
      ["PGP in Media & Entertainment", "/programs/executive-program-in-mumbai/media-and-entertainment-management"],
      ["11 months PGP & 6 Months Certificate", "/programs/11-month-pg-6-month-certificate-programs"],
      ["PGDM Hybrid Program", "/programs/pgdm-hybrid"],
      ["PGP Foreign Trade Management", "/programs/foreign-trade-management"],
    ],
  },
  {
    title: "Quick Links",
    items: [
      ["Who we are", "/who-we-are"],
      ["Mumbai Campus", "/campus-mumbai"],
      ["Bengaluru Campus", "/campus-bengaluru"],
      ["Careers", "/careers"],
      ["Alumni", "/alumni"],
      ["Testimonials", "/testimonial"],
      ["Blogs", "/blogs"],
      ["Contact Us", "/contact-us"],
    ],
  },
  {
    title: "Statutory Provisions",
    items: [
      ["Mandatory Disclosure", "/mandatory-disclosures"],
      ["Accreditations", "/accreditation"],
      ["Anti-Ragging Committee", ""],
      ["Vishakha Committee", ""],
      ["Nasha Mukti (Anti-Drug) Committee", ""],
      ["Student Grievance Committee", ""],
      ["Grievance Redressal", "/grievance"],
      ["Privacy Policy", "/privacy-policy"],
      ["Site Map", "/site-map"],
    ],
  },
];

export const FOOTER_MENU: FooterLink[] = COLUMNS.map((col, i) => ({
  id: `footer-${i}`,
  title: col.title,
  url: "",
  weight: String(i),
  menu: "footer",
  children: col.items.map(([title, url], j) => ({ id: `footer-${i}-${j}`, title, url, weight: String(j), menu: "footer", children: [] })),
}));
