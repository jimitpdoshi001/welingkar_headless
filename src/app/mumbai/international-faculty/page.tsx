import { ExtendedFacultyPage, extendedFacultyMetadata } from "@/components/about/ExtendedFaculty/ExtendedFacultyPage";

export const metadata = extendedFacultyMetadata("mumbai", "international");

export default function Page() {
  return <ExtendedFacultyPage campus="mumbai" type="international" />;
}
