import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import Footer from "@/components/Footer/Footer";
import { ABOUT } from "@/lib/about/about-data";
import { getAwards } from "@/lib/drupal/awards";
import { applyAboutFromDrupal } from "@/lib/drupal/about";

export const metadata: Metadata = {
  title: "About Us — WeSchool",
  description: "Prin. L. N. Welingkar Institute of Management Development and Research — a legacy of learning and leadership.",
};

export default async function Page() {
  // Honours & Achievements from Drupal ("Who We Are – Awards"); built-in cards if unavailable.
  const awards = await getAwards();
  // Section texts from Drupal ("About Us" node); built-in where Drupal is empty.
  const base = await applyAboutFromDrupal(ABOUT);
  const data =
    awards && awards.length
      ? {
          ...base,
          honours: {
            ...base.honours,
            years: [...new Set(awards.map((award) => award.year))],
            cards: awards,
          },
        }
      : base;

  return (
    <AboutPage
      data={data}
      footer={<Footer />}
    />
  );
}
