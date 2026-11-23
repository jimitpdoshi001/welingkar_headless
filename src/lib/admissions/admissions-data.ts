/**
 * Admissions page content, from Figma 3666:984. Static: no Drupal node exists for it yet.
 * Inline links use "{label|href}" tokens, rendered as <Link> by the page.
 */

const IMG = (name: string) => `/admissions/${name}`;

export type AdmFeeCard = { title: string; lines: string[]; note?: string; image: string; overlay?: string };

export const ADMISSIONS = {
  intro: {
    title: "Admission",
    subtitle: "(For 2-Year Full-Time PGDM Programs)",
    text: "Step into a leadership role with WeSchool’s 2-Year Full-Time Programs, designed to turn students from diverse backgrounds—such as arts, commerce, and science—into world-class managers equipped with vital analytical tools and a strong foundation across major business functions. Review our admission process and eligibility requirements before applying.",
    cta: { label: "How to Apply", href: "#how-to-apply" },
  },
  eligibility: {
    heading: "Eligibility Criteria",
    image: IMG("eligibility-bg.webp"),
    items: [
      "Graduates from a recognised university with at least 50% marks.",
      "Final-year students may also apply, provided they complete their graduation by June for the next academic year cycle",
      "Graduates with work experience are eligible to apply.",
    ],
  },
  exams: {
    heading: "Entrance exams accepted",
    text: "Applicants must have taken at least one of the following exams in the year preceding the academic start: CAT, XAT, ATMA, CMAT, or GMAT. Every shortlisted candidate has to mandatorily undergo a detailed evaluation process. Merely applying or appearing for an exam does not guarantee admission. Refer to the “How to Apply” section for complete details.",
  },
  howToApply: {
    heading: "How to Apply",
    text: "Admission follows a 3-step process: Application – Evaluation – Shortlisting, assessing candidates on past academics, entrance test percentiles, personality and aptitude.",
    steps: [
      {
        title: "Application",
        paragraphs: [
          "Applications open 6–8 months before the session begins and are application formas are accepted ONLINE ONLY.",
          "Applications for the 2027–29 batch are open; visit our {Application Form portal|/apply} to apply.",
        ],
      },
      {
        title: "Evaluation",
        paragraphs: [
          "Submitted applications are evaluated on multiple parameters including past academics and entrance test percentiles (or overall profile if certain test scores are unavailable).",
          "Qualifying candidates are invited to a Group Discussion & Personal Interview (GDPI) to assess personality and aptitude.",
        ],
      },
      {
        title: "Shortlisting",
        paragraphs: [
          "Basis their evaluation and performance, eligible candidates become a part of a camps specific program Merit List. Offers are made to the top-ranking candidates.",
          "In order to confirm their admission, such candidates must pay the required fee within the given deadline.",
          "Failure to do so results in offer withdrawal, which cannot be revived under any condition, and the seat passes to the next candidate on the Merit list.",
        ],
      },
    ],
  },
  cutoffs: {
    heading: "Eligibility & Cut-offs",
    text: "Eligibility criteria vary by campus and program. Visit the specific program page under each campus on this website for details.",
    cards: [
      {
        title: "Apply Now!",
        text: "Admissions for WeSchool’s 2-Year Full-Time PGDM Program (2027–29 batch) are now open. Visit {PGDM admissions|/programmes/full-time-programme-in-mumbai/pgdm} to apply early and avoid last-minute delays",
        href: "/apply",
      },
      {
        title: "Enquire Now",
        text: "If you have unresolved queries or need further assistance beyond what is covered on this website, visit the {Contact Us|/contact-us} page and we will gladly help.",
        href: "/contact-us",
      },
    ],
  },
  fees: {
    heading: "Fees & Support",
    text: "At WeSchool, we invest in our students' futures—focusing not just on traditional ROI, but on holistic growth to prepare graduates for today's fast-paced business world. Tuition fees and other charges for the 2027–29 academic batch are as follows:",
    cards: [
      { title: "Tuition Fees & Other", lines: ["₹7,50,000/- p.a*"], note: "*Subject to change", image: IMG("fee-tuition.webp") },
      { title: "Library Deposit", lines: ["₹4,000/- (refundable)"], image: IMG("fee-library.webp") },
      {
        title: "Hostel Fees",
        lines: ["₹1,60,000/- p.a. to ₹2,20,000/- p.a.", "Plus a deposit of ₹10,000/- (refundable)"],
        image: IMG("fee-hostel.webp"),
        overlay: IMG("fee-extra.webp"),
      },
    ] as AdmFeeCard[],
    waiver: {
      heading: "Tuition Fee Waiver Scheme",
      items: [
        "Seats, up to Maximum 5 percent of sanctioned intake per course are available under TFW Scheme.",
        "Candidate's parent's annual income from all sources should not exceed Rs. 8.00 Lakh. This should be supported by the Income Certificate issued by the Tehsildar office and valid till March 2026,.",
        "The Waiver is limited to the Tuition Fee only",
        "All other fees except tuition fee shall be paid by the beneficiary.",
        "The Candidates admitted under this scheme shall not be allowed to change the course/campus at any stage under any circumstances.",
      ],
    },
    admissions: {
      heading: "Admissions",
      text: "Admissions are based on merit only. No discrimination is made on the basis of the state from which graduation certificate is obtained. There are no reservations for linguistic minorities either.",
    },
    loan: {
      heading: "Education loan",
      paragraphs: [
        "Student can avail education loans from -",
        "Our sole purpose is to keep students focused on their goals, i.e. their career. To help them do so, we have partnered with a sound financial institution, to help students avail loans at reasonable rates.",
      ],
      logo: IMG("icici-bank.webp"),
      cta: { label: "Know More", href: "/contact-us" },
    },
  },
  scholarships: {
    heading: "Scholarships",
    lines: ["Deserving candidates may qualify for program-specific scholarships.", "Refer to individual program pages for details."],
    image: IMG("scholarships-bg.webp"),
  },
};
