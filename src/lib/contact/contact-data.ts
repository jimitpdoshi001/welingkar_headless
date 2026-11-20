// Figma 3507:152 "Welingkar - Mumbai - Contact Us" content.

export type ContactLine = { kind: "phone" | "mail"; text: string };
export type ContactGroup = { label?: string; lines: ContactLine[] };
export type ContactColumn = { heading: string; groups: ContactGroup[] };

export const CONTACT_CAMPUSES = [
  { label: "Mumbai", image: "/contact/card-mumbai.webp", href: "/campus-mumbai", active: true },
  { label: "Bengaluru", image: "/contact/card-bengaluru.webp", href: "/campus-bengaluru" },
  { label: "Delhi", image: "/contact/card-mumbai.webp" },
] as const;

export const CONTACT_SIDE = {
  heading: "Prospective Students",
  items: [
    "Internships/ Campus Placements (Career Management Centre)",
    "Administrative office",
    "For transcripts and student verification, write to",
    "Departmental contacts",
  ],
};

const phone = (text: string): ContactLine => ({ kind: "phone", text });
const mail = (text: string): ContactLine => ({ kind: "mail", text });

export const CONTACT_COLUMNS: ContactColumn[] = [
  {
    heading: "Full time PGDM",
    groups: [
      { lines: [phone("022-24198400/ 022- 24198700")] },
      { label: "For Admission Enquiry, Contact numbers below -", lines: [phone("Monday to Saturday\nTiming: 10:30 am to 7:00 pm")] },
      { label: "West", lines: [phone("9702772899/ 8452062782\n/ 9137282627/ 7208649706/ 9321875551")] },
      { label: "East", lines: [phone("09830277120")] },
      { label: "North", lines: [phone("09212171051/ 8976712275")] },
      { label: "South", lines: [phone("09886440456 / 080 42678300"), mail("pgapp@welingkarmail.org")] },
    ],
  },
  {
    heading: "University Programmes",
    groups: [
      { label: "a) Masters in Management Studies (MMS)", lines: [phone("022 24198300 Ext: 8133 / 8134"), mail("admin@welingkar.org")] },
      { label: "b) PHD", lines: [phone("022-24198300 Ext: 8191 / 8192"), mail("phdadmission@welingkarmail.org")] },
    ],
  },
];

export const CONNECT = {
  heading: "Connect With Us",
  address: "Address: 102/103, Electronic City Phase 1, Next to Telephone Exchange, Hosur Road, Bengaluru-560100",
  phone: "080-42678300",
  map: "/contact/map.webp",
};
