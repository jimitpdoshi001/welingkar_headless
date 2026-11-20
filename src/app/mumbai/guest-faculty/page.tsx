import { ExtendedFacultyPage, extendedFacultyMetadata } from "@/components/about/ExtendedFaculty/ExtendedFacultyPage";

export const metadata = extendedFacultyMetadata("mumbai", "guest");

export default function Page() {
  return <ExtendedFacultyPage campus="mumbai" type="guest" />;
}
