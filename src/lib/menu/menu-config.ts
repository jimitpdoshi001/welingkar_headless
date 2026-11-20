/**
 * Final site menu structure (from Menu_Sitemap.xlsx) + mega-menu content.
 *
 * Links point at the routes that exist today (preview routes) and the intended
 * slugs for pages still being built, so internal linking is wired once the
 * pages land at those paths. Edit here — the Header renders from this config.
 */

export type MegaLink = { label: string; href: string };

export type MegaColumn = {
  heading?: string;
  headingHref?: string;
  links: MegaLink[];
  /** Extra heading + links groups stacked under this one in the same column. */
  sections?: MegaColumn[];
};

/** Optional left info column (e.g. the campus/affiliation block in the design). */
export type MegaIntroGroup = {
  title: string;
  subtitle?: string;
  href?: string;
  /** Set on every group to make the intro a tab list: hovering a group shows its columns. */
  columns?: MegaColumn[];
};

export type MegaPanel = {
  intro?: MegaIntroGroup[];
  columns: MegaColumn[];
};

export type MainNavItem = {
  id: string;
  label: string;
  /** Empty = label only (opens its panel, no page of its own). */
  href: string;
  panel?: MegaPanel;
};

/** Full-time PGDM programmes, reused across Campus and Programmes panels. */
const FULL_TIME_PGDM: MegaLink[] = [
  { label: "PGDM", href: "/programmes/full-time-programme-in-mumbai/pgdm" },
  { label: "PGDM E-Business", href: "/programmes/full-time-programme-in-mumbai/pgdm-e-business" },
  { label: "PGDM Business Design", href: "/programmes/full-time-programme-in-mumbai/pgdm-business-design" },
  { label: "PGDM Healthcare", href: "/programmes/full-time-programme-in-mumbai/pgdm-health-care-management" },
  { label: "PGDM Retail Management", href: "/programmes/full-time-programme-in-mumbai/pgdm-retail-management" },
  { label: "PGDM Rural Management", href: "/programmes/full-time-programme-in-mumbai/pgdm-rural-management" },
  { label: "PGDM Media & Entertainment", href: "/programmes/full-time-programme-in-mumbai/pgdm-media-and-entertainment" },
  { label: "PGDM Research & Business Analytics", href: "/programmes/full-time-programme-in-mumbai/pgdm-research-and-business-analytics" },
];

const FULL_TIME_PGDM_BLR: MegaLink[] = [
  { label: "PGDM", href: "/programmes/full-time-programme-in-bengaluru/pgdm" },
  { label: "PGDM E-Business", href: "/programmes/full-time-programme-in-bengaluru/pgdm-e-business" },
  { label: "PGDM Business Design & Innovation", href: "/programmes/full-time-programme-in-bengaluru/pgdm-business-design-and-innovation" },
  { label: "PGDM Research & Business Analytics", href: "/programmes/full-time-programme-in-bengaluru/pgdm-research-and-business-analytics" },
];

