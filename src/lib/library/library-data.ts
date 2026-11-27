// Library (LRC) page content per campus. Static until the Drupal API exists;
// keep the shape stable so it can be swapped for a CMS fetch later.

export type LibStat = {
  /** Black label above the value (omitted for value-only cards). */
  label?: string;
  /** Green figure. */
  value: string;
  /** Black text after the value on the same line. */
  suffix?: string;
};

/** `href`: the name links to the database (opens in a new tab). */
export type LibDatabase = { id: string; category: string; name: string; meta: string; href?: string };

export type LibIconItem = { label: string; icon: string };

export type LibLink = { label: string; href: string };

export type LibraryData = {
  campus: string;
  /** Accent for the services band, hours card and pills (Figma per campus). */
  accent: string;
  /** Membership CTA button colour. */
  ctaColor: string;
  hero: { image: string; title: string; subtitle: string };
  about: {
    heading: string;
    subheading: string;
    image: string;
    imageAlt: string;
    lead: string;
    body: string;
    mission: { title: string; text: string };
  };
  collection: { heading: string; stats: LibStat[]; highlights: string[] };
  databases: {
    heading: string;
    subheading: string;
    categories: string[];
    items: LibDatabase[];
  };
  services: { heading: string; columns: { title: string; items: LibIconItem[] }[] };
  facilities?: { heading: string; columns: { title: string; items: string[] }[] };
  bestPractices?: { heading: string; text: string; image: string; imageAlt: string };
  hours: {
    heading: string;
    note: string;
    contactTitle: string;
    contactLines: string[];
    days: string;
    slots: { place: string; label: string; time: string }[];
    links: LibLink[];
  };
  membership: { heading: string; text: string; image: string; cta: LibLink };
};

const ic = (name: string) => `/library/icon-${name}.svg`;

const SUBHEADING = "To nurture thought leaders and practitioners through inventive education.";

const MISSION = {
  title: "LRC’s Mission",
  text: "To achieve excellence and professionalism by providing innovative and world-class Library and Information services to We School community to support learning, teaching and research with international standards.",
};

const HIGHLIGHTS = [
  "Books by top management gurus.",
  "Quality collection development is the main focus.",
  "We have must-see management movies.",
];

// Figma shows the same six cards (all tagged "Academic Literature") for both campuses.
const DATABASES: LibraryData["databases"] = {
  heading: "List of Databases",
  subheading: "Explore Knowledge. Discover Research. Drive Innovation.",
  categories: ["Academic Literature", "E-books", "Company & Industry Analysis", "Statistical"],
  items: [
    { id: "ebsco", category: "Academic Literature", name: "EBSCO Business Source Premiere", meta: "Jrnls-1,017" },
    {
      id: "proquest",
      category: "Academic Literature",
      name: "ProQuest ABI Complete",
      meta: "Jrnls-10,224/Thesis & Dissertations – More than 21, 000",
    },
    { id: "hbp", category: "Academic Literature", name: "Harvard Business Publishing - Cases", meta: "" },
    { id: "scopus", category: "Academic Literature", name: "Scopus AI", meta: "" },
    { id: "sage", category: "Academic Literature", name: "Sage Journals", meta: "26 Journals" },
    { id: "turnitin", category: "Academic Literature", name: "Anti Plagiarism Tool - Turnitin", meta: "" },
  ],
};

const HOURS_BASE = {
  heading: "Library Working Hours",
  note: "Institute abide by the below mentioned timings, however, during the examination’s timings are extended by couple of hours.",
  contactTitle: "Contact Details:",
  days: "Monday to Saturday",
  slots: [
    { place: "Ground Floor", label: "Library reading room", time: "7.00 am to 11.00 pm" },
    { place: "Basement & 6th Floor", label: "Library", time: "9.00 am to 7.00 pm" },
    { place: "Extended Library Timings", label: "", time: "9.00 am to 5.00 pm" },
  ],
  links: [
    { label: "Library Website:", href: "https://elearn.welingkar.org/in" },
    { label: "Remote Access through MyLoft:", href: "https://app.myloft.xyz/" },
  ],
};

const MEMBERSHIP_BASE = {
  heading: "Become a member of the Learning Resource Centre!",
  text: "If you are an Alumnus, a Working Professional, a Corporate Body or a Company, you can become a member of the Learning Resource Centre!",
  image: "/library/membership-bg.webp",
  cta: { label: "Membership Forms", href: "#" },
};

