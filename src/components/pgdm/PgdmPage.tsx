import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { SearchProvider } from "@/components/SearchOverlay/search-context";
import Link from "next/link";
import { VideoPopup } from "@/components/campus/VideoPopup/VideoPopup";

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
import { PgdmScholarship } from "./PgdmScholarship/PgdmScholarship";
import { PgdmStudentInitiatives } from "./PgdmStudentInitiatives/PgdmStudentInitiatives";
import styles from "./PgdmPage.module.scss";
import { PgdmReadMore } from "./common/PgdmReadMore";

type PgdmPageProps = {
  data: PgdmData;
  accent: "orange" | "green";
};

export function PgdmPage({ data, accent }: PgdmPageProps) {
  const hasPlacement =
    data.placement.years.length > 0 || data.placement.paragraphs.length > 0;
  const hasRecruiters =
    data.placement.whyRecruit.paragraphs.length > 0 ||
    data.placement.steps.length > 0 ||
    // Our Recruiters needs logos; its text is only a disclaimer under them.
    data.recruiters.logos.length > 0;

  const accentVar =
    accent === "orange" ? "var(--color-orange)" : "var(--color-primary)";

  return (
    <SearchProvider>
      <div className="GlobalLayout">
        <Header transparentHero />

        <main
          className={`${styles.justify} ${accent === "orange" ? styles.orangeCtas : ""}`}
          style={
            {
              "--faculty-accent": accentVar,
              // Campus palette — Mumbai: purple bands, orange accents,
              // lavender tint. Bengaluru: terracotta bands, green accents,
              // pink tint (site-wide Bengaluru theme, e.g. listing/MDC pages).
              "--pgdm-band": accent === "orange" ? "#4a3460" : "#b04535",
              "--pgdm-tint": accent === "orange" ? "#ece7f6" : "#fff4f2",
              "--pgdm-stat": accent === "orange" ? "#6a4a8c" : "#b04535",
            } as React.CSSProperties
          }
        >
          <PgdmHero data={data.hero} />

          {/* Sections render only when they have content (Drupal pages hide empty ones). */}
          {/* Figma 2344:932: purple stats strip directly under the hero. */}
          {data.bandStats.length > 0 ? (
            <PgdmStatBar stats={data.bandStats} />
          ) : null}

          {/* 3. Why this Program (Figma 2424:386 + 2344:945): text left, photo right,
              pale green arrow watermark on the left edge. */}
          {data.whyProgram.body ? (
            <section
              id="overview"
              className={`${styles.whySection} ${styles.anchor}`}
            >
              <div className={`container ${styles.whyGrid}`}>
                <div className={styles.whyText}>
                  <h2 className={styles.whyHeading}>
                    {data.whyProgram.heading}
                  </h2>
                  {data.whyProgram.html ? (
                    // Sanitized server-side (program-listing listHtml): lists keep their bullets.
                    <PgdmReadMore
                      html={data.whyProgram.html}
                      className={`${styles.whyBody} ${styles.whyRich}`}
                    />
                  ) : (
                    <PgdmReadMore text={data.whyProgram.body} className={styles.whyBody} />
                  )}
                </div>
                {/* Drupal field_type "video": the photo opens the video in a popup. */}
                {!data.whyProgram.videoThumb ? null : data.whyProgram
                    .videoHref && data.whyProgram.videoHref !== "#" ? (
                  <VideoPopup
                    videoUrl={data.whyProgram.videoHref}
                    title={data.whyProgram.heading}
                    className={styles.whyVideoLink}
                  >
                    <img
                      src={data.whyProgram.videoThumb}
                      alt=""
                      className={styles.whyPhoto}
                    />
                    {/* Play button: marks the photo as a video. */}
                    <span className={styles.whyPlay} aria-hidden="true">
                      <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="31" fill="var(--faculty-accent, var(--color-primary))" />
                        <path d="M26 20L46 32L26 44V20Z" fill="white" />
                      </svg>
                    </span>
                  </VideoPopup>
                ) : (
                  <img
                    src={data.whyProgram.videoThumb}
                    alt=""
                    className={styles.whyPhoto}
                  />
                )}
              </div>
            </section>
          ) : null}

          {/* 4. Our Vision / Our Mission */}
          {data.visionMission.vision.body ||
          data.visionMission.mission.lines.length > 0 ? (
            <section className={`${styles.band} ${styles.visionBand}`}>
              <div className={`container ${styles.block}`}>
                <PgdmVisionMission data={data.visionMission} />
              </div>
            </section>
          ) : null}

          {/* 5. Program Educational Objectives */}
          {data.educationalObjectives.items.length > 0 ? (
            <section className={`container ${styles.block}`}>
              <PgdmObjectives data={data.educationalObjectives} />
            </section>
          ) : null}

          {/* 6. Program Outcomes */}
          {data.outcomes.items.length > 0 ? (
            <section className={styles.band}>
              <div className={`container ${styles.block}`}>
                <PgdmOutcomes data={data.outcomes} />
              </div>
            </section>
          ) : null}

          {/* 7. Program Strengths */}
          {data.strengths.cards.length > 0 ? (
            <PgdmStrengths data={data.strengths} />
          ) : null}

          {/* 8. Student-Centric Pedagogy */}
          {data.studentPedagogy.bullets.length > 0 ||
          data.studentPedagogy.intro ? (
            <section className={`container ${styles.pedagogyBlock}`}>
              <PgdmPedagogy data={data.studentPedagogy} />
            </section>
          ) : null}

          {/* 9. Program USPs */}
          {data.uspBand.cards.length > 0 ? (
            <PgdmUspBand data={data.uspBand} />
          ) : null}

          {/* 10. Innovative Teaching and Learning Pedagogy */}
          {data.innovativePedagogy.links.length > 0 ? (
            <PgdmInnovative data={data.innovativePedagogy} />
          ) : null}

          {/* 11. Program Faculty */}
          {data.programFaculty.people.length > 0 ? (
            <section className={`container ${styles.block}`}>
              <PgdmFaculty data={data.programFaculty} />
            </section>
          ) : null}

          {/* Scholarships (after Program Faculty; PGDM Healthcare). */}
          {data.scholarship ? (
            <section className={`container ${styles.block}`}>
              <PgdmScholarship data={data.scholarship} />
            </section>
          ) : null}

          {/* 12. Curriculum Description */}
          {data.curriculum.trimesters.length > 0 ? (
            <section
              id="curriculum"
              className={`${styles.band} ${styles.anchor}`}
            >
              <div className={`container ${styles.block}`}>
                <PgdmCurriculum data={data.curriculum} />
              </div>
            </section>
          ) : null}

          {/* 13. Class profile */}
          {data.classProfile.items.length > 0 ? (
            <section className="bg-light-yellow">
              <div className={`container ${styles.block}`}>
                <PgdmClassProfile data={data.classProfile} />
              </div>
            </section>
          ) : null}

          {/* 14. Career Opportunities */}
          {data.career.description || data.career.tabs.length > 0 ? (
            <section className={`container ${styles.block}`}>
              <PgdmCareer data={data.career} />
            </section>
          ) : null}

          {/* 15. Placement Opportunities (Figma 669:344: one photo band). */}
          {hasPlacement || hasRecruiters ? (
            <div
              id="placements"
              className={`${styles.placementBand} ${styles.anchor}`}
              style={
                {
                  // CSS reads --bg, and --bg-mobile on phones when Drupal supplies one.
                  ...(data.placement.image
                    ? { "--bg": `url(${data.placement.image})` }
                    : {}),
                  ...(data.placement.imageMobile
                    ? { "--bg-mobile": `url(${data.placement.imageMobile})` }
                    : {}),
                } as React.CSSProperties
              }
            >
              {hasPlacement ? (
                <PgdmPlacement data={data.placement} bare />
              ) : null}

              {hasRecruiters ? (
                <section>
                  <div className={`container ${styles.block}`}>
                    {data.placement.whyRecruit.paragraphs.length > 0 ||
                    data.placement.steps.length > 0 ? (
                      <PgdmWhyRecruit
                        data={data.placement.whyRecruit}
                        steps={data.placement.steps}
                      />
                    ) : null}
                    {data.recruiters.logos.length > 0 ? (
                      <div className={styles.recruiters}>
                        <PgdmRecruiters data={data.recruiters} />
                      </div>
                    ) : null}
                  </div>
                </section>
              ) : null}
            </div>
          ) : null}

          {/* 16. Admission and Course Fees */}
          {data.fees.cards.length > 0 ||
          data.fees.waiver.bullets.length > 0 ||
          data.fees.eligibility.bullets.length > 0 ||
            Boolean(data.fees.admissions) ||
            Boolean(data.fees.loan) ? (
            <section className="bg-light-yellow">
              <div className={`container ${styles.block}`}>
                <PgdmFees data={data.fees} />
              </div>
            </section>
          ) : null}

          {/* 17. Who Should Apply */}
          {data.whoApply.cards.some((c) => c.body) ? (
            <section className={`container ${styles.block}`}>
              <PgdmWhoApply data={data.whoApply} />
            </section>
          ) : null}

          {/* 18. Shortlisting Criteria */}
          {data.shortlisting.rows.length > 0 ? (
            <section className={`container ${styles.blockTight}`}>
              <PgdmShortlistTable data={data.shortlisting} />
            </section>
          ) : null}

          {/* Student Initiatives (above Student Achievements; PGDM Healthcare). */}
          {data.studentInitiatives && data.studentInitiatives.items.length > 0 ? (
            <section className={`container ${styles.block}`}>
              <PgdmStudentInitiatives data={data.studentInitiatives} />
            </section>
          ) : null}

          {/* 19. Student Achievements */}
          {data.achievements.items.length > 0 ? (
            <section className={`bg-light-yellow ${styles.achievementsBand}`}>
              <div className={`container ${styles.block}`}>
                <PgdmAchievements data={data.achievements} />
              </div>
            </section>
          ) : null}

          {/* 20. Straight from Our Community: reuse the home page's animated section. */}
          {data.community.testimonials.length > 0 ? (
            <section className={styles.communitySection}>
              <HomeCommunitySection
                testimonials={data.community.testimonials.map((t) => ({
                  id: t.id,
                  quote: t.quote,
                  name: t.name,
                  role: t.role,
                  avatar: t.avatar,
                  avatarAlt: t.name,
                  videoUrl: t.videoUrl,
                  watchUrl: t.watchUrl,
                }))}
              >
                <h2 className={styles.communityHeading}>
                  {data.community.heading}
                </h2>
                <p className={styles.communityDesc}>
                  {data.community.description}
                </p>
                <Link href={data.community.cta.href} className="btn accent">
                  {data.community.cta.label}
                </Link>
              </HomeCommunitySection>
            </section>
          ) : null}

          {/* 21. FAQs */}
          {/* FAQs and/or the Download Brochure button (shown even without FAQs). */}
          {data.faqs.items.length > 0 || data.faqs.brochureCta.href ? (
            <section
              id="faqs"
              // Brochure button only (no FAQs): compact spacing; with FAQs: unchanged.
              className={`container ${data.faqs.items.length > 0 ? styles.block : styles.brochureOnly} ${styles.anchor}`}
            >
              <PgdmFaqs data={data.faqs} />
            </section>
          ) : null}
        </main>

        <SearchOverlay />
        <ScrollToTop />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default PgdmPage;
