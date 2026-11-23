// Contact Us content from the current site's /contact-us page (visible blocks
// only), laid out per Figma 3507:152.

/** One row in a contact group: icon rows (phone/mail), plain text or a link. */
export type ContactItem =
  | { kind: "phone" | "mail" | "text"; text: string }
  | { kind: "link"; text: string; href: string; before?: string; after?: string };

/**
 * heading: starts a new contact card; label: a zone/sub-block inside the current card;
 * region: the "regional desks" header row that the following zones sit under.
 */
export type ContactGroup = { heading?: string; label?: string; region?: boolean; items: ContactItem[] };
export type ContactSection = { title: string; groups: ContactGroup[] };
/** Connect With Us block for a campus (switches with the campus tab, as on the current site). */
export type ContactConnect = { address: string; phones: string[]; hours?: string; mapEmbed: string };
export type ContactCampus = { id: string; label: string; sections: ContactSection[]; connect: ContactConnect };

const phone = (text: string): ContactItem => ({ kind: "phone", text });
const mail = (text: string): ContactItem => ({ kind: "mail", text });
const text = (t: string): ContactItem => ({ kind: "text", text: t });
const SUPPORT = "https://support.welonline.com/studentquery/prospective";

const MUMBAI: ContactSection[] = [
  {
    title: "Prospective Students",
    groups: [
      {
        heading: "Full time PGDM",
        items: [text("2-Year Full Time Post Graduate Diploma in Management (AICTE Approved)"), phone("022-24198400/ 022- 24198700"), mail("pgapp@welingkarmail.org")],
      },
      // "region" marks the regional-desk header row; zones follow it as cards.
      { label: "For Admission Enquiry, Contact numbers below -", region: true, items: [text("Monday to Saturday | Timing: 10:30 am to 7:00 pm")] },
      { label: "West Zone (MH, GJ, GA, MP)", items: [phone("9702772899/ 8452062782/ 9137282627/ 7208649706/ 9321875551")] },
      { label: "North Zone (DL, UP, HR, PB, RJ)", items: [phone("09212171051/ 8976712275")] },
      { label: "South Zone (KA, TN, KL, AP, TS)", items: [phone("09886440456 / 080 42678300")] },
      { label: "East Zone (WB, OD, JH, BR, NE)", items: [phone("09830277120")] },
      { heading: "University Programmes", items: [text("a) Masters in Management Studies (MMS)"), phone("022 24198300 Ext: 8133 / 8134"), mail("admin@welingkar.org")] },
      { items: [text("b) PHD"), phone("022-24198300 Ext: 8191 / 8192"), mail("phdadmission@welingkarmail.org")] },
      { heading: "6 months Certificate & 11 month PG programs", items: [phone("022-24198600/ 9892595456/ 9987986501/ 8879127417 / 9320715152"), mail("autonomous@welingkar.org")] },
      {
        heading: "PGDM Hybrid Program (Distance learning)",
        items: [
          phone("022-40514025 /8655459433 / 8655459434 / 8655459435"),
          mail("admissions.hybrid@welingkarmail.org"),
          { kind: "link", before: "For any specific support / grievances please ", text: "Click here", href: SUPPORT },
          { kind: "link", before: "Website: ", text: "www.welingkaronline.org", href: "https://www.welingkaronline.org/" },
          text('If the lines are busy on account of heavy load, you can alternatively connect with the institute on "WeCare - Online Helpdesk" from your student login portal.'),
        ],
      },
      { heading: "PGP Entrepreneurship", items: [phone("1800-123-500049 / 022 24198300 Ext: 8270"), mail("fmb@welingkarmail.org")] },
      { heading: "PGP Media and Entertainment", items: [phone("1800-123-500041 / 022 - 24198300 Ext: 8822"), mail("pgpmedia@welingkarmail.org")] },
    ],
  },
  {
    title: "Internships/ Campus Placements (Career Management Centre)",
    groups: [
      { heading: "Placements correspondence", items: [text("Prof. Vijayan Pankajakshan\nDean - HR, Chief Human Resource Officer and Head - Career Management Cell"), phone("022-24198300 Ext: 8361"), mail("vijayan.pankajakshan@welingkar.org")] },
      { heading: "International Placements and Internships", items: [text("Ms. Chandana Pai\nVice President CMC & Business Development, Assistant Professor - Marketing"), phone("022-24198300. Ext. 8844"), mail("chandana.pai@welingkar.org")] },
    ],
  },
  {
    title: "Administrative office",
    groups: [
      { heading: "Accounts", items: [phone("022-24198300 Ext: 8356"), mail("vinayak.shinde@welingkar.org")] },
      { heading: "Administrative office (students ID card, transcripts for Full-time Programs)", items: [phone("022-24198300 Ext: 8134"), mail("shirley.dhairyawan@welingkar.org")] },
    ],
  },
  {
    title: "For transcripts and student verification, write to",
    groups: [
      { heading: "Full time PGDM and University Programs", items: [mail("admin@welingkar.org")] },
      { heading: "6 months Certificate & 11 month PG programs", items: [phone("022-24198357, 022-24198429"), mail("autonomous@welingkar.org")] },
      { heading: "Distance Learning Programs", items: [phone("022-40514025"), { kind: "link", before: "Hybrid & Distance Learning Programs - ", text: "Click here", href: SUPPORT }] },
    ],
  },
  {
    title: "Departmental contacts",
    groups: [
      { heading: "Director's Office", items: [mail("director@welingkar.org")] },
      { heading: "Library", items: [phone("022-24198300 Ext: 8377"), mail("sandeep.bhavsar@welingkar.org")] },
      { heading: "Management Development Centre", items: [phone("022-24198395, 022-24198375"), mail("exed@welingkarmail.org"), mail("mdc@welingkar.org")] },
      {
        heading: "Management Development Centre",
        items: [
          text("S.P. Mandali’s Prin. L. N. Welingkar Institute of Management Development & Research (WeSchool)\nLakhamsi Napoo Road, Opposite Matunga Gymkhana, Matunga Central Railway, Matunga East – 400019."),
          phone("+91-22-43476207/ 08/ 09/ 10"),
          phone("9867753194, 9820059056"),
        ],
      },
      { heading: "Human Resources", items: [phone("022-24198300"), mail("hrd@welingkar.org"), { kind: "link", text: "Click here", href: "/careers", after: " to submit application" }] },
      { heading: "Student Competitions", items: [phone("022-24198300 Ext: 8186"), mail("jalpa.thakker@welingkar.org")] },
      { heading: "Print Media", items: [phone("022-24198300 Ext: 8388"), mail("sanjana.sawant@welingkarmail.org")] },
      { heading: "Digital Advt. Promotions", items: [phone("022-24198300 Ext: 8390"), mail("shilpa.kadam@welingkarmail.org")] },
      { heading: "Outreach and Student Engagement", items: [phone("022-24198300 Ext: 8391"), mail("nagalaxmi.charipalli@welingkar.org")] },
      { heading: "Research Centre (Publications/ Papers)", items: [phone("022-24198300 Ext: 8294"), mail("weresearch@welingkarmail.org")] },
      { heading: "International Partnerships, Collaborations and Immersion Programs", items: [phone("022-24198300 Ext: 8242"), mail("jesal.thakkar@welingkar.org")] },
      { heading: "Public Relations (Media Relations for Journalist)", items: [mail("pr@welingkarmail.org")] },
    ],
  },
];

