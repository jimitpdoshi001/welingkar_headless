import { FOOTER_MENU } from "@/lib/footer/footer-config";
import { FooterClient } from "./FooterClient";

/** Footer per the approved sheet (static columns). Backup: FooterLegacy (Drupal menu). */
const Footer = () => <FooterClient footerMenu={FOOTER_MENU} />;

export default Footer;
