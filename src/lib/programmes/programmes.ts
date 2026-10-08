/**
 * Programme catalogue. Each full-time PGDM variant reuses the rich PGDM page
 * template with hero overrides; other programmes use the same template with
 * their own intake/duration. Edit here to add or tune a programme.
 */
import { PGDM_MUMBAI, type PgdmData } from "@/lib/pgdm/pgdm-data";

export type ProgrammeMeta = {
  slug: string;
  title: string;
  category: "Full-Time PGDM" | "Post Graduate" | "Executive & Certificate";
  intake: string;
  duration: string;
  summary: string;
  specialisations?: string;
};

export const PROGRAMMES: ProgrammeMeta[] = [
  { slug: "pgdm", title: "Post Graduate Diploma in Management", category: "Full-Time PGDM", intake: "180 Seats", duration: "2 Years", summary: "WeSchool's flagship PGDM — multidisciplinary, industry-driven management education across Marketing, Finance, HR and Operations.", specialisations: "4 Tracks" },
  { slug: "pgdm-e-business", title: "PGDM E-Business", category: "Full-Time PGDM", intake: "60 Seats", duration: "2 Years", summary: "A future-focused programme blending management fundamentals with digital business, platforms and e-commerce.", specialisations: "Digital Business" },
  { slug: "pgdm-business-design", title: "PGDM Business Design & Innovation", category: "Full-Time PGDM", intake: "30 Seats", duration: "2 Years", summary: "Design thinking at the core — shaping innovators who reimagine products, services and business models.", specialisations: "Design & Innovation" },
  { slug: "pgdm-healthcare", title: "PGDM Healthcare Management", category: "Full-Time PGDM", intake: "60 Seats", duration: "2 Years", summary: "Management expertise tailored to the fast-evolving healthcare and life-sciences ecosystem." },
  { slug: "pgdm-retail", title: "PGDM Retail Management", category: "Full-Time PGDM", intake: "60 Seats", duration: "2 Years", summary: "Build leadership in modern retail, consumer behaviour and omnichannel commerce." },
  { slug: "pgdm-rural", title: "PGDM Rural Management", category: "Full-Time PGDM", intake: "60 Seats", duration: "2 Years", summary: "Management for rural markets, development and inclusive, sustainable growth." },
  { slug: "pgdm-media", title: "PGDM Media & Entertainment", category: "Full-Time PGDM", intake: "60 Seats", duration: "2 Years", summary: "Management for the creative economy — media, entertainment, OTT and digital content." },
  { slug: "pgdm-research-analytics", title: "PGDM Research & Business Analytics", category: "Full-Time PGDM", intake: "60 Seats", duration: "2 Years", summary: "Data-driven decision making — advanced analytics, research and business intelligence." },
  { slug: "mms", title: "Master of Management Studies (MMS)", category: "Post Graduate", intake: "120 Seats", duration: "2 Years", summary: "A University of Mumbai affiliated management degree with strong industry orientation." },
  { slug: "phd", title: "Doctoral Programme (PhD)", category: "Post Graduate", intake: "Limited", duration: "3–5 Years", summary: "Advance management knowledge through rigorous, application-oriented research." },
  { slug: "pgdm-hybrid", title: "PGDM Hybrid", category: "Post Graduate", intake: "Flexible", duration: "2 Years", summary: "Flexible, blended PGDM combining online learning with on-campus immersions." },
  { slug: "executive", title: "Executive Programme (11 months)", category: "Executive & Certificate", intake: "Working Professionals", duration: "11 Months", summary: "Accelerate your career with an intensive programme designed for working professionals." },
  { slug: "efmb", title: "PGP in Entrepreneurship & Family Managed Business (EFMB)", category: "Executive & Certificate", intake: "Entrepreneurs", duration: "15 Months", summary: "For entrepreneurs and family-business leaders ready to scale with structure and strategy." },
  { slug: "pgp-media", title: "PGP in Media & Entertainment", category: "Executive & Certificate", intake: "60 Seats", duration: "1 Year", summary: "A focused programme for the media, entertainment and creative industries." },
  { slug: "certificate", title: "6-Month Certificate Programme", category: "Executive & Certificate", intake: "Open", duration: "6 Months", summary: "A short, intensive certificate to build job-ready management skills." },
  { slug: "mdp", title: "Management Development Programmes (MDP)", category: "Executive & Certificate", intake: "Corporates", duration: "Varies", summary: "Custom and open-enrolment programmes for corporate learning and leadership development." },
  { slug: "foreign-trade-management", title: "Foreign Trade Management", category: "Executive & Certificate", intake: "Open", duration: "1 Year", summary: "Specialised training in international trade, export-import operations and global business." },
  { slug: "jewellery-design-business-management", title: "Jewellery Design & Business Management", category: "Executive & Certificate", intake: "Open", duration: "1 Year", summary: "A unique programme blending jewellery design craft with business and brand management." },
];

export function getProgramme(slug: string): ProgrammeMeta | undefined {
  return PROGRAMMES.find((p) => p.slug === slug);
}

/** Build the rich PGDM page data for a given programme, overriding the hero. */
export function programmeData(meta: ProgrammeMeta): PgdmData {
  return {
    ...PGDM_MUMBAI,
    hero: {
      ...PGDM_MUMBAI.hero,
      breadcrumb: ["Home", "Programmes", meta.title],
      title: meta.title,
      subtitle: meta.summary,
      stats: [`Intake: ${meta.intake}`, `Duration ${meta.duration}`, meta.specialisations ? `Specialisation: ${meta.specialisations}` : "AICTE Approved", "Full-time"],
    },
    whyProgram: {
      ...PGDM_MUMBAI.whyProgram,
      body: `${meta.summary} The programme combines core management principles with specialised expertise, shaping students into competent, future-ready leaders equipped with strong managerial skills, an innovative mindset, and exposure to real-world business challenges.`,
    },
  };
}
