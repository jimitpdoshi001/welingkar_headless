/**
 * Mock data for the Events and News & Media listing pages, mirroring the
 * Figma design. Swap for Drupal fields later. Images are placeholders.
 */

export type MediaCard = { id: string; image: string; date: string; text: string; href: string };

export type MediaGridData = {
  hero: { title: string; subtitle: string; crumb: string; image: string };
  tabs?: { label: string; active?: boolean; href: string }[];
  filters: string[];
  cards: MediaCard[];
  loadMore: boolean;
};

const MIMG = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=900&auto=format&fit=crop&q=80",
];

const cards = (n: number): MediaCard[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `c-${i + 1}`,
    image: MIMG[i % MIMG.length],
    date: "Nov 04, 2025",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    href: "#",
  }));

export const EVENTS_PAGE: MediaGridData = {
  hero: {
    title: "Events",
    subtitle: "Stay up to date with the latest news on every event at WeSchool.",
    crumb: "Events",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=80",
  },
  filters: ["2006", "2025", "2024", "2023"],
  cards: cards(12),
  loadMore: true,
};

export const MEDIA_PAGE: MediaGridData = {
  hero: {
    title: "News & Media",
    subtitle: "Our feats and achievements have received mass coverage by the media and have been featured in several publications.",
    crumb: "News & Media",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&auto=format&fit=crop&q=80",
  },
  tabs: [
    { label: "News + Press Release", active: true, href: "/media" },
    { label: "Video gallery", href: "/media/videos" },
  ],
  filters: ["Select Category", "Select Year", "Sort By"],
  cards: cards(12),
  loadMore: true,
};
