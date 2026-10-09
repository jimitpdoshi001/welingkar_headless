/**
 * Mock data for the We Conference page, mirroring the Figma design.
 * Swap for Drupal fields later. Images are placeholders.
 */

export type ConfTrack = { id: string; title: string; points: string[] };
export type ConfDate = { label: string; date: string };

export type ConferenceData = {
  hero: { title: string; subtitle: string; meta: string; image: string };
  about: { heading: string; paragraphs: string[] };
  info: { title: string; text: string }[];
  tracks: { heading: string; description: string; items: ConfTrack[] };
  guidelines: { heading: string; items: string[] };
  publication: { heading: string; intro: string; points: string[] };
  keyDates: { heading: string; items: ConfDate[] };
  contact: { heading: string; email: string; org: string; address: string };
  reachOut: { heading: string; phone: string; people: string[] };
};

export const CONFERENCE: ConferenceData = {
  hero: {
    title: "Uncertainty to resilience.",
    subtitle: "Navigating transformation in business and society",
    meta: "23rd October, 2026  |  WeSchool Campus, Mumbai 400019",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80",
  },
  about: {
    heading: "About the Conference",
    paragraphs: [
      "Our world is at a breaking point, facing massive changes from politics and fast-moving technology to climate change. These are no longer temporary problems; they are completely changing how our businesses, societies, and daily lives work. To navigate this uncertainty, we need resilience. This does not just mean surviving tough times. It means adapting, growing stronger, and moving forward with a clear purpose.",
      "However, there is a delicate balance between uncertainty and resilience. The same innovations that promise to make our lives better also make our systems more fragile. True resilience means ensuring that rapid technological growth works in tandem with protecting the planet and its inhabitants.",
      "Against this backdrop, we are excited to bring together researchers, practitioners, policymakers, and emerging scholars to deliberate on the pathways from uncertainty to resilience.",
    ],
  },
  info: [
    { title: "Who Should Attend the Conference", text: "This conference is appropriate for Academicians, Corporate Executives, Research Scholars, Students, Practitioners, Subject Experts, and Policy makers." },
    { title: "Conference Fee Details", text: "Registration for the conference is compulsory for the first author of every accepted paper. In case the registered author is unable to attend or present the paper, a co-author may be nominated. The registration fee, once paid, is not refundable." },
    { title: "Award", text: "The Best Paper Award will be presented under the Student and Faculty categories. To qualify for the best paper award, a full paper must be presented at the conference." },
  ],
  tracks: {
    heading: "Conference Tracks",
    description: "The conference invites full research papers across the following thematic tracks. Contributors are encouraged to engage creatively with the overarching theme of resilience and transformation within their chosen domain.",
    items: [
      { id: "tr-1", title: "Innovation and Business Design", points: ["Design thinking for resilient organisations", "Business model innovation", "Sustainable product and service design"] },
      { id: "tr-2", title: "Media & Entertainment", points: ["AI-driven content creation and creative industries", "Streaming platforms, OTT ecosystems and digital monetization", "Influencer culture, creator branding and social media economies", "Digital consumer psychology and data-driven engagement", "Emerging media skills, analytics and future workforce readiness"] },
      { id: "tr-3", title: "Rural Management", points: ["Rural entrepreneurship and livelihoods", "Agri-tech and sustainable agriculture", "Financial inclusion and rural development"] },
      { id: "tr-4", title: "Retail Management", points: ["Omnichannel retail and consumer experience", "Retail analytics and supply chains", "New-age retail formats"] },
      { id: "tr-5", title: "Healthcare Management", points: ["Digital health and tele-medicine", "Healthcare operations and policy", "Workforce and diversity in healthcare"] },
      { id: "tr-6", title: "Technology in Business", points: ["Artificial intelligence and automation", "Data, privacy and governance", "Platform and ecosystem strategy"] },
      { id: "tr-7", title: "Research and Business Analytics", points: ["Advanced analytics and decision science", "Predictive and prescriptive modelling", "Analytics for social impact"] },
      { id: "tr-8", title: "General Management", points: ["Strategy and leadership in uncertainty", "Organisational behaviour and culture", "Finance, marketing and operations"] },
    ],
  },
  guidelines: {
    heading: "Submission Guidelines",
    items: [
      "Only full research papers are invited for submission.",
      "A single individual can at most send two submissions.",
      "Each paper can have a maximum of 4 authors.",
      "Please ensure all submitted work has a Similarity Index below 10%. AI generated content will be rejected from the conference.",
      "It is the responsibility of an author to ensure the paper is original, should not have been published / presented earlier, nor should it have been communicated for publication / presentation elsewhere.",
    ],
  },
  publication: {
    heading: "Publication Opportunities",
    intro: "All submissions accepted for presentation will be published in the Conference Proceedings (abstract only) with an ISBN. Selected full papers (subject to a formal peer review process) will have the following publication opportunities:",
    points: [
      "WeSchool's biannual journal — aWEshkar",
      "Book chapter with ISBN",
      "Outstanding papers will be invited to submit to a SCOPUS/ABDC-indexed journal dedicated to this conference. Final publication will be subject to the peer-review outcome.",
    ],
  },
  keyDates: {
    heading: "Key Dates and Deadlines",
    items: [
      { label: "Full paper submission begins", date: "August 3, 2026" },
      { label: "Full paper submission closes", date: "September 30, 2026" },
      { label: "Registration link opens", date: "September 5, 2026" },
      { label: "Registration link closes", date: "October 10, 2026" },
    ],
  },
  contact: {
    heading: "Contact Us",
    email: "conference@welingkar.org",
    org: "S.P. Mandali's",
    address: "Prin. L. N. Welingkar Institute of Management Development & Research (PGDM) Lakhamsi Napoo Road, Opposite Matunga Gymkhana, Matunga Central Railway, Matunga East – 400019.",
  },
  reachOut: {
    heading: "Reach Out",
    phone: "(022) 24198300",
    people: ["Dr. Ragini Jadhav (Extn. 8370)", "Dr. Tasha Javed (Extn. 8369)", "Ms. Shruti Mangaonka r (Extn. 8191)"],
  },
};
