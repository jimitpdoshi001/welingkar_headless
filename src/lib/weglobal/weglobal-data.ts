/**
 * Mock data for the WeGlobal page, mirroring the Figma design.
 * Swap for Drupal fields later. Images are placeholders.
 */

export type WgContact = { id: string; name: string; contact: string; email: string };
export type WgCard = { id: string; image: string; title: string; text: string };

/** Partner-university map label (Figma 2568:*), coordinates in the map's 1240x667 artboard. */
export type WgPartner = {
  id: string;
  title: string;
  lines: string[];
  box: { x: number; y: number; w: number; h: number };
  /** Connector polyline from the label to the city dot. */
  path: [number, number][];
  dot: [number, number];
};

export type WeGlobalData = {
  hero: { image: string; intro: string };
  alliances: { heading: string; paragraphs: string[]; contacts: WgContact[] };
  partners: { heading: string; map: string; items: WgPartner[] };
  engagements: { heading: string; body: string; items: WgCard[] };
  learning: { heading: string; body: string; items: WgCard[] };
  buddy: { heading: string; body: string };
};

const WGI = {
  hero: "/weglobal/hero.webp",
  e1: "/weglobal/asean-round-table.webp",
  e2: "/weglobal/acbsp-region-10.webp",
  e3: "/weglobal/acbsp-region-10-b.webp",
  l1: "/weglobal/global-learning-ruf.webp",
  l2: "/weglobal/hdm-stuttgart.webp",
  l3: "/weglobal/lse.webp",
  l4: "/weglobal/joondalup.webp",
};

// Figma frame offset of the map artboard (x100, y1522) is subtracted from every coordinate.
const P = (x: number, y: number): [number, number] => [x - 100, y - 1522];
const box = (x: number, y: number, w: number, h: number) => ({ x: x - 100, y: y - 1522, w, h });

const PARTNERS: WgPartner[] = [
  { id: "berlin", title: "Berlin, Germany", lines: ["Steinbeis School of Management", "& Innovation GmbH, IEC & BSCL"], box: box(743.88, 1522, 198.85, 62.37), path: [P(809.86, 1584.37), P(809.86, 1760.62)], dot: P(810.31, 1761.07) },
  { id: "stuttgart", title: "Stuttgart, Germany", lines: ["Stuttgart Media University", "(Hochschule der Medien)"], box: box(999.72, 1540.98, 165.41, 62.37), path: [P(999.72, 1575.33), P(971.7, 1575.33), P(971.7, 1622.33), P(820.66, 1622.33), P(820.66, 1760.62)], dot: P(821.16, 1761.07) },
  { id: "france", title: "France", lines: ["Audencia Nantes"], box: box(645.41, 1616.91, 112.98, 48.81), path: [P(758.34, 1647.64), P(785.46, 1647.64), P(785.46, 1760.62)], dot: P(785.91, 1761.07) },
  { id: "erlangen", title: "Erlangen, Germany", lines: ["Otto Friedrich University"], box: box(1033.11, 1616.91, 156.37, 51.52), path: [P(1033.11, 1647.64), P(836.02, 1647.64), P(836.02, 1760.62)], dot: P(836.52, 1761.07) },
  { id: "lincoln", title: "Lincoln, UK", lines: ["University of Lincoln"], box: box(479.95, 1736.22, 130.16, 48.81), path: [P(610.16, 1760.62), P(761.1, 1760.62)], dot: P(762.41, 1761.07) },
  { id: "mexico", title: "Montai, Mexico", lines: ["Montai, Mattel, Mexico"], box: box(193.37, 1811.24, 141.91, 48.81), path: [P(335.38, 1836.54), P(367.92, 1836.54), P(367.92, 1907.95)], dot: P(367.47, 1908.4) },
  { id: "murcia", title: "Murcia, Spain", lines: ["UCAM Universidad", "Catlike San Antonio", "de Murcia"], box: box(538.65, 1912.47, 126.54, 75.92), path: [P(601.92, 1912.47), P(601.92, 1798.58), P(719.42, 1798.58)], dot: P(719.02, 1799.03) },
  { id: "uniqlo", title: "Uniqlo, India", lines: ["Uniqlo India"], box: box(839.64, 2010.99, 111.18, 48.81), path: [P(878.5, 2010.99), P(878.5, 1927.83), P(907.43, 1927.83)], dot: P(908.78, 1928.29) },
  { id: "sogang", title: "Sogang, South Korea", lines: ["Uniqlo India"], box: box(1144.95, 1818.47, 162.7, 48.81), path: [P(1144.95, 1842.5), P(1124, 1842.5)], dot: P(1123.95, 1843.57) },
  { id: "thammasat", title: "Thammasat, Thailand", lines: ["Thammasat University"], box: box(1115, 1945.5, 180, 48), path: [P(1115.42, 1968.51), P(999.72, 1968.51)], dot: P(995.66, 1968.96) },
];

