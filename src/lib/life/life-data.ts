/**
 * Mock data for the Life @ WeSchool page, mirroring the Figma design.
 * Swap for Drupal fields later. Images are placeholders.
 */

export type LifeCard = { id: string; image: string; title: string; body: string };
export type LifeCell = { title: string; text: string };
export type LifeEvent = { id: string; title: string; when: string; host: string; desc: string; href: string };
export type LifeStory = { id: string; image: string; tag: string; title: string; meta: string };

export type LifeData = {
  hero: { title: string; subtitle: string; image: string };
  intro: { paragraphs: string[]; highlight: string; images: string[] };
  /** Campus tabs link to each campus page; activeTab marks the current one. */
  tabs: { label: string; href: string }[];
  activeTab: number;
  campus: { heading: string; subtitle: string; cards: LifeCard[] };
  facilities: { heading: string; text: string };
  /** Lines render on separate rows. */
  hostel: { heading: string; lines: string[] };
  /** `mapQuery` opens Google Maps; `tel` shows as "TEL : …". */
  address: { heading: string; text: string; tel: string; mapQuery: string };
  cells: { heading: string; body: string; image: string; items: LifeCell[] };
  gallery: { heading: string; subtitle: [string, string]; filters: string[]; cta: { label: string; href: string }; images: string[] };
  happening: { heading: string; subtitle: string; events: LifeEvent[]; cta: { label: string; href: string } };
  ideas: { heading: string; subtitle: string; note: string; stories: LifeStory[] };
  students: { heading: string; items: LifeCell[] };
  visit: { heading: string; subtitle: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
};

const LIMG = {
  hero: "/life/mumbai/hero.webp",
  collage1: "/life/mumbai/collage1.webp",
  collage2: "/life/mumbai/collage2.webp",
  collage3: "/life/mumbai/collage3.webp",
  c1: "/life/mumbai/c1.webp",
  c2: "/life/mumbai/c2.webp",
  c3: "/life/mumbai/c3.webp",
  c4: "/life/mumbai/c4.webp",
  c5: "/life/mumbai/c5.webp",
  c6: "/life/mumbai/c6.webp",
  cells: "/life/mumbai/cells.webp",
  story1: "/life/mumbai/story1.webp",
  story2: "/life/mumbai/story2.webp",
  story3: "/life/mumbai/story3.webp",
};

const g = (n: number) => `/life/mumbai/gallery-${n + 1}.webp`;

export const LIFE: LifeData = {
  hero: {
    title: "Life @ WeSchool",
    subtitle: "The lessons that stay with you are rarely the ones on the syllabus.",
    image: LIMG.hero,
  },
  intro: {
    paragraphs: [
      "Some of the best management lessons are acquired on-field, not in a lecture hall.",
      "Our campuses run on a calendar of their own. Cultural nights, sports tournaments, case competitions, guest sessions, village immersions. Students plan it. Students fund it. Students answer for it.",
      "Along the way they meet people from across corporate India, academia, the alumni network as well as the start-up world. Two years later, that network is the thing they talk about most.",
    ],
    highlight: "Three campuses. One idea of what a business school should feel like.",
    images: [LIMG.collage1, LIMG.collage2, LIMG.collage3],
  },
  tabs: [
    { label: "Mumbai", href: "/life-at-weschool" },
    { label: "Bengaluru", href: "/life-at-weschool/bengaluru" },
  ],
  activeTab: 0,
  campus: {
    heading: "Mumbai Campus",
    subtitle: "Our founding campus, in the middle of a city that never stops negotiating.",
    cards: [
      { id: "cc-1", image: LIMG.c1, title: "The future is in good hands", body: "Industry stalwarts sit alongside our faculty to push every student one step further. Our faculty work as mentors first. They coach, they challenge, they help students find the career path that actually fits." },
      { id: "cc-2", image: LIMG.c2, title: "One with knowledge and nature", body: "Sustainability is a habit here, not a module. Grassroot programs take students into the hinterlands. Our Agri Lab brings that thinking back to campus, from seed treatment to harvest." },
      { id: "cc-3", image: LIMG.c3, title: "Great ideas, right this way", body: "Someone is always arguing about something on this campus. That is by design. Ideas get torn apart, rebuilt, then taken to inter B-School competitions across the country." },
      { id: "cc-4", image: LIMG.c4, title: "No need to look far for peace", body: "Two demanding years. Nirvana Hall hosts regular yoga sessions, and the quiet corners of campus stay quiet." },
      { id: "cc-5", image: LIMG.c5, title: "Knowledge, and everything beyond it", body: "WeLearn Library holds over 40,000 management books plus a multimedia archive. innoWE runs as Mumbai's first innovation lab. Maker's Lab works as a co-innovation platform." },
      { id: "cc-6", image: LIMG.c6, title: "The future is in good hands", body: "Industry stalwarts sit alongside our faculty to push every student one step further. Our faculty work as mentors first. They coach, they challenge, they help students." },
    ],
  },
  facilities: {
    heading: "Campus Facilities",
    text: "Air-conditioned classrooms with LCD, OHP and video conferencing · innoWE · Maker's Lab · Agri Lab · Brainstorm Room · WeLearn + Corporate Library · Auditorium · Conference Room · Nirvana Hall · Campus-wide Wi-Fi",
  },
  hostel: { heading: "Hostel", lines: ["Separate hostels for boys and girls, within 2 km of campus. 24×7 internet.", "First preference to non-local students"] },
  address: {
    heading: "Address",
    text: "Lakhamsi Napoo Road, Near Matunga (Central Rly.), Mumbai 400 019",
    tel: "022-24198300",
    mapQuery: "Prin. L. N. Welingkar Institute of Management, Lakhamsi Napoo Road, Matunga, Mumbai 400019",
  },
  cells: {
    heading: "Run by students. Genuinely.",
    // Figma 1406:1365: two paragraphs.
    body: "Every cell on our campuses is student-led and faculty-mentored. That means real budgets, real sponsors, real deadlines and real consequences when something slips.\nA cell head negotiating a sponsorship at nine in the evening is not doing an extracurricular. They are doing the job. By the time our students sit in a placement interview, most have already led a team, missed a target, fixed it and delivered.",
    image: LIMG.cells,
    items: [
      { title: "Placement Committee", text: "The bridge between campus and corporate India." },
      { title: "Student Council", text: "The elected voice of the batch." },
      { title: "Corporate Relations", text: "Guest lectures, industry visits, live projects." },
      { title: "Entrepreneurship Cell", text: "For the students who would rather build than join." },
      { title: "Innovation and Design", text: "Design thinking, turned into workshops and sprints." },
      { title: "Cultural Cell", text: "The reason campus sounds the way it does." },
      { title: "Sports Cell", text: "Tournaments through the year, plus inter B-School fixtures." },
      { title: "Social Responsibility", text: "Keeps a network four decades deep in the conversation." },
      { title: "Media and Communications", text: "Everything the outside world sees." },
      { title: "Industry Cell", text: "Guest lectures, industry visits, live projects." },
    ],
  },
  gallery: {
    heading: "Two years, in pictures",
    subtitle: ["Convocation gowns and cricket whites. Late-night rehearsals and early-morning village visits.", "This is what the brochure cannot tell you."],
    filters: ["All", "Campus", "Festivals", "Sports", "Cultural", "Industry Visits", "Convocation"],
    cta: { label: "View all photos", href: "/media" },
    images: Array.from({ length: 10 }, (_, i) => g(i)),
  },
  happening: {
    heading: "Happening now",
    subtitle: "Guest sessions, competitions, workshops, festivals.",
    cta: { label: "See all events", href: "/events" },
    events: [
      { id: "ev-1", title: "Leadership Conclave 2026", when: "Oct 4, 2026 · 10:00 AM · Auditorium, Mumbai", host: "Hosted by Corporate Relations Cell", desc: "CEOs and founders in conversation with students. Open to all batches.", href: "/events" },
      { id: "ev-2", title: "Hack the Case", when: "Oct 12–13, 2026 · Discovery Rooms, Bengaluru", host: "Hosted by Entrepreneurship Cell", desc: "A 24-hour live case competition. Register as a team of three.", href: "/events" },
      { id: "ev-3", title: "Rhythm & Roots — Cultural Fest", when: "Oct 18, 2026 · 6:30 PM · Amphitheatre", host: "Hosted by Cultural Cell", desc: "The annual inter-campus cultural festival. Performances across three stages.", href: "/events" },
    ],
  },
  ideas: {
    heading: "Ideas from the people living them",
    subtitle: "Our students, faculty and alumni write here. No press releases. Just what people actually think.",
    note: "Want to write for us? Send a two-line pitch to content@welingkar.org",
    stories: [
      { id: "st-1", image: LIMG.story1, tag: "Career", title: "What the placement season actually teaches you", meta: "Priya Mehta, MBA 2025 · Sep 2026 · 5 min read" },
      { id: "st-2", image: LIMG.story2, tag: "Design Thinking", title: "What the placement season actually teaches you", meta: "Priya Mehta, MBA 2025 · Sep 2026 · 5 min read" },
      { id: "st-3", image: LIMG.story3, tag: "Life on Campus", title: "The committee meeting that changed how I think about deadlines", meta: "Simran Kaur, MBA 2026 · Sep 2026 · 3 min read" },
    ],
  },
  students: {
    heading: "For current students",
    items: [
      { title: "Student ERP", text: "Attendance, timetable, fees and academic records" },
      { title: "Learning Portal", text: "Course material and assignment submissions" },
      { title: "Library", text: "Catalogue, reservations, e-journals" },
      { title: "Examination", text: "Calendar, hall tickets, results and re-evaluation" },
      { title: "Placements", text: "Company listings and application tracking" },
      { title: "Student Email", text: "Mailbox, calendar and campus services" },
    ],
  },
  visit: {
    heading: "Come see it for yourself",
    subtitle: "A campus is hard to judge from a website. Visit one.",
    primary: { label: "Plan a campus visit", href: "/contact-us" },
    secondary: { label: "Talk to admissions", href: "/admissions" },
  },
};

// Figma 1445:129: same page, Bengaluru campus section and active tab.
const BIMG = (n: number) => `/life/bengaluru/c${n}.webp`;

export const LIFE_BENGALURU: LifeData = {
  ...LIFE,
  activeTab: 1,
  campus: {
    heading: "Electronic City, Bengaluru",
    subtitle: "Electronic City is not a neutral address. It is where India builds things.",
    cards: [
      { id: "bc-1", image: BIMG(1), title: "Learning the ropes", body: "A future-ready manager is one who can take a sustainable decision under real constraints. That starts in our Prototype Lab, where an idea stops being a slide and becomes an object you can hold, break and rebuild." },
      { id: "bc-2", image: BIMG(2), title: "Forward-thinking is our motto", body: "Building for a better tomorrow sounds like a poster until you are the one doing it. Here, new ideas are led uninhibited. Students are not asked to wait their turn." },
      { id: "bc-3", image: BIMG(3), title: "Self-discovery at the heart of it", body: "Two years is long enough to change your mind about who you are. A lot of that happens quietly in the library. Fresh perspectives on self, on society and on how organisations really work." },
      { id: "bc-4", image: BIMG(4), title: "Hungry to know more", body: "The campus Athenaeum backs research and project work. Journals, case archives, references and the space to use them properly." },
      LIFE.campus.cards[4],
      LIFE.campus.cards[5],
    ],
  },
  facilities: {
    heading: "Campus Facilities",
    text: "Discovery Rooms built for interactive learning · Proto Lab · IT Lab · Design Room with LCD and OHP · Audio Visual Room · Boardroom · Library · MDP Classroom · Canteen",
  },
  hostel: { heading: "Hostel", lines: ["Separate hostels for boys and girls, within 2 km of campus. 24×7 internet.", "A home away from home."] },
  address: {
    heading: "Address",
    text: "102/103, Electronic City Phase 1, Next to Telephone Exchange, Hosur Road, Bengaluru 560100",
    tel: "080-42678300",
    mapQuery: "Welingkar Institute of Management, Electronic City Phase 1, Hosur Road, Bengaluru 560100",
  },
};
