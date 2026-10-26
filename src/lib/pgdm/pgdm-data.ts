/**
 * Mock data for the PGDM programme pages (Mumbai / Bengaluru), mirroring the
 * Figma design. Swap for Drupal fields later. Images are placeholders.
 */

export type PgdmCta = { label: string; href: string };

export type PgdmHeroData = {
  breadcrumb: string[];
  title: string;
  subtitle: string;
  stats: string[];
  primaryCta: PgdmCta;
  secondaryCta: PgdmCta;
  image: string;
  imageAlt: string;
};

export type PgdmFeature = { id: string; title: string; description?: string; icon?: string };

export type PgdmWhyProgram = { heading: string; body: string; videoThumb: string; videoHref?: string };

export type PgdmGlance = {
  heading: string;
  image: string;
  details: { label: string; value: string }[];
};

// Figma 644:472: "Who Should Apply?" is a subtitle over two info cards
// (eligibility + entrance exams), the second with a note and Apply CTA.
export type PgdmWhoApplyCard = { heading: string; body: string; note?: string; cta?: PgdmCta };

export type PgdmWhoApply = {
  heading: string;
  subtitle: string;
  cards: PgdmWhoApplyCard[];
};

export type PgdmTable = {
  title: string;
  // Figma 644:472: one table per campus, each with its own header colour.
  campuses: { label: string; color: string }[];
  columns: string[];
  rows: { program: string; values: string[]; span?: boolean }[];
};

export type PgdmCurriculum = {
  heading: string;
  description: string;
  trimesters: { id: string; label: string; subjects: string[]; objectives: string[] }[];
};

export type PgdmVisionMission = {
  vision: { heading: string; body: string; images: string[] };
  mission: { heading: string; lines: string[]; images: string[] };
};

export type PgdmAccordionItem = {
  id: string;
  label: string;
  stats?: { value: string; label: string }[];
  text?: string;
};

export type PgdmClassProfile = { heading: string; description: string; items: PgdmAccordionItem[] };

export type PgdmCareer = {
  heading: string;
  description: string;
  tabs: { id: string; label: string; roles: string[] }[];
  initialCount: number;
};

export type PgdmAchievement = {
  id: string;
  image: string;
  title: string;
  position: string;
  bullets: string[];
  team: string;
};

export type PgdmAchievements = { heading: string; description: string; items: PgdmAchievement[] };

export type PgdmPlacement = {
  heading: string;
  paragraphs: string[];
  image: string;
  years: { id: string; label: string; stats: { value: string; label: string }[] }[];
  whyRecruit: { heading: string; paragraphs: string[]; cta: PgdmCta };
  steps: { num: string; title: string; desc: string }[];
};

export type PgdmRecruiters = { heading: string; logos: { name: string; image: string }[] };

export type PgdmFees = {
  heading: string;
  description: string;
  cards: { image: string; label: string; value: string; note?: string }[];
  waiver: { heading: string; bullets: string[] };
  eligibility: { heading: string; bullets: string[] };
};

export type PgdmTestimonial = { id: string; quote: string; name: string; role: string; avatar: string };

export type PgdmCommunity = { heading: string; description: string; cta: PgdmCta; testimonials: PgdmTestimonial[]; media?: string[] };

export type PgdmFaqs = { heading: string; items: { id: string; q: string; a: string }[]; brochureCta: PgdmCta };

// Figma 644:472 sections added in the revamp.
export type PgdmObjective = { id: string; icon?: string; text: string };
export type PgdmObjectives = { heading: string; items: PgdmObjective[] };
export type PgdmOutcomes = { heading: string; items: PgdmFeature[] };
export type PgdmStrengths = { heading: string; subheading: string; image: string; cards: string[] };
export type PgdmPedagogy = { heading: string; intro: string; image: string; bullets: string[] };
export type PgdmInnovative = { heading: string; image: string; links: string[] };
export type PgdmFacultyPerson = { id: string; name: string; title: string; image: string };
export type PgdmProgramFaculty = { heading: string; people: PgdmFacultyPerson[] };
export type PgdmBandStat = { value: string; label: string };
// Figma 644:472: Program USPs is a dark photo band with white cards at the base.
export type PgdmUspBand = { heading: string; image: string; cards: string[] };

