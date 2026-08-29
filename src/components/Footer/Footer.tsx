"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/assets/svg/Logos";
import styles from "./Footer.module.scss";
import { Facebook, Instagram, Twitter, LinkedIn, Youtube } from "@/assets/svg/Icons";
import { useIsMobile } from "@/util/useMediaQuery";

interface FooterLink {
  id: string;
  title: string;
  url: string;
  weight: string;
  menu: string;
  children: FooterLink[];
}

const Footer = () => {
  const isMobile = useIsMobile();

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [footerMenu, setFooterMenu] = useState<FooterLink[]>([]);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/footer-menu`);

        if (!response.ok) {
          throw new Error("Failed to fetch footer menu");
        }

        const result = await response.json();

        console.log("result", result);

        if (result?.status && Array.isArray(result?.data)) {
          setFooterMenu(result.data);
        }
      } catch (error) {
        console.error("Error fetching footer menu:", error);
      }
    };

    fetchFooterMenu();
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="bg-light pt-6">
      <div className="container">
        {/* Row 1 */}
        <div className={styles.footerTop}>
          <Logo
            width={isMobile ? 200 : 300}
            height={isMobile ? 60 : 80}
          />

          <form className={styles.footerSubscribeForm}>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button
              className="btn primary"
              type="submit">
              Subscribe
            </button>
          </form>
        </div>

        {/* Row 2 */}
        <div className={styles.footerLinksRow}>
          {/* About */}
          <div className={styles.footerAbout}>
            <p className="mb-2">Prin. L. N. Welingkar Institute of Management Development and Research (WeSchool) is one of the torchbearers for progressive higher education today.</p>

            <div className="f gap2 ai-c">
              <a href="#">
                <Facebook />
              </a>
              <a href="#">
                <Instagram />
              </a>
              <a href="#">
                <Twitter />
              </a>
              <a href="#">
                <LinkedIn />
              </a>
              <a href="#">
                <Youtube />
              </a>
            </div>
          </div>

          {/* Dynamic Footer Menus */}
          {footerMenu.map((section) => (
            <div
              className={styles.footerAccordion}
              key={section.id}>
              <button
                type="button"
                className={styles.footerAccordionHeader}
                onClick={() => toggleSection(section.id)}
                aria-expanded={openSection === section.id}>
                <h6 className="bold">{section.title}</h6>

                <span className={`${styles.accordionIcon} ${openSection === section.id ? styles.open : ""}`}>+</span>
              </button>

              <div className={`${styles.footerLinks} ${openSection === section.id ? styles.footerLinksOpen : ""}`}>
                {section.children?.map((link) => (
                  <a
                    href={link.url || "#"}
                    key={link.id}>
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div className={styles.footerCopyright}>
          <p>©Copyright {new Date().getFullYear()}. weschool</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
