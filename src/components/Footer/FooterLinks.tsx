"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import style from "./Footer.module.scss";
import { useIsMobile } from "@/util/useMediaQuery";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  href: string;
  links: FooterLink[];
};

type FooterLinksProps = {
  data: FooterSection[];
};

const FooterLinks = ({ data }: FooterLinksProps) => {
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAccordion = (index: number) => {
    if (!isMobile) return;

    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className={style.links_block}>
      {data.map((section, index) => {
        const isOpen = openIndex === index;

        return (
          <div className={style.links_block_item} key={section.title}>
            <ul>
              <li
                className={clsx(
                  style.title,
                  isMobile && style.accordion_title,
                  isOpen && style.accordion_open,
                )}
              >
                <Link
                  href={section.href}
                  onClick={(e) => {
                    if (isMobile) {
                      e.preventDefault();
                      handleAccordion(index);
                    }
                  }}
                >
                  {section.title}
                </Link>

                {isMobile && (
                  <button
                    type="button"
                    className={style.accordion_button}
                    onClick={() => handleAccordion(index)}
                    aria-expanded={isOpen}
                    aria-label={`Toggle ${section.title}`}
                  >
                    <span />
                    <span />
                  </button>
                )}
              </li>

              <div
                className={clsx(
                  style.accordion_content,
                  isOpen && style.accordion_content_open,
                )}
              >
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default FooterLinks;
