import type { PgdmData } from "@/lib/pgdm/pgdm-data";
import { getProgramFacultyPeople, type FacultyCampus } from "@/lib/drupal/faculty-api";

/**
 * Which faculty category feeds each program page's "Program Faculty".
 * Drupal faculty category slug (field_faculty_category), for both campuses.
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
    "pgdm-e-business": "e-business",
    "pgdm-business-design": "business-design",
    "pgdm-research-analytics": "business-analytics",
  },
};

/**
 * "Program Faculty" always comes live from the Faculty API (published, campus
 * location, program category). Faculty stored on the program node itself are an
 * old import, so they are ignored. No matching faculty: the section is hidden.
 */
export async function withProgramFaculty(data: PgdmData, campus: FacultyCampus, programSlug: string): Promise<PgdmData> {
  const category = PROGRAM_FACULTY_CATEGORY[campus][programSlug];
  const people = category ? await getProgramFacultyPeople(campus, category) : [];
  return {
    ...data,
    programFaculty: { heading: data.programFaculty.heading || "Program Faculty", people },
  };
}
