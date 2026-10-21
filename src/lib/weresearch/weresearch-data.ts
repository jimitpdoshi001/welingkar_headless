/**
 * Mock data for the WeResearch landing page, mirroring the Figma design.
 * Swap for Drupal fields later. Images are placeholders.
 */

export type ResearchArea = string;

export type AwardedPaper = {
  id: string;
  area: string;
  year: string;
  title: string;
  authors: string;
  journal: string;
  award: string;
  href: string;
};

export type ResearchPaper = {
  id: string;
  area: string;
  year: string;
  title: string;
  authors: string;
  journal: string;
  abstract: string;
  href: string;
};

export type BookPublished = {
  id: string;
  title: string;
  authors: string;
  publisher: string;
  year: string;
  href: string;
};

export type AuthoredCase = {
  id: string;
  year: string;
  publisher: string;
  title: string;
  authors: string;
  source: string;
  abstract: string;
  href: string;
};

export type MagazineArticle = {
  id: string;
  area: string;
  date: string;
  title: string;
  author: string;
  source: string;
  href: string;
};

export type ConferenceArticle = {
  id: string;
  title: string;
  authors: string;
  conference: string;
  proceedings: string;
  href: string;
};

export type JournalIssue = { id: string; volume: string; label: string; latest?: boolean; href: string };

export type WeResearchData = {
  hero: { title: string; body: string; cta: { label: string; href: string }; image: string };
  areas: { heading: string; items: ResearchArea[] };
  awarded: { heading: string; description: string; papers: AwardedPaper[] };
  allPapers: { heading: string; description: string; image: string; papers: ResearchPaper[] };
  books: { heading: string; description: string; items: BookPublished[] };
  cases: { heading: string; description: string; items: AuthoredCase[] };
  magazine: { heading: string; description: string; image: string; items: MagazineArticle[] };
  conference: { heading: string; description: string; items: ConferenceArticle[] };
  journal: { heading: string; body: string; image: string; archiveHeading: string; cta: { label: string; href: string }; issues: JournalIssue[] };
};

const WIMG = {
  hero: "/weresearch/hero.webp",
  papers: "/weresearch/papers.webp",
  magazine: "/weresearch/magazine.webp",
  journal: "",
};

const AREAS = [
  "Business Management",
  "Rural Management",
  "Healthcare Management",
  "Media & Entertainment",
  "Technology Management",
  "Business Design",
  "Innovation & Entrepreneurship",
  "Economics & Social Sciences",
  "Sustainability",
];

