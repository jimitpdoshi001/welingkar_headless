// Static content for /alumni (Figma 2962:1945). Placeholder for a future Drupal source.

export type AlumniProgram = { id: string; icon: string; title: string; text: string };

export type AlumniData = {
  breadcrumb: string;
  hero: { image: string; heading: string; body: string };
  intro: { headingLines: string[]; paragraphs: string[] };
  experience: { heading: string; body: string; image: string };
  programs: { heading: string; body: string; items: AlumniProgram[] };
  quote: { text: string; caption: string };
  reconnect: {
    headingLines: string[];
    body: string;
    image: string;
    cta: { label: string; href: string };
  };
};

export const ALUMNI: AlumniData = {
  breadcrumb: "Alumni - Mumbai",
  hero: {
    image: "/alumni/hero.webp",
    heading: "Connected by purpose. Growing together.",
    body: "A global community of leaders, innovators and changemakers whose WeSchool journey continues far beyond the classroom.",
  },
  intro: {
    headingLines: ["A lifelong connection,", "not just a qualification."],
    paragraphs: [
      "The WeSchool Alumni Network is a thriving and diverse community of accomplished professionals making a mark across industries, geographies and professional domains.",
      "We believe education extends beyond the classroom and continues throughout one's professional journey. Our alumni enrich the student experience by sharing insights, mentoring aspiring professionals and nurturing entrepreneurial talent.",
    ],
  },
  experience: {
    heading: "Experience that shapes what comes next.",
    body: "Alumni bring the world into the learning environment—building meaningful industry connections and preparing students for the opportunities and challenges of an evolving global business landscape.",
    image: "/alumni/experience.webp",
  },
  programs: {
    heading: "Learning from those who have led the way.",
    body: "Through signature programs, alumni share knowledge, open doors and help ambitious ideas take shape.",
    items: [
      { id: "insights", icon: "/alumni/icon-insights.svg", title: "Alumni Insights", text: "Real-world perspectives from experienced leaders, helping students understand the ideas shaping business today." },
      { id: "wenture", icon: "/alumni/icon-wenture.svg", title: "Wenture.inv", text: "A platform where alumni nurture entrepreneurial talent, back bold ideas and strengthen our innovation ecosystem." },
      { id: "global", icon: "/alumni/icon-global.svg", title: "Global Innovation", text: "Cross-border programs that connect curious minds and prepare the next generation for a changing world." },
    ],
  },
  quote: {
    text: "“Our alumni carry the WeSchool spirit of design thinking and excellence with purpose into every challenge they take on.”",
    caption: "Ambassadors of innovation, leadership and positive impact",
  },
  reconnect: {
    headingLines: ["Once a part of WeSchool,", "always part of the story."],
    body: "Reconnect with peers, discover new opportunities and stay close to the community that helped shape your journey.",
    image: "/alumni/reconnect.webp",
    cta: { label: "Join the alumni network", href: "/contact-us" },
  },
};

// ---- Figma 3461:440 (Alumni - Mumbai - Revised): sections added in the revision.
// No Drupal fields exist for these yet, so the content is static.

const V2 = (name: string) => `/alumni/v2/${name}.webp`;

export type AlumniCampus = { title: string; image: string; href: string };
/** profileHref: their faculty profile page (resolved from the Faculty API at request time). */
export type AlumniDirector = { image: string; paragraphs: string[]; name: string; role: string; org?: string; profileHref?: string };
export type AlumniNews = { title: string; text?: string; date: string; image?: string; href: string };

export const ALUMNI_CAMPUSES: AlumniCampus[] = [
  { title: "Mumbai Campus", image: V2("campus-mumbai"), href: "/campus-mumbai" },
  { title: "Bengaluru Campus", image: V2("campus-bengaluru"), href: "/campus-bengaluru" },
  { title: "MMS", image: V2("campus-mms"), href: "/programmes/full-time-programme-in-mumbai/masters-in-management-studies" },
];

