/**
 * Corporate page (Figma 3466:1642 "Welingkar - Mumbai - Corporate").
 * Static content from the design; no Drupal content type exists for it yet.
 */
export type CorporateStat = { value: string; label: string };
export type CorporateProfileGroup = { id: string; title: string; stats: CorporateStat[] };
export type CorporatePanel = {
  id: string;
  title: string;
  paragraphs?: string[];
  contact?: { name: string; role: string; phone: string; email: string };
};

export const CORPORATE = {
  hero: {
    image: "/corporate/hero.webp",
    title: "Corporate",
    body: "Students can gain corporate knowledge with our excellent facilities and information services.\nAdvantages for corporates include mutually beneficial services and relationship building with WeSchool.",
  },
  overview: {
    heading: "Overview",
    paragraphs: [
      "Industry-Academia linkage is an integral aspect of retaining and building the dynamic culture at WeSchool. Corporate professionals are important stakeholders and engage with us regularly.",
      "Leaders from organizations are on the Advisory and Academic Board of the various programmes that WeSchool offers. We collaborate with corporates for academic development, live projects, internships, research work, executive training programs. Corporates from across sectors also recruit from WeSchool regularly.",
      "We invite you to engage with us on our journey.",
    ],
    image: "/corporate/overview.webp",
  },
  placements: {
    heading: "Placements",
    body: "The Career Management Centre (CMC) provides our students with exciting career opportunities, through various placements across multiple networks.",
    // Only "Projects and internships" has copy in the design; the others show as headings until content is supplied.
    panels: [
      { id: "academic", title: "Academic collaboration" },
      {
        id: "projects",
        title: "Projects and internships",
        paragraphs: [
          "WeSchool promotes immersive and experiential learning in a big way at both its campuses. Live projects, internships, short studies are integral to the learning experience at WeSchool. Hence, we welcome corporates to connect with us for projects and internships where they may want to engage our students. Summer 8 week internships are also a part of this experience. The Career Management Centre, being the first point of contact, will connect you to the concerned academic programme head.",
        ],
        contact: {
          name: "Ms. Chandana Pai",
          role: "Vice President CMC & Business Development, Assistant Professor - Marketing",
          phone: "022-24198300. Ext. 8844",
          email: "chandana.pai@welingkar.org",
        },
      },
      { id: "mdc", title: "Management development centre & executive education programmes" },
      { id: "research", title: "Research" },
    ] as CorporatePanel[],
  },
  recruiters: {
    heading: "Recruiters list",
    body: "WeSchool’s exclusive recruiters list, adds tremendous value for all our students, as they can expect a robust portfolio and career development opportunities.",
    image: "/corporate/recruiters.webp",
    disclaimer:
      "Disclaimer: Representation / Use of any third-party trade marks including logos herein is merely to indicate that these companies were at the WeSchool Campus for the Student recruitment process.",
    // PDF not supplied yet: the button is hidden while this is empty.
    pdf: "",
  },
  batch: {
    heading: "Batch + Student Profile",
    body: "WeSchool draws in students from diverse cultural, personal and professional backgrounds, across India.",
    groups: [
      {
        id: "education",
        title: "Education",
        stats: [
          { value: "38%", label: "Bachelor of Engineering" },
          { value: "15%", label: "Bachelor of Business Administration" },
          { value: "1%", label: "Bachelor of Financial Markets" },
          { value: "20%", label: "Bachelor of Commerce" },
          { value: "11%", label: "Bachelor of Management Studies" },
          { value: "2%", label: "Bachelor of Arts" },
          { value: "9%", label: "Science, Medical and Pharma" },
          { value: "1%", label: "Others" },
        ],
      },
      {
        id: "experience",
        title: "Years of Experience",
        stats: [
          { value: "52%", label: "Fresher" },
          { value: "31%", label: "1–2 years" },
          { value: "10%", label: "2–3 years" },
          { value: "7%", label: "3+ years" },
        ],
      },
      // No figures in the design yet.
      { id: "sector", title: "Prior work experience sector", stats: [] },
      { id: "gender", title: "Gender", stats: [] },
    ] as CorporateProfileGroup[],
  },
  studentProfile: {
    image: "/corporate/student-profile.webp",
    heading: "Student profile",
    body: "The young talent pool on WeSchool campus rides on collaboration through knowledge and individual expertise. These future-ready managers have cultivated their experience through participation in inter B-School competitions, international student exchange programs, skill-based workshops and feedback from organisation leadership for their Global Citizen Leadership projects. They are well acquainted with industry dynamics through CXO guest lectures, alumni connect and partaking in industry conferences.",
  },
  stats: {
    heading: "Placement stats",
    body: "WeSchool nurtures its constituents into global citizens, equipped and ready to take on the task of leading the business of tomorrow. Our placement statistics speak for themselves!",
    cards: [
      { title: "Domestic", items: [{ value: "₹11.68", label: "Average Salary" }, { value: "₹40", label: "Highest Salary" }] },
      { title: "International", items: [{ value: "₹19.05", label: "Average Salary" }, { value: "₹28.87", label: "Highest Salary" }] },
    ],
  },
};
