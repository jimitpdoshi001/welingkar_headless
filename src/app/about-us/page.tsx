import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import Footer from "@/components/Footer/Footer";
import { getAwards } from "@/lib/drupal/awards";
import { getAboutData } from "@/lib/drupal/about";

export const metadata: Metadata = {
  title: "About Us — WeSchool",
  description: "Prin. L. N. Welingkar Institute of Management Development and Research — a legacy of learning and leadership.",
};

export default async function Page() {
  // Fully dynamic: About Us node + awards from Drupal; empty sections are hidden.
  const [about, awards] = await Promise.all([getAboutData(), getAwards()]);
  const honours = {
    heading: "Honours & Achievements",
    years: [...new Set((awards ?? []).map((award) => award.year))],
    cards: awards ?? [],
  };

  return (
    <AboutPage
      data={about ? { ...about, honours } : null}
      footer={<Footer />}
    />
  );
}
