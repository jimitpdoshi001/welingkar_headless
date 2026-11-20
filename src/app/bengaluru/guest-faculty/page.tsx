import { ExtendedFacultyPage, extendedFacultyMetadata } from "@/components/about/ExtendedFaculty/ExtendedFacultyPage";

export const metadata = extendedFacultyMetadata("bengaluru", "guest");

export default function Page() {
  return <ExtendedFacultyPage campus="bengaluru" type="guest" />;
}
