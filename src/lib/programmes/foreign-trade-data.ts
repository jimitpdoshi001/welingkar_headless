/**
 * Post Graduate Program in Foreign Trade Management (PGP-FTM) page content,
 * from Figma 3652:1025. Live content comes from Drupal (node--pgpftm 5958, see
 * src/lib/drupal/pages/foreign-trade.ts); this copy is the fallback when Drupal
 * cannot be reached, and the source of the built-in feature icons and form options.
 */

const IMG = (name: string) => `/programs/foreign-trade/${name}`;

export type FtmPerson = { name: string; role: string; message: string; image: string };
export type FtmFeeGroup = { title: string; lines: string[]; subheading?: string; bullets?: string[] };
export type FtmRank = { value: string; unit: string; text: string };
export type FtmTitled = { title: string; text: string };

/** Page shape. Optional/empty parts are hidden by the page (Drupal fields left empty). */
export type ForeignTradeData = {
  hero: { title: string; subtitle: string; cta: { label: string; href: string }; image: string };
  about: { heading: string; text: string };
  intro: { lead: string; paragraphs: string[] };
  rankings: { heading: string; accreditation?: FtmRank; nirf?: FtmRank };
  fieo: { heading: string; text: string };
  messages: FtmPerson[];
  programme: { heading: string; paragraphs: string[]; image: string; encompassHeading: string; encompass: string[] };
  features: {
    heading: string;
    items: { label: string; icon: string; w: number; h: number }[];
    duration?: FtmTitled;
    batch?: { title: string; slots: { label: string; time: string }[] };
    details: FtmTitled[];
    objectives: { heading: string; items: string[] };
    faculty: { heading: string; items: string[] };
  };
  structure: { heading: string; image: string; semesters: { title: string; items: string[] }[] };
  fee: { heading: string; groups: FtmFeeGroup[] };
  admissions: { heading: string; text: string; link: string };
  contact: { heading: string; addresses: string[][] };
  enquire: { heading: string; image: string; graduationFields: string[]; cities: string[] };
};

