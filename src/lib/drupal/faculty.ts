
export type FacultyCategory = {
  id: string;
  name: string;
  slug: string;
};

export type FacultyMember = {
  id: string;
  name: string;
  designation: string;
  department?: string;
  categorySlug: string;
  /** All categories (Drupal faculty can sit in several tabs). */
  categorySlugs?: string[];
  image: string;
  imageAlt?: string;
  link?: string;
};


/* -------------------------------------------------------------------------- */
/*  Faculty page (Mumbai) — Director's message, board/faculty grid, affiliate */
/*  Mock data mirroring the Figma design; swap for Drupal fields later.       */
/* -------------------------------------------------------------------------- */

export type DirectorMessage = {
  heading: string;
  name: string;
  designation: string;
  body: string;
  image: string;
  imageAlt?: string;
  link?: string;
  linkLabel?: string;
};

export const DEFAULT_DIRECTOR_MESSAGE: DirectorMessage = {
  heading: "Words from the Director’s Desk",
  name: "Prof. Dr. Kaustubh Dhargalkar",
  designation: "In-Charge Director",
  body: "At WeSchool, we are deeply inspired by these words of the great American writer and futurist. Undoubtedly, being convinced of the need for a radical change in management education, we decided to tread the path that leads to corporate revolution. Emerging unarticulated needs and realities need a new approach both in terms of thought as well as action.",
  image: "/faculty/director.webp",
  imageAlt: "Prof. Dr. Kaustubh Dhargalkar",
  link: "/faculty/kaustubh-dhargalkar",
  linkLabel: "Read More",
};


export type AffiliateMember = {
  id: string;
  name: string;
  designation: string;
  categorySlug: string;
  link?: string;
};


/** Director's message for the Bengaluru campus faculty page. */
export const DEFAULT_DIRECTOR_MESSAGE_BENGALURU: DirectorMessage = {
  ...DEFAULT_DIRECTOR_MESSAGE,
  name: "Dr. Madhavi Lokhande",
  designation: "Bengaluru Campus Director",
  image: "/faculty/director-bengaluru.webp",
  imageAlt: "Dr. Madhavi Lokhande",
  link: "/faculty/madhavi-lokhande",
};

/* -------------------------------------------------------------------------- */
/*  Faculty profile (inside / detail) page                                    */
/* -------------------------------------------------------------------------- */

export type FacultyProfileBlock = {
  heading?: string;
  layout: "list" | "text";
  items: string[];
};

export type FacultyProfileTab = {
  id: string;
  title: string;
  blocks: FacultyProfileBlock[];
  /** Sanitized rich text from Drupal; rendered instead of `blocks` when set. */
  html?: string;
};

export type FacultyProfile = {
  name: string;
  designation: string;
  body: string;
  image: string;
  imageAlt?: string;
  link?: string;
  linkLabel?: string;
  /** Breadcrumb "Faculty" link (campus listing). */
  backHref?: string;
  tabs: FacultyProfileTab[];
};

export const DEFAULT_FACULTY_PROFILE: FacultyProfile = {
  name: "Prof. Dr. Kaustubh Dhargalkar",
  designation: "In-Charge Director",
  body: "At WeSchool, we are deeply inspired by these words of the great American writer and futurist. Undoubtedly, being convinced of the need for a radical change in management education, we decided to tread the path that leads to corporate revolution. Emerging unarticulated needs and realities need a new approach both in terms of thought as well as action.",
  image: "/faculty/director.webp",
  imageAlt: "Prof. Dr. Kaustubh Dhargalkar",
  link: "/faculty",
  linkLabel: "Read More",
  tabs: [
    {
      id: "about",
      title: "About Faculty",
      blocks: [
        { heading: "Educational Qualification:", layout: "list", items: ["Ph.D", "B.Tech", "MMS"] },
        { heading: "Teaching Experience–", layout: "text", items: ["15 years"] },
        { heading: "Industry Exposure–", layout: "text", items: ["4 years"] },
        {
          heading: "Academic Affiliation–",
          layout: "text",
          items: [
            "Research and Review Panel Member for Journal of Innovation and Entrepreneurship – Springer Publications",
            "European Journal of Innovation Management – Emerald",
          ],
        },
        { heading: "Professional Affiliation–", layout: "text", items: ["BMA", "AOTS"] },
      ],
    },
    {
      id: "teaching-research",
      title: "Teaching & Research",
      blocks: [
        { heading: "Areas of Interest", layout: "list", items: ["Design Thinking", "Innovation Management", "Strategy"] },
      ],
    },
    {
      id: "publications",
      title: "Publications",
      blocks: [
        { layout: "list", items: ["Innovation and the WeSchool Way, 2023", "Design Thinking for Managers, 2021"] },
      ],
    },
    {
      id: "awards-honors",
      title: "Awards & Honors",
      blocks: [
        { layout: "list", items: ["Best Faculty Award, 2022", "Excellence in Management Education, 2019"] },
      ],
    },
  ],
};
