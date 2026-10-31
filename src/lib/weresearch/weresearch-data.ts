/**
 * Content for the WeResearch landing page (Figma 2533:391 "WeResearch - Option 2").
 * Copy is taken from Figma. Governance body text is Figma placeholder (Lorem Ipsum)
 * and several links have no target yet; swap for Drupal fields when available.
 */

export type LinkCard = { title: string; image: string; href: string };

export type FeatureBlock = {
  heading: string;
  body: string;
  image: string;
  cta: { label: string; href: string };
};

export type ResearchArea = { label: string; icon: string };

export type JournalYear = {
  year: string;
  issues: { label: string; href: string }[];
};

export type WeResearchData = {
  hero: { title: string; body: string; image: string };
  about: { heading: string; paragraphs: string[]; image: string };
  governance: {
    heading: string;
    items: { title: string; body: string; href: string }[];
  };
  publications: { heading: string; description: string; cards: LinkCard[] };
  projects: FeatureBlock;
  activities: FeatureBlock;
  areas: { heading: string; items: ResearchArea[] };
  cecd: {
    headingLines: string[];
    body: string;
    linkLabel: string;
    linkHref: string;
    image: string;
  };
  seminars: FeatureBlock;
  doctoral: {
    heading: string;
    paragraphs: string[];
    image: string;
    pdf: { label: string; href: string };
    apply: { label: string; href: string };
  };
  journal: {
    heading: string;
    body: string;
    downloadHeading: string;
    years: JournalYear[];
    image: string;
  };
};

const IMG = "/weresearch";
const ICON = `${IMG}/areas`;

// Journal issue PDFs are not supplied yet; every month links to the journal page.
const JOURNAL_MONTHS = ["March", "September", "October", "December"];
const journalYear = (year: string): JournalYear => ({
  year,
  issues: JOURNAL_MONTHS.map((label) => ({ label, href: "/weresearch/aweshkar" })),
});

