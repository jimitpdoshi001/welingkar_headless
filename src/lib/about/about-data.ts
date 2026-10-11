/**
 * Mock data for the About Us ("Who We Are") page, mirroring the Figma design.
 * Images are self-hosted from the Figma design under /public/about. Swap text
 * for Drupal fields later.
 */

export type AboutPerson = { id: string; name: string; title: string; image?: string };
export type HonourCard = { id: string; image: string; text: string };

export type AboutData = {
  hero: { title: string; subtitle: string; image: string };
  vision: { heading: string; body: string; images: [string, string] };
  mission: { heading: string; paragraphs: string[]; images: [string, string] };
  whoWeAre: { watermark: string; body: string };
  chairman: { heading: string; body: string; name: string; title: string; image: string };
  director: { heading: string; paragraphs: string[]; sign: string; image: string };
  accreditations: { logo: string; title: string; body: string; extra?: { title: string; body: string } }[];
  academicBoard: { heading: string; people: AboutPerson[] };
  industryBoard: { heading: string; people: AboutPerson[] };
  honours: { heading: string; years: string[]; cards: HonourCard[] };
  faculty: { heading: string; body: string; people: AboutPerson[] };
};

const A = (f: string) => `/about/${f}`;

const boardPerson = (i: number): AboutPerson => ({ id: `b${i}`, name: "Shri. Sudhir Shankar Kalkar", title: "Chairman" });

