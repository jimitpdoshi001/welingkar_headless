/**
 * Mock data for the MDC (Management Development Centre) landing page,
 * mirroring the Figma design. Swap for Drupal fields later. Placeholders.
 */

export type MdcFeature = { title: string; text: string };
export type MdcCard = { id: string; image: string; title: string; text: string };
export type MdcTestimonial = { id: string; text: string; name: string; role: string };
export type MdcContact = { id: string; name: string; title: string; dept: string; office: string; mobile: string; email: string };

export type MdcData = {
  hero: { title: string; subtitle: string; cta: { label: string; href: string }; image: string };
  nav: { label: string; href: string }[];
  stats: { value: string; label: string }[];
  learning: { heading: string; paragraphs: string[]; images: string[]; features: MdcFeature[] };
  about: { heading: string; paragraphs: string[]; image: string; offerHeading: string; offers: string[] };
  why: { heading: string; cards: MdcFeature[] };
  expertise: { heading: string; items: string[] };
  flagship: { heading: string; cards: MdcCard[] };
  trusted: { heading: string; logos: { name: string; image: string }[] };
  testimonials: { heading: string; items: MdcTestimonial[] };
  team: { heading: string; subtitle: string; contacts: MdcContact[] };
  /** Optional campus colours; Mumbai uses the default purple. */
  theme?: { accent: string; tint: string };
  /** Sub-folder of recoloured icons, e.g. "bengaluru/". */
  iconSet?: string;
};

const DIMG = {
  hero: "/mdc/mumbai/hero.webp",
  learn1: "/mdc/mumbai/learn1.webp",
  learn2: "/mdc/mumbai/learn2.webp",
  about: "/mdc/mumbai/about.webp",
  f1: "/mdc/mumbai/f1.webp",
  f2: "/mdc/mumbai/f2.webp",
  f3: "/mdc/mumbai/f3.webp",
};

const TRUSTED = ["Mahindra", "Kalpataru", "Bayer", "Galaxy", "Aries", "McDonald's"].map((n, i) => ({ name: n, image: `/mdc/mumbai/logo-${i + 1}.png` }));