export const FOREIGN_TRADE: ForeignTradeData = {
  hero: {
    title: "Post Graduate Program in Foreign Trade Management (PGP-FTM)",
    subtitle:
      "A niche program designed and developed under the aegis of the Industry-Academia partnership of FIEO & WeSchool to bridge the skill set gap between the academic education and actual requirements in the area of Foreign Trade.",
    cta: { label: "Admission Open - 2026 Batch", href: "#enquire" },
    image: IMG("hero.webp"),
  },
  about: {
    heading: "About us",
    text: "Established in 1977, WeSchool works under the aegis of the S P. Mandali Trust, one of the oldest trusts in the space of education.",
  },
  intro: {
    lead: "Few institutions can boast of bridging the gap between academics and the industry like us.",
    paragraphs: [
      "Hailing from the S.P. Mandali Trust one of the oldest in India; Principal L.N. Welingkar Institute of Management Development and Research (WeSchool) has come to be known as one of the torchbearers for progressive higher education today.",
      "Different from the Post Graduate Diploma in Foreign Trade (PG Diploma in Foreign Trade), the 11 month Post Graduate Program in Foreign Trade Management (PGP- FTM) offered by WeSchool and Federation of Indian Export Organisations (FIEO) aims at training entry level aspirants in the exports sector and international trade management.",
    ],
  },
  rankings: {
    heading: "Rankings",
    accreditation: {
      value: "10",
      unit: "Years",
      text: "Accredited for 10 years by the Accreditation Council for Business Schools and Programs (ACBSP) - a global business education accrediting body.",
    },
    nirf: {
      value: "75th",
      unit: "Nationally",
      text: "WeSchool is ranked 75th nationally among the top B-Schools as per the National Institutional Ranking Framework (NIRF) 2025 conducted by the Ministry of Human Resource Development, Government of India",
    },
  },
  fieo: {
    heading: "About FIEO",
    text: "Setup by Ministry of Commerce, Govt. of India in 1965, 'FIEO' is the Apex body of Export Promotion organisations in the country. With more than 26,000 exporter members contributing about 70% of India's total exports, FIEO represents the Indian entrepreneurs Spirit of Enterprise in the Global Market. FIEO is also a repository of Knowledge for the Dept. of Commerce at National level and Dept. of Industries at State level. By undertaking various activities and proactive measures, FIEO catalyses the growth of global trade from India. FIEO is thus the partner of Govt. of India in promoting International Trade",
  },
  messages: [
    {
      name: "Dr. Ajay Sahai",
      role: "Director General & CEO FIEO",
      image: IMG("dg-fieo.webp"),
      message:
        "It gives me immense pleasure to warmly welcome you all to the “Post Graduate Program in Foreign Trade Management (PGP-FTM),” a prestigious initiative jointly launched by FIEO and WeSchool. Exports form the backbone of a thriving economic ecosystem, and for a rapidly progressing nation like India, they are not just important—they are indispensable. The PGP-FTM has been meticulously designed to meet this very need. Crafted with insights from industry leaders and trade experts, this program aims to empower, upskill, and equip aspiring professionals and entrepreneurs with the practical knowledge and strategic mindset required to drive India's export engine forward. This isn't just another academic program—it's a launchpad for future-ready professionals who will shape the global trade landscape. Let us come together to build a robust, dynamic, and skilled export community. I wholeheartedly encourage each one of you to explore the PGP-FTM and take a bold step toward a brighter, more empowered future in international trade. The future of Indian exports begins with you. Let’s make it extraordinary—together.",
    },
    {
      name: "Prof. Dr. Uday Salunkhe",
      role: "Group Director - WeSchool",
      image: IMG("group-director.webp"),
      message:
        "\"In today’s rapidly evolving global economy, international trade is a key driver of growth and innovation. The need for skilled professionals in global business is even more critical. It gives me immense pleasure to welcome you to the Post Graduate Program in Foreign Trade Management (PGP-FTM), a collaborative initiative between WeSchool and the Federation of Indian Export Organisations (FIEO). This program bridges industry and academia, equipping learners with relevant knowledge and practical skills in international trade. At WeSchool, we believe in nurturing thought leaders with a global mindset, innovative thinking, and a strong sense of purpose. The PGP-FTM blends academic rigor, industry insights, and hands-on learning to develop future-ready professionals. Participants not only gain domain knowledge but also build meaningful connections and develop a strategic understanding of global trade dynamics. I am confident that our participants will emerge as future leaders in the world of international business.",
    },
  ],
  programme: {
    heading: "Post graduate program in foreign trade management (PGP-FTM)",
    paragraphs: [
      "Federation of Indian Export Organisations, Set up by Ministry of Commerce, Government of India (FIEO), the apex body of export promotion organisations in India has partnered with S. P. Mandali’s, Prin. L. N. Welingkar Institute of Management Development and Research, (WeSchool), ranked amongst top 15 B-Schools in the country to offer Post Graduate Program in Foreign Trade Management (PGP-FTM).",
      "The Course is a ‘Niche Program’ as it is designed and developed under the aegis of Industry – Academia partnership of FIEO & WeSchool to bridge the skill set gap between the academic education and actual industry requirements in the area of Foreign Trade. The Program is equally useful for both working professional and aspiring students focused on pursuing a successful career in International Trade.",
      "The Program structure and its contents are endorsed and validated by reputed academicians and leading international trade practitioners in India.",
    ],
    image: IMG("programme.webp"),
    encompassHeading: "The Program will broadly encompass the following:",
    encompass: ["General Management Principle", "Export Import Procedure", "Foreign Trade Management Techniques", "International Marketing Concepts"],
  },
  features: {
    heading: "Program features",
    items: [
      { label: "General management principles", icon: IMG("icon-general-management.svg"), w: 72, h: 80 },
      { label: "Foreign trade management techniques", icon: IMG("icon-trade-techniques.svg"), w: 80, h: 80 },
      { label: "Import-export procedures", icon: IMG("icon-import-export.svg"), w: 80, h: 80 },
      { label: "International marketing concepts", icon: IMG("icon-international-marketing.svg"), w: 65, h: 68 },
    ],
    duration: { title: "Program duration", text: "11 Months" },
    batch: {
      title: "Batch",
      slots: [
        { label: "Evening Batch", time: "Monday to Friday: 06.30 pm to 08.30 pm" },
        { label: "Sunday Batch", time: "Sunday: 09.00 am to 06.00 pm\n(Classes will be held on Saturday if required)" },
      ],
    },
    details: [
      { title: "Program eligibility", text: "Graduate or above from a recognized University" },
      { title: "Program admission", text: "Admissions open for the August 2026 batch." },
      { title: "Lectures", text: "OFFLINE lectures will be conducted for Evening and Sunday Batch" },
    ],
    objectives: {
      heading: "Course objectives",
      items: [
        "Attract New Entrepreneurs in the field of Exports",
        "Imbibe the Spirit of Entrepreneurship",
        "Develop Industry ready Skilled man power",
        "Perfect balance of Concepts and Practical aspects",
        "Training in Modern Management Techniques",
      ],
    },
    faculty: {
      heading: "Faculty",
      items: [
        "In-house Expert Faculties from WeSchool",
        "Experienced Guest Faculties and EXIM Professionals",
        "Senior level officials from Govt. Departments",
        "Representative from Banks, Law Firms, Ports etc.",
        "Interaction with Exporters and Handholding by FIEO",
      ],
    },
  },
  structure: {
    heading: "Course structure",
    image: IMG("course-structure-bg.webp"),
    semesters: [
      {
        title: "Semester I",
        items: ["International Marketing", "Foreign Trade Policy", "Customs Compliance", "EXIM Procedures", "EXIM Finance & Bank Operations"],
      },
      {
        title: "Semester II",
        items: [
          "International Logistics & SCM",
          "GST Regulations Pertaining to Exim",
          "Communication Skills",
          "Important Sea, Airports, FTZ and Customs Regulations across the globe.",
          "International Economics",
        ],
      },
    ],
  },
  fee: {
    heading: "Course fee",
    groups: [
      { title: "Fee Structure", lines: ["For Students / Working Professionals", "Program Fees will be Rs. 80,000/- + GST I.e. Rs. 94,400/-"] },
      {
        title: "Payment Mode",
        lines: ["For Students / Working Professionals", "Program Fees will be Rs. 80,000/- + GST I.e. Rs. 94,400/-"],
        subheading: "Two Separate Cheque / DD's or NEFT / RTGS",
        bullets: [
          "In favor of \"Welingkar Institute of Management\", payable at Mumbai for Rs. 70,800/-",
          "In favor of Federation of Indian Export Organisations for Rs. 23,600/-",
        ],
      },
      { title: "For FIEO Members", lines: [], bullets: ["The Program Fees for FIEO Members will be Rs. 70.000/- + GST i.e. Rs. 82,600/-"] },
      {
        title: "Payment Mode",
        lines: [],
        subheading: "Two Separate Cheque / DD's",
        bullets: [
          "In favor of \"Welingkar Institute of Management\", payable at Mumbai for Rs. 61,950/-",
          "In favor of Federation of Indian Export Organisations for Rs. 20,650/-",
        ],
      },
    ],
  },
  admissions: {
    heading: "Admissions",
    text: "To apply for the Post Graduate Program in Foreign Trade Management (PGP - FTM) the applicant shall submit Online Application Form available at",
    link: "https://www.welingkaronline.org/FTM.aspx",
  },
  contact: {
    heading: "Contact us",
    addresses: [
      [
        "FEDERATION OF INDIAN EXPORT ORGANISATIONS (FIEO)",
        "TIMES SQUARE Building, Unit 3A, B-Wing, 4th Floor, Andheri Kuria Road, Andheri (E), Mumbai - 400 059( 022 - 4057 2222 / 4057 2211 / 4057 2202",
        "",
        "email : fieowrevents@fieo.org",
        "",
        "Web : www.fieo.org",
      ],
      [
        "S. P. Mandali's PRIN. L.N WELINGKAR INSTITUTE OF MANAGEMENT DEVELOPMENT & RESEARCH (WeSchool)",
        "L. N. Road, Next to R. A. Podar College, Matunga (E), Mumbai - 400 019",
        "022 — 2419 8600 / 88791 27417",
        "",
        "email : vinod.yeole@welingkar.org",
        "",
        "Web : www.welingkaronline.org",
      ],
    ],
  },
  enquire: {
    heading: "Enquire now",
    image: IMG("enquire.webp"),
    // Figma shows these as dropdowns without listing options; kept short and generic.
    graduationFields: ["Commerce", "Arts", "Science", "Engineering", "Management", "Other"],
    cities: ["Mumbai", "Pune", "Thane", "Navi Mumbai", "Other"],
  },
};
