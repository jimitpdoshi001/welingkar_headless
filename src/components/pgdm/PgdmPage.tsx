import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import Link from "next/link";

import type { PgdmData } from "@/lib/pgdm/pgdm-data";
import { PgdmHero } from "./PgdmHero/PgdmHero";
import { PgdmFeatureGrid } from "./PgdmFeatureGrid/PgdmFeatureGrid";
import { PgdmGlance } from "./PgdmGlance/PgdmGlance";
import { PgdmWhoApply } from "./PgdmWhoApply/PgdmWhoApply";
import { PgdmShortlistTable } from "./PgdmShortlistTable/PgdmShortlistTable";
import { PgdmCurriculum } from "./PgdmCurriculum/PgdmCurriculum";
import { PgdmVisionMission } from "./PgdmVisionMission/PgdmVisionMission";
import { PgdmClassProfile } from "./PgdmClassProfile/PgdmClassProfile";
import { PgdmCareer } from "./PgdmCareer/PgdmCareer";
import { PgdmAchievements } from "./PgdmAchievements/PgdmAchievements";
import { PgdmPlacement } from "./PgdmPlacement/PgdmPlacement";
import { PgdmWhyRecruit } from "./PgdmWhyRecruit/PgdmWhyRecruit";
import { PgdmRecruiters } from "./PgdmRecruiters/PgdmRecruiters";
import { PgdmFees } from "./PgdmFees/PgdmFees";
import { HomeCommunitySection } from "@/components/paragraphs/HomeCommunitySection/HomeCommunitySection";
import { PgdmFaqs } from "./PgdmFaqs/PgdmFaqs";
import styles from "./PgdmPage.module.scss";

type PgdmPageProps = {
  data: PgdmData;
  accent: "orange" | "green";
};

export function PgdmPage({ data, accent }: PgdmPageProps) {
  const accentVar =
    accent === "orange" ? "var(--color-orange)" : "var(--color-primary)";

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main
          className={accent === "orange" ? styles.orangeCtas : undefined}
          style={
            {
              "--faculty-accent": accentVar,
              // Figma: Mumbai bands are purple, Bengaluru bands terracotta.
              "--pgdm-band": accent === "orange" ? "#4a3460" : "#b04535",
            } as React.CSSProperties
          }
        >
          <PgdmHero data={data.hero} />

          <section className={`container ${styles.block}`}>
            <div className={styles.whyGrid}>
              <div>
                <h2 className={styles.whyHeading}>{data.whyProgram.heading}</h2>
                <p className={styles.whyBody}>{data.whyProgram.body}</p>
              </div>
              <Link
                href={data.whyProgram.videoHref || "#"}
                className={styles.videoCard}
                aria-label="Play program video"
              >
                <img
                  src={data.whyProgram.videoThumb}
                  alt=""
                  className={styles.videoThumb}
                />
                <span className={styles.playButton} aria-hidden="true">
                  ▶
                </span>
              </Link>
            </div>
          </section>

          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <PgdmFeatureGrid
                heading="Quick Reasons"
                headingAlign="center"
                items={data.quickReasons}
                columns={3}
              />
            </div>
          </section>

          <section className={styles.band}>
            <div className={`container ${styles.block}`}>
              <PgdmFeatureGrid
                heading="Program USPs"
                items={data.usps}
                columns={4}
                theme="onDark"
              />
            </div>
          </section>

          <PgdmGlance data={data.glance} />

          <section className={`container ${styles.block}`}>
            <PgdmWhoApply data={data.whoApply} />
          </section>

          <section className={`container ${styles.blockTight}`}>
            <PgdmShortlistTable data={data.shortlisting} />
          </section>

          <section className={styles.band}>
            <div className={`container ${styles.block}`}>
              <PgdmCurriculum data={data.curriculum} />
            </div>
          </section>

          <section className={`${styles.band} ${styles.visionBand}`}>
            <div className={`container ${styles.blockTop0}`}>
              <PgdmVisionMission data={data.visionMission} />
            </div>
          </section>

          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <PgdmClassProfile data={data.classProfile} />
            </div>
          </section>

          <section className={`container ${styles.block}`}>
            <PgdmCareer data={data.career} />
          </section>

          <section className={`container ${styles.block}`}>
            <PgdmAchievements data={data.achievements} />
          </section>

          {/* Figma 669:344: one photo band behind placement stats, why-recruit and recruiters. */}
          <div
            className={styles.placementBand}
            style={{ backgroundImage: `url(${data.placement.image})` }}
          >
            <PgdmPlacement data={data.placement} bare />

            <section>
              <div className={`container ${styles.block}`}>
                <PgdmWhyRecruit
                  data={data.placement.whyRecruit}
                  steps={data.placement.steps}
                />
                <div className={styles.recruiters}>
                  <PgdmRecruiters data={data.recruiters} />
                </div>
              </div>
            </section>
          </div>

          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <PgdmFees data={data.fees} />
            </div>
          </section>

          {/* Straight from Our Community: reuse the home page's animated section. */}
          <section className={styles.communitySection}>
            <HomeCommunitySection
              testimonials={data.community.testimonials.map((t) => ({
                id: t.id,
                quote: t.quote,
                name: t.name,
                role: t.role,
                avatar: t.avatar,
                avatarAlt: t.name,
              }))}>
              <h2 className={styles.communityHeading}>{data.community.heading}</h2>
              <p className={styles.communityDesc}>{data.community.description}</p>
              <Link
                href={data.community.cta.href}
                className="btn accent">
                {data.community.cta.label}
              </Link>
            </HomeCommunitySection>
          </section>

          <section className={`container ${styles.block}`}>
            <PgdmFaqs data={data.faqs} />
          </section>
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default PgdmPage;
