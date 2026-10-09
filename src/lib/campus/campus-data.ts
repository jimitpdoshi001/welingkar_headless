/**
 * Mock data for the Campus pages (Mumbai / Bengaluru), mirroring the Figma
 * design. Swap for Drupal fields later. Images are placeholders.
 */
import { logoPlaceholder } from "@/util/placeholder";

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
  world: { heading: string; image: string };
  life: { heading: string; body: string; image: string; cta: CampusCta };
  infrastructure: { heading: string; description: string; cards: CampusCard[] };
  accommodation: { heading: string; description: string; cards: CampusCard[] };
  moments: { heading: string; cta: CampusCta; images: { id: string; image: string; video?: boolean }[] };
  news: { heading: string; cta: CampusCta; items: CampusNewsItem[] };
  connect: { heading: string; address: string; phone: string; mapImage: string };
};

const ACCRED = ["ACBSP", "SAQS", "NBA", "AICTE"].map((name) => ({ name, image: logoPlaceholder(name) }));

const CIMG = {
  mumbaiHero: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80",
  blrHero: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1600&auto=format&fit=crop&q=80",
  board: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
  life: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80",
  conf: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1000&auto=format&fit=crop&q=80",
  lab: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80",
  library: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=80",
  p1: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80",
  p2: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=1000&auto=format&fit=crop&q=80",
  p3: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&auto=format&fit=crop&q=80",
  director: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80",
  research: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&auto=format&fit=crop&q=80",
  world: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1600&auto=format&fit=crop&q=80",
  hostel1: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1000&auto=format&fit=crop&q=80",
  hostel2: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1000&auto=format&fit=crop&q=80",
  hostel3: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&auto=format&fit=crop&q=80",
  face1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
  face2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
  face3: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
  face4: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
  face5: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
  face6: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
  moment1: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80",
  moment2: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
  moment3: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80",
  moment4: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80",
  news1: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
  news2: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
  news3: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&auto=format&fit=crop&q=80",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=80",
};

const RECRUITERS = ["Axis Bank", "EY", "ICICI Bank", "Infosys", "Kotak Mahindra Bank", "HDFC Bank"].map((name) => ({
  name,
  image: logoPlaceholder(name),
}));

function makeCampus(campus: "Mumbai" | "Bengaluru"): CampusData {
  const isMumbai = campus === "Mumbai";
  const base = isMumbai ? "/campuses/mumbai" : "/campuses/bengaluru";
  return {
    campus,
    accent: isMumbai ? "orange" : "green",
    bannerTitle: `Prin. L. N. Welingkar Institute of Management Development & Research, ${campus}`,
    hero: {
      title: "A Campus Built for Future Leaders",
      subtitle: "Where industry, innovation and immersive learning come together.",
      cta: { label: "Explore All", href: `${base}/about` },
      image: isMumbai ? CIMG.mumbaiHero : CIMG.blrHero,
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
      image: CIMG.board,
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
      heading: "A Faculty Network Without Borders",
      description: "Our academic strength is enriched by a distinguished network of visiting faculty members from across India and abroad, bringing diverse perspectives, industry insight, and global best practices into the classroom.",
      categories: ["International Faculty", "Visiting Faculty", "Guest Lecturers"],
      image: CIMG.board,
      cta: { label: "Meet Our Faculty", href: "/about-us/faculty" },
    },
    programmes: {
      heading: "Programmes Built for Every Ambition",
      description: "Design thinking sits at the heart of everything we teach. Our wide range of curated programmes are built to challenge, engage, and shape students into the business leaders of tomorrow.",
      cta: { label: "View All", href: "/programmes" },
      cards: [
        { id: "pc-1", image: CIMG.p1, title: "PGDM (Specialisation in Marketing, Finance, HR, & Operations)", meta: "Course intake: 60 students", cta: { label: "Know More", href: "/programmes/pgdm" } },
        { id: "pc-2", image: CIMG.p2, title: "PGDM (E-business)", meta: "Course intake: 60 students", cta: { label: "Know More", href: "/programmes/pgdm-e-business" } },
        { id: "pc-3", image: CIMG.board, title: "PGDM (Business Design & Innovation)", meta: "Course intake: 30 students", cta: { label: "Know More", href: "/programmes/pgdm-business-design" } },
        { id: "pc-4", image: CIMG.p3, title: "PGDM (Research & Business Analytics)", meta: "Course intake: 30 students", cta: { label: "Know More", href: "/programmes/pgdm-research-analytics" } },
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
        { id: "ac-4", image: CIMG.hostel1, title: "Lorem Ipsum is simply dummy text the printing and typesetting industry." },
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
