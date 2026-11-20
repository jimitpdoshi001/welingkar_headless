/**
 * WeFactor page content (from welingkar.org/we-factor). No Drupal content type
 * exists yet; swap this file for a Drupal fetch when one is added.
 */
export type WeFactorPillar = { id: string; title: string; body: string; image: string; href: string };

export type WeFactorData = {
  hero: { title: string; subtitle: string; image: string };
  about: { heading: string; body: string };
  pillars: WeFactorPillar[];
};

export const WEFACTOR: WeFactorData = {
  hero: {
    title: "WeFactor",
    subtitle:
      "At WeSchool, we invest our efforts in bridging the distance between the industry and academia. Our campus boasts of integrated innovation and knowledge cells, as well as research and publication labs. This is where students can imbibe and gain exposure to new concepts, gain a global outlook and become future-ready.",
    image: "/life/mumbai/hero.webp",
  },
  about: {
    heading: "About WeFactor",
    body: "At WeSchool, learning transcends in three A’s Acquisition, application and assimilation. The circle of learning intersperses with self-awareness, experimentation and emergence of new ideas. The classroom learning here is technology inclusive, thus apprising learners with real time industry challenges and available resources to apply. Each student begins the first academic year with a Foundation Fortnight – a series of workshop that strengthen the ‘neev’ of the MBA aspirant. The life at WeSchool begins with the new ‘I’. All students collectively co-create, execute and participate for industry roundtables; socio-cultural fests. Each program has been designed to provide students across programs opportunities to interact with over 40+ guests from the industry leadership.",
  },
  pillars: [
    {
      id: "welearning",
      title: "WeLearning Experience",
      body: "The sustainability-centric learning on the WE campus merges knowledge with practical exposure. Powered by technology, the students are apprised on future skills like business analytics. The study duration on campus takes the students to the grassroots of the subject. It is here, where learners get a chance to interact with CXO's, Alumni and renowned successful personalities.",
      image: "/life/mumbai/collage1.webp",
      href: "/we-factor/we-learn",
    },
    {
      id: "weinnovate",
      title: "WeInnovate",
      body: "We center on empathy to design some of the most impactful solutions and inventions for organisational and community development. WeInnovate branches out into various international/ industry academia partnered events.",
      image: "/life/mumbai/collage3.webp",
      href: "/we-factor/we-innovate",
    },
    {
      id: "weentrepreneurship",
      title: "WeEntrepreneurship",
      body: "We inspire young talent to distinguish themselves as entrepreneurs. The Center for Innovation & Memetics is the Innovation Lab (InnoWe) on campus that encourages students to work on their ideas and test them out practically. InnoWe is a space where thinking is stimulated; ideas germinate and are nurtured along to become paradigm-defining businesses.",
      image: "/life/mumbai/c5.webp",
      href: "/we-factor/we-entrepreneurship",
    },
    {
      id: "welead",
      title: "WeLead",
      body: "WeLead with winning examples from alumni to prospective students. Our students work on various research projects and live case studies for some of the finest brands. They acquire their learning by doing.",
      image: "/life/mumbai/cells.webp",
      href: "/we-factor/we-lead",
    },
  ],
};
