import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import Footer from "@/components/Footer/Footer";
import { ABOUT } from "@/lib/about/about-data";
import { getAwards } from "@/lib/drupal/awards";

export const metadata: Metadata = {
  title: "About Us — WeSchool",
  description: "Prin. L. N. Welingkar Institute of Management Development and Research — a legacy of learning and leadership.",
};

export default async function Page() {
  // Honours & Achievements from Drupal ("Who We Are – Awards"); built-in cards if unavailable.
  const awards = await getAwards();
  const data =
    awards && awards.length
      ? {
          ...ABOUT,
          honours: {
            ...ABOUT.honours,
            years: [...new Set(awards.map((award) => award.year))],
            cards: awards,
          },
        }
      : ABOUT;

  return (
    <AboutPage
      data={data}
      footer={<Footer />}
    />
  );
}
