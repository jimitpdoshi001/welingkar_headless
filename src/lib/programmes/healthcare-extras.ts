import type { PgdmData } from "@/lib/pgdm/pgdm-data";

/**
 * PGDM Healthcare-only sections (Scholarships, Student Initiatives).
 * Built-in content from the approved design until Drupal has fields for them;
 * photos are local files in /public/programmes/healthcare/.
 */
export function withHealthcareExtras(data: PgdmData): PgdmData {
  return {
    ...data,
    scholarship: data.scholarship ?? {
      heading: "Scholarships",
      title: "Dr Rinti Banerjee Scholarship for PGDM Healthcare Management student -",
      paragraphs: [
        "Dr Rinti Banerjee scholarship in Healthcare: This scholarship covers 50% of the fee for one woman student of the PGDM Healthcare student with MBBS background. The scholarship was started in 2022, to encourage female MBBS students to pursue management education in healthcare. This scholarship is expected to attract more women medicos to Management and hopes to increase women in leadership positions in the healthcare sector.",
        "Dr Rinti Banerjee, was an eminent professor and researcher at IIT-Bombay. From the Department of Biosciences and Bioengineering at the institute, she had done a lot of research on the pandemic and filed several patents and licensed some of her research output to companies. An expert in biomaterials, nanomedicine and drug delivery she has published over 100 papers in international journals.",
      ],
      image: "/programmes/healthcare/scholarship-rinti-banerjee.webp",
      cta: { label: "Apply Now", href: "/apply" },
      note: "* This scholarship will apply to students once they are admitted to the program, based on the scholarship conditions.",
    },
    studentInitiatives: data.studentInitiatives ?? {
      heading: "Student Initiatives",
      description:
        "The PGDM Healthcare programme emphasizes experiential learning, peer support, and industry exposure through structured initiatives that enhance students’ academic, professional, and personal development.",
      items: [
        {
          id: "buddy-program",
          title: "Buddy program",
          body: "Under the Buddy Program, every incoming junior student is paired with a senior student for the initial few months of the academic year. The senior buddy helps the junior adapt to campus life, understand academic processes, participate in student activities, and become familiar with institutional resources. This initiative creates a supportive environment, encourages meaningful peer interactions, and ensures a smoother transition into the programme.",
          image: "/programmes/healthcare/initiative-buddy-program.webp",
        },
      ],
    },
  };
}
