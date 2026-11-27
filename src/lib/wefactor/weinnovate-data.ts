import type { WeFactorDetailData } from "./welearning-data";

/** WeInnovate page content (visible sections of welingkar.org/we-factor/we-innovate). */
const IMG = (name: string) => `/wefactor/weinnovate/${name}.webp`;

export const WEINNOVATE: WeFactorDetailData = {
  title: "WeInnovate",
  intro:
    "We center on empathy to design some of the most impactful solutions and inventions for organisational and community development. WeInnovate branches out into various international/industry academia partnered events.",
  parent: { label: "WeFactor", href: "/we-factor" },
  blocks: [
    {
      type: "text",
      id: "redx",
      title: "WeSchool REDX Innovation Lab",
      paragraphs: [
        "Set-up in its Mumbai campus in May 2015 is the WeSchool REDX (Rethinking Engineering Design eXecution) Innovation lab, a unique, bottom-up co-innovation platform designed to address grand challenges in the emerging world. The environment is charged with curious minds working on developing novel and innovative citizen-based technologies in various domains including (but not limited to) health technology, urban development, waste management, and financial inclusion; that supports wide-ranging needs of urban population and corporations. The innovations are affordable, can scale quickly and easily and are applicable globally.",
      ],
    },
    {
      type: "carousel",
      id: "indo-sweden",
      title: "Indo-Sweden Innovation Initiatives",
      images: [IMG("indo-sweden-1"), IMG("indo-sweden-2")],
      paragraphs: [
        "Year on year WeSchool has collaborated with the Consulate General of Sweden in Mumbai for events such as Sweden India Nobel Memorial Quiz; Ung Svensk Form design exhibition, Sweden Design Weeks, Swedish design exhibition titled 'Design for Dignity' and photo exhibition titled 'Access Ability' on WeSchool, Mumbai campus.",
        "In April 2014, ‘India-Swedish Collaborations for Innovative Energy Solutions’ was held on WeSchool campus Mumbai, by India-Sweden Innovations´ Accelerator (ISIA). The initiative was supported by Swedish Energy Agency, Business Sweden and Confederation of Indian Industries (CII) – Green Business Centre, while WeSchool and Mälardalen University are the academic partners.",
        "In March 2018, the Consulate General of Sweden in Mumbai invited leading corporate from Mumbai and Sweden to exchange their perspective on the inclusion of sustainability in business design, for a panel discussion under the theme, “Integrating sustainability into the business to transform markets.”",
      ],
    },
    {
      type: "carousel",
      id: "icsid",
      title: "ICSID",
      images: [IMG("icsid")],
      paragraphs: [
        "The ‘2014 Interdesign Mumbai’ workshop, a collaborative initiative of WeSchool and World Design Organisation formerly known as The International Council of Societies of Industrial Design (icsid) showcased 25 prototypes. Under the overarching theme ‘Humanising a Metropolis’, 30 designers from India and 8 other countries with different design competences came together to address some of the social and infrastructure challenges facing the growing city of Mumbai. The participants worked on six sub-themes formulated based on the pre-research done by WeSchool faculty. They visited various precincts to further understand the design bottlenecks faced by the city focusing on key issues like drainage system, waste management, challenges of creating an educational township, socializing in a metro, improving the outdoor experience for citizens, chaotic shopping experience, lifestyle-related health problems etc., and ideated on the probable solutions which can be practically implemented.",
      ],
    },
    {
      type: "carousel",
      id: "design-innovation",
      title: "Design & Innovation on Campus",
      images: [IMG("design-1"), IMG("design-2"), IMG("design-3"), IMG("design-4")],
      paragraphs: [
        "WeSchool’s efforts at creating an ecosystem for convergence of design thinking, technology and empathy has created a platform for young talent from across diverse programs to design solutions of social impact. The collaboration between MIT Media lab and WeSchool in 2014, is a milestone in our journey towards creating the future.",
        "The biggest ‘Design Innovation Workshop’ by WeSchool and MIT Media Lab, USA presented the ‘Open House’ on February 01, 2014 on WeSchool campus, Mumbai. The exhibition to showcase the outcome of a weeklong workshop where 380 innovators from across India, have been collaborating and sharing ideas across boundaries of disciplines, institutions, and cultures to design and implement prototypes with renowned MIT Media Lab experts and local mentors. The participants brainstormed with a large pool of mentors to address simple but vital issues that we face in our day to day lives with a designer’s holistic approach.",
      ],
    },
  ],
};
