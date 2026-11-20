import type { Metadata } from "next";
import { CdcPage } from "@/components/about/CdcPage/CdcPage";
import {
  getExtendedFaculty,
  type ExtendedFacultyCampus,
  type ExtendedFacultyType,
} from "@/lib/about/extended-faculty-data";

const CAMPUS = {
  mumbai: { name: "Mumbai", faculty: "/about-us/faculty" },
  bengaluru: { name: "Bengaluru", faculty: "/about-us/faculty/bengaluru" },
} as const;

/** Metadata for /<campus>/<type>-faculty (canonical = its own live-site address). */
export function extendedFacultyMetadata(campus: ExtendedFacultyCampus, type: ExtendedFacultyType): Metadata {
  const page = getExtendedFaculty(campus, type);
  return {
    title: `${page.title} — ${CAMPUS[campus].name} | Welingkar`,
    description: page.intro,
    alternates: { canonical: `/${campus}/${type}-faculty` },
  };
}

/** International / visiting / guest faculty list, on the CDC member-grid design. */
export function ExtendedFacultyPage({ campus, type }: { campus: ExtendedFacultyCampus; type: ExtendedFacultyType }) {
  const page = getExtendedFaculty(campus, type);
  return (
    <CdcPage
      title={`${page.title} — ${CAMPUS[campus].name}`}
      intro={page.intro}
      members={page.members}
      columns={4}
      parent={{ label: `${CAMPUS[campus].name} Faculty`, href: CAMPUS[campus].faculty }}
    />
  );
}
