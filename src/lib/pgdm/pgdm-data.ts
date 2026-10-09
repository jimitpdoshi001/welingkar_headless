/**
 * Mock data for the PGDM programme pages (Mumbai / Bengaluru), mirroring the
 * Figma design. Swap for Drupal fields later. Images are placeholders.
 */
import { logoPlaceholder } from "@/util/placeholder";

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

export type PgdmFeature = { id: string; title: string; description?: string };

export type PgdmWhyProgram = { heading: string; body: string; videoThumb: string; videoHref?: string };

export type PgdmGlance = {
  heading: string;
  image: string;
  details: { label: string; value: string }[];
};

export type PgdmWhoApplyPanel = {
  intro: { heading: string; body: string; bullets: string[] };
  side: { heading: string; paragraphs: string[]; cta: PgdmCta };
};

export type PgdmWhoApply = {
  heading: string;
  subtitle: string;
  tabs: { id: string; label: string }[];
  panels: Record<string, PgdmWhoApplyPanel>;
};

export type PgdmTable = {
  title: string;
  campusLabel: string;
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

export type PgdmCommunity = { heading: string; description: string; cta: PgdmCta; testimonials: PgdmTestimonial[] };

export type PgdmFaqs = { heading: string; items: { id: string; q: string; a: string }[]; brochureCta: PgdmCta };

export type PgdmData = {
  campus: "Mumbai" | "Bengaluru";
  hero: PgdmHeroData;
  whyProgram: PgdmWhyProgram;
  quickReasons: PgdmFeature[];
  usps: PgdmFeature[];
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

const IMG = {
  classroom: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&auto=format&fit=crop&q=80",
  classroomBlr: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80",
  lecture: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=1200&auto=format&fit=crop&q=80",
  group: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
  study: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
  grad: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
  mentor: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&auto=format&fit=crop&q=80",
  library: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80",
  hostel: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80",
  placement: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
};

const SHARED_QUICK_REASONS: PgdmFeature[] = [
  { id: "qr-1", title: "Leadership", description: "Developing capable, visionary leaders ready to guide organizations." },
  { id: "qr-2", title: "Innovation", description: "Fostering creative problem-solving and an innovative mindset." },
  { id: "qr-3", title: "Critical Thinking", description: "Analytical abilities to navigate complex business scenarios." },
  { id: "qr-4", title: "Communication Skills", description: "Effective and persuasive professional communication." },
  { id: "qr-5", title: "Global Perspective", description: "Understanding international markets and diverse cultures." },
  { id: "qr-6", title: "Role of Self", description: "Awareness of individual impact on the organization and broader society." },
];

const SHARED_USPS: PgdmFeature[] = [
  { id: "usp-1", title: "Benchmarking", description: "of syllabus as against top International and Indian business schools." },
  { id: "usp-2", title: "Assessment centre", description: "for student development supported with structured domain and grooming sessions." },
  { id: "usp-3", title: "Development centre", description: "through excel training, guest sessions, domain tests, aptitude tests, mock GD/PI." },
  { id: "usp-4", title: "Finance GYM", description: "– online interactive game on equity, conducted by ‘The Learning Curve Academy’." },
  { id: "usp-5", title: "Fit for Finance", description: "– workshops on strengthening finance concepts." },
  { id: "usp-6", title: "Roundtable conferences", description: "– panellists from the industry and alumni." },
  { id: "usp-7", title: "Focused mentoring" },
  { id: "usp-8", title: "Continuous assessment", description: "evaluation of students." },
  { id: "usp-9", title: "HR Lab", description: "– learning by doing experience on real-life business challenges." },
  { id: "usp-10", title: "MarkQuest", description: "– student-driven marketing club of WeSchool, aimed to engage and enrich marketing students with domain knowledge and practical insights." },
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
  { id: "faq-1", q: "What is PGDM?", a: "PGDM (Post Graduate Diploma in Management) is a two-year, full-time, industry-oriented management programme offered by AICTE-approved autonomous institutes." },
  { id: "faq-2", q: "What is the duration of the PGDM Program?", a: "The PGDM programme is a two-year, full-time course delivered across six trimesters." },
  { id: "faq-3", q: "What are PGDM course fees?", a: "PGDM is a very popular course for students who desire to pursue their careers in the management field, and at Welingkar it costs ₹7,00,000 per annum as tuition fees & other, library deposit ₹4000 (refundable), and hostel fees ₹1,60,000 p.a. to ₹2,20,000 p.a. along with a refundable deposit of ₹10,000." },
  { id: "faq-4", q: "What is PGDM Eligibility?", a: "A minimum of 50% in graduation is required, along with a valid CAT / XAT / ATMA / CMAT / GMAT score." },
  { id: "faq-5", q: "What is the PGDM admission process?", a: "Shortlisting is based on entrance test percentile/score followed by the online selection process (GE / PI)." },
  { id: "faq-6", q: "Entrance Exam required for admission to PGDM?", a: "CAT (2025), XAT (2026), ATMA Feb (2026), CMAT (2026), or GMAT (2023 onwards)." },
  { id: "faq-7", q: "Career options after pursuing a PGDM?", a: "Graduates pursue roles across Finance, Marketing, Operations and HR with leading recruiters." },
];

const RECRUITER_LOGOS = ["Axis Bank", "EY", "ICICI Bank", "Infosys", "Kotak Mahindra Bank", "HDFC Bank"].map((name, i) => ({
  name,
  image: logoPlaceholder(name),
  id: i,
}));

function makeData(campus: "Mumbai" | "Bengaluru"): PgdmData {
  const isMumbai = campus === "Mumbai";
  return {
    campus,
    hero: {
      breadcrumb: ["Home", "Programmes", "PGDM"],
      title: "Post Graduate Diploma in Management",
      subtitle:
        "Introduced in 1994, this program has spent over three decades emphasising acquisition, application, and assimilation, building the confident managers of tomorrow.",
      stats: ["Present Intake: 180", "Intake 180 Seats", "Duration 2 Years", "Specialisations 4 Tracks"],
      primaryCta: { label: "Apply Now", href: "/apply" },
      secondaryCta: { label: "View Brochure", href: "/brochure" },
      image: isMumbai ? IMG.classroom : IMG.classroomBlr,
      imageAlt: `PGDM students at WeSchool ${campus}`,
    },
    whyProgram: {
      heading: "Why this Program?",
      body: `WeSchool's flagship PGDM program in ${campus} takes a multidisciplinary approach, combining core management principles with specialized expertise in Marketing, Finance, Human Resources, and Operations. The program is designed to shape students into competent, future-ready leaders, equipped with strong managerial skills, an innovative mindset, and exposure to real-world business challenges.`,
      videoThumb: IMG.lecture,
      videoHref: "#",
    },
    quickReasons: SHARED_QUICK_REASONS,
    usps: SHARED_USPS,
    glance: {
      heading: "Programme at a Glance",
      image: IMG.group,
      details: [
        { label: "Programme", value: "Post Graduate Diploma in Management" },
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
      tabs: [
        { id: "freshers", label: "Freshers" },
        { id: "workex", label: "Work-Ex" },
      ],
      panels: {
        freshers: {
          intro: {
            heading: "For Freshers",
            body: "The PGDM programme is designed for graduates looking to build a strong foundation in management, develop industry-relevant skills, and prepare for diverse career opportunities across business functions.",
            bullets: ["Build management fundamentals", "Explore specialisations", "Industry-relevant practical skills", "Strong placement network"],
          },
          side: {
            heading: "Eligibility Criteria",
            paragraphs: [
              "A minimum of 50% in graduation is required, which must be completed by June 2026.",
              "Candidates should have appeared for CAT (2025), XAT (2026), ATMA Feb (2026), CMAT (2026), or GMAT (2023 onwards).",
            ],
            cta: { label: "Check Eligibility and Apply", href: "/apply" },
          },
        },
        workex: {
          intro: {
            heading: "For Work-Ex Candidates",
            body: "Professionals with work experience bring real-world context to the classroom and accelerate into leadership and specialist tracks.",
            bullets: ["Leverage prior experience", "Fast-track to leadership roles", "Specialised electives", "Strong alumni network"],
          },
          side: {
            heading: "Eligibility Criteria",
            paragraphs: [
              "A minimum of 50% in graduation is required, which must be completed by June 2026.",
              "Candidates should have appeared for CAT (2025), XAT (2026), ATMA Feb (2026), CMAT (2026), or GMAT (2023 onwards).",
            ],
            cta: { label: "Check Eligibility and Apply", href: "/apply" },
          },
        },
      },
    },
    shortlisting: {
      title: "Shortlisting Criteria for Online Selection Process – General Merit List",
      campusLabel: `${campus} Campus`,
      columns: ["Program / Campus", "CAT 2025 / XAT 2026 / GMAT (2023 onwards) Percentile", "ATMA Feb 2026 / CMAT 2026 Score"],
      rows: [
        { program: "PGDM, PGDM E-Business, PGDM Research & Business Analytics", values: ["80", "85"] },
        { program: "PGDM Retail, PGDM Media and Entertainment and PGDM Business Design", values: ["75", "80"] },
        { program: "PGDM – Healthcare Management", values: ["70%ile across above entrance tests, irrespective of any graduation degree background"], span: true },
        { program: "PGDM – Rural Management", values: ["70%ile across above entrance tests, irrespective of any graduation degree background"], span: true },
      ],
    },
    curriculum: {
      heading: "Curriculum & Learning Experience",
      description:
        "Its transformative pedagogy blends lectures, industry projects, and simulation games to build cross-functional leadership skills, guided by distinguished academics and renowned industry experts.",
      trimesters: [
        {
          id: "t1",
          label: "Trimester I",
          subjects: ["Perspective Management", "Business Statistics", "Economics for Managers", "Financial Reporting & Analysis", "Effective Business Communication", "Organizational Behavior I", "Essentials of World Class Operations", "Marketing Management Basics", "Yoga"],
          objectives: ["Demonstrate professionalism and value-based, socially responsible behaviour", "Espouse the culture and spirit of entrepreneurship", "Acquire relevant knowledge across business domains", "Champion social values and ethical behaviour", "Demonstrate critical thinking, creativity, and innovation"],
        },
        { id: "t2", label: "Trimester II", subjects: ["Marketing Management", "Financial Management", "Operations Research", "Organizational Behavior II", "Human Resource Management", "Business Research Methods"], objectives: ["Apply core functional concepts to business problems", "Develop analytical and decision-making ability"] },
        { id: "t3", label: "Trimester III", subjects: ["Strategic Management", "Business Analytics", "Specialisation Electives I", "Legal Aspects of Business"], objectives: ["Integrate functions into strategy", "Begin specialisation depth"] },
        { id: "t4", label: "Trimester IV", subjects: ["Specialisation Electives II", "International Business", "Simulation Games"], objectives: ["Deepen domain expertise", "Experience cross-functional decision making"] },
        { id: "t5", label: "Trimester V", subjects: ["Specialisation Electives III", "Industry Projects", "Entrepreneurship"], objectives: ["Apply learning to live projects", "Build an entrepreneurial mindset"] },
        { id: "t6", label: "Trimester VI", subjects: ["Capstone Project", "Advanced Electives", "Leadership Lab"], objectives: ["Demonstrate leadership readiness", "Prepare for corporate transition"] },
      ],
    },
    visionMission: {
      vision: {
        heading: "Our Vision",
        body: "Provide industry and society, management graduates having excellence in leadership, entrepreneurial talent and research, through continuously innovative curriculum.",
        images: [IMG.grad, IMG.group],
      },
      mission: {
        heading: "Our Mission",
        lines: [
          "Contribute to management knowledge through application oriented technology",
          "Develop responsible management graduates through ethic-based education",
          "Promote global oriented, critical, innovative thinking and social entrepreneurship",
          "Forge meaningful partnerships with corporates and academia",
        ],
        images: [IMG.study, IMG.group],
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
      initialCount: 20,
    },
    achievements: {
      heading: "Student Achievements",
      description: "Year on year, our students do us proud and edify our belief in creating the leaders of tomorrow. Here are the achievements of our latest batch.",
      items: [
        { id: "ach-1", image: IMG.grad, title: 'The best manager" – bimtech noida 2023', position: "Position: 1st Prize", bullets: ["Clinch the title of \"The Best Manager\" by defeating 250+ participants of different B-Schools.", "Navigated 9 intense rounds over a span of two days in this challenging competition to win it.", "Received exclusive recognition as the sole standout participant in the competition.", "Rewarded with the title of \"The Best Manager\""], team: "Sanskar Jain — PGDM (23–25)" },
        { id: "ach-2", image: IMG.group, title: "National Case Championship 2023", position: "Position: Runner-up", bullets: ["Competed against 180+ teams nationally.", "Presented an innovative go-to-market strategy.", "Recognised for analytical rigour and storytelling."], team: "Team WeSchool — PGDM (23–25)" },
      ],
    },
    placement: {
      heading: "Placement Opportunities",
      paragraphs: [
        "WeSchool's placement season witnessed strong interest from companies, marked not just by the sheer number of job profiles on offer, but also by the variety of roles and the competitiveness of the packages. In total, 358 companies visited the campus, 227 of them for the first time.",
        "With 358 companies on campus, spread across varied sectors, profiles, and continents, we ensure that our students are well-equipped to meet industry requirements the moment they step out of our gates. We partner with and support our students every step of the way, right from their selection to their final placements.",
      ],
      image: IMG.placement,
      years: [
        { id: "2023-25", label: "2023-25", stats: [{ value: "₹11.7 LPA", label: "Average Salary" }, { value: "₹40K", label: "Highest Monthly Stipend" }, { value: "₹18.54L", label: "Highest International CTC" }, { value: "₹20.62L", label: "Top Domestic CTC" }] },
        { id: "2022-24", label: "2022-24", stats: [{ value: "₹11.2 LPA", label: "Average Salary" }, { value: "₹38K", label: "Highest Monthly Stipend" }, { value: "₹17.8L", label: "Highest International CTC" }, { value: "₹19.9L", label: "Top Domestic CTC" }] },
        { id: "2021-23", label: "2021-23", stats: [{ value: "₹10.6 LPA", label: "Average Salary" }, { value: "₹35K", label: "Highest Monthly Stipend" }, { value: "₹16.4L", label: "Highest International CTC" }, { value: "₹18.5L", label: "Top Domestic CTC" }] },
      ],
      whyRecruit: {
        heading: "Why Recruit Graduates of This Programme?",
        paragraphs: [
          "WeSchool's PGDM programme develops graduates with knowledge across business domains, supported by practical learning, industry exposure, mentoring and continuous assessment.",
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
      heading: "Programme Fees, EMI Details & Scholarships",
      description:
        "WeSchool is committed to giving more than it takes, in order to offer a brighter future to our students. We aim to rise above the notion of assured ROI, which is just numbers, by adding real value and equipping our students to face the challenges of a dynamic business world with confidence.",
      cards: [
        { image: IMG.mentor, label: "Tuition Fees & Other", value: "₹7,50,000/- p.a*", note: "*Subject to change" },
        { image: IMG.library, label: "Library Deposit", value: "₹4,000/- (refundable)" },
        { image: IMG.hostel, label: "Hostel Fees", value: "₹1,60,000/- p.a. to ₹2,20,000/- p.a.", note: "Plus a deposit of ₹10,000/- (refundable)" },
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
      testimonials: [
        { id: "t-1", quote: "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.", name: "Rajesh Ramineni", role: "BigBasket DC – Manager", avatar: IMG.avatar },
        { id: "t-2", quote: "The industry exposure and mentoring at WeSchool shaped how I approach real business problems every day.", name: "Priya Nair", role: "Deloitte – Consultant", avatar: IMG.avatar },
      ],
    },
    faqs: { heading: "FAQ's", items: SHARED_FAQS, brochureCta: { label: "Download Brochure", href: "/brochure" } },
  };
}

export const PGDM_MUMBAI: PgdmData = makeData("Mumbai");
export const PGDM_BENGALURU: PgdmData = makeData("Bengaluru");
