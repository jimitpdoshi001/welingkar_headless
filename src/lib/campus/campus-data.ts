/**
 * Mock data for the Campus pages (Mumbai / Bengaluru), mirroring the Figma
 * design. Swap for Drupal fields later. Images are placeholders.
 */

export type CampusCta = { label: string; href: string };

export type CampusCard = {
  id: string;
  image: string;
  title: string;
  meta?: string;
  cta?: CampusCta;
};

export type CampusPerson = { id: string; name: string; title: string; image: string };
export type CampusNewsItem = { id: string; title: string; date: string; image: string; href: string };

export type CampusData = {
  campus: "Mumbai" | "Bengaluru";
  accent: "orange" | "green";
  bannerTitle: string;
  hero: { title: string; subtitle: string; cta: CampusCta; image: string };
  nav: { label: string; href: string }[];
  about: { heading: string; paragraphs: string[]; image: string; stats: { value: string; label: string }[] };
  accreditations: { heading: string; logos: { name: string; image: string }[]; points: string[] };
  director: { heading: string; name: string; title: string; body: string; image: string; cta: CampusCta };
  mentors: { heading: string; tabs: string[]; people: CampusPerson[]; cta: CampusCta };
  faculty: { heading: string; description: string; categories: string[]; image: string; cta: CampusCta };
  programmes: { heading: string; description: string; cards: CampusCard[]; cta: CampusCta };
  recruiters: { heading: string; description: string; logos: { name: string; image: string }[]; cta: CampusCta };
  weresearch: { heading: string; description: string; image: string; cta: CampusCta };
  world: { heading: string; image: string; caption: string };
  life: { heading: string; body: string; image: string; cta: CampusCta };
  infrastructure: { heading: string; description: string; cards: CampusCard[] };
  accommodation: { heading: string; description: string; cards: CampusCard[] };
  moments: { heading: string; cta: CampusCta; images: { id: string; image: string; video?: boolean }[] };
  news: { heading: string; cta: CampusCta; items: CampusNewsItem[] };
  connect: { heading: string; address: string; phone: string; mapImage: string };
};

// Shared with the About page; AICTE is a placeholder until the logo is uploaded.
const ACCRED = [
  { name: "ACBSP", image: "/about/logo-acbsp.png" },
  { name: "SAQS", image: "/about/logo-saqs.png" },
  { name: "NBA", image: "/about/logo-nba.png" },
  { name: "AICTE", image: "/campus/logo-aicte.webp" },
];

// Local images per campus: /public/campus/<mumbai|bengaluru>/<name>.webp.
// Each slot ships with a labelled placeholder; upload a photo with the same
// name to replace it (no code change needed).
const campusImages = (slug: "mumbai" | "bengaluru") => {
  const img = (name: string) => `/campus/${slug}/${name}.webp`;
  return {
    hero: img("hero"),
    about: img("about"),
    director: img("director"),
    facultyNetwork: img("faculty-network"),
    p1: img("programme-1"),
    p2: img("programme-2"),
    p3: img("programme-3"),
    p4: img("programme-4"),
    research: img("weresearch"),
    world: img("world-of-weschool"),
    life: img("life-at-weschool"),
    conf: img("infra-conference-room"),
    lab: img("infra-innowe"),
    library: img("infra-library"),
    hostel1: img("hostel-1"),
    hostel2: img("hostel-2"),
    hostel3: img("hostel-3"),
    hostel4: img("hostel-4"),
    face1: img("mentor-1"),
    face2: img("mentor-2"),
    face3: img("mentor-3"),
    face4: img("mentor-4"),
    face5: img("mentor-5"),
    face6: img("mentor-6"),
    moment1: img("moment-1"),
    moment2: img("moment-2"),
    moment3: img("moment-3"),
    moment4: img("moment-4"),
    moment5: img("moment-5"),
    moment6: img("moment-6"),
    news1: img("news-1"),
    news2: img("news-2"),
    news3: img("news-3"),
    map: img("map"),
  };
};

// Recruiter logos: /public/campus/recruiters/<name-slug>.webp (placeholders until uploaded).
const RECRUITERS = ["Axis Bank", "EY", "ICICI Bank", "Infosys", "Kotak Mahindra Bank", "HDFC Bank"].map((name) => ({
  name,
  image: `/campus/recruiters/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.webp`,
}));

