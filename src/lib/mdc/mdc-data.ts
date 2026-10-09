/**
 * Mock data for the MDC (Management Development Centre) landing page,
 * mirroring the Figma design. Swap for Drupal fields later. Placeholders.
 */
import { logoPlaceholder } from "@/util/placeholder";

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
};

const DIMG = {
  hero: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&auto=format&fit=crop&q=80",
  learn1: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&auto=format&fit=crop&q=80",
  learn2: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80",
  about: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80",
  f1: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80",
  f2: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&auto=format&fit=crop&q=80",
  f3: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&auto=format&fit=crop&q=80",
};

const TRUSTED = ["Mahindra", "Kalpataru", "Bayer", "Galaxy", "Aries", "McDonald's"].map((n) => ({ name: n, image: logoPlaceholder(n) }));

export const MDC: MdcData = {
  hero: {
    title: "Build Future-Ready Leaders for the Age of AI",
    subtitle: "Executive education and custom training programs by WeSchool Management Development Centre.",
    cta: { label: "Talk to Our Team", href: "/mdc#team" },
    image: DIMG.hero,
  },
  nav: [
    { label: "About Campus", href: "#about" },
    { label: "Programmes", href: "#offerings" },
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
