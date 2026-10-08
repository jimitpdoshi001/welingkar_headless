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

export type CampusData = {
  campus: "Mumbai" | "Bengaluru";
  accent: "orange" | "green";
  bannerTitle: string;
  hero: { title: string; subtitle: string; cta: CampusCta; image: string };
  nav: { label: string; href: string }[];
  about: { heading: string; paragraphs: string[]; image: string; stats: { value: string; label: string }[] };
  faculty: { heading: string; description: string; categories: string[]; image: string; cta: CampusCta };
  programmes: { heading: string; description: string; cards: CampusCard[]; cta: CampusCta };
  recruiters: { heading: string; description: string; logos: { name: string; image: string }[]; cta: CampusCta };
  life: { heading: string; body: string; image: string; cta: CampusCta };
  infrastructure: { heading: string; description: string; cards: CampusCard[] };
};

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
};

const RECRUITERS = ["Axis Bank", "EY", "ICICI Bank", "Infosys", "Kotak Mahindra Bank", "HDFC Bank"].map((name) => ({
  name,
  image: `https://dummyimage.com/200x60/ffffff/333333&text=${encodeURIComponent(name)}`,
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
  };
}

export const CAMPUS_MUMBAI: CampusData = makeCampus("Mumbai");
export const CAMPUS_BENGALURU: CampusData = makeCampus("Bengaluru");