export type PgdmData = {
  campus: "Mumbai" | "Bengaluru";
  hero: PgdmHeroData;
  bandStats: PgdmBandStat[];
  whyProgram: PgdmWhyProgram;
  educationalObjectives: PgdmObjectives;
  outcomes: PgdmOutcomes;
  strengths: PgdmStrengths;
  studentPedagogy: PgdmPedagogy;
  innovativePedagogy: PgdmInnovative;
  programFaculty: PgdmProgramFaculty;
  quickReasons: PgdmFeature[];
  usps: PgdmFeature[];
  uspBand: PgdmUspBand;
  glance: PgdmGlance;
  whoApply: PgdmWhoApply;
  shortlisting: PgdmTable;
  curriculum: PgdmCurriculum;
  visionMission: PgdmVisionMission;
  classProfile: PgdmClassProfile;
  career: PgdmCareer;
  achievements: PgdmAchievements;
  placement: PgdmPlacement;
  recruiters: PgdmRecruiters;
  fees: PgdmFees;
  community: PgdmCommunity;
  faqs: PgdmFaqs;
};

// Local image slots: /public/programmes/pgdm/<mumbai|bengaluru>/<name>.webp.
// Each ships with a labelled placeholder; upload a file with the same name to replace it.
const pgdmImages = (slug: "mumbai" | "bengaluru") => {
  const img = (name: string) => `/programmes/pgdm/${slug}/${name}.webp`;
  return {
    hero: img("hero"),
    why: img("why-this-program"),
    glance: img("at-a-glance"),
    vision1: img("vision-1"),
    vision2: img("vision-2"),
    mission1: img("mission-1"),
    mission2: img("mission-2"),
    achievement1: img("achievement-1"),
    achievement2: img("achievement-2"),
    placement: img("placement"),
    feeTuition: img("fee-tuition"),
    feeLibrary: img("fee-library"),
    feeHostel: img("fee-hostel"),
    strengths: img("program-strengths"),
    studentCentric: img("student-centric"),
    usps: img("program-usps"),
    innovative: img("innovative-pedagogy"),
    community1: img("community-1"),
    community2: img("community-2"),
    avatar1: img("testimonial-1"),
    avatar2: img("testimonial-2"),
  };
};

const SHARED_QUICK_REASONS: PgdmFeature[] = [
  { id: "qr-1", icon: "/programmes/pgdm/icons/leadership.png", title: "Leadership", description: "Developing capable, visionary leaders ready to guide organizations." },
  { id: "qr-2", icon: "/programmes/pgdm/icons/innovation.png", title: "Innovation", description: "Fostering creative problem-solving and an innovative mindset." },
  { id: "qr-3", icon: "/programmes/pgdm/icons/critical-thinking.png", title: "Critical Thinking", description: "Analytical abilities to navigate complex business scenarios." },
  { id: "qr-4", icon: "/programmes/pgdm/icons/communication.png", title: "Communication Skills", description: "Effective and persuasive professional communication." },
  { id: "qr-5", icon: "/programmes/pgdm/icons/global-perspective.png", title: "Global Perspective", description: "Understanding international markets and diverse cultures." },
  { id: "qr-6", icon: "/programmes/pgdm/icons/role-of-self.png", title: "Role of Self", description: "Awareness of individual impact on the organization and broader society." },
];

