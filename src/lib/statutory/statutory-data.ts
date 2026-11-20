/**
 * Content for the statutory pages (Figma 1610:771, 1610:1432, 1610:1755).
 * Document URLs are not in the design yet; "#" marks each one to be replaced
 * with the PDF link (or the Drupal file field) when available.
 */

export type DocLink = { label: string; href: string };

// Left-hand menu shared by the disclosure pages: Mandatory Disclosure has its
// own page; every other entry is a section of the Accreditation page.
export const DISCLOSURE_NAV: DocLink[] = [
  { label: "Mandatory Disclosure", href: "/mandatory-disclosures" },
  { label: "AICTE Approvals", href: "/accreditation?section=aicte-approvals" },
  { label: "NIRF", href: "/accreditation?section=nirf" },
  { label: "AIU Equivalence", href: "/accreditation?section=aiu-equivalence" },
  { label: "ARIIA", href: "/accreditation?section=ariia" },
  { label: "SAQS Accreditation", href: "/accreditation?section=saqs" },
  { label: "NBA", href: "/accreditation?section=nba" },
  { label: "ACBSP accreditation", href: "/accreditation?section=acbsp" },
];

export type DisclosureGroup = { title: string; links: DocLink[] };

// From the current site's Mandatory Disclosures page; files copied into
// /public/mandatory-disclosure/docs.
export const DISCLOSURE_GROUPS: DisclosureGroup[] = [
  {
    "title": "Mumbai",
    "links": [
      {
        "label": "Mandatory disclosure of ( Academic Year 2025-26) of Prin L.N.Welingkar Institute of Management Development & Research ( PGDM).",
        "href": "/mandatory-disclosure/docs/pgdm_mandatory_disclosure_2025_26_updated.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2024-25) of Prin L.N.Welingkar Institute of Management Development & Research ( PGDM).",
        "href": "/mandatory-disclosure/docs/pgdm-mandatory-disclosure-2024-25.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2023-24) of Prin L.N.Welingkar Institute of Management Development & Research ( PGDM).",
        "href": "/mandatory-disclosure/docs/pgdm-mandatory-disclosure-ay-2023-24--revised.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2022-23) of Prin L.N.Welingkar Institute of Management Development & Research ( PGDM).",
        "href": "/mandatory-disclosure/docs/pgdm-mandatory-disclosure-2022-23.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2021-22) of Prin L.N.Welingkar Institute of Management Development & Research ( PGDM).",
        "href": "/mandatory-disclosure/docs/pgdm-mandatory-disclosure-2021-22.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2020-21) of Prin L.N.Welingkar Institute of Management Development & Research ( PGDM).",
        "href": "/mandatory-disclosure/docs/pgdm-mandatory-disclosure-2020-21.pdf"
      }
    ]
  },
  {
    "title": "Bengaluru",
    "links": [
      {
        "label": "WeSchool, Bengaluru - Details of AICTE Mandatory Committees",
        "href": "/mandatory-disclosure/docs/weschool-bengaluru-details-of-aicte-mandatory-committees.pdf"
      },
      {
        "label": "Mandatory disclosure for the year AY 2025-2026",
        "href": "/mandatory-disclosure/docs/mandatorydisclosure2025-2026.pdf"
      },
      {
        "label": "Mandatory disclosure for the year AY 2024-2025",
        "href": "/mandatory-disclosure/docs/mandatory_disclosure_2024-25.pdf"
      },
      {
        "label": "Mandatory disclosure for the year AY 2023-2024",
        "href": "/mandatory-disclosure/docs/mandatory-disclosure-2023-2024.pdf"
      }
    ]
  },
  {
    "title": "MMS",
    "links": [
      {
        "label": "Mandatory Disclosure (Academic Year 2020-21) of Prin. L.N. Welingkar Institute of Management Development & Research, Mumbai",
        "href": "/mandatory-disclosure/docs/mms-mandatory-disclosure-2020-2021.pdf"
      },
      {
        "label": "Mandatory Disclosure (Academic Year 2021-22)of Prin.L.N.Welingkar Institute of Management Development and Research (MMS)",
        "href": "/mandatory-disclosure/docs/mms-mandatory-disclosure-2021-22.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2025-26) of Prin L.N.Welingkar Institute of Management Development & Research ( MMS).",
        "href": "/mandatory-disclosure/docs/mms_mandatory_disclosure_2025_26_final.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2024-25) of Prin L.N.Welingkar Institute of Management Development & Research ( MMS).",
        "href": "/mandatory-disclosure/docs/mms-mandatory-disclosure-2024-25_revised.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2023-24) of Prin L.N.Welingkar Institute of Management Development & Research ( MMS).",
        "href": "/mandatory-disclosure/docs/mms-mandatory-disclosure-2023-24-revised.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2022-23) of Prin L.N.Welingkar Institute of Management Development & Research ( MMS).",
        "href": "/mandatory-disclosure/docs/mms-mandatory-disclosure-2022-23.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2021-22) of Prin L.N.Welingkar Institute of Management Development & Research ( MMS).",
        "href": "/mandatory-disclosure/docs/mms-mandatory-disclosure-2021-22-16.pdf"
      },
      {
        "label": "Mandatory disclosure of ( Academic Year 2020-21) of Prin L.N.Welingkar Institute of Management Development & Research ( MMS).",
        "href": "/mandatory-disclosure/docs/mms-mandatory-disclosure-2020-21.pdf"
      },
      {
        "label": "Fee Proposal AY 2024-25",
        "href": "/mandatory-disclosure/docs/proposal-for-fixation-of-fees-for-the-ay-2024-25.pdf"
      }
    ]
  },
  {
    "title": "Annexure 1",
    "links": [
      {
        "label": "Organisation Chart",
        "href": "/mandatory-disclosure/docs/organization_chart_mms.pdf"
      }
    ]
  },
  {
    "title": "Annexure 2",
    "links": [
      {
        "label": "Director's Profile",
        "href": "/mandatory-disclosure/docs/directors-profile.pptx"
      }
    ]
  },
  {
    "title": "Annexure 3",
    "links": [
      {
        "label": "MoM of Academic Council",
        "href": "/mandatory-disclosure/docs/mom-of-academic-council.pdf"
      },
      {
        "label": "MoM of Board of Studies",
        "href": "/mandatory-disclosure/docs/mom-of-board-of-studies.pdf"
      },
      {
        "label": "MoM of Finance Committee",
        "href": "/mandatory-disclosure/docs/mom-of-finance-committee.pdf"
      },
      {
        "label": "MoM of Governing Body",
        "href": "/mandatory-disclosure/docs/mom-of-governing-body.pdf"
      },
      {
        "label": "MoM of IQAC",
        "href": "/mandatory-disclosure/docs/mom-of-iqac.pdf"
      }
    ]
  }
];

