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
  href: string;
  panel?: MegaPanel;
};

/** Full-time PGDM programmes, reused across Campus and Programmes panels. */
const FULL_TIME_PGDM: MegaLink[] = [
  { label: "PGDM", href: "/programmes/pgdm" },
  { label: "PGDM E-Business", href: "/programmes/pgdm-e-business" },
  { label: "PGDM Business Design", href: "/programmes/pgdm-business-design" },
  { label: "PGDM Healthcare", href: "/programmes/pgdm-healthcare" },
  { label: "PGDM Retail Management", href: "/programmes/pgdm-retail" },
  { label: "PGDM Rural Management", href: "/programmes/pgdm-rural" },
  { label: "PGDM Media & Entertainment", href: "/programmes/pgdm-media" },
  { label: "PGDM Research & Business Analytics", href: "/programmes/pgdm-research-analytics" },
];

const FULL_TIME_PGDM_BLR: MegaLink[] = [
  { label: "PGDM", href: "/programmes/pgdm/bengaluru" },
  { label: "PGDM E-Business", href: "/programmes/pgdm-e-business?campus=bengaluru" },
  { label: "PGDM Business Design & Innovation", href: "/programmes/pgdm-business-design?campus=bengaluru" },
  { label: "PGDM Research & Business Analytics", href: "/programmes/pgdm-research-analytics?campus=bengaluru" },
];

export const MAIN_NAV: MainNavItem[] = [
  {
    id: "who-we-are",
    label: "Who We Are",
    href: "/about-us",
    panel: {
      columns: [
        {
          heading: "Who We Are",
          headingHref: "/about-us#weschool",
          links: [
            // Anchors scroll to the matching section on the About Us page.
            { label: "Vision & Mission", href: "/about-us#vision-mission" },
            { label: "About WeSchool", href: "/about-us#weschool" },
            { label: "About SPM", href: "/about-us#spm" },
            { label: "Managing Council Members", href: "/about-us#managing-council" },
            { label: "Chairman's Message", href: "/about-us#chairman" },
            { label: "Director's Message", href: "/about-us#director" },
          ],
        },
        {
          heading: "Governance",
          links: [
            { label: "Academic Advisory Board", href: "/about-us#academic-advisory-board" },
            { label: "Industry Advisory Board", href: "/about-us#industry-advisory-board" },
            { label: "Accreditations & Affiliations", href: "/accreditation" },
            { label: "Awards & Accolades", href: "/about-us#awards" },
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
      // Live-site structure: the three campus links only.
      intro: [
        { title: "PGDM Mumbai", subtitle: "AICTE approved standalone institute", href: "/campuses/mumbai" },
        { title: "MMS / PhD", subtitle: "Autonomous Institute affiliated to University of Mumbai", href: "https://welingkar.edu.in/" },
        { title: "PGDM Bengaluru", subtitle: "AICTE approved standalone institute", href: "/campuses/bengaluru" },
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
            { label: "Fees & EMI", href: "/programmes/pgdm" },
            { label: "TFW Scheme", href: "/admissions" },
            { label: "Scholarships", href: "/admissions" },
            { label: "Financial Assistance", href: "/admissions" },
          ],
        },
        {
          heading: "Programs",
          links: [
            { label: "PGDM", href: "/programmes/pgdm" },
            { label: "MMS", href: "/programmes/mms" },
            { label: "PhD", href: "/programmes/phd" },
            { label: "Executive & MDP", href: "/programmes/mdp" },
          ],
        },
      ],
    },
  },
  {
    id: "programs",
    label: "Programs",
    href: "/programmes",
    panel: {
      // Live-site structure: hover a campus on the left to switch its programs.
      // Campus names are tabs only (no link): this menu links to program pages only.
      intro: [
        {
          title: "PGDM Mumbai",
          subtitle: "AICTE approved standalone institute",
          columns: [
            { heading: "Full-Time Programs", headingHref: "/programmes", links: FULL_TIME_PGDM },
            {
              heading: "Executive",
              links: [{ label: "MDP", href: "/programmes/mdp" }],
              sections: [
                {
                  heading: "11 Months Post Graduate Program (Autonomous)",
                  links: [
                    { label: "PGP in Entrepreneurship and Family Managed Business (EFMB)", href: "/programmes/efmb" },
                    { label: "PGP in Media & Entertainment", href: "/programmes/pgp-media" },
                  ],
                },
              ],
            },
            {
              heading: "PGDM Hybrid Program",
              headingHref: "/programmes/pgdm-hybrid",
              links: [],
              sections: [
                { heading: "11 Months PGP & 6 Months Certificate Programs", headingHref: "/programmes/certificate", links: [] },
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
              links: [{ label: "MMS", href: "/programmes/mms" }],
              sections: [{ heading: "PhD Programs", links: [{ label: "Management Studies", href: "/programmes/phd" }] }],
            },
          ],
        },
        {
          title: "PGDM Bengaluru",
          subtitle: "AICTE approved standalone institute",
          columns: [
            {
              heading: "Full-Time Programs",
              headingHref: "/programmes/bengaluru",
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
    href: "/corporate-interface",
    panel: {
      columns: [
        {
          heading: "Recruit",
          headingHref: "/corporate-interface",
          links: [
            { label: "Why Recruit from WeSchool", href: "/corporate-interface#why-recruit" },
            { label: "Top Recruiters", href: "/corporate-interface/top-recruiters" },
            { label: "Placement Cell Contact", href: "/corporate-interface/placement-contact" },
            { label: "Corporate Testimonials", href: "/corporate-interface/testimonials" },
          ],
        },
        {
          heading: "Engage",
          links: [
            { label: "MDP & EEP", href: "/programmes/mdp" },
            { label: "Projects & Internships", href: "/corporate-interface/internships" },
            { label: "Industry Advisory Board", href: "/about-us/industry-advisory-board" },
          ],
        },
      ],
    },
  },
  {
    id: "weresearch",
    label: "WeResearch",
    href: "/weresearch",
    panel: {
      columns: [
        {
          heading: "Research",
          headingHref: "/weresearch",
          links: [
            { label: "Introduction", href: "/weresearch" },
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
    href: "/wefactor",
    panel: {
      columns: [
        {
          heading: "WeFactor",
          headingHref: "/wefactor",
          links: [
            { label: "About WeFactor", href: "/wefactor" },
            { label: "WeInnovate", href: "/wefactor/weinnovate" },
            { label: "WeEntrepreneur", href: "/wefactor/weentrepreneur" },
            { label: "WeLead", href: "/wefactor/welead" },
            { label: "WeLearning", href: "/wefactor/welearning" },
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
