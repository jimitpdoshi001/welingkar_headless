import type { PgdmData } from "@/lib/pgdm/pgdm-data";
import { getProgramFacultyPeople, type FacultyCampus } from "@/lib/drupal/faculty-api";

/**
 * Which faculty category feeds each program page's "Program Faculty".
 * Mumbai: Drupal faculty category; Bengaluru: program from the approved sheet.
 */
const PROGRAM_FACULTY_CATEGORY: Record<FacultyCampus, Record<string, string>> = {
  mumbai: {
    pgdm: "pgdm",
    "pgdm-e-business": "e-business",
    "pgdm-business-design": "business-design",
    "pgdm-healthcare": "healthcare",
    "pgdm-retail": "retail",
    "pgdm-rural": "rural-management",
    "pgdm-media": "media-and-entertainment",
    "pgdm-research-analytics": "business-analytics",
  },
  bengaluru: {
    pgdm: "pgdm",
    "pgdm-e-business": "pgdm-e-business",
    "pgdm-business-design": "pgdm-bdi",
    "pgdm-research-analytics": "pgdm-rba",
  },
};

/**
 * Fill "Program Faculty" from the Faculty API when the program page has none in
 * Drupal. Faculty entered on the program page itself still take priority.
 */
export async function withProgramFaculty(data: PgdmData, campus: FacultyCampus, programSlug: string): Promise<PgdmData> {
  if (data.programFaculty.people.length > 0) return data;
  const category = PROGRAM_FACULTY_CATEGORY[campus][programSlug];
  if (!category) return data;
  const people = await getProgramFacultyPeople(campus, category);
  if (!people.length) return data;
  return {
    ...data,
    programFaculty: { heading: data.programFaculty.heading || "Program Faculty", people },
  };
}
