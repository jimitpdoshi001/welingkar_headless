import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import { FacultyProfile } from "@/components/faculty/FacultyProfile/FacultyProfile";
import { getFacultyDirectory, getFacultyProfile } from "@/lib/drupal/faculty-api";

type Params = { params: Promise<{ slug: string }> };

// One profile page per Drupal faculty node (/about-us/faculty/<name-slug>).
export async function generateStaticParams() {
  const all = await getFacultyDirectory();
  return (all ?? []).map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getFacultyProfile(slug);
  return profile
    ? { title: `${profile.name} — Faculty | Welingkar`, description: profile.designation || "Faculty — Welingkar" }
    : { title: "Faculty — Welingkar" };
}

export default async function FacultyMemberPage({ params }: Params) {
  const { slug } = await params;
  const profile = await getFacultyProfile(slug);
  if (!profile) notFound();

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header />

        <main style={{ ["--faculty-accent" as string]: "var(--color-orange)" }}>
          <FacultyProfile data={profile} />
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}