export const MAIN_NAV: MainNavItem[] = [
  {
    id: "who-we-are",
    label: "Who We Are",
    href: "/who-we-are",
    panel: {
      columns: [
        {
          heading: "Who We Are",
          headingHref: "/who-we-are#weschool",
          links: [
            // Anchors scroll to the matching section on the About Us page.
            { label: "Vision & Mission", href: "/who-we-are#vision-mission" },
            { label: "About WeSchool", href: "/who-we-are#weschool" },
            { label: "About SPM", href: "/who-we-are#spm" },
            { label: "Managing Council Members", href: "/who-we-are#managing-council" },
            { label: "Chairman's Message", href: "/who-we-are#chairman" },
            { label: "Director's Message", href: "/who-we-are#director" },
          ],
        },
        {
          heading: "Governance",
          links: [
            { label: "Academic Advisory Board", href: "/who-we-are#academic-advisory-board" },
            { label: "Industry Advisory Board", href: "/who-we-are#industry-advisory-board" },
            { label: "Accreditations & Affiliations", href: "/accreditation" },
            { label: "Awards & Accolades", href: "/who-we-are#awards" },
          ],
        },
      ],
    },
  },
  {
    id: "campus",
    label: "Campus",
    href: "/campuses",
    panel: {
      // Campus links only.
      intro: [
        { title: "Mumbai Campus", subtitle: "AICTE approved standalone institute", href: "/campus-mumbai" },
        { title: "MMS / PhD", subtitle: "Autonomous Institute affiliated to University of Mumbai", href: "https://welingkar.edu.in/" },
        { title: "Bengaluru Campus", subtitle: "AICTE approved standalone institute", href: "/campus-bengaluru" },
      ],
      columns: [],
    },
  },
  {
    id: "admissions",
    label: "Admissions",
    href: "/admissions",
    panel: {
      columns: [
        {
          heading: "Apply",
          headingHref: "/admissions",
          links: [
            { label: "How to Apply", href: "/admissions" },
            { label: "Eligibility & Cut-offs", href: "/admissions" },
            { label: "Apply Now", href: "/apply" },
            { label: "Enquire Now", href: "/enquire-now" },
          ],
        },
        {
          heading: "Fees & Support",
          links: [
            { label: "Fees & EMI", href: "/programmes/full-time-programme-in-mumbai/pgdm" },
            { label: "TFW Scheme", href: "/admissions" },
            { label: "Scholarships", href: "/admissions" },
            { label: "Financial Assistance", href: "/admissions" },
          ],
        },
      ],
    },
  },
  {
    id: "programs",
    label: "Programs",
    href: "", // label only: the /programmes page was removed
    panel: {
      // Live-site structure: hover a campus on the left to switch its programs.
      // Campus names are tabs only (no link): this menu links to program pages only.
      intro: [
        {
          title: "PGDM Mumbai",
          subtitle: "AICTE approved standalone institute",
          columns: [
            { heading: "Full-Time Programs", headingHref: "/programmes/full-time-programme-in-mumbai", links: FULL_TIME_PGDM },
            {
              heading: "Executive",
              links: [{ label: "MDP", href: "/programmes/mdp" }],
              sections: [
                {
                  heading: "11 Months Post Graduate Program (Autonomous)",
                  links: [
                    { label: "PGP in Entrepreneurship and Family Managed Business (EFMB)", href: "/programmes/executive-programme-in-mumbai/entrepreneurship-management" },
                    { label: "PGP in Media & Entertainment", href: "/programmes/executive-programme-in-mumbai/media-and-entertainment-management" },
                  ],
                },
              ],
            },
            {
              heading: "PGDM Hybrid Program",
              headingHref: "/programmes/pgdm-hybrid",
              links: [],
              sections: [
                { heading: "11 Months PGP & 6 Months Certificate Programs", headingHref: "/programmes/11-month-pg-6-month-certificate-programmes", links: [] },
                { heading: "Post Graduate Program in Temple Management (PGPTM)", headingHref: "/programmes/pgptm", links: [] },
              ],
            },
          ],
        },
        {
          title: "MMS / PhD",
          subtitle: "Autonomous Institute affiliated to University of Mumbai",
          columns: [
            {
              heading: "Full-Time Programs",
              links: [{ label: "MMS", href: "/programmes/full-time-programme-in-mumbai/masters-in-management-studies" }],
              sections: [{ heading: "PhD Programs", links: [{ label: "Management Studies", href: "/programmes/phd-programme-in-mumbai" }] }],
            },
          ],
        },
        {
          title: "PGDM Bengaluru",
          subtitle: "AICTE approved standalone institute",
          columns: [
            {
              heading: "Full-Time Programs",
              headingHref: "/programmes/full-time-programme-in-bengaluru",
              links: FULL_TIME_PGDM_BLR,
              sections: [{ heading: "Executive", links: [{ label: "MDP", href: "/programmes/mdp" }] }],
            },
          ],
        },
      ],
      columns: [],
    },
  },
  {
    id: "corporates",
    label: "Corporates",
    href: "", // label only: each campus has its own corporate page
    panel: {
      // Two entries only: one corporate page per campus.
      intro: [
        { title: "Mumbai", href: "/career-management-centre-mumbai" },
        { title: "Bengaluru", href: "/career-management-centre-bengaluru" },
      ],
      columns: [],
    },
  },
  {
    id: "weresearch",
    label: "WeResearch",
    href: "/we-research-mumbai",
    panel: {
      columns: [
        {
          heading: "Research",
          headingHref: "/we-research-mumbai",
          links: [
            { label: "Introduction", href: "/we-research-mumbai" },
            { label: "All Research Papers", href: "/weresearch/papers" },
            { label: "Awarded & Recognised Papers", href: "/weresearch/recognised" },
            { label: "Research Areas", href: "/weresearch/areas" },
          ],
        },
        {
          heading: "Publications",
          links: [
            { label: "Authored Cases", href: "/weresearch/cases" },
            { label: "Aweshkar Journal", href: "/weresearch/aweshkar" },
            { label: "Magazine Articles", href: "/weresearch/articles" },
            { label: "Conference Presentations", href: "/weresearch/conferences" },
            { label: "We Conference", href: "/we-conference" },
          ],
        },
      ],
    },
  },
  {
    id: "wefactor",
    label: "WeFactor",
    href: "/we-factor",
    panel: {
      columns: [
        {
          heading: "WeFactor",
          headingHref: "/we-factor",
          links: [
            { label: "About WeFactor", href: "/we-factor" },
            { label: "WeInnovate", href: "/we-factor/we-innovate" },
            { label: "WeEntrepreneur", href: "/we-factor/we-entrepreneurship" },
            { label: "WeLead", href: "/we-factor/we-lead" },
            { label: "WeLearning", href: "/we-factor/we-learn" },
          ],
        },
      ],
    },
  },
];

export const UTILITY_NAV: MegaLink[] = [
  { label: "WeGlobal", href: "/weglobal" },
  { label: "Blogs", href: "/blogs" },
  { label: "Alumni", href: "/alumni" },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
];
