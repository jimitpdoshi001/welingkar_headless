"use client";

import { useState } from "react";
import { Logo } from "@/assets/svg/Logos";
import styles from "./Footer.module.scss";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Youtube,
} from "@/assets/svg/Icons";
import { useIsMobile } from "@/util/useMediaQuery";
import { AccordionDown } from "@/assets/svg/Arrows";
import type { FooterLink } from "@/lib/drupal";

interface FooterClientProps {
  footerMenu: FooterLink[];
}

export function FooterClient({ footerMenu }: FooterClientProps) {
  const isMobile = useIsMobile();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="bg-light pt-6">
      <div className="container">
        {/* Wrapper lets mobile reorder logo, about, form and menus (Figma). */}
        <div className={styles.footerBody}>
          {/* Row 1 */}
          <div className={styles.footerTop}>
            <Logo width={isMobile ? 200 : 200} height={isMobile ? 60 : 60} />

            <form className={styles.footerSubscribeForm}>
              <input type="email" placeholder="Enter your email" />

              <button className="btn primary" type="submit">
                Subscribe
              </button>
            </form>
          </div>

          {/* Row 2 */}
          <div className={styles.footerLinksRow}>
            {/* About */}
            <div className={styles.footerAbout}>
              <p className="mb-2">
                Prin. L. N. Welingkar Institute of Management Development and
                Research (WeSchool) is one of the torchbearers for progressive
                higher education today.
              </p>

              <div className={`f gap2 ai-c ${styles.footerSocial}`}>
                <a href="https://www.facebook.com/Welingkar" target="_blank" rel="noopener noreferrer" aria-label="WeSchool on Facebook">
                  <Facebook />
                </a>
                <a href="https://www.instagram.com/welingkareducation/" target="_blank" rel="noopener noreferrer" aria-label="WeSchool on Instagram">
                  <Instagram />
                </a>
                <a href="https://x.com/welingkarinst" target="_blank" rel="noopener noreferrer" aria-label="WeSchool on X">
                  <Twitter />
                </a>
                <a href="https://in.linkedin.com/company/welingkar-fmb" target="_blank" rel="noopener noreferrer" aria-label="WeSchool on LinkedIn">
                  <LinkedIn />
                </a>
                <a href="https://www.youtube.com/user/WelingkarInstitute" target="_blank" rel="noopener noreferrer" aria-label="WeSchool on YouTube">
                  <Youtube />
                </a>
              </div>
            </div>

            {/* Dynamic Footer Menus */}
            {footerMenu.map((section) => (
              <div className={styles.footerAccordion} key={section.id}>
                <button
                  type="button"
                  className={styles.footerAccordionHeader}
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={openSection === section.id}
                >
                  <h6 className="bold">{section.title}</h6>

                  <span
                    className={`${styles.accordionIcon} ${openSection === section.id ? styles.open : ""}`}
                  >
                    <AccordionDown width={12} height={8} />
                  </span>
                </button>

                <div
                  className={`${styles.footerLinks} ${openSection === section.id ? styles.footerLinksOpen : ""}`}
                >
                  {section.children?.map((link) =>
                    // No page yet: plain text instead of a dead "#" link.
                    link.url && link.url !== "#" ? (
                      <a href={link.url} key={link.id}>
                        {link.title}
                      </a>
                    ) : (
                      <span key={link.id}>{link.title}</span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className={styles.footerCopyright}>
          <p suppressHydrationWarning>
            ©Copyright {new Date().getFullYear()}. weschool
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterClient;
