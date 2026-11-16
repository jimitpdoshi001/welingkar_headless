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
