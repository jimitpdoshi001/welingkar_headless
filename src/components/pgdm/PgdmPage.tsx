import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import Link from "next/link";

import type { PgdmData } from "@/lib/pgdm/pgdm-data";
import { PgdmHero } from "./PgdmHero/PgdmHero";
import { PgdmStatBar } from "./PgdmStatBar/PgdmStatBar";
import { PgdmObjectives } from "./PgdmObjectives/PgdmObjectives";
import { PgdmOutcomes } from "./PgdmOutcomes/PgdmOutcomes";
import { PgdmUspBand } from "./PgdmUspBand/PgdmUspBand";
import { PgdmStrengths } from "./PgdmStrengths/PgdmStrengths";
import { PgdmPedagogy } from "./PgdmPedagogy/PgdmPedagogy";
import { PgdmInnovative } from "./PgdmInnovative/PgdmInnovative";
import { PgdmFaculty } from "./PgdmFaculty/PgdmFaculty";
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

          {/* Figma 2344:932: purple stats strip directly under the hero. */}
          <PgdmStatBar stats={data.bandStats} />

          {/* 3. Why this Program */}
          <section
            id="overview"
            className={`container ${styles.block} ${styles.anchor}`}>
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

          {/* 4. Our Vision / Our Mission */}
          <section className={`${styles.band} ${styles.visionBand}`}>
            <div className={`container ${styles.block}`}>
              <PgdmVisionMission data={data.visionMission} />
            </div>
          </section>

          {/* 5. Program Educational Objectives */}
          <section className={`container ${styles.block}`}>
            <PgdmObjectives data={data.educationalObjectives} />
          </section>

          {/* 6. Program Outcomes */}
          <section className={styles.band}>
            <div className={`container ${styles.block}`}>
              <PgdmOutcomes data={data.outcomes} />
            </div>
          </section>

          {/* 7. Program Strengths */}
          <section className={`container ${styles.block}`}>
            <PgdmStrengths data={data.strengths} />
          </section>

          {/* 8. Student-Centric Pedagogy */}
          <section className={`container ${styles.block}`}>
            <PgdmPedagogy data={data.studentPedagogy} />
          </section>

          {/* 9. Program USPs */}
          <PgdmUspBand data={data.uspBand} />

          {/* 10. Innovative Teaching and Learning Pedagogy */}
          <PgdmInnovative data={data.innovativePedagogy} />

          {/* 11. Program Faculty */}
          <section className={`container ${styles.block}`}>
            <PgdmFaculty data={data.programFaculty} />
          </section>

          {/* 12. Curriculum Description */}
          <section
            id="curriculum"
            className={`${styles.band} ${styles.anchor}`}>
            <div className={`container ${styles.block}`}>
              <PgdmCurriculum data={data.curriculum} />
            </div>
          </section>

          {/* 13. Class profile */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <PgdmClassProfile data={data.classProfile} />
            </div>
          </section>

          {/* 14. Career Opportunities */}
          <section className={`container ${styles.block}`}>
            <PgdmCareer data={data.career} />
          </section>

          {/* 15. Placement Opportunities (Figma 669:344: one photo band). */}
          <div
            id="placements"
            className={`${styles.placementBand} ${styles.anchor}`}
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

          {/* 16. Admission and Course Fees */}
          <section className="bg-light-yellow">
            <div className={`container ${styles.block}`}>
              <PgdmFees data={data.fees} />
            </div>
          </section>

          {/* 17. Who Should Apply */}
          <section className={`container ${styles.block}`}>
            <PgdmWhoApply data={data.whoApply} />
          </section>

          {/* 18. Shortlisting Criteria */}
          <section className={`container ${styles.blockTight}`}>
            <PgdmShortlistTable data={data.shortlisting} />
          </section>

          {/* 19. Student Achievements */}
          <section className={`container ${styles.block}`}>
            <PgdmAchievements data={data.achievements} />
          </section>

          {/* 20. Straight from Our Community: reuse the home page's animated section. */}
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

          {/* 21. FAQs */}
          <section
            id="faqs"
            className={`container ${styles.block} ${styles.anchor}`}>
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
