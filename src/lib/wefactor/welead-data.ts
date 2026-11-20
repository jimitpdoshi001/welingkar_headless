import type { WeFactorDetailData } from "./welearning-data";

/** WeLead page content (visible sections of welingkar.org/we-factor/we-lead). */
export const WELEAD: WeFactorDetailData = {
  title: "WeLead",
  intro:
    "WeLead with winning examples from alumni to prospective students. Our students work on various research projects and live case studies for some of the finest brands. They acquire their learning by doing.",
  parent: { label: "WeFactor", href: "/we-factor" },
  blocks: [
    {
      type: "text",
      id: "global-citizen-leadership",
      title: "Global Citizen Leadership Program",
      paragraphs: [
        "Global Citizen Leadership Program: WeSchool in association with world-renowned Center for Creative Leadership (CCL®), a company that trains fortune 500 companies globally on innovation and leadership practices runs The Global Citizen Leadership (GCL). This unique opportunity offers a platform for corporate stalwarts to address industry issues and imparts leadership and innovation skills to students. It takes each participating student through the process of problem identification, solution framing and sustaining the recommended change. Students have showcased over 287 live projects over five years at GCL. The WeSchool Global Citizen Leader (GCL) program finds mention in the Stanford Social Innovation Review 2014 as an initiative that is capable of Educating a New Generation of Entrepreneurial Leaders.",
      ],
    },
    {
      type: "list",
      id: "projects",
      title: "Project",
      items: [
        { title: "Sponsored project product based investigation & innovation on different layers of service - Pune intercity", subtitle: "TATA Motors" },
        { title: "Rehabilitation issues", subtitle: "Godrej Foundation" },
        { title: "Evolving ways of influencing customers while choosing a neighbourhood store to shop from", subtitle: "Star Bazaar" },
        { title: "Exploring opportunities for cold chain development in food park segment of the food processing industry" },
      ],
    },
  ],
};