export const LIBRARY_MUMBAI: LibraryData = {
  campus: "Mumbai - Library",
  accent: "#493460",
  ctaColor: "#f77100",
  hero: { image: "/library/hero-mumbai.webp", title: "Learning Resource Center (LRC)", subtitle: SUBHEADING },
  about: {
    heading: "About Learning Resource Center(LRC)",
    subheading: SUBHEADING,
    image: "/library/about-mumbai.webp",
    imageAlt: "Student reading in the library",
    lead: "S P Mandali's Prin. L. N. Welingkar Institute of Management Development & Research has one of the finest Library infrastructure facilities known as the Learning Resource Centre (LRC) in the campus.",
    body: "The library equipped with all modern facilities provides a conducive environment to the users for their learning and research. A fully automated system ensures efficient delivery of library services and circulation of books and other library material.",
    mission: MISSION,
  },
  collection: {
    heading: "Overall Collection",
    stats: [
      { label: "Books:", value: "1,20,000+" },
      { label: "E-Books:", value: "55599" },
      { value: "KOHA", suffix: "– Integrated Library Management System (ILMS; version 25.11)" },
      { label: "International Periodicals:", value: "9" },
      { value: "DSpace", suffix: "– Institutional Repository" },
      { label: "AV Material:", value: "2552" },
      { label: "Databases:", value: "13" },
      { label: "Major National Newspapers:", value: "18" },
    ],
    highlights: HIGHLIGHTS,
  },
  databases: DATABASES,
  services: {
    heading: "LRC Services",
    columns: [
      {
        title: "Academic Literature",
        items: [
          { label: "Thought Leadership", icon: ic("thought-leadership") },
          { label: "Call for Papers", icon: ic("call-for-papers") },
          { label: "Remote Access MyLoft", icon: ic("myloft") },
          { label: "Library Blog", icon: ic("library-blog") },
        ],
      },
      {
        title: "E-books",
        items: [
          { label: "Placement services", icon: ic("placement") },
          { label: "Online Public Access Catalog with Instant Chat", icon: ic("opac") },
          { label: "National Program on Technology Enhanced Learning", icon: ic("nptel") },
          { label: "Harvard Cases", icon: ic("harvard-cases") },
        ],
      },
      {
        title: "Company & Industry Analysis",
        items: [
          { label: "Alumni Services", icon: ic("alumni") },
          { label: "News on Education (Mint+TOI&ET+WSJ)", icon: ic("news") },
          { label: "National Digital Library (NDL)", icon: ic("ndl") },
          { label: "Infowe", icon: ic("infowe") },
        ],
      },
      {
        title: "Statistical",
        items: [
          { label: "Journal Table of Contents (ToCs)", icon: ic("journal-toc") },
          { label: "Infocapsule", icon: ic("infocapsule") },
          { label: "Swayam - best teaching learning resources for all", icon: ic("swayam") },
          { label: "Research Support", icon: ic("research-support") },
        ],
      },
    ],
  },
  hours: {
    ...HOURS_BASE,
    contactLines: [
      "Dr. Sandeep Bhavsar, Head – LRC",
      "Email: library@welingkar.org",
      "Phone: 02224198300 Extn: 8181",
    ],
  },
  membership: MEMBERSHIP_BASE,
};