export const WEGLOBAL: WeGlobalData = {
  hero: {
    image: WGI.hero,
    intro: "We make conscious efforts towards enriching our campus community and try to make an international experience possible for every student-virtually or in person.",
  },
  alliances: {
    heading: "International Alliances at WeSchool",
    paragraphs: [
      "The International Office at our institute spearheads the creation and execution of our global scholastic roadmap. We are committed to providing students with profound exposure to diverse cultural, linguistic, and historical landscapes to shape them into impactful global leaders. Our dedicated team manages the expansion of international exchange frameworks, fosters participation in global networks, and cultivates collaborative ventures with our worldwide academic partners.",
      "Our modern campuses in Mumbai and Bengaluru feature premier infrastructure, with English serving as the primary medium for all academic delivery. We strive to embed internationalization across every dimension of our ecosystem—including curriculum, research initiatives, faculty development, and student engagement. Furthermore, we remain focused on drafting robust exchange protocols and strengthening our presence within prestigious international academic consortiums.",
    ],
    contacts: [
      { id: "wc-1", name: "Shobha Rajkarne", contact: "NA", email: "shobha.rajkarne@welingkar.org" },
      { id: "wc-2", name: "Jesal Thakkar", contact: "+91-222-419-8300", email: "jesal.thakkar@welingkar.org" },
    ],
  },
  partners: {
    heading: "partner universities",
    map: "/weglobal/world-map.svg",
    items: PARTNERS,
  },
  engagements: {
    heading: "International Engagements & Events",
    body: "Besides having international partnerships with universities globally for exchange, joint research, and study tours, WeSchool also collaborates with other universities/ companies for select engagements.",
    items: [
      { id: "en-1", image: WGI.e1, title: "The ASEAN Round Table", text: "Diplomats, thought leaders and academicians explored ASEAN's evolving role in fostering regional peace, prosperity and multilateral cooperation — marking five decades of ASEAN, with particular focus on ASEAN–India collaboration." },
      { id: "en-2", image: WGI.e2, title: "ACBSP Region 10 Annual Conference 2025", text: "Under the leadership of Prof. Dr. Uday Salunkhe, Chair Elect for Region 10, WeSchool hosted educators, business leaders and innovators from across South Asia — a platform for collaborative discussion, and an opportunity to present our academic approach and classroom culture." },
      { id: "en-3", image: WGI.e3, title: "ACBSP Region 10 Annual Conference 2025", text: "Under the leadership of Prof. Dr. Uday Salunkhe, Chair Elect for Region 10, WeSchool hosted educators, business leaders and innovators from across South Asia — a platform for collaborative discussion, and an opportunity to present our academic approach and classroom culture." },
    ],
  },
  learning: {
    heading: "International Learning, Immersion & Exchanges",
    body: "Year-round, our campus welcomes a vibrant community of international students joining us via global partnerships. These strategic exchanges empower scholars to cultivate a deeper perspective through participation in curated coursework. Such immersive engagements typically range from a single academic term to a full calendar year.",
    items: [
      { id: "le-1", image: WGI.l1, title: "Global Learning Program", text: "An academic and cultural immersion across Germany, the Netherlands and Belgium — university visits, industry interactions and cultural exchange." },
      { id: "le-2", image: WGI.l2, title: "HDM, Stuttgart Media University", text: "A semester abroad attending specialised courses, built to broaden academic perspective and prepare students for leadership in an interconnected world." },
      { id: "le-3", image: WGI.l3, title: "London School of Economics", text: "Alongside undergraduates, postgraduates and professionals, students build a grounding in finance and form networks that span the globe." },
      { id: "le-4", image: WGI.l4, title: "Joondalup Innovation Challenge", text: "Mixed, multidisciplinary teams work with Western Australian mentors and incubators on real-world challenges in cybersecurity, digital economy and tourism." },
    ],
  },
  buddy: {
    heading: "Become a Student Buddy",
    body: "Engage in peer-to-peer knowledge sharing and assist international scholars as they navigate academic projects and integrate into our unique socio-cultural fabric by enrolling as a Student Buddy. By submitting this registration, you express your interest in joining the Student Buddy Programme dedicated to supporting our global cohort. Once your application is reviewed, our team will facilitate a connection with a compatible partner, who will reach out to you through electronic mail within the following weeks.",
  },
};