export const WERESEARCH: WeResearchData = {
  hero: {
    title: "Weschool center for research",
    body: "WeSchool Center for Research reinforces Welingkar Institute’s research commitment to corporate, society, faculty, and its student community. The mission of the Center is to create and disseminate knowledge of Management, Social Sciences, and Technology.",
    image: `${IMG}/hero.webp`,
  },
  about: {
    heading: "About the center for research",
    paragraphs: [
      "Our Research findings are disseminated directly through white papers, publications, case studies, research projects, conferences, and seminars. It is also applied in course development for PGDM, MMS, Ph.D., and Executive Education Programs.",
      "Research is the bedrock for enhancing teaching and learning initiatives at WeSchool. The core activities include inter-alia publication of refereed research journal “aWEshkar”, research papers & case studies presented and published by Faculty and Students, Faculty authored books, encouragement and support to young faculty members for Ph.D. enrollment, planning and execution of live corporate research projects as also social research in partnership with Government and its agencies & other initiatives such as research collaborations and partnerships of different nature with Research bodies/Institutes. We School provides financial assistance for publications and seed funding for various projects.",
      "WeSchool Centre for Research aims to initiate inter-departmental collaboration, to inter-institutional partnerships at national and international level for funded projects and interdisciplinary research. The centre will facilitate interaction with external agencies at a national and international level through seminars, colloquiums, conferences, roundtables, and doctoral consortium on regular basis.",
      "At WeSchool, through the University of Mumbai's Ph.D. Programme, we endeavor to create a rich talent pool that will be the driving force of the future. This gives an opportunity to pursue research, and thereby drive 'innovation'.",
    ],
    image: `${IMG}/about-bg.webp`,
  },
  governance: {
    heading: "Governance",
    items: [
      {
        title: "Research Policy",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation",
        href: "#",
      },
      {
        title: "Anti-plagiarism Policy",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation",
        href: "#",
      },
    ],
  },
  publications: {
    heading: "Research Publications",
    description: "WeSchool provides financial assistance for publications and seed funding for various projects.",
    cards: [
      { title: "Research Papers/Articles in Journals", image: `${IMG}/pub-papers.webp`, href: "/weresearch/papers" },
      { title: "Books Published", image: `${IMG}/pub-books.webp`, href: "/weresearch/papers" },
      { title: "Cases Authored", image: `${IMG}/pub-cases.webp`, href: "/weresearch/cases" },
      { title: "FDP Research", image: `${IMG}/pub-fdp.webp`, href: "/weresearch/papers" },
      { title: "Conferences Organized", image: `${IMG}/pub-conferences.webp`, href: "/weresearch/conferences" },
      { title: "Funded Projects", image: `${IMG}/pub-funded.webp`, href: "/weresearch/papers" },
    ],
  },
  projects: {
    heading: "Research projects",
    body: "The research project explores the grassroots to draw a practical picture on the multiple/singular subject.",
    image: `${IMG}/projects.webp`,
    cta: { label: "Know More", href: "/weresearch/papers" },
  },
  activities: {
    heading: "Research activities",
    body: "WeSchool research eco-system involves white papers, publications, case studies, research projects, conferences and seminars. Research is the bedrock for enhancing teaching and learning initiatives.",
    image: `${IMG}/activities.webp`,
    cta: { label: "Know More", href: "/weresearch/conferences" },
  },
  areas: {
    heading: "Area of research",
    items: [
      { label: "Business management", icon: `${ICON}/business.svg` },
      { label: "Rural management", icon: `${ICON}/rural.svg` },
      { label: "Healthcare management", icon: `${ICON}/healthcare.svg` },
      { label: "Media and Entertainment", icon: `${ICON}/media.svg` },
      { label: "Technology management", icon: `${ICON}/technology.svg` },
      { label: "Business design", icon: `${ICON}/design.svg` },
      { label: "Innovation and entrepreneurship", icon: `${ICON}/innovation.svg` },
      { label: "Economics and social sciences", icon: `${ICON}/economics.svg` },
      { label: "Sustainability", icon: `${ICON}/sustainability.svg` },
    ],
  },
  cecd: {
    headingLines: ["Center of Excellence for", "Case Development (CECD),", "Bengaluru"],
    body: "The WeSchool Centre of Excellence for Case Development (CECD) incepted in June 2012, has the objective to promote case methodology and to develop a repository of India best business practices as management teaching case studies for the purpose of International / National publication. Over the years it has been successful in publishing 34 primary field and secondary based case studies across different publishing houses such as Emerald Publishing, Richard Ivey Publishing, ET Cases etc. The Centre works under the directional leadership of Group Director Prof. Dr Uday Salunkhe. At Bengaluru, it operates under the Dean, Academics, Prof. Dr Madhavi Lokhande. Prof. Dr Sonia Mehrotra leads the Centre, assisted by Ms. Ishani Chakraborty. To know more about the CECD",
    linkLabel: "click here",
    linkHref: "/weresearch/cases",
    image: `${IMG}/cecd.webp`,
  },
  seminars: {
    heading: "Seminars and conferences organized",
    body: "Our Research findings are disseminated directly through conferences and seminars. WeSchool Centre for Research aims to initiate inter-departmental collaboration, to inter-institutional partnerships at national and international level for funded projects and interdisciplinary research.",
    image: `${IMG}/seminars.webp`,
    cta: { label: "Know More", href: "/weresearch/conferences" },
  },
  doctoral: {
    heading: "Doctoral research center",
    paragraphs: [
      "Established in the Year 2004-05, the raison d’etre of the Centre is to contribute to the development of Future Management Faculty, Scholars and Researchers by way of providing all the necessary infrastructure, support and intellectual expertise to the students enrolled for the Doctoral Program.",
      "The Ph.D. is affiliated to the University of Mumbai, conducted at the Institute.",
      "The Programme is designed to serve multifarious purposes of equipping doctoral students with all the newest, up-to-date advanced tools and techniques deployed as a part of Management Research Methodology, as also providing cutting-edge knowledge in the various disciplines/ specializations of Management.",
    ],
    image: `${IMG}/doctoral.webp`,
    pdf: { label: "Download PDF", href: "#" },
    apply: { label: "Apply Now", href: "/apply" },
  },
  journal: {
    heading: "Aweshkar Journal",
    body: "AWEshkar is a bi-annual, double-blind peer-reviewed Journal of Welingkar Institute of Management Development and Research. “WE” stands for Welingkar Education and ‘aWEshkar’ stands for creating new knowledge for the benefit of the academic & corporate community. “Aweshkar” in Hindi means Invention. aWEshkar is included in EBSCO Database, USA and Ulrich' Directory of Periodicals, USA.",
    downloadHeading: "Download journals",
    years: ["2026", "2025", "2024", "2023"].map(journalYear),
    image: `${IMG}/journal.webp`,
  },
};