export const ALUMNI_DIRECTORS: AlumniDirector[] = [
  {
    image: V2("director-mumbai"),
    paragraphs: [
      "Dear Alumni,\nWelcome to the WeSchool Alumni Portal — a space that celebrates the enduring bond between WeSchool and its vibrant community of achievers across the globe.",
      "At S. P. Mandali’s Prin. L. N. Welingkar Institute of Management Development and Research (WeSchool), we have always believed that education extends far beyond classrooms. It’s about nurturing innovators, leaders, and change-makers who create meaningful impact in business and society.",
      "Over the years, WeSchool alumni have made us proud by excelling across industries, launching startups, leading organizations, and driving purpose-led change. This platform is designed to bring you all together — to connect, collaborate, and contribute — as we continue to shape the future of management and innovation.",
      "We invite you to stay engaged, share your journey, mentor young minds, and be an integral part of the growing WeSchool legacy. Together, let’s continue to reimagine, redefine, and reinvent the way the world learns and leads.",
      "\"The illiterate of this century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn.\"\n- Alvin Toffler",
    ],
    name: "Prof. Dr. Kaustubh Dhargalkar",
    role: "In-Charge Director",
  },
  {
    image: V2("director-bengaluru"),
    paragraphs: [
      "Dear Alumni,\nIt gives me immense pleasure to welcome you to the WeSchool Alumni Portal, a platform designed to strengthen the lifelong bond we share. We take great pride in your achievements, as you continue to make meaningful contributions across industries, organizations, and communities worldwide. Your professional accomplishments and leadership spirit reflect the values and ethos nurtured during your time at WeSchool.\nThis portal is more than a networking space —it is a vibrant ecosystem that enables you to reconnect with fellow graduates, engage with current students, participate in institutional initiatives, share your expertise, and contribute to the continued growth of our WeSchool family. Your experiences and insights will serve as valuable inspiration for future leaders.\nAs we navigate an increasingly dynamic and interconnected world, the strength of our alumni network becomes even more significant.\nI encourage you to actively participate, stay connected, and continue to be ambassadors of WeSchool's values and vision.\nThank you for being an integral part of our journey. We look forward to celebrating your successes and strengthening our association for years to come.\nWarm regards,",
    ],
    name: "Prof. Dr. Madhavi Lokhande",
    role: "Director",
    org: "S. P. Mandali's Prin. L. N. Welingkar Institute of Management Development and Research, WeSchool, Bengaluru",
  },
];

/** Bento order: tall left, wide top, two small middle, tall right. */
export const ALUMNI_GALLERY = {
  heading: "Gallery",
  viewAll: "/life-at-weschool",
  images: [V2("gallery-1"), V2("gallery-2"), V2("gallery-3"), V2("gallery-4"), V2("gallery-5"), V2("gallery-6")],
};

export const ALUMNI_NEWS = {
  heading: "News & Events",
  body: "There’s a future we believe in, fostered by strong souls and inventive minds. We believe, the way",
  viewAll: "/media",
  featured: {
    title: "Industrial Class @ Chandigarh University",
    text: "5 days Industrial Program on Digital Payments & Innovations in association with NAL Academy (formerly known as NSE Academy)",
    date: "31 July 2026",
    image: V2("news-1"),
    href: "/media",
  } as AlumniNews,
  photos: [V2("news-2"), V2("news-3")],
  items: [
    { title: "Institutional News: S.P. Mandali Donates to CM's Relief Fund", date: "29 July 2026", href: "/media" },
    { title: "Campus Leadership: Dr. Salunkhe Moderates Indo-Italian Chamber Panel", date: "25 July 2026", href: "/media" },
  ] as AlumniNews[],
};

export const ALUMNI_APP = {
  // Figma repeats the News & Events heading/text above the app band.
  heading: "News & Events",
  body: "There’s a future we believe in, fostered by strong souls and inventive minds. We believe, the way",
  logo: V2("weunion"),
  paragraphs: [
    "WeAlumni is the alumni app for the students of S. P. Mandali's Prin. L. N. Welingkar Institute of Management Development and Research (WeSchool).",
    "The app helps WeSchool alumni reconnect with their alma mater and with each other. You can find fellow alumni, expand your professional network, stay updated on institute activities, and participate in alumni-driven initiatives.",
  ],
  phone: V2("app-phone"),
  // Store links not provided yet: badges show without a link.
  stores: [
    { label: "Get it on the App Store", image: "/alumni/v2/app-store.svg", width: 175, height: 44, href: "" },
    { label: "Download on Google Play", image: "/alumni/v2/google-play.svg", width: 174, height: 44, href: "" },
  ],
};
