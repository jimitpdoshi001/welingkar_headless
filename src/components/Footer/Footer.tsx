import { getFooterMenu } from "@/lib/drupal";
import { FooterClient } from "./FooterClient";

const Footer = async () => {
  const footerMenu = await getFooterMenu();

  return <FooterClient footerMenu={footerMenu} />;
};

export default Footer;
