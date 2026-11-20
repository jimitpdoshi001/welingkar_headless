import type { WeFactorDetailData } from "./welearning-data";

/** WeEntrepreneurship page content (visible sections of welingkar.org/we-factor/we-entrepreneurship). */
const IMG = (name: string) => `/wefactor/weentrepreneurship/${name}.webp`;

export const WEENTREPRENEURSHIP: WeFactorDetailData = {
  title: "WeEntrepreneurship",
  intro:
    "We inspire young talent to distinguish themselves as entrepreneurs. The Center for Innovation & Memetics is the Innovation Lab (InnoWe) on campus that encourages students to work on their ideas and test them out practically. InnoWe is a space where thinking is stimulated; ideas germinate and are nurtured along to become paradigm-defining businesses.",
  parent: { label: "WeFactor", href: "/we-factor" },
  blocks: [
    {
      type: "carousel",
      id: "innowe",
      title: "InnoWE",
      images: [IMG("innowe")],
      paragraphs: [
        "Mumbai's first innovation Lab and center for Memetics initiated by WeSchool is a hub of business ideas for the future. It is a space where thinking is stimulated; ideas germinate and are nurtured along to become paradigm-defining businesses. Here, the students are encouraged to voice the weirdest of their ideas with the guarantee that these will be allowed to germinate, cross-pollinate and get fertilised.",
        "At ‘InnoWE’, students and faculty undertake various aspects of study viz. study on social innovation, innovations in finance, business model innovation, product design innovation among others.",
      ],
    },
    {
      type: "text",
      id: "entrepreneurship",
      title: "Entrepreneurship at WeSchool",
      paragraphs: [
        "WeCell, WeSchool's Entrepreneurship initiative by InnoWE harnesses the young entrepreneurial talent to take their first steps beginning from ideation. WeCell supports campus start-ups through workshops on phase planning, engagement with WeSchool Alumni entrepreneurs and participation in accelerator programs across India. At WeCell, students create sustainable start-ups which focus on ideation through design-thinking approach. Start-ups like i-kheti, Barnee, Opulent Infotech Pvt Ltd are some of the entrepreneurial ventures that were conceived at InnoWE.",
      ],
    },
    {
      type: "text",
      id: "nisp",
      title: "NISP Policy at WeSchool",
      paragraphs: [
        "National Innovation and Startup Policy (NISP): is for students and faculty in higher education institutes based on the structured guiding framework provided by MHRD and AICTE innovation Cell. The policy is aimed to enable the institutes to actively engage students, faculties, and staff in innovation and entrepreneurship related activities, projects, and strategic initiatives. In line with the startup India Policy', this also focuses on fostering entrepreneurship and promotion. innovation by creating an ecosystem that is conducive for the growth of Startups.",
        "WeSchool's Strategic approach and action plan are not just to implement NISP 2020 Policy but to develop and showcase Real-world examples, Tangible Outcomes and to Cultivate Students' and Faculty Members' Entrepreneurial Potential, Skills, and Mindset.",
      ],
    },
    {
      type: "carousel",
      id: "wenture",
      title: "Wenture.inv",
      images: [IMG("wenture")],
      paragraphs: [
        "Wenture.inv provides you with an exciting opportunity to catch the attention of storied investors, not only by pitching to them but also demonstrating your product too in an exhibition setting.",
        "We also prep you for the Demo-cum-Pitch Day through a 14-hour Bootcamp to help narrate your product story and craft a refined pitch deck. So, those of you who are looking to scale up your ventures",
      ],
    },
    {
      type: "carousel",
      id: "smart-india-hackathons",
      title: "Smart India Hackathons",
      images: [IMG("sih-1"), IMG("sih-2"), IMG("sih-3"), IMG("sih-4"), IMG("sih-5"), IMG("sih-6"), IMG("sih-7")],
      paragraphs: [
        "Over the years, WeSchool, Mumbai, has collaborated with AICTE as the nodal center in Mumbai for the Smart India Hackathon. Each year, the hackathon witnesses promising young innovators - proposing actionable software solutions, with social impact. The initiative offers a chance to youngistans to provide innovative solutions that will pave way for progress in India.",
        "The Smart India Hackathon is an exclusive event organized under the prestigious Smart India Hackathon initiative. It aims to provide a platform for the ingenious minds shortlisted for the grand finale to compete and tackle real-world challenges through innovation, creativity, and problem-solving. WeSchool Campus, Mumbai has been hosting & participating in Smart India Hackathon since its inception from 2017 till date",
      ],
    },
  ],
};
