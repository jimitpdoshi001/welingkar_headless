import { redirect } from "next/navigation";

// The corporate page now exists per campus; the old address opens Mumbai.
export default function Page() {
  redirect("/career-management-centre-mumbai");
}