const BENGALURU: ContactSection[] = [
  {
    title: "Prospective Students",
    groups: [{ heading: "Full time PGDM programs", items: [phone("080-42678300 Ext: 313 / 9886440456"), mail("shiva.kumar@welingkar.org")] }],
  },
  {
    title: "Administrative office",
    groups: [
      { heading: "Accounts", items: [phone("080-42678300 Ext: 336"), mail("mahesh.devgekar@welingkar.org")] },
      { heading: "Administrative office (students ID card, transcripts for Full Time Programs)", items: [phone("080-42678300 Ext: 364"), mail("atul.deshpande@welingkar.org")] },
    ],
  },
  {
    title: "CMC",
    // The live "CMC sectorwise contact details" PDF is not copied locally, so it is not linked.
    groups: [{ items: [text("Prof. Dr. Anuradha Mahesh"), phone("080-42678300 Ext: 318"), mail("anuradha.mahesh@welingkar.org")] }],
  },
  {
    title: "Departmental Contacts",
    groups: [
      { heading: "Deans Office", items: [phone("080-42678300 Ext: 311"), mail("madhavi.lokhande@welingkar.org")] },
      { heading: "Library", items: [phone("080-42678300 Ext: 395"), mail("library.blr@welingkar.org")] },
      { heading: "Transcript", items: [phone("080-42678300 Ext: 328"), mail("exams.blr@welingkarmail.org")] },
      { heading: "Academic Deliverable Cell", items: [phone("080-42678300 Ext: 329"), mail("srija.bose@welingkar.org")] },
      { heading: "Management Development Centre", items: [phone("080-42678300 Ext: 346"), mail("archana.vishwanath@welingkar.org")] },
      { heading: "Student Competition", items: [phone("080-42678300 Ext: 331"), mail("asha.mathew@welingkar.org")] },
      { heading: "Human Resources", items: [phone("080-42678300 Ext: 322"), mail("jayanti.pani@welingkar.org")] },
      { heading: "Research Centre (Publications/ Papers)", items: [phone("080-42678300 Ext: 303"), mail("narasimha.murthy@welingkar.org")] },
      { heading: "Research Centre (Case Study Publication)", items: [phone("080-42678300 Ext: 350"), mail("sonia.mehrotra@welingkar.org")] },
      { heading: "International Partnerships", items: [phone("080-42678300 Ext: 331"), mail("asha.mathew@welingkar.org")] },
      { heading: "B-School Survey", items: [phone("080-42678300 Ext: 331"), mail("asha.mathew@welingkar.org")] },
      { heading: "IT", items: [phone("080-42678300 Ext: 349"), mail("nagaraj.rl@welingkar.org")] },
    ],
  },
];

