import { getTopMenu } from "@/lib/drupal";
import { HeaderClient } from "./HeaderClient";

const Header = async () => {
  const topMenu = await getTopMenu();

  return <HeaderClient topMenu={topMenu} />;
};

export default Header;