function makeCampus(campus: "Mumbai" | "Bengaluru"): CampusData {
  const isMumbai = campus === "Mumbai";
  const CIMG = campusImages(isMumbai ? "mumbai" : "bengaluru");
  const base = isMumbai ? "/campuses/mumbai" : "/campuses/bengaluru";
  return {
    campus,
    accent: isMumbai ? "orange" : "green",
    bannerTitle: `Prin. L. N. Welingkar Institute of Management Development & Research, ${campus}`,
    hero: {
      title: "A Campus Built for Future Leaders",
      subtitle: "Where industry, innovation and immersive learning come together.",
      cta: { label: "Explore All", href: `${base}/about` },
      image: CIMG.hero,
    },
    nav: [
      { label: "About Campus", href: "#about" },
      { label: "Programmes", href: "#programmes" },
      { label: "Faculty", href: "/about-us/faculty" },
      { label: "Corporate Interface", href: "/corporate-interface" },
      { label: "We Research", href: "/weresearch" },
      { label: "We Excel", href: "#infrastructure" },
      { label: "Life @ WeSchool", href: "#life" },
    ],
    about: {
      heading: `About the ${campus} Campus`,
      paragraphs: [
        `The ${campus} campus brings together a vibrant community of learners, mentors and industry partners in an environment designed for hands-on, future-ready management education.`,
        "Rooted in design thinking and experiential learning, the campus nurtures leaders who are ready to create meaningful impact from day one.",
      ],
      image: CIMG.about,
      stats: [
        { value: "15+", label: "years of legacy" },
        { value: "3000", label: "students in campus" },
        { value: "50+", label: "faculty members" },
      ],
    },
    accreditations: {
      heading: "Accreditations We've Earned Along the Way",
      logos: ACCRED,
      points: [
        `All PGDM programs at WeSchool ${campus} are accredited by SAQS (South Asian Quality Assurance System).`,
        "All full time PGDM programs are accredited by the National Board of Accreditation (NBA) and have been granted MBA equivalence from AIU.",
        `Approved by the All India Council for Technical Education (AICTE), Ministry of HRD, Govt. of India for — All Full-time PGDM Courses at WeSchool, ${campus}.`,
      ],
    },
    director: {
      heading: "Words from the Director's Desk",
      name: "Prof. Dr. Kaustubh Dhargalkar",
      title: "In-Charge Director",
      body: "At WeSchool, we are deeply inspired by these words of the great American writer and futurist. Undoubtedly, being convinced of the need for a radical change in management education, we decided to tread the path that leads to corporate revolution. Emerging unarticulated needs and realities need a new approach both in terms of thought as well as action.",
      image: CIMG.director,
      cta: { label: "Read More", href: "/about-us/directors-message" },
    },
    mentors: {
      heading: "Mentors that Are Shaping the Leaders of Tomorrow",
      tabs: ["Deans", "Associate deans & heads", "Faculty", "Specialization"],
      cta: { label: "View All", href: "/about-us/faculty" },
      people: [
        { id: "m1", name: "Prof Jai Raj Nair", title: "Professor- Information Technology", image: CIMG.face1 },
        { id: "m2", name: "Dr. Kiran G", title: "Associate Professor – Marketing", image: CIMG.face2 },
        { id: "m3", name: "Radhika Uttam", title: "Assistant Professor – Finance", image: CIMG.face3 },
        { id: "m4", name: "Prof. Sonia Mehrotra", title: "Professor – Centre of Excellence", image: CIMG.face4 },
        { id: "m5", name: "Prof. Mudumita", title: "Professor – Centre of Excellence", image: CIMG.face5 },
        { id: "m6", name: "Prof. Anand Kumar", title: "Professor – Case Development & Case Studies", image: CIMG.face6 },
      ],
    },
    faculty: {
      heading: "Our Extended Faculty Network",
      description: "Our academic strength is enriched by a distinguished network of visiting faculty members from across India and abroad, bringing diverse perspectives, industry insight, and global best practices into the classroom.",
      categories: ["International Faculty", "Visiting Faculty", "Guest Lecturers"],
      image: CIMG.facultyNetwork,
      cta: { label: "Meet Our Faculty", href: "/about-us/faculty" },
    },
    programmes: {
      heading: "Programmes Built for Every Ambition",
      description: "Design thinking sits at the heart of everything we teach. Our wide range of curated programmes are built to challenge, engage, and shape students into the business leaders of tomorrow.",
      cta: { label: "View All", href: "/programmes" },
      cards: [
        { id: "pc-1", image: CIMG.p1, title: "PGDM (Specialisation in Marketing, Finance, HR, & Operations)", meta: "Course intake: 60 students", cta: { label: "Know More", href: "/programmes/pgdm" } },
        { id: "pc-2", image: CIMG.p2, title: "PGDM (E-business)", meta: "Course intake: 60 students", cta: { label: "Know More", href: "/programmes/pgdm-e-business" } },
        { id: "pc-3", image: CIMG.p3, title: "PGDM (Business Design & Innovation)", meta: "Course intake: 30 students", cta: { label: "Know More", href: "/programmes/pgdm-business-design" } },
        { id: "pc-4", image: CIMG.p4, title: "PGDM (Research & Business Analytics)", meta: "Course intake: 30 students", cta: { label: "Know More", href: "/programmes/pgdm-research-analytics" } },
      ],
    },
    recruiters: {
      heading: "Our Recruiters From Every Sector",
      description: `WeSchool ${campus}'s placement ecosystem is built to bridge the gap between classroom learning and industry expectations. Through structured corporate interactions, live projects, internships, and dedicated placement drives, students are given multiple touchpoints with recruiters across sectors.`,
      logos: RECRUITERS,
      cta: { label: "View All", href: "/corporate-interface/top-recruiters" },
    },
    weresearch: {
      heading: "WeResearch: Our Commitment to Discovery",
      description: "The WeSchool Center for Research reinforces our research commitment to corporate, society, faculty, and our student community. Its mission is to create and disseminate knowledge of management, social sciences, and technology.",
      image: CIMG.research,
      cta: { label: "Know More", href: "/weresearch" },
    },
    world: {
      heading: `The World of WeSchool, ${campus}`,
      image: CIMG.world,
      caption: `Welingkar ${campus} Campus Tour | A Quick Look at a PGDM College in India`,
    },
    life: {
      heading: "Life @ WeSchool",
      body: "Bridging the gap between academia and industry, Prin. L. N. Welingkar Institute of Management Development and Research (WeSchool) has emerged as a torchbearer for progressive higher education. Established in 1977, WeSchool operates under the guidance of the S.P. Mandali Trust, one of the oldest educational trusts in India. With campuses in Mumbai and Bengaluru, WeSchool continues to foster an environment of innovation, industry relevance and experiential learning.",
      image: CIMG.life,
      cta: { label: "Know More", href: "#life" },
    },
    infrastructure: {
      heading: "State-of-the-Art Infrastructure Designed With Purpose",
      description: `The ${campus} campus is designed to create an ideal environment for learning and growth. From interactive discovery rooms and a well-equipped IT lab to a dedicated design studio and boardroom for real-world simulations, every space on campus is built to support hands-on, immersive learning.`,
      cards: [
        { id: "if-1", image: CIMG.conf, title: "Conference room", meta: "A venue to convene meetings and roundtable discussions." },
        { id: "if-2", image: CIMG.lab, title: "Innowe", meta: "Mumbai's first innovation lab and centre for Memetics is a hub of business ideas for the future." },
        { id: "if-3", image: CIMG.library, title: "Library", meta: "It boasts of over 40,000 books on various aspects of management and an array of multimedia content." },
      ],
    },
    accommodation: {
      heading: "We Make Sure You Feel at Home",
      description: "WeSchool offers separate hostels for boys and girls, located within 2 km of the campus, complete with round-the-clock internet connectivity. Admissions are on a first-come, first-served basis, with priority given to outstation students.",
      cards: [
        { id: "ac-1", image: CIMG.hostel1, title: "Lorem Ipsum is simply dummy text the printing and typesetting industry." },
        { id: "ac-2", image: CIMG.hostel2, title: "Lorem Ipsum is simply dummy text the printing and typesetting industry." },
        { id: "ac-3", image: CIMG.hostel3, title: "Lorem Ipsum is simply dummy text the printing and typesetting industry." },
        { id: "ac-4", image: CIMG.hostel4, title: "Lorem Ipsum is simply dummy text the printing and typesetting industry." },
      ],
    },
    moments: {
      heading: "Check Our Candid Campus Moments",
      cta: { label: "View More", href: "/media" },
      images: [
        { id: "mo-1", image: CIMG.moment1, video: true },
        { id: "mo-2", image: CIMG.moment2 },
        { id: "mo-3", image: CIMG.moment3 },
        { id: "mo-4", image: CIMG.moment4, video: true },
        { id: "mo-5", image: CIMG.moment5 },
        { id: "mo-6", image: CIMG.moment6 },
      ],
    },
    news: {
      heading: "What's New at WeSchool",
      cta: { label: "View All", href: "/media" },
      items: [
        { id: "n-1", title: "Development Program for faculty and staff", date: "31 July 2026", image: CIMG.news1, href: "/media" },
        { id: "n-2", title: "30th AIMS Annual Management Education Convention, 2018 focuses on the theme 'Management Education: Connecting the Dots'", date: "29 July 2026", image: CIMG.news2, href: "/media" },
        { id: "n-3", title: "6th AIM – AMA Sheth Foundation Doctoral Consortium and International Research Conference", date: "25 July 2026", image: CIMG.news3, href: "/media" },
      ],
    },
    connect: {
      heading: "Connect With Us",
      address: isMumbai
        ? "L. N. Road, Matunga (Central Railway), Mumbai-400019"
        : "102/103, Electronic City Phase 1, Next to Telephone Exchange, Hosur Road, Bengaluru-560100",
      phone: isMumbai ? "022-24178300" : "080-42678300",
      mapImage: CIMG.map,
    },
  };
}

export const CAMPUS_MUMBAI: CampusData = makeCampus("Mumbai");
export const CAMPUS_BENGALURU: CampusData = makeCampus("Bengaluru");
