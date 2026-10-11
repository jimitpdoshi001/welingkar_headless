/**
 * Mock data for the WeGlobal page, mirroring the Figma design.
 * Swap for Drupal fields later. Images are placeholders.
 */

export type WgContact = { id: string; name: string; contact: string; email: string };
export type WgCard = { id: string; image: string; title: string; text: string };

export type WeGlobalData = {
  hero: { image: string; intro: string };
  alliances: { heading: string; paragraphs: string[]; contacts: WgContact[] };
  engagements: { heading: string; body: string; items: WgCard[] };
  learning: { heading: string; body: string; items: WgCard[] };
  buddy: { heading: string; body: string };
};

const WGI = {
  hero: "/weglobal/hero.webp",
  e1: "/weglobal/asean-round-table.webp",
  e2: "/weglobal/acbsp-region-10.webp",
  e3: "/weglobal/acbsp-region-10.webp",
  l1: "/weglobal/global-learning-ruf.webp",
  l2: "/weglobal/hdm-stuttgart.webp",
  l3: "/weglobal/global-learning-ruf.webp",
};

export const WEGLOBAL: WeGlobalData = {
  hero: {
    image: WGI.hero,
    intro: "We make conscious efforts towards enriching our campus community and try to make an international experience possible for every student—virtually or in person.",
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
  engagements: {
    heading: "International Engagements & Events",
    body: "Besides having international partnerships with universities globally for exchange, joint research, and study tours, WeSchool also collaborates with other universities / companies for select engagements.",
    items: [
      { id: "en-1", image: WGI.e1, title: "The ASEAN Round Table", text: "Diplomats, thought leaders and academicians explored ASEAN's evolving role in fostering regional peace, prosperity and multilateral cooperation — marking five decades of ASEAN, with particular focus on ASEAN–India collaboration." },
      { id: "en-2", image: WGI.e2, title: "ACBSP Region 10 Annual Conference 2025", text: "Under the leadership of Prof. Dr. Uday Salunkhe, Chair-Elect for Region 10, WeSchool hosted educators, business leaders and innovators from across South Asia — a platform for collaborative discussion." },
      { id: "en-3", image: WGI.e3, title: "Global Deans' Forum", text: "Deans and directors from partner business schools convened to align on joint programmes, dual-degree pathways and shared research agendas." },
    ],
  },
  learning: {
    heading: "International Learning, Immersion & Exchanges",
    body: "Year-round, our campus welcomes a vibrant community of international students joining us via global partnerships. These strategic exchanges empower scholars to cultivate a deeper perspective through participation in curated coursework. Such immersive engagements typically range from a single academic term to a full calendar year.",
    items: [
      { id: "le-1", image: WGI.l1, title: "Global Learning Program", text: "An academic and cultural immersion across Germany, the Netherlands and Belgium — university visits, industry interactions and cultural exchange." },
      { id: "le-2", image: WGI.l2, title: "HDM, Stuttgart Media University", text: "A semester abroad attending specialised courses, built to broaden academic perspective and prepare students for leadership in an interconnected world." },
      { id: "le-3", image: WGI.l3, title: "London School of Economics", text: "Alongside undergraduate, postgraduate and professional cohorts, students build a grounding in finance and economics for an interconnected world." },
    ],
  },
  buddy: {
    heading: "Become a Student Buddy",
    body: "Engage in peer-to-peer knowledge sharing and assist international scholars as they navigate academic projects and integrate into our unique socio-cultural fabric by enrolling as a Student Buddy. By submitting this registration, you express your interest in joining the Student Buddy Programme dedicated to supporting our global cohort. Once your application is reviewed, our team will facilitate a connection with a compatible partner, who will reach out to you through electronic mail within the following weeks.",
  },
};
