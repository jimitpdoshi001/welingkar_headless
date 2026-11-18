/**
 * WeLearning Experience page content (from welingkar.org/we-factor/we-learn).
 * No Drupal content type yet; swap this file for a Drupal fetch later.
 */
/** One feature/split item: heading, paragraphs and photo(s) (several = slider). */
export type WeFactorItem = {
  id: string;
  title: string;
  paragraphs: string[];
  images?: string[];
  /** Samvad issues: one download button per issue. */
  downloads?: { year: string; issues: { label: string; href: string }[] };
};

/** Page blocks, each drawn with an existing WeResearch section style. */
export type WeFactorBlock =
  | { type: "features"; heading?: string; items: WeFactorItem[] } // cream text + photo checkerboard
  | { type: "band"; items: WeFactorItem[] } // purple band, text columns
  | { type: "split"; item: WeFactorItem }; // cream band, text left + photo right

export type WeFactorDetailData = {
  hero: { title: string; subtitle: string; image: string };
  /** Breadcrumb parent (WeFactor). */
  parent: { label: string; href: string };
  blocks: WeFactorBlock[];
};

const IMG = (name: string) => `/wefactor/welearning/${name}.webp`;

export const WELEARNING: WeFactorDetailData = {
  hero: {
    title: "WeLearning Experience",
    subtitle:
      "The sustainability-centric learning on the WE campus merges knowledge with practical exposure. Powered by technology, the students are apprised on future skills like business analytics. The study duration on campus takes the students to the grassroots of the subject. It is here, where learners get a chance to interact with CXO's, Alumni and renowned successful personalities.",
    image: "/life/mumbai/collage1.webp",
  },
  parent: { label: "WeFactor", href: "/wefactor" },
  blocks: [
    {
      type: "features",
      items: [
        {
          id: "aaa",
          title: "Acquisition, Application, and Assimilation (AAA)",
          images: [IMG("aaa"), IMG("aaa-2"), IMG("aaa-3"), IMG("aaa-4")],
          paragraphs: [
            "At WeSchool, learning transcends in three A’s: Acquisition, application, and assimilation. The circle of learning intersperses with self-awareness, experimentation, and the emergence of new ideas. The classroom learning here is technology inclusive, thus apprising learners with real-time industry challenges and available resources to apply. Each student begins the first academic year with a Foundation Fortnight – a series of workshops that strengthens the ‘neev’ of the MBA aspirant. The life at WeSchool begins with the new ‘I’. All students collectively co-create, execute and participate for industry roundtables; socio-cultural fests. Each program designed provides the students across programs opportunities to interact with over 40+ guests from the industry leadership.",
          ],
        },
        {
          id: "neev",
          title: "Student Induction Program – NEEV",
          images: [IMG("neev"), IMG("neev-2")],
          paragraphs: [
            "At WeSchool, we are committed to offer a holistic learning experience to our incoming batch, thus, laying the foundation “NEEV” for Responsible Citizens & Future Leaders with 3 weeks well-structured & intensive – Student Induction Program (SIP). ‘NEEV’ is meticulously crafted to give a strong foundation by blending insightful leadership sessions delivered by industry experts, alumni, entrepreneurs, and technologists, alongside rigorous domain skills such as statistics, finance, technology, & engaging extracurricular activities such as creativity, Zumba, quizzes which will enhance students’ team spirit and leadership skills.",
            "In addition, these endeavours are designed to foster excellent communication and networking skills which will enable students to stand tall among their competitors.",
            "Thus, the Student Induction Program enables a journey of new student by providing a support system to create a feeling of togetherness and being part of “WeSchool Family”.",
          ],
        },
      ],
    },
    {
      type: "band",
      items: [
        {
          id: "summer-internships",
          title: "Summer Internships",
          paragraphs: [
            "During this phase, the students are exposed to the on-ground realities of work life. While they are mentored within the organisation, they also received direction from mentors on campus. At the end of the internship, the student must collate learnings and key takeaways from their brief stint as interns.",
          ],
        },
        {
          id: "global-citizen-leadership",
          title: "Global Citizen Leadership",
          paragraphs: [
            "Many students walk-in as freshers and transform to become experienced professionals. Projects under Global Citizen Leadership in association with the Centre for Creative Leadership allow students to unleash their creative side by innovating and solving live problem statements. Thus, GCL forms an indispensable part of teaching methodology, along with numerous other new-age-learning tools on WeSchool campus. Students have showcased over 287 live projects over five years at GCL since 2012.",
          ],
        },
        {
          id: "acdc",
          title: "ACDC",
          paragraphs: [
            "With an objective to bridge the gap between the aspirations and performance of a student, WeSchool Assessment and Development Cell invite industry HR professional to offer advice to students for their career growth. We handhold and guide our students pre and post-summer internship. It is here the student assimilates what he/ she has applied.",
          ],
        },
      ],
    },
    {
      type: "split",
      item: {
        id: "industry-roundtable",
        title: "Industry Roundtable",
        images: [IMG("roundtable")],
        paragraphs: [
          "We understand that mere theory is knowledge without insights. To acquaint our students with the on-ground realities and best industry practices, industry roundtables are held on campus. Senior management and thought leadership from across industries are invited for roundtable interactive sessions.",
          "To mentor and counsel our students, alumni meets are arranged. The Alumni roundtables are mostly popular in view of career guidance. Here the alumnus answers questions on topics ranging from job role to resume building. Such forums enable students to create an experience from a summer internship or to present impactful live case study projects.",
        ],
      },
    },
    {
      type: "features",
      heading: "Student Initiatives",
      items: [
        {
          id: "impact",
          title: "Impact",
          images: [IMG("impact"), IMG("impact-2"), IMG("impact-3")],
          paragraphs: [
            "Besides the academic rigour, students lead socio-cultural events which groom their interpersonal skills. It is here the students develop a skill to co-lead with other students through sports. We believe that sports play an integral part in personality development and improve discipline. Cricket, a popular sport offers management lessons and experiences on a pitch which students recall as alumni.",
          ],
        },
        {
          id: "samvad",
          title: "Samvad",
          paragraphs: [
            "With an aim to facilitate the exchange of ideas that inspire innovative thought culture, Samvad makes an interesting read as a B-School magazine for students and by students. Each edition carries articles on themes like leadership, innovation, corporate social responsibility, sports management, technology, and entrepreneurship. The e-magazine also publishes article entries from across top management institutes like IIMs and IITs.",
          ],
          images: [IMG("samvad-nov-2020"), IMG("samvad-oct-2020")],
          downloads: {
            year: "2020",
            issues: [
              {
                label: "November 2020",
                href: "https://www.welingkar.org/downloads/106_November_2020_Renewable_and_Sustainable_Industry.pdf",
              },
              {
                label: "October 2020",
                href: "https://www.welingkar.org/downloads/105_October_2020_Toursim_Industry.pdf",
              },
            ],
          },
        },
        {
          id: "munijan",
          title: "Munijan",
          images: [IMG("munijan")],
          paragraphs: [
            "Besides the academic rigour, students lead socio-cultural events which groom their interpersonal skills. It is here the students develop a skill to co-lead with other students through sports. We believe that sports play an integral part in personality development and improve discipline. Cricket, a popular sport offers management lessons and experiences on a pitch which students recall as alumni.",
          ],
        },
        {
          id: "competitions",
          title: "Competitions",
          images: [
            IMG("competitions"),
            IMG("competitions-2"),
            IMG("competitions-3"),
          ],
          paragraphs: [
            "Our student competence and exposure is cultivated over numerous inter B-School competitions held across India. There is focussed mentoring for students who participate in various tech fests, challenges, and big-ticket contests. In 2017-2018, WeSchool students have done us proud by winning over 250 awards at various national level competitions.",
          ],
        },
      ],
    },
  ],
};
