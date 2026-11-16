/**
 * About Us ("Who We Are") page data. Everything comes from Drupal (node--about_us
 * + the awards API); a section with no Drupal content is hidden. Rich text is
 * sanitized HTML.
 */

export type AboutPerson = { id: string; name: string; title: string; image?: string };
/** `year` set = card shows only under that year (Drupal awards). */
export type HonourCard = { id: string; image: string; text: string; year?: string };
export type AboutDesk = { heading: string; html: string; name: string; title: string; image: string };

export type AboutData = {
  hero: { title: string; subtitle: string; image: string };
  vision: { heading: string; html: string; image: string };
  mission: { heading: string; html: string; image: string };
  whoWeAre: { watermark: string; paragraphs: string[] };
  spMandali: { watermark: string; paragraphs: string[] };
  /** Chairman, Vice Chairman… desks, in Drupal order. */
  desks: AboutDesk[];
  director: { heading: string; html: string; sign: string; image: string } | null;
  accreditations: { id: string; logo: string; html: string }[];
  accreditationsHeading: string;
  boards: { id: string; heading: string; people: AboutPerson[] }[];
  honours: { heading: string; years: string[]; cards: HonourCard[] };
  council: { heading: string; html: string; people: AboutPerson[] };
};