export const AUTONOMY_DOCS: DocLink[] = [
  "Reports of External Self-Evaluation Committee for AYs 2015-16 (Exhibit 7), 2016-17 (Exhibit 8) & 2017-18 (Exhibit 9) and Reports of External Peer Team for AYs 2018-19 (Exhibit 10), 2019-20 (Exhibit 11) & 2020-21 (Exhibit 12)",
  "Mandatory Disclosure of Information re: Courses, Fees, Faculty, Admission Procedure, Infrastructure, Research, Committees/Cells & Undertaking for AYs 2018-19 (Exhibit 13) , 2019-20 (Exhibit 14) & 2020-21 (Exhibit 15)",
  "Minutes of Meetings of Governing Body (Exhibit 16)",
  "Academic Council (Exhibit 17)",
  "Board of Studies (Exhibit 18)",
  "Finance Committee (Exhibit 19)",
  "Examination Committee (Exhibit 20)",
  "Reports of External Planning & Evaluation Committee (Exhibit 21)",
  "Reports of Academic & Administrative Audit Committee (Exhibit 22)",
  "Reports of Gender Audit Committee (Exhibit 23)",
  "IQAC (Exhibit 24)",
  "Annual Progress Reports AYs 2015-16 to 2020-21 (Exhibit 25)",
].map((label) => ({ label, href: "#" }));

export const GRIEVANCE_INTRO =
  "To meet the expectations of students, parents, alumni, faculties, non-teaching staff and other stakeholders for better, faster and more effective Grievance Redressal Mechanism, the Institute has decided to provide an on-line mechanism to all stakeholders for redressal of their grievances. You can register your grievance below -";

export const GRIEVANCE_OPTIONS = {
  campus: ["Mumbai", "Bengaluru"],
  role: ["Student", "Parent", "Alumni", "Faculty", "Non-teaching Staff", "Other"],
  subject: ["Academic", "Administrative", "Hostel", "Examination", "Other"],
};

// Figma 1618:2123 (Careers). Select options are not in the design; these are
// sensible defaults to confirm with HR.
export const CAREER_OPENINGS = ["Guest Relations Executive", "Young Professional Program (YPP)"];

export const CAREER_OPTIONS = {
  source: ["WeSchool Website", "LinkedIn", "Job Portal", "Employee Referral", "Other"],
  qualification: ["Graduate", "Post Graduate", "M.Phil", "Ph.D"],
  classObtained: ["Distinction", "First Class", "Second Class", "Pass Class"],
};
