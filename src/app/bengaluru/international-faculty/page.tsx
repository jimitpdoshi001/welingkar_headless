import { ExtendedFacultyPage, extendedFacultyMetadata } from "@/components/about/ExtendedFaculty/ExtendedFacultyPage";

export const metadata = extendedFacultyMetadata("bengaluru", "international");

export default function Page() {
  return <ExtendedFacultyPage campus="bengaluru" type="international" />;
}
