import HtmlTester from "@/components/HtmlTester/HtmlTester";
import { notFound } from "next/navigation";

export default function HtmlTesterPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <HtmlTester />;
}