export const MDC: MdcData = {
  hero: {
    title: "Build Future-Ready Leaders for the Age of AI",
    subtitle: "Executive education and custom training programs by WeSchool Management Development Centre.",
    cta: { label: "Talk to Our Team", href: "/mdc#team" },
    image: DIMG.hero,
  },
  nav: [
    { label: "About Campus", href: "#about" },
    { label: "Programs", href: "#offerings" },
    { label: "Faculty", href: "/about-us/faculty" },
    { label: "Corporate interface", href: "/corporate-interface" },
    { label: "We Research", href: "/weresearch" },
    { label: "We Excel", href: "#why" },
    { label: "Life @ WeSchool", href: "/life-at-weschool" },
    { label: "MDP", href: "/programmes/mdp" },
  ],
  stats: [
    { value: "25+", label: "Years of Excellence" },
    { value: "50,000+", label: "Professionals Trained" },
    { value: "200+", label: "Corporate Clients" },
    { value: "40+", label: "Programs Offered" },
  ],
  learning: {
    heading: "Learning That Keeps Pace With Change",
    paragraphs: [
      "AI is changing industries, jobs and the skills needed to succeed. Today's leaders must do more than manage work. They need to understand new technology, use data to make decisions and lead change.",
      "Executive Education at WeSchool helps professionals build these skills while they keep growing in their careers. Our programs cover AI, Data Analytics, Digital Transformation, Strategic Thinking, Design Thinking and Finance.",
    ],
    images: [DIMG.learn1, DIMG.learn2],
    features: [
      { title: "Online, hybrid and classroom formats", text: "" },
      { title: "Learn from faculty and industry experts", text: "" },
      { title: "Grow with a diverse peer network", text: "" },
    ],
  },
  about: {
    heading: "About WeSchool Management Development Centre",
    paragraphs: [
      "Continuous learning is now a must for people and companies. Businesses need talent that is agile, data-driven and ready to lead.",
      "WeSchool's Management Development Centre (MDC) goes beyond regular training. We offer learning solutions for professionals across levels, roles and industries. Every program is built to deliver real business results.",
    ],
    image: DIMG.about,
    offerHeading: "What We Offer",
    offers: [
      "Short-term certificate programs",
      "Leadership development programs",
      "Functional and cross-functional skill programs",
      "AI and digital transformation modules",
      "Custom corporate training",
      "Industry-specific executive programs",
      "PGPMS for working professionals",
    ],
  },
  why: {
    heading: "Why Organizations Choose MDC",
    cards: [
      { title: "Customized Learning", text: "Programs built around your goals, business needs and talent plans." },
      { title: "Industry-Aligned Curriculum", text: "Designed with industry experts to reflect current trends and new technologies." },
      { title: "Expert Faculty", text: "Academics, industry leaders and consultants who bring theory and practice together." },
      { title: "Flexible Delivery", text: "Classroom, virtual or blended learning across locations." },
      { title: "Hands-On Learning", text: "Case studies, simulations, live projects and peer learning." },
      { title: "Leadership Development", text: "Skills in strategy, innovation, decision-making and business acumen." },
      { title: "Scalable Programs", text: "For frontline managers, high-potential talent and senior leaders." },
      { title: "Measurable Impact", text: "Better performance, stronger teams and a solid leadership pipeline." },
    ],
  },
  expertise: {
    heading: "Our Areas of Expertise",
    items: [
      "Leadership Development",
      "Innovation & Design Thinking",
      "Data Analytics & Decision Making",
      "AI & Digital Transformation",
      "Sustainability, ESG & Responsible Business",
      "Rural Management",
      "Strategic Thinking & Judgement",
      "Finance Acumen",
    ],
  },
  flagship: {
    heading: "Our Flagship Offerings",
    cards: [
      { id: "fl-1", image: DIMG.f1, title: "Welingkar Autonomous PGPMS", text: "A management program for working professionals who want to grow their careers. It builds strong management skills and uses real work experience to enrich class discussions." },
      { id: "fl-2", image: DIMG.f2, title: "Customised MDP Trainings", text: "Short-term and long-term programs tailored to your organization's goals. Delivered in classroom, virtual or blended formats. Every program is interactive and practical." },
      { id: "fl-3", image: DIMG.f3, title: "Consulting Services", text: "MDC goes beyond training. We help organizations improve performance, build capabilities and grow in a sustainable way." },
    ],
  },
  trusted: { heading: "Trusted by Leading Organizations", logos: TRUSTED },
  testimonials: {
    heading: "What Participants Say",
    items: [
      { id: "t-1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers took a 1914 translation and scrambled it.", name: "Suresh Patil", role: "Director" },
      { id: "t-2", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers took a 1914 translation and scrambled it.", name: "Priya Krishnamurthy", role: "Director" },
      { id: "t-3", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers took a 1914 translation and scrambled it.", name: "Anil Gupta", role: "Director" },
    ],
  },
  team: {
    heading: "Talk to Our MDP Team",
    subtitle: "Reach out directly to our executive education team for program details, custom training enquiries and more.",
    contacts: [
      { id: "c-1", name: "Ms Ameeta Hampiholi", title: "Deputy General Manager, Executive Education", dept: "WeSchool Management Development Centre", office: "+91-22-24198300 (Extn: 8144)", mobile: "+91 9820979889", email: "ameeta.hampiholi@welingkar.org" },
      { id: "c-2", name: "Ms Tanaz Daruwalla", title: "Deputy General Manager, Executive Education", dept: "WeSchool Management Development Centre", office: "+91-22-24198300 (Extn: 8144)", mobile: "+91 9820979889", email: "tanaz.daruwalla@welingkar.org" },
    ],
  },
};

// Figma 1561:153: Bengaluru variant, terracotta theme and campus photos.
const BIMG = (n: string) => `/mdc/bengaluru/${n}.webp`;

export const MDC_BENGALURU: MdcData = {
  ...MDC,
  theme: { accent: "#b04535", tint: "#fff4f2" },
  iconSet: "bengaluru/",
  hero: { ...MDC.hero, image: BIMG("hero") },
  learning: { ...MDC.learning, images: [BIMG("learn1"), BIMG("learn2")] },
  about: { ...MDC.about, image: BIMG("about") },
  flagship: {
    ...MDC.flagship,
    cards: MDC.flagship.cards.map((c, i) => ({ ...c, image: BIMG(`f${i + 1}`) })),
  },
};