export const ABOUT: AboutData = {
  hero: {
    title: "WeSchool",
    subtitle: "A legacy of learning and leadership",
    image: A("hero-building.png"),
  },
  vision: {
    heading: "Our Vision",
    body: "To nurture thought leaders and practitioners through inventive education",
    images: [A("vision-main.webp"), A("vision-small.webp")],
  },
  mission: {
    heading: "Our Mission",
    paragraphs: [
      "Focus on inventive education by offering practical, innovative and technology driven programmes.",
      "Provide managerial talent with risk managing ability, passion for learning and creative thinking and values in rapidly evolving economic and social environment.",
      "Contribute significantly to the Indian corporate world by preparing management graduates with a global mindset.",
      "Build intellectual capital through faculty development, research, consultancy and publication.",
      "Develop alumni network of mutual benefit and keep alumni update through continuous learning and meeting.",
    ],
    images: [A("mission-main.webp"), A("mission-small.webp")],
  },
  whoWeAre: {
    watermark: "Who We Are",
    body: "Bridging the gap between academia and industry, Prin. L. N. Welingkar Institute of Management Development and Research (WeSchool) has emerged as a torchbearer for progressive higher education. Established in 1977, WeSchool operates under the guidance of the S.P. Mandali Trust, one of the oldest educational trusts in India. With campuses in Mumbai and Bengaluru, WeSchool continues to foster an environment of innovation, industry relevance and experiential learning, preparing students to navigate a rapidly evolving world and create meaningful impact.",
  },
  chairman: {
    heading: "From the Chairman's Desk",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Shri. Sudhir Shankar Kalkar",
    title: "Chairman",
    image: A("chairman.webp"),
  },
  director: {
    heading: "Words From Our Director",
    paragraphs: [
      "\"The illiterate of this century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn.\" – Alvin Toffler",
      "At WeSchool, we are deeply inspired by these words of the great American writer and futurist. Undoubtedly, being convinced of the need for a radical change in management education, we decided to tread the path that leads to corporate revolution. Emerging unarticulated needs and realities need a new approach both in terms of thought as well as action. Cross disciplinary learning, discovering, scrutinizing, prototyping, learning to create and destroy—the mind's eye needs to be nurtured and differently so. WeSchool has chosen the 'design thinking' approach towards management education.",
      "\"We want that education by which character is formed, strength of mind is increased, intellect is expanded and by which one can stand on one's own feet. Education is the manifestation of the perfection already in man.\"",
    ],
    sign: "– Swami Vivekananda.",
    image: A("director-video.png"),
  },
  accreditations: [
    { logo: A("logo-acbsp.png"), title: "ACBSP Accredited:", body: "Accredited for 10 years by the Accreditation Council for Business Schools and Programs (ACBSP), a global business education accrediting body." },
    { logo: A("logo-saqs.png"), title: "SAQS Accredited:", body: "All PGDM programmes at WeSchool's Mumbai and Bengaluru campuses are accredited by the South Asian Quality Assurance System (SAQS)." },
    { logo: A("logo-nba.png"), title: "NBA Accredited & MBA Equivalent:", body: "All full-time PGDM programmes across the Mumbai and Bengaluru campuses are accredited by the National Board of Accreditation (NBA) and have been granted MBA equivalence by the Association of Indian Universities (AIU).", extra: { title: "NBA Accredited – MMS:", body: "The MMS programme at the Mumbai campus is accredited by the National Board of Accreditation (NBA)." } },
    { logo: A("logo-mu.png"), title: "Autonomous Institute:", body: "WeSchool is an autonomous institute affiliated with the University of Mumbai." },
  ],
  academicBoard: { heading: "Academic Advisory Board", people: Array.from({ length: 8 }, (_, i) => boardPerson(i + 1)) },
  industryBoard: { heading: "Industry Advisory Board", people: Array.from({ length: 8 }, (_, i) => boardPerson(i + 9)) },
  honours: {
    heading: "Honours & Achievements",
    years: ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
    cards: [
      { id: "h1", image: A("logo-nirf.png"), text: "National institutional ranking framework (nirf) list of 2025 ranks WeSchool, Mumbai 75th nationally" },
      { id: "h2", image: A("trophy.png"), text: "National institutional ranking framework (nirf) list of 2025 ranks WeSchool, Mumbai 75th nationally" },
      { id: "h3", image: A("trophy.png"), text: "National institutional ranking framework (nirf) list of 2025 ranks WeSchool, Mumbai 75th nationally" },
      { id: "h4", image: A("logo-nirf.png"), text: "National institutional ranking framework (nirf) list of 2025 ranks WeSchool, Mumbai 75th nationally" },
      { id: "h5", image: A("trophy.png"), text: "National institutional ranking framework (nirf) list of 2025 ranks WeSchool, Mumbai 75th nationally" },
    ],
  },
  faculty: {
    heading: "Faculty That Shapes Future Business Leaders",
    body: "We choose to tread the path less travelled. Our aspiration is to cultivate an environment conducive to experiential learning. Our destination is to nurture citizens capable of leading self, organisations and society. Guided by the visionary leadership of our governing trust, and with 'design thinking' at the heart of everything we do, we strive to disseminate knowledge and shape the leaders of tomorrow.",
    // Names and order from Figma (About Us, faculty grid). Photos live at
    // /public/about/faculty/<slug>.webp; replace a file to update its photo.
    people: [
      { id: "sudhir-shankar-kalkar", name: "Shri. Sudhir Shankar Kalkar", title: "Chairman", image: A("faculty/sudhir-shankar-kalkar.webp") },
      { id: "radhesham-bajranglal-agrawal", name: "Shri. Radhesham Bajranglal Agrawal", title: "Vice Chairman", image: A("faculty/radhesham-bajranglal-agrawal.webp") },
      { id: "sunil-madhusudan-joshi", name: "Shri. Sunil Madhusudan Joshi", title: "Member & Chairman, CDC, WeSchool", image: A("faculty/sunil-madhusudan-joshi.webp") },
      { id: "vivek-v-nayak", name: "Shri. Vivek V. Nayak", title: "Member", image: A("faculty/vivek-v-nayak.webp") },
      { id: "navin-naidu-dasari", name: "Shri. Navin Naidu Dasari", title: "Member", image: A("faculty/navin-naidu-dasari.webp") },
      { id: "raghav-pandit-ashtekar", name: "Shri. Raghav Pandit Ashtekar", title: "Member", image: A("faculty/raghav-pandit-ashtekar.webp") },
      { id: "anil-purushottam-barve", name: "Shri. Anil Purushottam Barve", title: "Member", image: A("faculty/anil-purushottam-barve.webp") },
      { id: "manoj-pandurang-bhalerao", name: "Shri. Manoj Pandurang Bhalerao", title: "Member", image: A("faculty/manoj-pandurang-bhalerao.webp") },
      { id: "yashodhan-sunil-bhide", name: "Shri. Yashodhan Sunil Bhide", title: "Member", image: A("faculty/yashodhan-sunil-bhide.webp") },
      { id: "tushar-n-kulkarni", name: "Shri. Tushar N Kulkarni", title: "Member", image: A("faculty/tushar-n-kulkarni.webp") },
      { id: "sureshbabu-padmaraj-mankani", name: "Shri. Sureshbabu Padmaraj Mankani", title: "Member", image: A("faculty/sureshbabu-padmaraj-mankani.webp") },
      { id: "parag-shashikant-thakur", name: "Shri. Parag Shashikant Thakur", title: "Member", image: A("faculty/parag-shashikant-thakur.webp") },
      { id: "pankaj-natu", name: "Dr. Pankaj Natu", title: "Member", image: A("faculty/pankaj-natu.webp") },
      { id: "mahesh-abale", name: "Dr. Mahesh Abale", title: "Member", image: A("faculty/mahesh-abale.webp") },
      { id: "anushree-lokur", name: "Dr. Anushree Lokur", title: "Member", image: A("faculty/anushree-lokur.webp") },
      { id: "avinash-mohril", name: "Dr. Avinash Mohril", title: "Member", image: A("faculty/avinash-mohril.webp") },
      { id: "shruti-bagewadi", name: "Smt. Shruti Bagewadi", title: "Member", image: A("faculty/shruti-bagewadi.webp") },
      { id: "rama-kulkarni", name: "Smt. Rama Kulkarni", title: "Member", image: A("faculty/rama-kulkarni.webp") },
    ],
  },
};
