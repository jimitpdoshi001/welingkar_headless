import { redirect } from "next/navigation";

// Accreditations are now per campus; the old address opens Mumbai.
export default function Page() {
  redirect("/accreditation/mumbai");
}
