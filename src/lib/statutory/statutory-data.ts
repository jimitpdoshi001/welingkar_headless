/**
 * Content for the statutory pages (Figma 1610:771, 1610:1432, 1610:1755).
 * Document URLs are not in the design yet; "#" marks each one to be replaced
 * with the PDF link (or the Drupal file field) when available.
 */

export type DocLink = { label: string; href: string };

// Left-hand menu shared by the disclosure pages; only the active page has a route today.
export const DISCLOSURE_NAV: DocLink[] = [
  { label: "Mandatory Disclosure", href: "/mandatory-disclosure" },
  { label: "AICTE Approvals", href: "#" },
  { label: "NIRF", href: "#" },
  { label: "AIU Equivalence", href: "#" },
  { label: "ARIIA", href: "#" },
  { label: "SAQS Accreditation", href: "#" },
  { label: "NBA", href: "#" },
  { label: "ACBSP accreditation", href: "#" },
];

const PGDM_YEARS = ["2025-26", "2024-25", "2023-24", "2022-23", "2021-22", "2020-21"];

export type DisclosureGroup = { title: string; links: DocLink[] };

export const DISCLOSURE_GROUPS: DisclosureGroup[] = [
  {
    title: "Mumbai",
    links: PGDM_YEARS.map((y) => ({
      label: `Mandatory disclosure of ( Academic Year ${y}) of Prin L.N.Welingkar Institute of Management Development & Research ( PGDM).`,
      href: "#",
    })),
  },
  { title: "Bengaluru", links: [] },
  { title: "MMS", links: [] },
  { title: "Annexure 1", links: [] },
  { title: "Annexure 2", links: [] },
  { title: "Annexure 3", links: [] },
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
