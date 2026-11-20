import { ExtendedFacultyPage, extendedFacultyMetadata } from "@/components/about/ExtendedFaculty/ExtendedFacultyPage";

export const metadata = extendedFacultyMetadata("bengaluru", "visiting");

export default function Page() {
  return <ExtendedFacultyPage campus="bengaluru" type="visiting" />;
}
