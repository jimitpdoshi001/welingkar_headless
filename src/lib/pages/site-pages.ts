/**
 * Content registry for the site's informational / landing pages.
 * One entry per route path → rendered by <RegistryPage path="…" />.
 * Placeholder copy; swap for Drupal fields later.
 */
import type { LinkCard } from "@/components/shell/ContentBlocks";
import type { Crumb } from "@/components/shell/PageShell";
import type { FormConfig } from "@/components/shell/SiteForm";

export type SiteSection = {
  heading?: string;
  lead?: string;
  paragraphs?: string[];
  tint?: "cream" | "purple";
  align?: "left" | "center";
  cards?: LinkCard[];
  cardColumns?: 2 | 3 | 4;
  form?: FormConfig;
  filters?: { search?: boolean; selects?: { label: string; options: string[] }[] };
};

export type SitePage = {
  title: string;
  subtitle?: string;
  accent?: "orange" | "green" | "default";
  image?: string;
  breadcrumbs?: Crumb[];
  sections: SiteSection[];
};

const HERO = {
  campus: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1600&auto=format&fit=crop&q=80",
  people: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80",
  research: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop&q=80",
  global: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&auto=format&fit=crop&q=80",
  office: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80",
};

const crumbs = (...items: [string, string?][]): Crumb[] => items.map(([label, href]) => ({ label, href }));

const lorem =
  "WeSchool is committed to progressive, industry-relevant and experiential management education. This page brings together everything you need to know, with content continuously updated by our team.";

function simple(title: string, subtitle: string, parent: [string, string], extra?: SiteSection[], image?: string, accent?: SitePage["accent"]): SitePage {
  return {
    title,
    subtitle,
    image,
    accent,
    breadcrumbs: crumbs(["Home", "/"], [parent[0], parent[1]], [title]),
    sections: [{ heading: "Overview", paragraphs: [subtitle, lorem] }, ...(extra ?? [])],
  };
}

