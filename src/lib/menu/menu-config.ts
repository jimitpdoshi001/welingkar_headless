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
};

/** Optional left info column (e.g. the campus/affiliation block in the design). */
export type MegaIntroGroup = {
  title: string;
  subtitle?: string;
  href?: string;
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
            { label: "Academic Advisory Board", href: "/about-us/academic-advisory-board" },
            { label: "Industry Advisory Board", href: "/about-us/industry-advisory-board" },
            { label: "Accreditations & Affiliations", href: "/accreditation" },
            { label: "Awards & Accolades", href: "/about-us/awards" },
          ],
        },
        {
          heading: "People",
          links: [
            { label: "Faculty / Leadership Team", href: "/about-us/faculty" },
            { label: "Vision & Mission", href: "/about-us/vision-mission" },
            { label: "Mandatory Disclosure", href: "/mandatory-disclosure" },
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
      intro: [
        { title: "PGDM Mumbai Campus", subtitle: "AICTE Approved Standalone Institute", href: "/campuses/mumbai" },
        { title: "MMS / PhD", subtitle: "Autonomous Institute Affiliated to University of Mumbai", href: "/programmes/mms" },
        { title: "PGDM Bengaluru", subtitle: "AICTE Approved Standalone Institute", href: "/campuses/bengaluru" },
      ],
      columns: [
        { heading: "Full-Time Programs — Mumbai", headingHref: "/campuses/mumbai", links: FULL_TIME_PGDM },
        { heading: "Full-Time Programs — Bengaluru", headingHref: "/campuses/bengaluru", links: FULL_TIME_PGDM_BLR },
        {
          heading: "Explore Campus",
          links: [
            { label: "Life @ WeSchool", href: "/life-at-weschool" },
            { label: "WeExcel", href: "/weexcel" },
            { label: "Faculty", href: "/about-us/faculty" },
            { label: "Corporate Interface", href: "/corporate-interface" },
            { label: "Infrastructure & Accommodation", href: "/life-at-weschool" },
          ],
        },
      ],
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
      columns: [
        { heading: "2-Year Full-Time PGDM", headingHref: "/programmes", links: FULL_TIME_PGDM },
        {
          heading: "Post Graduate",
          links: [
            { label: "MMS", href: "/programmes/mms" },
            { label: "PhD", href: "/programmes/phd" },
            { label: "PGDM Hybrid", href: "/programmes/pgdm-hybrid" },
            { label: "PGPTM", href: "/programmes/pgptm" },
          ],
        },
        {
          heading: "Executive & Certificate",
          links: [
            { label: "Executive Program (11 months)", href: "/programmes/executive" },
            { label: "PGP in Entrepreneurship & FMB (EFMB)", href: "/programmes/efmb" },
            { label: "PGP in Media & Entertainment", href: "/programmes/pgp-media" },
            { label: "6-month Certificate Program", href: "/programmes/certificate" },
            { label: "Distance Learning Program (DLP)", href: "/programmes/dlp" },
            { label: "MDP", href: "/programmes/mdp" },
            { label: "MDC — Executive Education", href: "/mdc" },
          ],
        },
      ],
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
