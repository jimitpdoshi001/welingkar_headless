/**
 * Admissions page content (Figma 3666:984). Live content comes from Drupal node--admissions 5957
 * (src/lib/drupal/pages/admissions.ts); this built-in copy shows only when Drupal can't be reached.
 * Fields ending in "Html" are rich text and are rendered only through SafeHtml.
 */

const IMG = (name: string) => `/admissions/${name}`;

/** position: CSS object-position matching the Figma crop of each photo. */
export type AdmFeeCard = { title: string; lines: string[]; note?: string; image: string; position?: string; overlay?: string };

export type AdmissionsData = {
  intro: { title: string; subtitle: string; textHtml: string; cta: { label: string; href: string } };
  eligibility: { heading: string; image: string; itemsHtml: string[] };
  exams: { heading: string; textHtml: string };
  howToApply: { heading: string; textHtml: string; steps: { step: number; title: string; html: string }[] };
  cutoffs: { heading: string; textHtml: string; cards: { title: string; html: string; href: string }[] };
  fees: {
    heading: string;
    textHtml: string;
    cards: AdmFeeCard[];
    waiver: { heading: string; html: string };
    admissions: { heading: string; text: string };
    loan: { heading: string; paragraphs: string[]; logo: string; logoAlt: string; cta: { label: string; href: string } };
  };
  scholarships: { heading: string; html: string; image: string };
};

export const ADMISSIONS: AdmissionsData = {
  intro: {
    title: "Admission",
    subtitle: "(For 2-Year Full-Time PGDM Programs)",
    textHtml: "<p>Step into a leadership role with WeSchool’s 2-Year Full-Time Programs, designed to turn students from diverse backgrounds—such as arts, commerce, and science—into world-class managers equipped with vital analytical tools and a strong foundation across major business functions. Review our admission process and eligibility requirements before applying.</p>",
    cta: { label: "How to Apply", href: "#how-to-apply" },
  },
  eligibility: {
    heading: "Eligibility Criteria",
    image: IMG("eligibility-bg.webp"),
    itemsHtml: [
      "<p>Graduates from a recognised university with at least 50% marks.</p>",
      "<p>Final-year students may also apply, provided they complete their graduation by June for the next academic year cycle</p>",
      "<p>Graduates with work experience are eligible to apply.</p>",
    ],
  },
  exams: {
    heading: "Entrance exams accepted",
    textHtml: "<p>Applicants must have taken at least one of the following exams in the year preceding the academic start: CAT, XAT, ATMA, CMAT, or GMAT. Every shortlisted candidate has to mandatorily undergo a detailed evaluation process. Merely applying or appearing for an exam does not guarantee admission. Refer to the “How to Apply” section for complete details.</p>",
  },
  howToApply: {
    heading: "How to Apply",
    textHtml: "<p>Admission follows a 3-step process: Application – Evaluation – Shortlisting, assessing candidates on past academics, entrance test percentiles, personality and aptitude.</p>",
    steps: [
      { step: 1, title: "Application", html: "<p>Applications open 6–8 months before the session begins and are application formas are accepted ONLINE ONLY.</p><p>Applications for the 2027–29 batch are open; visit our <a href=\"/apply\">Application Form portal</a> to apply.</p>" },
      { step: 2, title: "Evaluation", html: "<p>Submitted applications are evaluated on multiple parameters including past academics and entrance test percentiles (or overall profile if certain test scores are unavailable).</p><p>Qualifying candidates are invited to a Group Discussion & Personal Interview (GDPI) to assess personality and aptitude.</p>" },
      { step: 3, title: "Shortlisting", html: "<p>Basis their evaluation and performance, eligible candidates become a part of a camps specific program Merit List. Offers are made to the top-ranking candidates.</p><p>In order to confirm their admission, such candidates must pay the required fee within the given deadline.</p><p>Failure to do so results in offer withdrawal, which cannot be revived under any condition, and the seat passes to the next candidate on the Merit list.</p>" },
    ],
  },
  cutoffs: {
    heading: "Eligibility & Cut-offs",
    textHtml: "<p>Eligibility criteria vary by campus and program. Visit the specific program page under each campus on this website for details.</p>",
    cards: [
      {
        title: "Apply Now!",
        html: "<p>Admissions for WeSchool’s 2-Year Full-Time PGDM Program (2027–29 batch) are now open. Visit <a href=\"/programs/full-time-programme-in-mumbai/pgdm\">PGDM admissions</a> to apply early and avoid last-minute delays</p>",
        href: "/apply",
      },
      {
        title: "Enquire Now",
        html: "<p>If you have unresolved queries or need further assistance beyond what is covered on this website, visit the <a href=\"/contact-us\">Contact Us</a> page and we will gladly help.</p>",
        href: "/contact-us",
      },
    ],
  },
  fees: {
    heading: "Fees & Support",
    textHtml: "<p>At WeSchool, we invest in our students' futures—focusing not just on traditional ROI, but on holistic growth to prepare graduates for today's fast-paced business world. Tuition fees and other charges for the 2027–29 academic batch are as follows:</p>",
    cards: [
      { title: "Tuition Fees & Other", lines: ["₹7,50,000/- p.a*"], note: "*Subject to change", image: IMG("fee-tuition.webp"), position: "center bottom" },
      { title: "Library Deposit", lines: ["₹4,000/- (refundable)"], image: IMG("fee-library.webp"), position: "left bottom" },
      {
        title: "Hostel Fees",
        lines: ["₹1,60,000/- p.a. to ₹2,20,000/- p.a.", "Plus a deposit of ₹10,000/- (refundable)"],
        image: IMG("fee-hostel.webp"),
        overlay: IMG("fee-extra.webp"),
      },
    ],
    waiver: {
      heading: "Tuition Fee Waiver Scheme",
      html: "<ul><li>Seats, up to Maximum 5 percent of sanctioned intake per course are available under TFW Scheme.</li><li>Candidate's parent's annual income from all sources should not exceed Rs. 8.00 Lakh. This should be supported by the Income Certificate issued by the Tehsildar office and valid till March 2026,.</li><li>The Waiver is limited to the Tuition Fee only</li><li>All other fees except tuition fee shall be paid by the beneficiary.</li><li>The Candidates admitted under this scheme shall not be allowed to change the course/campus at any stage under any circumstances.</li></ul>",
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
      logoAlt: "ICICI Bank",
      cta: { label: "Know More", href: "/contact-us" },
    },
  },
  scholarships: {
    heading: "Scholarships",
    html: "<p>Deserving candidates may qualify for program-specific scholarships.</p><p>Refer to individual program pages for details.</p>",
    image: IMG("scholarships-bg.webp"),
  },
};