// Map embeds are the current site's Google Maps iframes for each campus.
export const CONTACT_CAMPUSES: ContactCampus[] = [
  {
    id: "mumbai",
    label: "Mumbai",
    sections: MUMBAI,
    connect: {
      hours: "Office Hours: Monday to Saturday, 10:00 hrs - 19:00 hrs",
      address: "Prin. L. N. Welingkar Institute of Management Development & Research, Lakhamsi Napoo Road, Near Matunga (Central Rly.), Mumbai- 400 019.",
      phones: ["022-24198300", "022-24178300"],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60361.857324148565!2d72.7751689566951!3d18.992555300508045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced7f4386195%3A0xa7fea98c278939c6!2sWelingkar+Institute+of+Management+Development+%26+Research!5e0!3m2!1sen!2sin!4v1530014457509",
    },
  },
  {
    id: "bengaluru",
    label: "Bengaluru",
    sections: BENGALURU,
    connect: {
      address: "102/103, Electronic City Phase 1, Next to Telephone Exchange, Hosur Road, Bengaluru-560100",
      phones: ["080-42678300", "080-28521066", "080-28522514"],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.002901756854!2d77.66081491405393!3d12.843088721161902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16773e7dc413%3A0xecf2213880352cd2!2sWelingkar+Institute+of+Management+Development+%26+Research.!5e0!3m2!1sen!2sin!4v1536571647524",
    },
  },
];

export const CONNECT_HEADING = "Connect With Us";
