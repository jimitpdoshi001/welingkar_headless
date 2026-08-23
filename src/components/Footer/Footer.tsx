"use client";

import { useState } from "react";
import { Logo } from "@/assets/svg/Logos";
import styles from "./Footer.module.scss";
import { Facebook, Instagram, Twitter, LinkedIn, Youtube } from "@/assets/svg/Icons";
import { useIsMobile } from "@/util/useMediaQuery";

const Footer = () => {
  const isMobile = useIsMobile();
  const [openSection, setOpenSection] = useState<string | null>(null);

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
            <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

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

          {/* Programmes */}
          <div className={styles.footerAccordion}>
            <button
              type="button"
              className={styles.footerAccordionHeader}
              onClick={() => toggleSection("programmes")}
              aria-expanded={openSection === "programmes"}>
              <h6 className="bold">Programmes</h6>

              <span className={`${styles.accordionIcon} ${openSection === "programmes" ? styles.open : ""}`}>+</span>
            </button>

            <div className={`${styles.footerLinks} ${openSection === "programmes" ? styles.footerLinksOpen : ""}`}>
              <a href="#">Programme 1</a>
              <a href="#">Programme 2</a>
              <a href="#">Programme 3</a>
              <a href="#">Programme 4</a>
              <a href="#">Programme 5</a>
              <a href="#">Programme 6</a>
              <a href="#">Programme 7</a>
              <a href="#">Programme 8</a>
              <a href="#">Programme 9</a>
              <a href="#">Programme 10</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerAccordion}>
            <button
              type="button"
              className={styles.footerAccordionHeader}
              onClick={() => toggleSection("quickLinks")}
              aria-expanded={openSection === "quickLinks"}>
              <h6 className="bold">Quick Links</h6>

              <span className={`${styles.accordionIcon} ${openSection === "quickLinks" ? styles.open : ""}`}>+</span>
            </button>

            <div className={`${styles.footerLinks} ${openSection === "quickLinks" ? styles.footerLinksOpen : ""}`}>
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
              <a href="#">Link 4</a>
              <a href="#">Link 5</a>
              <a href="#">Link 6</a>
              <a href="#">Link 7</a>
              <a href="#">Link 8</a>
              <a href="#">Link 9</a>
              <a href="#">Link 10</a>
            </div>
          </div>

          {/* Miscellaneous */}
          <div className={styles.footerAccordion}>
            <button
              type="button"
              className={styles.footerAccordionHeader}
              onClick={() => toggleSection("miscellaneous")}
              aria-expanded={openSection === "miscellaneous"}>
              <h6 className="bold">Miscellaneous</h6>

              <span className={`${styles.accordionIcon} ${openSection === "miscellaneous" ? styles.open : ""}`}>+</span>
            </button>

            <div className={`${styles.footerLinks} ${openSection === "miscellaneous" ? styles.footerLinksOpen : ""}`}>
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
              <a href="#">Link 4</a>
              <a href="#">Link 5</a>
              <a href="#">Link 6</a>
              <a href="#">Link 7</a>
              <a href="#">Link 8</a>
              <a href="#">Link 9</a>
              <a href="#">Link 10</a>
            </div>
          </div>
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
