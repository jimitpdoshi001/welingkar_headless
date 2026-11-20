import { getFooterMenu } from "@/lib/drupal";
import { FooterClient } from "./FooterClient";

/** Backup: previous footer driven by the Drupal footer menu. */
const FooterLegacy = async () => {
  const footerMenu = await getFooterMenu();

  return <FooterClient footerMenu={footerMenu} />;
};

export default FooterLegacy;
