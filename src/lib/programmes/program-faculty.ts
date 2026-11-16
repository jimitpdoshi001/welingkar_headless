import type { PgdmData } from "@/lib/pgdm/pgdm-data";
import { getFacultyDirectory, getProgramFacultyPeople, type FacultyCampus } from "@/lib/drupal/faculty-api";

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
/** Name key without titles/punctuation: "Prof Jai Raj Nair" == "Prof. Jai Raj Nair". */
const nameKey = (name: string) =>
  name
    .toLowerCase()
    .replace(/\b(prof|dr|mr|mrs|ms|shri|smt|flt|lt|capt)\b\.?/g, " ")
    .replace(/[^a-z]/g, "");

/**
 * Program Faculty typed on the program page can differ from the Faculty entries
 * (missing "Prof." full stop or "Mr." prefix). Use the Faculty entry's exact name,
 * designation and photo when the person matches one.
 */
async function withFacultyEntries(data: PgdmData, campus: FacultyCampus): Promise<PgdmData> {
  const directory = await getFacultyDirectory();
  if (!directory) return data;
  const byKey = new Map(directory.filter((r) => r.campus === campus).map((r) => [nameKey(r.name), r]));
  const people = data.programFaculty.people.map((person) => {
    const match = byKey.get(nameKey(person.name));
    return match
      ? { ...person, name: match.name, title: match.designation || person.title, image: match.image || person.image }
      : person;
  });
  return { ...data, programFaculty: { ...data.programFaculty, people } };
}

export async function withProgramFaculty(data: PgdmData, campus: FacultyCampus, programSlug: string): Promise<PgdmData> {
  if (data.programFaculty.people.length > 0) return withFacultyEntries(data, campus);
  const category = PROGRAM_FACULTY_CATEGORY[campus][programSlug];
  if (!category) return data;
  const people = await getProgramFacultyPeople(campus, category);
  if (!people.length) return data;
  return {
    ...data,
    programFaculty: { heading: data.programFaculty.heading || "Program Faculty", people },
  };
}
