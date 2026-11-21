import { getExtendedFaculty, type ExtendedFacultyCampus, type ExtendedFacultyPage, type ExtendedFacultyType } from "@/lib/about/extended-faculty-data";
import { getNodeReader, or } from "../node-page";

/** Drupal faculty_pages node per campus + faculty type. */
const NIDS: Record<ExtendedFacultyCampus, Record<ExtendedFacultyType, number>> = {
  mumbai: { guest: 5786, international: 5787, visiting: 5788 },
  bengaluru: { guest: 5789, international: 5790, visiting: 5791 },
};

/**
 * Guest / International / Visiting faculty page from Drupal. Each value falls back
 * to the built-in page while empty; members with no name are skipped.
 */
export async function getExtendedFacultyContent(campus: ExtendedFacultyCampus, type: ExtendedFacultyType): Promise<ExtendedFacultyPage> {
  const base = getExtendedFaculty(campus, type);
  const r = await getNodeReader("faculty_pages", NIDS[campus][type], ["field_faculty_data"]);
  if (!r) return base;
  const n = r.node;
  // Card line under the name: designation, then university.
  const members = r
    .refs(n, "field_faculty_data")
    .map((p) => ({
      name: r.text(p, "field_main_title"),
      designation: [r.text(p, "field_designation_details"), r.text(p, "field_university")].filter(Boolean).join(", "),
    }))
    .filter((m) => m.name);
  return {
    ...base,
    title: or(r.text(n, "field_intro_title"), base.title),
    intro: or(r.paras(n, "field_intro_description").join(" "), base.intro),
    members: or(members, base.members),
  };
}