const SHARED_USPS: PgdmFeature[] = [
  { id: "usp-1", icon: "/programmes/pgdm/icons/benchmarking.png", title: "Benchmarking", description: "of syllabus as against top International and Indian business schools." },
  { id: "usp-2", icon: "/programmes/pgdm/icons/assessment-centre.png", title: "Assessment centre", description: "for student development supported with structured domain and grooming sessions." },
  { id: "usp-3", icon: "/programmes/pgdm/icons/development-centre.png", title: "Development centre", description: "through excel training, guest sessions, domain tests, aptitude tests, mock GD/PI." },
  { id: "usp-4", icon: "/programmes/pgdm/icons/finance-gym.png", title: "Finance GYM", description: "– online interactive game on equity, conducted by ‘The Learning Curve Academy’." },
  { id: "usp-5", icon: "/programmes/pgdm/icons/fit-for-finance.png", title: "Fit for Finance", description: "– workshops on strengthening finance concepts." },
  { id: "usp-6", icon: "/programmes/pgdm/icons/roundtable.png", title: "Roundtable conferences", description: "– panellists from the industry and alumni." },
  { id: "usp-7", icon: "/programmes/pgdm/icons/focused-mentoring.png", title: "Focused mentoring" },
  { id: "usp-8", icon: "/programmes/pgdm/icons/continuous-assessment.png", title: "Continuous assessment", description: "evaluation of students." },
  { id: "usp-9", icon: "/programmes/pgdm/icons/hr-lab.png", title: "HR Lab", description: "– learning by doing experience on real-life business challenges." },
  { id: "usp-10", icon: "/programmes/pgdm/icons/markquest.png", title: "MarkQuest", description: "– student-driven marketing club of WeSchool, aimed to engage and enrich marketing students with domain knowledge and practical insights." },
];

const CAREER_TABS = [
  {
    id: "finance",
    label: "Finance",
    roles: ["Private Banking", "Risk Services – Graduate Analyst", "Wealth Manager", "Internal Audit", "Enterprise Risk", "Valuation & Consulting", "Deal Advisory", "Consultant", "Product Manager", "Consumer Business – Sales", "Core Research & Insights", "Credit Analyst", "Finance Analyst", "Fixed Income Research", "Fund Services", "Growth Markets", "Insurance Trainee", "Internal Audit – Business Audit", "Compliance Business Trainee", "Management Trainee – Finance"],
  },
  { id: "marketing", label: "Marketing", roles: ["Brand Manager", "Digital Marketing Lead", "Product Marketing", "Category Manager", "Market Research Analyst", "Sales Manager", "Growth Marketer", "CRM Manager"] },
  { id: "operations", label: "Operations", roles: ["Supply Chain Analyst", "Operations Manager", "Logistics Lead", "Process Consultant", "Business Analyst", "Procurement Manager", "Quality Lead"] },
  { id: "hr", label: "HR", roles: ["HR Business Partner", "Talent Acquisition", "L&D Specialist", "Compensation & Benefits", "HR Analyst", "Organization Development"] },
];

const SHARED_FAQS = [
  { id: "faq-1", q: "What is PGDM?", a: "PGDM (Post Graduate Diploma in Management) is a two-year, full-time, industry-oriented management program offered by AICTE-approved autonomous institutes." },
  { id: "faq-2", q: "What is the duration of the PGDM Program?", a: "The PGDM program is a two-year, full-time course delivered across six trimesters." },
  { id: "faq-3", q: "What are PGDM course fees?", a: "PGDM is a very popular course for students who desire to pursue their careers in the management field, and at Welingkar it costs ₹7,00,000 per annum as tuition fees & other, library deposit ₹4000 (refundable), and hostel fees ₹1,60,000 p.a. to ₹2,20,000 p.a. along with a refundable deposit of ₹10,000." },
  { id: "faq-4", q: "What is PGDM Eligibility?", a: "A minimum of 50% in graduation is required, along with a valid CAT / XAT / ATMA / CMAT / GMAT score." },
  { id: "faq-5", q: "What is the PGDM admission process?", a: "Shortlisting is based on entrance test percentile/score followed by the online selection process (GE / PI)." },
  { id: "faq-6", q: "Entrance Exam required for admission to PGDM?", a: "CAT (2025), XAT (2026), ATMA Feb (2026), CMAT (2026), or GMAT (2023 onwards)." },
  { id: "faq-7", q: "Career options after pursuing a PGDM?", a: "Graduates pursue roles across Finance, Marketing, Operations and HR with leading recruiters." },
];