export const WERESEARCH: WeResearchData = {
  hero: {
    title: "Exploring Ideas. Creating Knowledge. Shaping Management Thoughts.",
    body: "Research is an integral part of the WeSchool academic ecosystem. Explore work that brings together management, social sciences and technology to examine contemporary business and societal questions. From research papers and case studies to books, conferences, funded projects and the aWEshkar journal, WeSchool's research engages with both academic inquiry and practical contexts.",
    cta: { label: "Explore Our Research", href: "/weresearch/papers" },
    image: WIMG.hero,
  },
  areas: { heading: "Research Areas", items: AREAS },
  awarded: {
    heading: "Awarded & Recognised Papers",
    description: "Explore research that has earned recognition for its contribution to management and related fields. From faculty research recognised at academic conferences to papers receiving awards for their work, these contributions reflect the depth and range of inquiry undertaken at WeSchool.",
    papers: [
      { id: "aw-1", area: "Technology Management", year: "2024", title: "Digital Transformation and Organisational Resilience: Evidence from Indian SMEs", authors: "Dr. Priya Sharma, Prof. Rajan Mehta", journal: "Journal of Management Studies", award: "Best Paper Award — AIMS International Conference on Management", href: "/weresearch/papers" },
      { id: "aw-2", area: "Sustainability", year: "2024", title: "Green Banking Practices and Financial Performance: A Study of Indian Commercial Banks", authors: "Dr. Anita Desai, Dr. Suresh Kumar", journal: "International Journal of Bank Marketing", award: "Excellence in Research Award — Indian Finance Association", href: "/weresearch/papers" },
      { id: "aw-3", area: "Rural Management", year: "2023", title: "Rural Entrepreneurship and Livelihood Generation: Case Studies from Maharashtra", authors: "Prof. Kavitha Rao, Dr. Mohan Pillai", journal: "Journal of Rural Studies", award: "Outstanding Paper — IIMA Research Conference", href: "/weresearch/papers" },
      { id: "aw-4", area: "Healthcare Management", year: "2023", title: "Workforce Diversity and Organisational Performance in Healthcare Settings", authors: "Dr. Nandita Bose, Prof. Arvind Singh", journal: "Health Care Management Review", award: "Best Research Paper — National HRM Summit", href: "/weresearch/papers" },
    ],
  },
  allPapers: {
    heading: "All Research Papers",
    description: "Explore WeSchool's wider body of published research across management, business, technology and the social sciences. Browse research on subjects ranging from artificial intelligence, finance and sustainability to marketing, human resources, healthcare, entrepreneurship and organisational behaviour.",
    image: WIMG.papers,
    papers: Array.from({ length: 4 }, (_, i) => ({
      id: `rp-${i + 1}`,
      area: "Technology Management",
      year: "2024",
      title: "Artificial Intelligence in Supply Chain Management: Opportunities and Challenges for Indian Firms",
      authors: "Dr. Priya Sharma, Dr. Vivek Joshi",
      journal: "International Journal of Production Economics",
      abstract: "This paper examines the adoption of AI technologies in supply chain operations among Indian firms, identifying key drivers, barriers, and performance outcomes through a mixed-methods study.",
      href: "/weresearch/papers",
    })),
  },
  books: {
    heading: "Books Published",
    description: "Go beyond individual research papers and explore books and published chapters authored or contributed to by WeSchool faculty and researchers. Covering areas such as finance, management, leadership, healthcare, sustainability, technology and entrepreneurship, these publications extend research into more detailed and accessible bodies of knowledge.",
    items: Array.from({ length: 5 }, (_, i) => ({
      id: `bk-${i + 1}`,
      title: "Management in the Digital Age: Indian Perspectives",
      authors: "Dr. Priya Sharma, Prof. Rajan Mehta",
      publisher: "Sage Publications India",
      year: "2024",
      href: "/weresearch/cases",
    })),
  },
  cases: {
    heading: "Authored Cases",
    description: "Explore management cases that turn real business situations into opportunities for analysis, discussion and decision-making. WeSchool's case contributions span areas such as strategy, marketing, entrepreneurship, operations, finance and sustainability.",
    items: Array.from({ length: 5 }, (_, i) => ({
      id: `ca-${i + 1}`,
      year: "2024",
      publisher: "Harvard Business Publishing",
      title: "Tata Motors and the EV Transition: Strategy in a Disrupted Market",
      authors: "Dr. Priya Sharma, Prof. Rajan Mehta",
      source: "Tata Motors Ltd.",
      abstract: "Examines Tata Motors' strategic pivot to electric vehicles, analysing competitive positioning, supply chain challenges and market development strategies in India's evolving automotive sector.",
      href: "/weresearch/cases",
    })),
  },
  magazine: {
    heading: "Magazine Articles",
    description: "Read perspectives from WeSchool faculty and researchers on contemporary issues shaping business, organisations and society. These articles bring academic thinking into a more accessible format, offering observations, interpretations and informed viewpoints.",
    image: WIMG.magazine,
    items: Array.from({ length: 4 }, (_, i) => ({
      id: `ma-${i + 1}`,
      area: "Sustainability",
      date: "March 2025",
      title: "Why Indian Businesses Must Embed ESG Beyond Compliance",
      author: "Dr. Suresh Kumar",
      source: "Economic Times CXO",
      href: "/weresearch/articles",
    })),
  },
  conference: {
    heading: "Conference Articles",
    description: "Explore research shared through academic conferences and published proceedings. These contributions capture research questions, findings and perspectives presented within academic forums, covering a range of management and interdisciplinary themes.",
    items: Array.from({ length: 4 }, (_, i) => ({
      id: `co-${i + 1}`,
      title: "Taxation Policies and Healthcare Expenditure: Cross-Country Evidence",
      authors: "Dr. Suresh Kumar, Dr. Anita Desai",
      conference: "International Conference on Health Economics",
      proceedings: "Health Economics Proceedings 2024 · Singapore 2024",
      href: "/weresearch/conferences",
    })),
  },
  journal: {
    heading: "Aweshkar Journal",
    body: "Explore aWEshkar, WeSchool's bi-annual, double-blind peer-reviewed research journal dedicated to creating and sharing knowledge for the academic and corporate community. The journal provides a platform for researchers, practitioners, academicians and professionals to share research, practical experiences and perspectives across Business and Management and related areas.",
    image: WIMG.journal,
    archiveHeading: "Journal Archive",
    cta: { label: "Explore All Issues", href: "/weresearch/aweshkar" },
    issues: [
      { id: "ji-1", volume: "Vol. 32 Issue I", label: "March 2025", latest: true, href: "/weresearch/aweshkar" },
      { id: "ji-2", volume: "Vol. 29 Issue II", label: "September 2022", href: "/weresearch/aweshkar" },
      { id: "ji-3", volume: "Vol. 29 Issue II", label: "September 2022", href: "/weresearch/aweshkar" },
      { id: "ji-4", volume: "Vol. 29 Issue II", label: "September 2022", href: "/weresearch/aweshkar" },
    ],
  },
};