export const LIBRARY_BENGALURU: LibraryData = {
  campus: "Bengaluru - Library",
  accent: "#b04535",
  ctaColor: "#3a9030",
  hero: { image: "/library/hero-bengaluru.webp", title: "Weschool’s Vision", subtitle: SUBHEADING },
  about: {
    heading: "About Learning Resource Center(LRC)",
    subheading: SUBHEADING,
    image: "/library/about-bengaluru.webp",
    imageAlt: "Student picking a book from a library shelf",
    lead: "S P Mandali's Prin. L. N. Welingkar Institute of Management Development & Research has one of the finest Library infrastructure facilities known as the Learning Resource Centre (LRC) in the campus.",
    body: "The LRC at WeSchool Bangalore provides a range of services to support faculty members in teaching, research, curriculum development, consulting, and scholarly communication. Team works closely with faculty to identify information needs and facilitate access to high-quality academic and industry resources. The LRC equipped with all modern facilities provides a conducive environment to the users for their learning and research. A fully automated system ensures efficient delivery of library services and circulation of books and other library material.",
    mission: MISSION,
  },
  collection: {
    heading: "Overall Collection",
    stats: [
      { label: "E-Books:", value: "29,000+" },
      { label: "KOHA", value: "(25.11)", suffix: "– ILMS" },
      { label: "Books:", value: "Over 16700" },
      { label: "International Periodicals:", value: "4" },
      { label: "Indian Periodicals:", value: "71" },
      { value: "NDLI" },
      { label: "AV Material:", value: "90" },
      { label: "Databases:", value: "7" },
      { label: "Major National Newspapers:", value: "10" },
    ],
    highlights: HIGHLIGHTS,
  },
  databases: { ...DATABASES, items: DATABASES.items.map((d) => ({ ...d, meta: "" })) },
  services: {
    heading: "LRC Services",
    columns: [
      {
        title: "Current Awareness Services (CAS)",
        items: [
          { label: "New Arrivals of Books", icon: ic("new-arrivals") },
          { label: "Recent Issues of Magazines & Journals", icon: ic("magazines") },
          { label: "Important Days & Thematic Book Displays", icon: ic("thematic-displays") },
          { label: "Library Announcements & Updates", icon: ic("announcements") },
        ],
      },
      {
        title: "Research & Academic Support",
        items: [
          { label: "Bibliographies Service", icon: ic("bibliographies") },
          { label: "Plagiarism Checking Support", icon: ic("plagiarism") },
          { label: "Research Support Services", icon: ic("research-services") },
          { label: "Citation & Referencing Assistance", icon: ic("citation") },
        ],
      },
      {
        title: "Student Engagement Services",
        items: [
          { label: "Content Competition for Students", icon: ic("content-competition") },
          { label: "Publisher Book Exhibition", icon: ic("publisher-exhibition") },
          { label: "User Orientation Program", icon: ic("orientation") },
          { label: "Information Literacy Programs", icon: ic("info-literacy") },
        ],
      },
      {
        title: "Information & Learning Services",
        items: [
          { label: "Table of Contents (TOC) Service", icon: ic("journal-toc") },
          { label: "News of the Day & Archives Service", icon: ic("news-archives") },
          { label: "Current Awareness Services (CAS)", icon: ic("cas") },
          { label: "Digital Resource Access Support", icon: ic("digital-access") },
        ],
      },
    ],
  },
  facilities: {
    heading: "LRC Facilities",
    columns: [
      {
        title: "Learning Spaces",
        items: [
          "Group Discussion Room Facilities",
          "Reading Areas",
          "Discussion & Collaborative Learning Spaces",
          "Language Lab",
        ],
      },
      {
        title: "Technology Facilities",
        items: [
          "Audio-Visual Room Facilities",
          "Wi-Fi Enabled Learning Environment",
          "E-Library Access Zone",
          "Remote Access to E-Resources (24×7)",
        ],
      },
      {
        title: "Research Facilities",
        items: [
          "Archive of Question Papers",
          "Archive of Project Reports",
          "Archive of Job Description Files",
          "Plagiarism Checking Support",
        ],
      },
      {
        title: "User Support Facilities",
        items: [
          "User Orientation Program",
          "OPAC (Online Public Access Catalogue)",
          "Reference & Information Assistance",
          "Circulation & Membership Services",
        ],
      },
    ],
  },
  bestPractices: {
    heading: "LRC Best Practices",
    text: "The Learning Resource Centre (LRC) adopts a user-centric and technology-driven approach by providing seamless access to quality print and digital resources, remote access facilities, research support services, plagiarism checking, and current awareness services. Through continuous collection development, information literacy programs, and collaborative learning spaces, the LRC enhances teaching, learning, research, and innovation while fostering a culture of lifelong learning among students and faculty.",
    image: "/library/best-practices-bengaluru.webp",
    imageAlt: "Students in discussion at the library",
  },
  hours: {
    ...HOURS_BASE,
    days: "Our Library – Ground Floor Only",
    slots: [
      { place: "Monday to Friday", label: "", time: "9:00 am to 8:00 pm" },
      { place: "Saturday", label: "", time: "9:00 am to 5:00 pm" },
    ],
    links: [HOURS_BASE.links[0], { label: "Remote Access – Bengaluru Campus:", href: "https://idp.welingkar.org/" }],
    contactLines: [
      "Mr. Rajakumar, A.",
      "Librarian",
      "Email: library.blr@welingkar.org",
      "Mobile : 9632559594",
      "Phone: 91-080-42678300 Extn: 395",
    ],
  },
  membership: MEMBERSHIP_BASE,
};
