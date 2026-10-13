/**
 * Programme listing pages (Figma 627:1158 Mumbai). Copy, order and intakes come
 * from Figma; images are local placeholders until real photos are uploaded to
 * /public/programmes/<campus>/<slug>.webp.
 */

export type ListingProgramme = {
  slug: string;
  title: string;
  description: string;
  intake: string;
  href: string;
};

export type ProgrammeListingData = {
  campus: "mumbai" | "bengaluru";
  /** Figma colours: strip behind the pills, row/card tint and primary button. */
  theme: { strip: string; tint: string; button: string };
  hero: { title: string; subtitle: string; image: string };
  nav: { label: string; href: string }[];
  pills: { label: string; href: string }[];
  intro: { heading: string; body: string };
  programmes: ListingProgramme[];
  applyHref: string;
};

const img = (campus: string, name: string) => `/programmes/${campus}/${name}.webp`;

export const LISTING_MUMBAI: ProgrammeListingData = {
  campus: "mumbai",
  theme: { strip: "var(--color-secondary)", tint: "#f5eeff", button: "var(--color-orange)" },
  hero: {
    title: "Full-Time Programs in Mumbai",
    subtitle: "Designed to build managers who lead with clarity, courage, and vision",
    image: img("mumbai", "hero"),
  },
  nav: [
    { label: "About Campus", href: "/campuses/mumbai" },
    { label: "Programs", href: "/programmes" },
    { label: "Faculty", href: "/about-us/faculty" },
    { label: "Corporate Interface", href: "/corporate-interface" },
    { label: "We Research", href: "/weresearch" },
    { label: "We Excel", href: "/weexcel" },
    { label: "Life @ WeSchool", href: "/life-at-weschool" },
    { label: "MDP", href: "/programmes/mdp" },
  ],
  pills: [
    { label: "Full-Time Programs", href: "/programmes" },
    { label: "Executive", href: "/programmes/executive" },
    { label: "11months Post Graduate Program", href: "/programmes/executive" },
    { label: "PGDM Hybrid Program", href: "/programmes/pgdm-hybrid" },
    { label: "11 months PGP & 6 months Certificate Programs", href: "/programmes/certificate" },
    { label: "Post Graduate Program in Temple Management (PGPTM)", href: "/programmes/pgptm" },
  ],
  intro: {
    heading: "Full-time Programs",
    body: "Our full-time programs aim to shape students into world-class managers, empowering them with key analytical tools for future-ready business enterprises. Each full-time program introduces the learner to various functions of a business. The full-time program is open to students with educational background in arts, commerce and science. Interested applicants are required to check the eligibility criteria prior applying.",
  },
  applyHref: "/apply",
  programmes: [
    { slug: "pgdm", title: "PGDM", description: "Be it Marketing, Finance, Human Resources, or Operations, we offer specialisations that sharpen your skills and strengthen your strategic thinking." },
    { slug: "pgdm-e-business", title: "PGDM - E Business", description: "Designed to nurture technology-friendly minds ready to navigate the vast, ever-evolving world of the internet." },
    { slug: "pgdm-business-design", title: "PGDM - Business Design", description: "Transformation requires design to be at the core of everything. This course offers a fresh, design-led perspective on driving business growth." },
    { slug: "pgdm-healthcare", title: "PGDM - Healthcare", description: "Specially curated for individuals who see good health and inner balance as the foundation of everything else." },
    { slug: "pgdm-retail", title: "PGDM - Retail Management", description: "Designed around the real needs of the retail sector, this course offers comprehensive training to build industry-ready professionals." },
    { slug: "pgdm-rural", title: "PGDM - Rural Management", description: "Innovative solutions come to those who think differently. This course empowers students to play an integral role in transforming rural India's landscape." },
    { slug: "pgdm-media", title: "PGDM - Media & Entertainment", description: "This course trains students to become well-rounded media professionals, grounded in the best practices of the field." },
    { slug: "pgdm-research-analytics", title: "PGDM - Research and Business Analytics", description: "This course sharpens analytical minds in every keen student, shaping future business thinkers who lead with versatility." },
    { slug: "mms", title: "MMS", description: "This interdisciplinary program equips students with integrated management knowledge and analytical skills, offering a competitive advantage on par with postgraduate programs." },
  ].map((p) => ({ ...p, intake: "Present Intake: 180", href: p.slug === "pgdm" ? "/programmes/pgdm/mumbai" : `/programmes/${p.slug}` })),
};

// Figma 1815:2688: same programmes, terracotta strip, pink tint, green buttons,
// and only the Full-Time / Executive categories.
export const LISTING_BENGALURU: ProgrammeListingData = {
  ...LISTING_MUMBAI,
  campus: "bengaluru",
  theme: { strip: "#b04535", tint: "#fff4f2", button: "var(--color-primary)" },
  hero: { ...LISTING_MUMBAI.hero, title: "Full-Time Programs in Bengaluru", image: img("bengaluru", "hero") },
  nav: LISTING_MUMBAI.nav.map((n) => (n.label === "About Campus" ? { ...n, href: "/campuses/bengaluru" } : n)),
  pills: LISTING_MUMBAI.pills.slice(0, 2),
  intro: { ...LISTING_MUMBAI.intro, heading: "Full-time Programs" },
  programmes: LISTING_MUMBAI.programmes.map((p) => (p.slug === "pgdm" ? { ...p, href: "/programmes/pgdm/bengaluru" } : p)),
};

/** Photo slot for a programme row on a campus listing. */
export const listingImage = (campus: string, slug: string) => img(campus, slug);