export const SITE_PAGES: Record<string, SitePage> = {
  // ---- Who We Are (sub-pages; /about-us itself is a Drupal page) ----
  "/about-us/spm": simple("About S. P. Mandali", "The S.P. Mandali Trust is one of the oldest and most respected educational trusts in India.", ["Who We Are", "/about-us"], undefined, HERO.people),
  "/about-us/managing-council": simple("Managing Council Members", "The distinguished members who guide WeSchool's vision and governance.", ["Who We Are", "/about-us"], undefined, HERO.people),
  "/about-us/chairman-message": simple("Chairman's Message", "A message from the Chairman of the Managing Council.", ["Who We Are", "/about-us"], undefined, HERO.people),
  "/about-us/directors-message": simple("Director's Message", "A message from the Director of WeSchool.", ["Who We Are", "/about-us"], undefined, HERO.people),
  "/about-us/academic-advisory-board": simple("Academic Advisory Board", "Eminent academicians shaping our curriculum and academic rigour.", ["Who We Are", "/about-us"], undefined, HERO.people),
  "/about-us/industry-advisory-board": simple("Industry Advisory Board", "Industry leaders keeping our programmes aligned to real-world needs.", ["Who We Are", "/about-us"], undefined, HERO.people),
  "/about-us/awards": simple("Awards & Accolades", "Recognition of WeSchool's excellence in management education and innovation.", ["Who We Are", "/about-us"], undefined, HERO.office),
  "/about-us/vision-mission": {
    title: "Vision & Mission",
    subtitle: "What drives us, and the promise we make to every learner.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["Who We Are", "/about-us"], ["Vision & Mission"]),
    sections: [
      { heading: "Our Vision", paragraphs: ["Provide industry and society, management graduates having excellence in leadership, entrepreneurial talent and research, through continuously innovative curriculum."] },
      {
        heading: "Our Mission",
        tint: "cream",
        paragraphs: [
          "Contribute to management knowledge through application oriented technology.",
          "Develop responsible management graduates through ethic-based education.",
          "Promote global oriented, critical, innovative thinking and social entrepreneurship.",
          "Forge meaningful partnerships with corporates and academia.",
        ],
      },
    ],
  },

  // ---- Accreditation & statutory ----
  "/accreditation": {
    title: "Accreditation",
    subtitle: "WeSchool's quality is recognised by leading national and international accreditation bodies.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Accreditation"]),
    sections: [
      {
        heading: "Recognised for Excellence",
        cardColumns: 2,
        cards: [
          { title: "ACBSP Accredited", text: "Accredited for 10 years by the Accreditation Council for Business Schools and Programs (ACBSP), a global business education accrediting body.", href: "/accreditation" },
          { title: "SAQS Accredited", text: "All PGDM programmes at WeSchool's Mumbai and Bengaluru campuses are accredited by the South Asian Quality Assurance System (SAQS).", href: "/accreditation" },
          { title: "NBA Accredited & MBA Equivalent", text: "All full-time PGDM programmes across the Mumbai and Bengaluru campuses are accredited by the National Board of Accreditation (NBA) and have MBA equivalence.", href: "/accreditation" },
          { title: "NBA Accredited – MMS", text: "The MMS programme at the Mumbai campus is accredited by the National Board of Accreditation (NBA).", href: "/accreditation" },
          { title: "Autonomous Institute", text: "WeSchool is an autonomous institute affiliated with the University of Mumbai.", href: "/autonomy" },
          { title: "AICTE Approved", text: "All full-time programmes are approved by the All India Council for Technical Education (AICTE).", href: "/accreditation" },
        ],
      },
    ],
  },
  "/mandatory-disclosure": {
    title: "Mandatory Disclosures",
    subtitle: "Statutory disclosures for the Mumbai and Bengaluru campuses, as mandated by AICTE.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Mandatory Disclosures"]),
    sections: [
      {
        heading: "Disclosures",
        cardColumns: 2,
        cards: [
          { title: "Mandatory Disclosure — Mumbai Campus", text: "AICTE-mandated disclosures for the Mumbai campus.", href: "/mandatory-disclosure" },
          { title: "Mandatory Disclosure — Bengaluru Campus", text: "AICTE-mandated disclosures for the Bengaluru campus.", href: "/mandatory-disclosure" },
          { title: "Mandatory Disclosure — MMS", text: "Disclosures for the MMS programme.", href: "/mandatory-disclosure" },
          { title: "Approvals & Affiliations", text: "AICTE approvals and university affiliation details.", href: "/accreditation" },
        ],
      },
    ],
  },
  "/autonomy": {
    title: "Autonomy",
    subtitle: "WeSchool is an autonomous institute affiliated with the University of Mumbai.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Autonomy"]),
    sections: [{ heading: "Academic Autonomy", paragraphs: ["As an autonomous institute, WeSchool designs and continuously evolves its own curriculum, pedagogy and assessment — enabling faster, industry-aligned innovation while upholding the highest standards of academic governance."] }],
  },
  "/grievance-redressal": {
    title: "Grievance Redressal",
    subtitle: "Our transparent mechanism for raising and resolving grievances.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Grievance Redressal"]),
    sections: [
      { heading: "Submit Your Grievance", paragraphs: ["WeSchool is committed to a fair, timely and transparent grievance redressal process for students, staff and stakeholders. Please submit your grievance below and we will ensure your concern is addressed appropriately."] },
      {
        form: {
          name: "grievance",
          heading: "Submit Your Grievance",
          tint: "cream",
          submitLabel: "Submit Grievance",
          fields: [
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "role", label: "I am a", type: "select", options: ["Student", "Staff", "Parent", "Other"], required: true },
            { name: "category", label: "Category", type: "select", options: ["Academic", "Administrative", "Hostel", "Examination", "Other"], required: true },
            { name: "grievance", label: "Describe Your Grievance", type: "textarea", required: true, full: true },
          ],
        },
      },
    ],
  },

  // ---- Admissions ----
  "/admissions": {
    title: "Admissions",
    subtitle: "Your journey to WeSchool — eligibility, process, important dates and how to apply.",
    image: HERO.people,
    accent: "orange",
    breadcrumbs: crumbs(["Home", "/"], ["Admissions"]),
    sections: [
      { heading: "How to Apply", paragraphs: ["A minimum of 50% in graduation is required, along with a valid CAT / XAT / ATMA / CMAT / GMAT score. Shortlisting is followed by our online selection process."] },
      {
        heading: "Explore",
        tint: "cream",
        cards: [
          { title: "Programmes", text: "Browse our full-time, executive and certificate programmes.", href: "/programmes" },
          { title: "Fees & Scholarships", text: "Tuition, hostel fees, EMI options and the TFW scheme.", href: "/programmes/pgdm" },
          { title: "Apply Now", text: "Start your application today.", href: "/apply" },
        ],
      },
    ],
  },

  // ---- Corporate Interface ----
  "/corporate-interface": {
    title: "Corporate Interface",
    subtitle: "Partner with WeSchool to recruit, engage and co-create with future-ready talent.",
    image: HERO.office,
    accent: "orange",
    breadcrumbs: crumbs(["Home", "/"], ["Corporate Interface"]),
    sections: [
      { heading: "Why Recruit from WeSchool", paragraphs: ["Our graduates bring knowledge across business domains, supported by practical learning, industry exposure, mentoring and continuous assessment."] },
      {
        heading: "Engage With Us",
        tint: "cream",
        cards: [
          { title: "Top Recruiters", text: "Companies that trust WeSchool talent.", href: "/corporate-interface/top-recruiters" },
          { title: "Placement Cell Contact", text: "Reach our placement team.", href: "/corporate-interface/placement-contact" },
          { title: "Corporate Testimonials", text: "What recruiters say about our students.", href: "/corporate-interface/testimonials" },
          { title: "Projects & Internships", text: "Co-create through live projects and internships.", href: "/corporate-interface/internships" },
        ],
        cardColumns: 4,
      },
    ],
  },
  "/corporate-interface/top-recruiters": simple("Top Recruiters", "Leading organisations across sectors that recruit from WeSchool.", ["Corporate Interface", "/corporate-interface"], undefined, HERO.office, "orange"),
  "/corporate-interface/placement-contact": simple("Placement Cell Contact", "Connect with our placement team to share your requirements.", ["Corporate Interface", "/corporate-interface"], undefined, HERO.office, "orange"),
  "/corporate-interface/testimonials": simple("Corporate Testimonials", "In their own words — what our recruiters value about WeSchool talent.", ["Corporate Interface", "/corporate-interface"], undefined, HERO.office, "orange"),
  "/corporate-interface/internships": simple("Projects & Internships", "Collaborate with our students through live projects and internships.", ["Corporate Interface", "/corporate-interface"], undefined, HERO.office, "orange"),

  // ---- WeResearch ----
  "/weresearch": {
    title: "WeResearch",
    subtitle: "Advancing management knowledge through rigorous, application-oriented research across business, technology and the social sciences.",
    image: HERO.research,
    breadcrumbs: crumbs(["Home", "/"], ["WeResearch"]),
    sections: [
      { heading: "Research at WeSchool", paragraphs: ["Our faculty and scholars publish across leading journals, author management cases, present at academic conferences and contribute books and chapters — turning real business situations into opportunities for analysis, discussion and decision-making."] },
      {
        heading: "Explore WeResearch",
        tint: "cream",
        cards: [
          { title: "Research Areas", text: "The themes and domains that shape our research agenda.", href: "/weresearch/areas" },
          { title: "Awarded & Recognised Papers", text: "Research that has earned recognition for its contribution to management and related fields.", href: "/weresearch/recognised" },
          { title: "Published Research", text: "WeSchool's wider body of published research — from artificial intelligence to organisational behaviour.", href: "/weresearch/papers" },
          { title: "Management Cases", text: "Cases that turn real business situations into opportunities for analysis and decision-making.", href: "/weresearch/cases" },
          { title: "Conference Research", text: "Research shared through academic conferences and published proceedings.", href: "/weresearch/conferences" },
          { title: "aWEshkar Journal", text: "Our bi-annual, double-blind peer-reviewed research journal for the academic and corporate community.", href: "/weresearch/aweshkar" },
          { title: "Articles & Perspectives", text: "Perspectives from WeSchool faculty on issues shaping business, organisations and society.", href: "/weresearch/articles" },
          { title: "Books & Chapters", text: "Books and published chapters authored or contributed to by WeSchool faculty and researchers.", href: "/weresearch/cases" },
        ],
        cardColumns: 4,
      },
    ],
  },
  "/weresearch/papers": simple("Published Research", "Explore WeSchool's wider body of published research across management, business, technology and the social sciences — on subjects ranging from artificial intelligence to organisational behaviour.", ["WeResearch", "/weresearch"], undefined, HERO.research),
  "/weresearch/recognised": simple("Awarded & Recognised Papers", "Research that has earned recognition for its contribution to management and related fields — from faculty research recognised at academic conferences to award-winning papers.", ["WeResearch", "/weresearch"], undefined, HERO.research),
  "/weresearch/areas": {
    title: "Research Areas",
    subtitle: "The themes and domains that shape our research agenda.",
    image: HERO.research,
    breadcrumbs: crumbs(["Home", "/"], ["WeResearch", "/weresearch"], ["Research Areas"]),
    sections: [
      { heading: "Our Focus Areas", cardColumns: 4, cards: ["Artificial Intelligence & Analytics", "Organisational Behaviour", "Finance & Accounting", "Marketing & Consumer Behaviour", "Operations & Supply Chain", "Sustainability & ESG", "Entrepreneurship & Innovation", "Digital & E-Business"].map((n) => ({ title: n, text: "Active research theme at WeSchool.", href: "/weresearch/papers" })) },
    ],
  },
  "/weresearch/cases": simple("Management Cases", "Explore management cases that turn real business situations into opportunities for analysis, discussion and decision-making — for example, Tata Motors' strategic pivot to electric vehicles, analysing competitive positioning, supply-chain challenges and market development in India's evolving EV landscape.", ["WeResearch", "/weresearch"], undefined, HERO.research),
  "/weresearch/aweshkar": {
    title: "aWEshkar Journal",
    subtitle: "WeSchool's bi-annual, double-blind peer-reviewed research journal, dedicated to creating and sharing knowledge for the academic and corporate community.",
    image: HERO.research,
    breadcrumbs: crumbs(["Home", "/"], ["WeResearch", "/weresearch"], ["aWEshkar Journal"]),
    sections: [
      { heading: "About the Journal", paragraphs: ["Browse the aWEshkar archive to explore research published across past March and September editions. Open an issue to view its editorial, research articles and contributors."] },
      { heading: "Journal Archive", tint: "cream", cardColumns: 2, cards: [{ title: "Vol. 32, Issue I — March 2025", text: "Latest edition.", href: "/weresearch/aweshkar" }, { title: "Vol. 29, Issue II — September 2022", text: "Archive edition.", href: "/weresearch/aweshkar" }] },
    ],
  },
  "/weresearch/articles": simple("Articles & Perspectives", "Read perspectives from WeSchool faculty and researchers on contemporary issues shaping business, organisations and society — bringing academic thinking into accessible, real-world conversations.", ["WeResearch", "/weresearch"], undefined, HERO.research),
  "/weresearch/conferences": simple("Conference Research", "Explore research shared through academic conferences and published proceedings — capturing research questions, findings and perspectives presented within the academic community.", ["WeResearch", "/weresearch"], undefined, HERO.research),

  // ---- WeFactor ----
  "/wefactor": {
    title: "WeFactor",
    subtitle: "The WeSchool innovation and entrepreneurship ecosystem.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["WeFactor"]),
    sections: [
      { heading: "The WeFactor Ecosystem", paragraphs: ["From innovation labs to incubation and leadership, WeFactor nurtures the entrepreneurial spirit across our community."] },
      {
        heading: "Inside WeFactor",
        tint: "cream",
        cardColumns: 4,
        cards: [
          { title: "WeInnovate", text: "Innovation and design thinking in action.", href: "/wefactor/weinnovate" },
          { title: "WeEntrepreneur", text: "Incubation and startup support.", href: "/wefactor/weentrepreneur" },
          { title: "WeLead", text: "Leadership development initiatives.", href: "/wefactor/welead" },
          { title: "WeLearning", text: "Continuous and lifelong learning.", href: "/wefactor/welearning" },
        ],
      },
    ],
  },
  "/wefactor/weinnovate": simple("WeInnovate", "Innovation and design thinking at the heart of WeSchool.", ["WeFactor", "/wefactor"], undefined, HERO.office),
  "/wefactor/weentrepreneur": simple("WeEntrepreneur", "Incubation, mentoring and support for student startups.", ["WeFactor", "/wefactor"], undefined, HERO.office),
  "/wefactor/welead": simple("WeLead", "Building the leaders of tomorrow.", ["WeFactor", "/wefactor"], undefined, HERO.office),
  "/wefactor/welearning": simple("WeLearning", "Continuous and lifelong learning at WeSchool.", ["WeFactor", "/wefactor"], undefined, HERO.office),

  // ---- WeGlobal ----
  "/weglobal": {
    title: "WeGlobal",
    subtitle: "We make conscious efforts towards enriching our campus community and try to make an international experience possible for every student — virtually or in person.",
    image: HERO.global,
    breadcrumbs: crumbs(["Home", "/"], ["WeGlobal"]),
    sections: [
      { heading: "International Alliances at WeSchool", paragraphs: ["The International Office at our institute spearheads the creation and execution of our global scholastic roadmap. We are committed to providing students with profound experiences through partnerships for exchange, joint research and study tours.", "Besides international partnerships with universities globally, WeSchool also collaborates with corporates and institutions to broaden every student's global outlook."] },
      {
        heading: "Global Programmes & Immersions",
        tint: "cream",
        cards: [
          { title: "The ASEAN Round Table", text: "Diplomats, thought leaders and academicians explored ASEAN's evolving role in fostering regional peace, prosperity and multilateral cooperation.", href: "/weglobal" },
          { title: "Global Learning Program", text: "An academic and cultural immersion across Germany, the Netherlands and Belgium — university visits, industry interactions and cultural exchange.", href: "/weglobal" },
          { title: "ACBSP Region 10 Annual Conference 2025", text: "Under Prof. Dr. Uday Salunkhe, Chair Elect for Region 10, WeSchool hosted educators, business leaders and innovators from across South Asia.", href: "/weglobal" },
          { title: "HDM, Stuttgart Media University", text: "A semester abroad with specialised courses, built to broaden academic perspective and prepare students for leadership in an interconnected world.", href: "/weglobal" },
          { title: "London School of Economics", text: "Students build a grounding in finance and form networks that span the globe alongside undergraduates, postgraduates and professionals.", href: "/weglobal" },
          { title: "Joondalup Innovation Challenge", text: "Multidisciplinary teams work with Western Australian mentors and incubators on real-world challenges in cybersecurity, digital economy and tourism.", href: "/weglobal" },
        ],
      },
      { heading: "Welcoming the World", paragraphs: ["Year-round, our campus welcomes a vibrant community of international students joining us via global partnerships. These strategic exchanges empower scholars to cultivate a global mindset and integrate into our unique socio-cultural fabric."] },
      {
        heading: "International Office — Contacts",
        tint: "cream",
        cardColumns: 2,
        cards: [
          { title: "Shobha Rajkarne", text: "Email: shobha.rajkarne@welingkar.org · Contact: NA", href: "mailto:shobha.rajkarne@welingkar.org" },
          { title: "Jesal Thakkar", text: "Email: jesal.thakkar@welingkar.org · Contact: +91-22-2419-8300", href: "mailto:jesal.thakkar@welingkar.org" },
        ],
      },
      {
        form: {
          name: "weglobal",
          heading: "Get in Touch",
          description: "Interested in our global programmes? Share your details and we'll reach out.",
          fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "contact", label: "Contact Number", type: "tel", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "course", label: "Course", type: "select", options: ["PGDM", "MMS", "Executive", "Other"], required: true },
            { name: "campus", label: "Campus", type: "select", options: ["Mumbai", "Bengaluru"], required: true },
          ],
        },
      },
    ],
  },

  // ---- Utility / engagement ----
  "/events": {
    title: "Events",
    subtitle: "Guest sessions, competitions, workshops and festivals — stay up to date with the latest happenings across our campuses.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["Events"]),
    sections: [
      { filters: { selects: [{ label: "Select Year", options: ["2025", "2024", "2023", "2006"] }, { label: "Select Campus", options: ["Mumbai", "Bengaluru"] }] } },
      {
        heading: "Upcoming & Recent Events",
        cardColumns: 3,
        cards: [
          { title: "WeConference 2025", text: "Our flagship research conference on resilience in a fragmented world.", href: "/we-conference", meta: "2025" },
          { title: "Inter B-School Championship", text: "Teams compete across management domains.", href: "/events", meta: "2025" },
          { title: "Cultural Festival", text: "A celebration of talent, art and community.", href: "/events", meta: "2024" },
          { title: "Industry Leadership Series", text: "Guest sessions with industry stalwarts.", href: "/events", meta: "2024" },
          { title: "Convocation", text: "Celebrating our graduating batch.", href: "/events", meta: "2023" },
          { title: "Sports Meet", text: "Tournaments through the year plus inter B-School fixtures.", href: "/events", meta: "2023" },
        ],
      },
    ],
  },
  "/media": {
    title: "News & Media",
    subtitle: "News, press releases, newspaper cuttings and our video gallery.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["News & Media"]),
    sections: [
      { filters: { search: true, selects: [{ label: "Select Year", options: ["2026", "2025", "2024"] }, { label: "Select Category", options: ["News", "Press Release", "Video"] }, { label: "Sort By", options: ["Newest First", "Oldest First"] }] } },
      {
        heading: "News & Press Releases",
        cardColumns: 3,
        cards: [
          { title: "WeSchool in the News", text: "Recent coverage across leading publications.", href: "/media" },
          { title: "Press Releases", text: "Official announcements from WeSchool.", href: "/media" },
          { title: "Newspaper Cuttings", text: "Archive of print media coverage.", href: "/media" },
        ],
      },
      {
        heading: "Video Gallery",
        tint: "cream",
        cardColumns: 3,
        cards: [
          { title: "Campus Stories", text: "Life at WeSchool, in motion.", href: "/media" },
          { title: "Alumni Speak", text: "Our graduates, in their own words.", href: "/media" },
          { title: "Events & Highlights", text: "Moments from across the year.", href: "/media" },
        ],
      },
    ],
  },
  "/mdc": {
    title: "Management Development Centre (MDC)",
    subtitle: "Continuous learning is now a must. WeSchool's Management Development Centre builds talent that is agile, data-driven and ready to lead.",
    image: HERO.office,
    accent: "orange",
    breadcrumbs: crumbs(["Home", "/"], ["MDC"]),
    sections: [
      {
        heading: "Trusted by Industry",
        align: "center",
        cardColumns: 4,
        cards: [
          { title: "50,000+", text: "Professionals Trained", href: "/mdc" },
          { title: "200+", text: "Corporate Clients", href: "/mdc" },
          { title: "40+", text: "Programs Offered", href: "/mdc" },
          { title: "25+", text: "Years of Excellence", href: "/mdc" },
        ],
      },
      { heading: "Learning for a Changing World", paragraphs: ["AI is changing industries, jobs and the skills needed to succeed. Today's leaders must do more than manage work — they need to understand new technology and use data to make better decisions.", "MDC goes beyond training. We help organizations improve performance, build capabilities and grow in a sustainable way."] },
      {
        heading: "Why MDC",
        tint: "cream",
        cardColumns: 4,
        cards: [
          { title: "Customized Learning", text: "Programs built around your goals, business needs and talent plans.", href: "/mdc" },
          { title: "Hands-On Learning", text: "Case studies, simulations, live projects and peer learning.", href: "/mdc" },
          { title: "Industry-Aligned Curriculum", text: "Designed with industry experts to reflect current trends and new technologies.", href: "/mdc" },
          { title: "Leadership Development", text: "Skills in strategy, innovation, decision-making and business acumen.", href: "/mdc" },
          { title: "Expert Faculty", text: "Academics, industry leaders and consultants who bring theory and practice together.", href: "/mdc" },
          { title: "Scalable Programs", text: "For frontline managers, high-potential talent and senior leaders.", href: "/mdc" },
          { title: "Flexible Delivery", text: "Classroom, virtual or blended learning across locations.", href: "/mdc" },
          { title: "Measurable Impact", text: "Better performance, stronger teams and a solid leadership pipeline.", href: "/mdc" },
        ],
      },
      {
        heading: "Focus Areas",
        cardColumns: 4,
        cards: ["AI & Digital Transformation", "Sustainability, ESG & Responsible Business", "Innovation & Design Thinking", "Data Analytics & Decision Making", "Strategic Thinking & Judgement", "Finance Acumen", "Rural Management", "Leadership Development"].map((n) => ({ title: n, text: "Executive learning track.", href: "/mdc" })),
      },
      {
        heading: "Meet the Team",
        cardColumns: 3,
        cards: [
          { title: "Suresh Patil", text: "Director, Management Development Centre.", href: "/mdc" },
          { title: "Priya Krishnamurthy", text: "Programme Lead, Executive Education.", href: "/mdc" },
          { title: "Anil Gupta", text: "Corporate Partnerships & Custom Training.", href: "/mdc" },
        ],
      },
      {
        form: {
          name: "mdc-enquiry",
          heading: "Talk to Our Executive Education Team",
          description: "Reach out directly for programme details, custom training enquiries and more.",
          tint: "cream",
          submitLabel: "Send Enquiry",
          fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "email", label: "Work Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "organisation", label: "Organisation", type: "text", required: true },
            { name: "interest", label: "Area of Interest", type: "select", options: ["Leadership Development", "AI & Digital Transformation", "Data Analytics", "Sustainability & ESG", "Custom / Other"] },
            { name: "message", label: "Your Requirement", type: "textarea", full: true },
          ],
        },
      },
    ],
  },
  "/careers": {
    title: "Careers @ WeSchool",
    subtitle: "Join a team that's shaping the future of management education.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Careers"]),
    sections: [
      { heading: "Why Work at WeSchool", paragraphs: ["Be part of an institution that champions innovation, industry relevance and experiential learning. We're always looking for passionate people to join our community."] },
      {
        heading: "Current Openings",
        tint: "cream",
        cardColumns: 2,
        cards: [
          { title: "Young Professional Program (YPP)", text: "A launchpad for early-career professionals to grow with WeSchool.", href: "/careers" },
          { title: "Guest Relations Executive", text: "Be the welcoming face of our campus community and events.", href: "/careers" },
        ],
      },
      { heading: "Apply", paragraphs: ["Upload your profile and tell us how you'd like to contribute. Our team will get back to shortlisted candidates."] },
      {
        form: {
          name: "careers",
          heading: "Upload profile below",
          tint: "cream",
          submitLabel: "Submit",
          fields: [
            { name: "position", label: "Position Applied For", type: "select", options: ["Young Professional Program (YPP)", "Guest Relations Executive", "Faculty", "Other"], required: true },
            { name: "campus", label: "Preferred Campus Location", type: "radio", options: ["Mumbai", "Bengaluru"], required: true },
            { name: "source", label: "Select Source", type: "select", options: ["Website", "LinkedIn", "Referral", "Job Portal", "Other"] },
            { name: "name", label: "Name", type: "text", required: true },
            { name: "dob", label: "Date of Birth", type: "date" },
            { name: "contact", label: "Contact", type: "tel", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "current_location", label: "Current Location", type: "text", full: true },
            { name: "qualification", label: "Highest Qualification", type: "select", options: ["Graduate", "Post Graduate", "Doctorate", "Other"] },
            { name: "class_obtained", label: "Class Obtained", type: "select", options: ["First Class", "Second Class", "Distinction", "Other"] },
            { name: "institute", label: "Institute Name", type: "text" },
            { name: "industry_exp", label: "Industry Experience (in years)", type: "number" },
            { name: "fulltime_exp", label: "Full-time Teaching Experience (in years)", type: "number" },
            { name: "visiting_exp", label: "Visiting / Adjunct Teaching Experience (in years)", type: "number" },
            { name: "current_salary", label: "Current Salary", type: "text" },
            { name: "expected_salary", label: "Expectation Salary", type: "text" },
            { name: "notice_period", label: "Notice Period", type: "text" },
            { name: "resume", label: "Attach Resume", type: "file", required: true, note: "DOC, DOCX, PDF, ZIP files are accepted. Files must be less than 4 MB." },
            { name: "brief_profile", label: "Brief Profile (Maximum 150 characters)", type: "textarea", full: true },
          ],
        },
      },
    ],
  },
  "/contact-us": {
    title: "Contact Us",
    subtitle: "We'd love to hear from you — reach the campus or team you need.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Contact Us"]),
    sections: [
      {
        heading: "Our Campuses",
        cards: [
          { title: "Mumbai Campus", text: "L. N. Road, Matunga (Central), Mumbai 400 019.", href: "/campuses/mumbai" },
          { title: "Bengaluru Campus", text: "WeSchool Bengaluru Campus.", href: "/campuses/bengaluru" },
          { title: "Enquiry Form", text: "Send us your query and we'll get back to you.", href: "/enquire-now" },
        ],
      },
      {
        form: {
          name: "contact",
          heading: "Send Us a Message",
          tint: "cream",
          fields: [
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "subject", label: "Subject", type: "text" },
            { name: "message", label: "Message", type: "textarea", required: true },
          ],
        },
      },
    ],
  },
  "/alumni": {
    title: "Alumni",
    subtitle: "A thriving global community of WeSchool graduates.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["Alumni"]),
    sections: [
      { heading: "Once a WeSchooler, Always a WeSchooler", paragraphs: ["Our alumni lead across industries and geographies, and stay connected through events, mentorship and giving back."] },
      {
        heading: "Alumni Network",
        tint: "cream",
        cards: [
          { title: "Alumni News", text: "Latest from our community.", href: "/alumni" },
          { title: "Wall of Fame", text: "Celebrating notable alumni.", href: "/alumni" },
          { title: "Join the Community", text: "Register and reconnect.", href: "/alumni" },
        ],
      },
    ],
  },
  "/life-at-weschool": {
    title: "Life @ WeSchool",
    subtitle: "Some of the best management lessons are acquired on-field, not in a lecture hall. Our campuses run on a calendar of their own — cultural nights, sports tournaments, case competitions and more.",
    image: HERO.people,
    accent: "orange",
    breadcrumbs: crumbs(["Home", "/"], ["Life @ WeSchool"]),
    sections: [
      { heading: "Student-Led, Faculty-Mentored", paragraphs: ["Every cell on our campuses is student-led and faculty-mentored. That means real budgets, real sponsors, real deadlines and real consequences when something slips."] },
      {
        heading: "Student Cells & Clubs",
        tint: "cream",
        cardColumns: 4,
        cards: [
          { title: "Corporate Cell", text: "The bridge between campus and corporate India.", href: "/life-at-weschool" },
          { title: "Cultural Cell", text: "The reason campus sounds the way it does.", href: "/life-at-weschool" },
          { title: "Student Council", text: "The elected voice of the batch.", href: "/life-at-weschool" },
          { title: "Sports Cell", text: "Tournaments through the year, plus inter B-School fixtures.", href: "/life-at-weschool" },
          { title: "Industry Cell", text: "Guest lectures, industry visits, live projects.", href: "/life-at-weschool" },
          { title: "Entrepreneurship Cell", text: "For the students who would rather build than join.", href: "/life-at-weschool" },
          { title: "Alumni Cell", text: "Keeps a network four decades deep in the conversation.", href: "/alumni" },
          { title: "Design Cell", text: "Design thinking, turned into workshops and sprints.", href: "/life-at-weschool" },
        ],
      },
      { heading: "Infrastructure & Wellness", paragraphs: ["WeLearn Library holds over 40,000 management books plus a multimedia archive. innoWE runs as Mumbai's first innovation lab, and Maker's Lab works as a co-innovation platform.", "Sustainability is a habit here, not a module — our Agri Lab brings grassroot thinking back to campus. Nirvana Hall hosts regular yoga sessions, keeping the quiet corners of campus quiet.", "Facilities: Air-conditioned classrooms with LCD, OHP and video conferencing · innoWE · Maker's Lab · Agri Lab · Brainstorm Room · WeLearn + Corporate Library · Auditorium · Conference rooms. Separate hostels for boys and girls within 2 km of campus, with 24×7 internet and first preference to non-local students."] },
      { heading: "Visit Us", paragraphs: ["A campus is hard to judge from a website. Visit one. Lakhamsi Napoo Road, Near Matunga (Central Rly.), Mumbai 400 019 · 022-2419-8300."] },
    ],
  },
  "/weexcel": {
    title: "WeExcel",
    subtitle: "The student excellence hub — cells, activities, logins and resources across our campuses.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["WeExcel"]),
    sections: [
      { heading: "Student Life & Services", paragraphs: ["WeExcel brings together student cells and activities, logins, examinations, galleries, events and blogs for each campus and programme."] },
      {
        heading: "By Campus / Programme",
        tint: "cream",
        cards: [
          { title: "Mumbai", text: "Student cells, logins, examination, gallery, current events, articles & blogs.", href: "/campuses/mumbai" },
          { title: "Bengaluru", text: "Student cells, logins, examination, gallery, current events, articles & blogs.", href: "/campuses/bengaluru" },
          { title: "MMS", text: "Student cells, logins, examination, gallery, current events, articles & blogs.", href: "/programmes/mms" },
        ],
      },
      {
        heading: "Student Resources",
        cardColumns: 3,
        cards: [
          { title: "Attendance, Timetable & Fees", text: "Academic records and payments.", href: "/weexcel" },
          { title: "Course Material", text: "Material and assignment submissions.", href: "/weexcel" },
          { title: "Library Catalogue", text: "Catalogue, reservations, e-journals.", href: "/library" },
          { title: "Examination", text: "Calendar, hall tickets, results and re-evaluation.", href: "/weexcel" },
          { title: "Placements", text: "Company listings and application tracking.", href: "/corporate-interface" },
          { title: "Gallery", text: "Photos from across campus life.", href: "/media/videos" },
        ],
      },
    ],
  },
  "/we-conference": {
    title: "We Conference",
    subtitle: "Our world is at a breaking point, facing massive changes — from politics and fast-moving technology to climate change. These are complex, interconnected challenges, and this conference brings minds together to respond.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["We Conference"]),
    sections: [
      { heading: "Call for Papers", paragraphs: ["The conference invites full research papers across thematic tracks. Contributors are encouraged to engage creatively with the overarching theme of resilience.", "This conference is appropriate for academicians, corporate executives, research scholars, students, practitioners, subject experts and policy makers."] },
      {
        heading: "Submission Guidelines",
        tint: "cream",
        paragraphs: [
          "Only full research papers are invited for submission. A single individual can send at most two submissions, and each paper can have a maximum of 4 authors.",
          "Please ensure all submitted work has a Similarity Index below 10%. AI-generated content will be rejected. It is the author's responsibility to ensure the paper is original and has not been published, presented or communicated for publication elsewhere.",
          "All submissions accepted for presentation will be published in the Conference Proceedings (abstract only) with an ISBN. Selected full papers, subject to a formal peer review, may be considered for further publication.",
        ],
      },
      { heading: "Awards & Registration", paragraphs: ["The Best Paper Award will be presented under the Student and Faculty categories. To qualify, a full paper must be presented at the conference.", "Registration is compulsory for the first author of every accepted paper. If the registered author is unable to attend, a co-author may present."] },
    ],
  },

  // ---- Forms / CTAs ----
  "/apply": simple("Apply to WeSchool", "Start your application to a WeSchool programme.", ["Home", "/"], [{ heading: "Ready to Apply?", tint: "cream", cards: [{ title: "Browse Programmes", text: "Find the right programme for you.", href: "/programmes" }, { title: "Check Eligibility", text: "Admissions criteria and process.", href: "/admissions" }] }], HERO.people, "orange"),
  "/brochure": simple("Download Brochure", "Get the latest WeSchool programme brochure.", ["Home", "/"], undefined, HERO.office, "orange"),
  "/enquire-now": {
    title: "Enquiry Form",
    subtitle: "Send us your query — our team will get back to you shortly.",
    image: HERO.office,
    accent: "orange",
    breadcrumbs: crumbs(["Home", "/"], ["Enquiry Form"]),
    sections: [
      {
        form: {
          name: "enquiry",
          heading: "Enquire Now",
          description: "Fill in your details and the programme you're interested in.",
          submitLabel: "Submit Enquiry",
          fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile", label: "Mobile Number", type: "tel", required: true },
            { name: "email", label: "Email ID", type: "email", required: true },
            { name: "organisation", label: "Organisation", type: "text" },
            { name: "designation", label: "Designation", type: "text" },
            { name: "qualification", label: "Qualification", type: "text" },
            { name: "program", label: "Enquiring for which program?", type: "select", options: ["PGDM", "PGDM E-Business", "PGDM Business Design", "PGDM Healthcare", "PGDM Retail", "PGDM Rural", "PGDM Media & Entertainment", "PGDM Research & Business Analytics", "MMS", "Executive / MDP", "Other"], required: true, full: true },
          ],
        },
      },
    ],
  },

  // ---- Life @ WeSchool campus variants ----
  "/life-at-weschool/bengaluru": {
    title: "Life @ WeSchool — Bengaluru",
    subtitle: "Electronic City is not a neutral address — it is where India builds things. Our Bengaluru campus runs on a calendar of its own.",
    image: HERO.people,
    accent: "green",
    breadcrumbs: crumbs(["Home", "/"], ["Life @ WeSchool", "/life-at-weschool"], ["Bengaluru"]),
    sections: [
      { heading: "Built to Make, Not Just Learn", paragraphs: ["A future-ready manager is one who can take a sustainable decision under real constraints. That starts in our Prototype Lab, where an idea stops being a slide and becomes something real.", "The campus Athenaeum backs research and project work — journals, case archives, references and the space to use them properly."] },
      { heading: "Facilities", tint: "cream", paragraphs: ["Discovery Rooms built for interactive learning · Proto Lab · IT Lab · Design Room with LCD and OHP · Audio Visual Room · Boardroom · Library · MDP Classroom · Canteen. Separate hostels for boys and girls within 2 km of campus, with 24×7 internet — a home away from home."] },
      { heading: "Visit Us", paragraphs: ["102/103, Electronic City Phase 1, Next to Telephone Exchange, Hosur Road, Bengaluru 560100 · 080-4267-8300."] },
    ],
  },
  "/life-at-weschool/mms": {
    title: "Life @ WeSchool — MMS",
    subtitle: "A two-year full-time degree we have run since 1984, with specialisations in Marketing, Finance, Human Resource Management and Operations.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["Life @ WeSchool", "/life-at-weschool"], ["MMS"]),
    sections: [
      { heading: "The MMS Experience", paragraphs: ["Visiting faculty from industry keep the curriculum current. Outbound programmes build teamwork under conditions a classroom cannot recreate, and live projects put students in front of real business problems.", "MMS committees are student-led. The Placement Committee handles corporate interaction directly — an education in itself. Alumni consistently name these roles as the most formative part of the programme.", "WeSchool comes from Shikshana Prasaraka Mandali, a 137-year-old Pune-based trust. Approved by AICTE, permanently affiliated to the University of Mumbai, with autonomous status."] },
      {
        heading: "MMS Placements",
        tint: "cream",
        cardColumns: 4,
        cards: [
          { title: "358", text: "Companies on campus", href: "/corporate-interface/top-recruiters" },
          { title: "₹11.99 LPA", text: "Domestic average (2024–26)", href: "/programmes/mms" },
          { title: "₹23 LPA", text: "Domestic high", href: "/programmes/mms" },
          { title: "₹22.92 LPA", text: "International average", href: "/programmes/mms" },
        ],
      },
      { heading: "Contact", paragraphs: ["Lakhamsi Napoo Road, Near Matunga (Central Rly.), Mumbai 400 019 · mms.director@welingkar.org."] },
    ],
  },

  // ---- News & Media / engagement extras ----
  "/media/videos": {
    title: "Video Gallery",
    subtitle: "Campus stories, alumni voices and event highlights — WeSchool in motion.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["News & Media", "/media"], ["Video Gallery"]),
    sections: [
      { heading: "Watch", cardColumns: 3, cards: [{ title: "Campus Stories", text: "Life at WeSchool, in motion.", href: "/media/videos" }, { title: "Alumni Speak", text: "Our graduates, in their own words.", href: "/media/videos" }, { title: "Events & Highlights", text: "Moments from across the year.", href: "/media/videos" }] },
    ],
  },

  // ---- Footer / statutory / utility ----
  "/testimonials": {
    title: "Testimonials",
    subtitle: "What our students, alumni and recruiters say about the WeSchool experience.",
    image: HERO.people,
    breadcrumbs: crumbs(["Home", "/"], ["Testimonials"]),
    sections: [{ heading: "In Their Words", cardColumns: 2, cards: [{ title: "Rajesh Ramineni — BigBasket DC, Manager", text: "\"I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.\"", href: "/testimonials" }, { title: "Priya Nair — Deloitte, Consultant", text: "\"The industry exposure and mentoring at WeSchool shaped how I approach real business problems every day.\"", href: "/testimonials" }] }],
  },
  "/privacy-policy": simple("Privacy Policy", "How WeSchool collects, uses and protects your personal information.", ["Home", "/"], undefined, HERO.office),
  "/nad": simple("National Academic Depository (NAD)", "Access and verify your academic records through the National Academic Depository / DigiLocker.", ["Home", "/"], undefined, HERO.office),
  "/library": {
    title: "Learning Resource Centre (LRC)",
    subtitle: "WeLearn Library — over 40,000 management books plus a rich multimedia and digital archive.",
    image: HERO.research,
    breadcrumbs: crumbs(["Home", "/"], ["Library (LRC)"]),
    sections: [{ heading: "Services", cardColumns: 3, cards: [{ title: "Catalogue & Reservations", text: "Search the collection and reserve titles.", href: "/library" }, { title: "E-Journals & Databases", text: "Online access to leading journals and databases.", href: "/library" }, { title: "My Loft — Remote Access", text: "Access library resources remotely.", href: "/library" }] }],
  },
  "/tenders": simple("Tenders", "Current tenders and procurement notices from WeSchool.", ["Home", "/"], undefined, HERO.office),
  "/form-success": {
    title: "Thank You!",
    subtitle: "Your submission has been received. Our team will get back to you shortly.",
    image: HERO.office,
    accent: "orange",
    breadcrumbs: crumbs(["Home", "/"], ["Thank You"]),
    sections: [{ heading: "What happens next?", align: "center", paragraphs: ["We've received your details and a member of our team will be in touch soon. In the meantime, feel free to explore our programmes and campuses."], cards: [{ title: "Explore Programmes", text: "Browse our full range of programmes.", href: "/programmes" }, { title: "Visit a Campus", text: "Mumbai & Bengaluru campuses.", href: "/campuses" }] }],
  },
  "/site-map": {
    title: "Site Map",
    subtitle: "Every page on the WeSchool website, in one place.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Site Map"]),
    sections: [
      { heading: "Who We Are", cardColumns: 3, cards: [{ title: "About Us", text: "", href: "/about-us" }, { title: "Vision & Mission", text: "", href: "/about-us/vision-mission" }, { title: "Managing Council", text: "", href: "/about-us/managing-council" }, { title: "Chairman's Message", text: "", href: "/about-us/chairman-message" }, { title: "Director's Message", text: "", href: "/about-us/directors-message" }, { title: "Faculty", text: "", href: "/about-us/faculty" }, { title: "Accreditation", text: "", href: "/accreditation" }, { title: "Awards & Accolades", text: "", href: "/about-us/awards" }] },
      { heading: "Campuses", tint: "cream", cardColumns: 3, cards: [{ title: "Campuses", text: "", href: "/campuses" }, { title: "Mumbai Campus", text: "", href: "/campuses/mumbai" }, { title: "Bengaluru Campus", text: "", href: "/campuses/bengaluru" }, { title: "Life @ WeSchool", text: "", href: "/life-at-weschool" }, { title: "Life — Bengaluru", text: "", href: "/life-at-weschool/bengaluru" }, { title: "Life — MMS", text: "", href: "/life-at-weschool/mms" }] },
      { heading: "Programmes", cardColumns: 3, cards: [{ title: "All Programmes", text: "", href: "/programmes" }, { title: "PGDM (Mumbai)", text: "", href: "/programmes/pgdm" }, { title: "PGDM (Bengaluru)", text: "", href: "/programmes/pgdm/bengaluru" }, { title: "MMS", text: "", href: "/programmes/mms" }, { title: "Admissions", text: "", href: "/admissions" }, { title: "MDC — Executive Education", text: "", href: "/mdc" }] },
      { heading: "Research, Corporate & Global", tint: "cream", cardColumns: 3, cards: [{ title: "WeResearch", text: "", href: "/weresearch" }, { title: "aWEshkar Journal", text: "", href: "/weresearch/aweshkar" }, { title: "We Conference", text: "", href: "/we-conference" }, { title: "Corporate Interface", text: "", href: "/corporate-interface" }, { title: "WeFactor", text: "", href: "/wefactor" }, { title: "WeGlobal", text: "", href: "/weglobal" }] },
      { heading: "Engage & Statutory", cardColumns: 3, cards: [{ title: "Blogs", text: "", href: "/blogs" }, { title: "Events", text: "", href: "/events" }, { title: "News & Media", text: "", href: "/media" }, { title: "Careers", text: "", href: "/careers" }, { title: "Alumni", text: "", href: "/alumni" }, { title: "Contact Us", text: "", href: "/contact-us" }, { title: "Library (LRC)", text: "", href: "/library" }, { title: "Mandatory Disclosures", text: "", href: "/mandatory-disclosure" }, { title: "Autonomy", text: "", href: "/autonomy" }, { title: "Grievance Redressal", text: "", href: "/grievance-redressal" }, { title: "Privacy Policy", text: "", href: "/privacy-policy" }, { title: "NAD", text: "", href: "/nad" }] },
    ],
  },
  "/weresearch/mumbai": simple("We Research @ Mumbai", "Research initiatives, publications and activities at the Mumbai campus.", ["WeResearch", "/weresearch"], undefined, HERO.research),
  "/weresearch/bengaluru": simple("We Research @ Bengaluru", "Research initiatives, publications and activities at the Bengaluru campus.", ["WeResearch", "/weresearch"], undefined, HERO.research),

  // ---- Event detail (Events Inside) ----
  "/events/sample": {
    title: "WeConference 2025",
    subtitle: "Our flagship research conference on resilient enterprises in a fragmented world.",
    image: HERO.office,
    breadcrumbs: crumbs(["Home", "/"], ["Events", "/events"], ["WeConference 2025"]),
    sections: [
      { heading: "About the Event", paragraphs: ["A two-day gathering of academicians, corporate executives, research scholars and policy makers exploring resilience across business, technology and society.", "Full research papers are invited across thematic tracks, with a Best Paper Award under Student and Faculty categories."] },
      { heading: "Register", tint: "cream", paragraphs: ["Registration is compulsory for the first author of every accepted paper. Visit the conference page for the full call for papers and submission guidelines."], cards: [{ title: "Go to We Conference", text: "Call for papers, tracks and submission guidelines.", href: "/we-conference" }] },
    ],
  },
};

// MDC Bengaluru mirrors the Mumbai MDC with the campus (green) accent.
SITE_PAGES["/mdc/bengaluru"] = {
  ...SITE_PAGES["/mdc"],
  title: "Management Development Centre (MDC) — Bengaluru",
  accent: "green",
  breadcrumbs: crumbs(["Home", "/"], ["MDC", "/mdc"], ["Bengaluru"]),
};

export function getSitePage(path: string): SitePage | undefined {
  return SITE_PAGES[path];
}