// Program Faculty (Figma 644:472): reuses the Managing Council portraits that
// already ship at /public/about/faculty/<slug>.webp.
const SHARED_FACULTY: PgdmFacultyPerson[] = [
  "Shri. Sudhir Shankar Kalkar",
  "Shri. Sunil Madhusudan Joshi",
  "Shri. Radhesham Bajranglal Agrawal",
  "Shri. Vivek V. Nayak",
  "Shri. Navin Naidu Dasari",
  "Shri. Raghav Pandit Ashtekar",
  "Shri. Anil Purushottam Barve",
  "Shri. Manoj Pandurang Bhalerao",
  "Shri. Yashodhan Sunil Bhide",
  "Shri. Tushar N Kulkarni",
].map((name) => {
  const slug = name.replace(/^Shri\.\s*/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return { id: slug, name, title: "Faculty", image: `/about/faculty/${slug}.webp` };
});

// Shared with the campus pages: /public/campus/recruiters/<name-slug>.webp.
const RECRUITER_LOGOS = ["Axis Bank", "EY", "ICICI Bank", "Infosys", "Kotak Mahindra Bank", "HDFC Bank"].map((name) => ({
  name,
  image: `/campus/recruiters/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.webp`,
}));

function makeData(campus: "Mumbai" | "Bengaluru"): PgdmData {
  const isMumbai = campus === "Mumbai";
  const IMG = pgdmImages(isMumbai ? "mumbai" : "bengaluru");
  return {
    campus,
    hero: {
      breadcrumb: ["Home", "Programs", "PGDM"],
      title: "Post Graduate Diploma in Management (PGDM)",
      subtitle:
        "With a strong emphasis on Acquisition, Application, and Assimilation of knowledge; this programme focuses on creating the confident managers of tomorrow.",
      stats: ["Present Intake: 180", "Intake 180 Seats", "Duration 2 Years", "Specialisations 4 Tracks"],
      primaryCta: { label: "Apply Now", href: "/apply" },
      secondaryCta: { label: "View Brochure", href: "/brochure" },
      image: IMG.hero,
      imageAlt: `PGDM students at WeSchool ${campus}`,
    },
    bandStats: [
      { value: "2 years", label: "Full-time programme" },
      { value: "180", label: "Present intake" },
      { value: "115.5", label: "Total credits" },
      { value: "Since 1994", label: "Flagship PGDM" },
    ],
    whyProgram: {
      heading: "Why this Program?",
      body: "WeSchool's flagship PGDM program offers a multidisciplinary approach that seamlessly combines general management principles with specialized expertise in Marketing, Finance, Human Resources, and Operations. The program is designed to develop students into competent future leaders, equipped with both managerial skills and an innovative mindset, while providing exposure to real-world business challenges. The program's transformative pedagogy includes a mix of lectures, industry projects, and simulation games that promote cross-functional leadership, all taught by distinguished academics and renowned industry experts from leading companies.",
      videoThumb: IMG.why,
      videoHref: "#",
    },
    quickReasons: SHARED_QUICK_REASONS,
    usps: SHARED_USPS,
    uspBand: {
      heading: "Program USPs",
      image: IMG.usps,
      cards: [
        "Flagship program – started in 1993",
        "180 Intake with 4 specializations",
        "Trimester system with 115.5 credits",
        "Contemporary syllabus with innovative pedagogy",
        "Agile, Adaptive Leaders with a sustainability approach",
        "NBA, SAQS, ACBSP Accredited",
      ],
    },
    educationalObjectives: {
      heading: "Program Educational Objectives",
      items: [
        { id: "peo-1", icon: "/programmes/pgdm/icons/leadership.png", text: "Management graduates will be able to demonstrate professionalism in their performance of tasks, exhibit value-based and socially responsible behavior in their pursuits and career." },
        { id: "peo-2", icon: "/programmes/pgdm/icons/global-perspective.png", text: "Management graduates will espouse the culture and spirit of entrepreneurship in organizations they choose to serve as well as in society." },
        { id: "peo-3", icon: "/programmes/pgdm/icons/innovation.png", text: "Management graduates will be equipped with relevant knowledge in the business domain." },
        { id: "peo-4", icon: "/programmes/pgdm/icons/communication.png", text: "Management graduates will champion social values and ethical behavior in pursuit of sustainable development." },
        { id: "peo-5", icon: "/programmes/pgdm/icons/critical-thinking.png", text: "Management graduates will demonstrate critical thinking, creativity and innovation to emerge as business leaders and entrepreneurs." },
      ],
    },
    outcomes: {
      heading: "Program Outcomes",
      items: [
        { id: "po-1", title: "Leadership", description: "Students will proactively demonstrate the ability to take initiative. They will be able to generate agreement, fairly and objectively, by working through different, even conflicting, points of view. They will be result oriented and have the ability to take calculated risks." },
        { id: "po-2", title: "Innovation", description: "Students will demonstrate the ability to visualize innovative solutions and gather user needs holistically." },
        { id: "po-3", title: "Critical & Analytical Thinking", description: "Students will be able to analyze a situation to its root cause, using tangible and intangible information." },
        { id: "po-4", title: "Communication", description: "Students will able to make a good personal impact, and articulate good written and spoken skills." },
        { id: "po-5", title: "Global Perspective", description: "Students will be aware of contemporary globally accepted practices, tools and techniques. They will demonstrate ability to view problems and solutions from a global perspective – organizational, locational and cultural." },
        { id: "po-6", title: "Role of Self in the organization & in the society", description: "Students will demonstrate clarity on their personal goals, while being aware of the social context. They will be sensitive to ethical issues and believe in working out solutions based on sustainability principles." },
      ],
    },
    strengths: {
      heading: "Program Strengths",
      subheading: "Contemporary Curriculum",
      image: IMG.strengths,
      cards: [
        "Outcome based approach with AAA framework (Acquisition, Application & Assimilation).",
        "Robust syllabus to stay contemporary, through periodic revision & introducing new courses across specializations.",
        "Innovative pedagogy – embedding blended teaching-learning processes.",
        "Access to academic and strategic inputs from Academic & Advisory Boards.",
      ],
    },
    studentPedagogy: {
      heading: "Student-Centric Pedagogy",
      image: IMG.studentCentric,
      intro: "SHL, an Internationally acclaimed brand - conducts virtual assessment sessions. This enables student-wise, Development Centre (DC) planning. DC actions are implemented/facilitated and steered by faculty mentors, on an ongoing & continuous basis, to enhance student grooming, and employability.",
      bullets: [
        "Guest Sessions by International faculty, Industry experts and Alumni.",
        "Industry Specific Round-Table Conferences.",
        "Alumni mentoring and interaction.",
        "Mock GDPI and CV enhancement sessions",
        "Participation in Smart India Hackathons.",
        "Skill Development – hands-on training on Excel, Bloomberg Terminal and other Data Analytics software.",
        "Bloomberg Market Concepts Certification and Harvard Manage Mentor and KPMG sustainability certificate.",
      ],
    },
    innovativePedagogy: {
      heading: "Innovative Teaching and Learning Pedagogy",
      image: IMG.innovative,
      // Figma 2344:967: first row is the active one (white + play arrow).
      links: ["Faculty Initiatives", "Feedback on faculty teaching & learning initiative", "Institutional Initiatives"],
    },
    programFaculty: {
      heading: "Program Faculty",
      people: SHARED_FACULTY,
    },
    glance: {
      heading: "Program at a Glance",
      image: IMG.glance,
      details: [
        { label: "Program", value: "Post Graduate Diploma in Management" },
        { label: "Duration", value: "Two years, full-time" },
        { label: "Intake", value: "180 students" },
        { label: "Specialisations", value: "Marketing · Finance · Human Resources · Operations" },
        { label: "Eligibility", value: "Minimum 50% in graduation, to be completed by June 2026" },
        { label: "Campus", value: `${campus} (${isMumbai ? "Matunga" : "Bengaluru"})` },
        { label: "Entrance (2026)", value: "GMAT (2023 onwards)" },
        { label: "Entrance Exams", value: "CAT (2025) · XAT (2026) · ATMA Feb (2026) · CMAT" },
        { label: "Established", value: "1994" },
      ],
    },
    whoApply: {
      heading: "Who Should Apply?",
      subtitle: "Two paths, one programme.",
      cards: [
        {
          heading: "Who Should Apply?",
          body: "Candidates must have secured a minimum of 50% marks in their graduation from a recognised university. Candidates currently in their final year of graduation may also apply, provided they complete their degree by June 2027.",
        },
        {
          heading: "Eligibility Criteria",
          body: "Candidates must have appeared for any one of the following entrance examinations: CAT* 2026, XAT 2027, ATMA (February 2027), CMAT 2027, or GMAT (taken in 2024 or later).",
          note: "*The IIMs and other entrance examination authorities have no role in WeSchool's admission process.",
          cta: { label: "Apply Now", href: "/apply" },
        },
      ],
    },
    shortlisting: {
      title: "Shortlisting Criteria for Online Selection Process - General Merit List",
      campuses: [
        { label: "Mumbai Campus", color: "#4a3460" },
        { label: "Bengaluru Campus", color: "#b04535" },
      ],
      columns: ["Program/ Campus", "CAT 2025 / XAT 2026 / GMAT (2023 onwards) Percentile", "ATMA Feb 2026 / CMAT 2026 Score"],
      rows: [
        { program: "PGDM, PGDM E-Business, PGDM Research & Business Analytics", values: ["80", "85"] },
        { program: "PGDM Retail, PGDM Media and Entertainment and PGDM Business Design", values: ["75", "80"] },
        { program: "PGDM – Healthcare Management", values: ["70%ile across above entrance tests, irrespective of any graduation degree background"], span: true },
        { program: "PGDM – Rural Management", values: ["70%ile across above entrance tests, irrespective of any graduation degree background"], span: true },
      ],
    },
    curriculum: {
      heading: "Curriculum Description",
      description:
        "A transformative pedagogy that blends lectures, industry projects and simulation games to build cross-functional leadership skills, guided by distinguished academics and renowned industry experts.",
      trimesters: [
        {
          id: "t1",
          label: "Trimester I",
          subjects: ["Perspective Management", "Business Statistics", "Economics for Business Decisions", "Financial Reporting & Analysis", "Business Communication - Foundations & Core Skills", "Organizational Behavior I - Individuals in Organizations", "Essentials of World Class Operations", "Marketing Management I", "Yoga"],
          objectives: [],
        },
        {
          id: "t2",
          label: "Trimester II",
          subjects: ["Legal Aspects of Business", "Business Innovation and Application", "Global Citizen Leader - I", "Business Research Methods & Marketing Research", "Business Environment & Corporate Strategy", "Cost and Management Accounting", "Foreign Language", "Organizational Behavior II – Managing Group Dynamics", "Essentials of Supply Chain Management", "Marketing Management II", "Digital Marketing Basics", "Business Communication - Advanced Leadership Communication", "Yoga Sessions (Trim II)"],
          objectives: [],
        },
        {
          id: "t3",
          label: "Trimester III",
          subjects: ["Global Citizen Leader - II", "Business Analytics", "Basics of Banking, Financial Services and Insurance", "Business Taxation", "Fundamentals of Financial Management", "Consumer Behaviour", "Selling and Negotiation Skills", "Human Resource Development and Human Capital Management", "Project Management", "Yoga Sessions", "Universal Human Values"],
          objectives: [],
        },
      ],
    },
    visionMission: {
      vision: {
        heading: "Our Vision",
        body: "Provide Industry and Society, Management Graduates having excellence in leadership, entrepreneurial talent and research, through continuously innovative curriculum.",
        images: [IMG.vision1, IMG.vision2],
      },
      mission: {
        heading: "Our Mission",
        lines: [
          "Contribute to Management knowledge through application oriented, technology embedded education & research.",
          "Develop responsible management graduates, with risk managing abilities, through ethics-based education.",
          "Promote the culture of global oriented, critical, innovative thinking, and social entrepreneurship.",
          "Forge meaningful partnerships with Corporates, academia, regulatory bodies, & social sectors, based on consultancy and collaborative research.",
          "Promote a culture of academic excellence benchmarked against the best institutions, domestically & internationally, through continuous interaction with Alumni.",
        ],
        images: [IMG.mission1, IMG.mission2],
      },
    },
    classProfile: {
      heading: "Class profile 2025–27 Batch",
      description: "A diverse, high-calibre cohort from across India.",
      items: [
        {
          id: "education",
          label: "Education",
          stats: [
            { value: "10%", label: "Bachelor of Arts" },
            { value: "5%", label: "Bachelor of Science" },
            { value: "24%", label: "Bachelor of Commerce (BCOM)" },
            { value: "28%", label: "Bachelor of Engineering (BE/BTech)" },
            { value: "8%", label: "Bachelor of Management Studies (BMS)" },
            { value: "2%", label: "Bachelor of Pharma" },
            { value: "17%", label: "Bachelor of Business Administration" },
            { value: "6%", label: "Other" },
          ],
        },
        { id: "geo", label: "Geographical Diversity", stats: [{ value: "22", label: "States represented" }, { value: "60%", label: "Outside home state" }, { value: "40%", label: "Metro cities" }] },
        { id: "workex", label: "Work Experience", stats: [{ value: "45%", label: "Freshers" }, { value: "35%", label: "0–24 months" }, { value: "20%", label: "24+ months" }] },
        { id: "age", label: "Age", stats: [{ value: "21", label: "Youngest" }, { value: "24", label: "Average" }, { value: "29", label: "Oldest" }] },
        { id: "gender", label: "Gender Diversity", stats: [{ value: "52%", label: "Male" }, { value: "48%", label: "Female" }] },
      ],
    },
    career: {
      heading: "Career Opportunities",
      description: "To nurture every budding student, we guide, mentor and stand by each one; helping them discover their innate hidden abilities and interests. Students of this program can look forward to career opportunities like:",
      tabs: CAREER_TABS,
      // Show two rows of 4, then reveal the rest via Show More.
      initialCount: 8,
    },
    achievements: {
      heading: "Student Achievements",
      description: "Year on year, our students do us proud and edify our belief in creating the leaders of tomorrow. Here are the achievements of our latest batch.",
      items: [
        { id: "ach-1", image: IMG.achievement1, title: 'The best manager" – bimtech noida 2023', position: "Position: 1st Prize", bullets: ["Clinch the title of \"The Best Manager\" by defeating 250+ participants of different B-Schools.", "Navigated 9 intense rounds over a span of two days in this challenging competition to win it.", "Received exclusive recognition as the sole standout participant in the competition.", "Rewarded with the title of \"The Best Manager\""], team: "Sanskar Jain — PGDM (23–25)" },
        { id: "ach-2", image: IMG.achievement2, title: "National Case Championship 2023", position: "Position: Runner-up", bullets: ["Competed against 180+ teams nationally.", "Presented an innovative go-to-market strategy.", "Recognised for analytical rigour and storytelling."], team: "Team WeSchool — PGDM (23–25)" },
      ],
    },
    placement: {
      heading: "Placement Opportunities",
      paragraphs: [
        "WeSchool's placement season witnesses strong interest from companies, marked not just by the sheer number of job profiles on offer, but also by the variety of roles and the competitiveness of the packages. Over 358 companies have visited the campus with more than 200+ of them being regular recruiters. With such companies spread across varied sectors, profiles, and continents, we ensure that our students are well-equipped to meet industry requirements the moment they graduate.",
      ],
      image: IMG.placement,
      years: [
        { id: "2023-25", label: "2023-25", stats: [{ value: "₹12.01L", label: "Average Salary" }, { value: "₹20.7L", label: "Highest Salary" }] },
        { id: "2022-24", label: "2022-24", stats: [{ value: "₹11.4L", label: "Average Salary" }, { value: "₹19.9L", label: "Highest Salary" }] },
        { id: "2021-23", label: "2021-23", stats: [{ value: "₹10.6L", label: "Average Salary" }, { value: "₹18.5L", label: "Highest Salary" }] },
      ],
      whyRecruit: {
        heading: "Why Recruit Graduates of This Program?",
        paragraphs: [
          "WeSchool's PGDM program develops graduates with knowledge across business domains, supported by practical learning, industry exposure, mentoring and continuous assessment.",
          "Students are exposed to real-world business challenges through industry projects, simulation games, domain-focused development initiatives, roundtable conferences and learning experiences such as the HR Lab and Finance GYM.",
        ],
        cta: { label: "Hire from WeSchool", href: "/corporate-interface" },
      },
      steps: [
        { num: "01", title: "Connect with WeSchool", desc: "Reach our placement team and share your requirements." },
        { num: "02", title: "Explore Student Talent", desc: "Review profiles, CVs, and project portfolios." },
        { num: "03", title: "Engage with Students", desc: "Conduct pre-placement talks, workshops, and interviews." },
        { num: "04", title: "Select the Right Talent", desc: "Make offers through our structured placement process." },
      ],
    },
    recruiters: { heading: "Our Recruiters", logos: RECRUITER_LOGOS },
    fees: {
      heading: "Admission and Course Fees",
      description:
        "WeSchool intends to give more than what it takes, in order to offer a brighter future to our students. We try rising above the assured ROI which is just numbers, by adding value and making our students competitive enough to face real challenges, in the dynamic business world.",
      cards: [
        { image: IMG.feeTuition, label: "Tuition Fees & Other", value: "₹7,50,000/- p.a*", note: "*Subject to change" },
        { image: IMG.feeLibrary, label: "Library Deposit", value: "₹4,000/- (refundable)" },
        { image: IMG.feeHostel, label: "Hostel Fees", value: "₹1,60,000/- p.a. to ₹2,20,000/- p.a.", note: "Plus a deposit of ₹10,000/- (refundable)" },
      ],
      waiver: {
        heading: "Tuition Fee Waiver Scheme",
        bullets: ["Seats, up to Maximum 5 percent of sanctioned intake per course are available under TFW Scheme.", "Candidate's parent's annual income from all sources should not exceed Rs. 8.00 Lakh. This should be supported by the Income Certificate issued by the Tehsildar office and valid till March 2026.", "The Waiver is limited to the Tuition Fee only."],
      },
      eligibility: {
        heading: "Eligibility Criteria",
        bullets: ["Seats, up to Maximum 5 percent of sanctioned intake per course are available under TFW Scheme.", "All other fees except tuition fee shall be paid by the beneficiary.", "The Candidates admitted under this scheme shall not be allowed to change the course/campus at any stage under any circumstances."],
      },
    },
    community: {
      heading: "Straight from Our Community",
      description:
        "There's something special about watching our students, recruiters and faculty come together. It's a big part of what pushes us to keep raising the bar on academic excellence. Hear it from our alumni in their own words.",
      cta: { label: "View All", href: "/alumni" },
      // Figma: two video tiles beside the quote card.
      media: [IMG.community1, IMG.community2],
      testimonials: [
        { id: "t-1", quote: "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.", name: "Rajesh Ramineni", role: "BigBasket DC – Manager", avatar: IMG.avatar1 },
        { id: "t-2", quote: "The industry exposure and mentoring at WeSchool shaped how I approach real business problems every day.", name: "Priya Nair", role: "Deloitte – Consultant", avatar: IMG.avatar2 },
      ],
    },
    faqs: { heading: "FAQ's", items: SHARED_FAQS, brochureCta: { label: "Download Brochure", href: "/brochure" } },
  };
}

export const PGDM_MUMBAI: PgdmData = makeData("Mumbai");
export const PGDM_BENGALURU: PgdmData = makeData("Bengaluru");
