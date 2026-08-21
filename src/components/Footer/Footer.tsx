"use client";

import React, { useEffect, useState } from "react";
import style from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import logo from "@/assets/svg/Tata-Steel.svg";

import {
  Instagram,
  LinkedIn,
  Youtube,
  Facebook,
  Twitter,
} from "@/assets/svg/Icons";

import FooterLinks, { FooterSection, FooterLink } from "./FooterLinks";

type FooterApiItem = {
  label: string;
  link: string;
  target?: string;
  submenu?: FooterApiItem[];
};

type FooterApiResponse = {
  menu: FooterApiItem[];
  secondary_menu: FooterApiItem[];
};

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterSection[]>([]);
  const [secondaryMenu, setSecondaryMenu] = useState<FooterLink[]>([]);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        const response = await fetch(
          `${API_BASE_URL}/api/footer-menu`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData: FooterApiResponse = await response.json();

        console.log("FOOTER MENU RAW DATA:", responseData);

        // Main footer menu
        const mappedFooterData: FooterSection[] = responseData.menu.map(
          (item) => ({
            title: item.label.trim(),
            href: item.link,
            links: (item.submenu || []).map((child) => ({
              label: child.label.trim(),
              href: child.link,
            })),
          }),
        );

        // Secondary footer menu
        const mappedSecondaryMenu: FooterLink[] =
          responseData.secondary_menu.map((item) => ({
            label: item.label.trim(),
            href: item.link,
          }));

        setFooterData(mappedFooterData);
        setSecondaryMenu(mappedSecondaryMenu);

        console.log("MAPPED FOOTER DATA:", mappedFooterData);
        console.log("MAPPED SECONDARY MENU:", mappedSecondaryMenu);
      } catch (error) {
        console.error("FOOTER MENU ERROR:", error);
      }
    };

    fetchFooterMenu();
  }, []);

  return (
    <footer
      className={clsx(
        style.footer,
        "bg-gradient-blue",
        "text-white",
        "tata-curve",
        "pt-6",
        "overflow-hidden",
      )}
    >
      <div className={style.footer_container}>
        <div className={style.footer_top}>
          {/* LEFT BLOCK */}
          <div className={style.left_block}>
            <Image src={logo} alt="logo" height={80} />

            <div className={style.social_icons}>
              <ul>
                <li>
                  <a href="#">
                    <Youtube />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <Facebook />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <Twitter />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <Instagram />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <LinkedIn />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT BLOCK */}
          <div className={style.right_block}>
            {/* SUBSCRIPTION */}
            <div className={style.subscription_block}>
              <div className={style.text_block}>
                <h5 className="mb-1">Stay ahead with steel</h5>

                <p>
                  Market insight, product news, sustainability updates
                  <br />
                  and IR alerts.
                </p>
              </div>

              <div className={style.form_block}>
                <form>
                  <input type="email" placeholder="Your Email ID" />

                  <button
                    type="submit"
                    className={clsx(
                      "btn",
                      "primary",
                      "noArrow",
                      style.subscribe_btn,
                    )}
                  >
                    <span className="text">Subscribe</span>
                  </button>
                </form>
              </div>
            </div>

            {/* MAIN FOOTER MENU */}
            <FooterLinks data={footerData} />
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className={style.footer_bottom}>
        <div className={`${style.ft_container} container`}>
          <div className={style.left}>
            <p className={`${style.copyright} tiny text-white`}>
              © Copyright Tata Steel 2026. All rights reserved.
            </p>
          </div>

          <div className={style.right}>
            <ul>
              {secondaryMenu.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
