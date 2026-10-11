import { HeaderClient } from "./HeaderClient";

/**
 * `transparentHero` makes the header float as the glass/transparent bar over a
 * dark hero image at the top of the page (matching Figma), turning into the
 * solid white bar once the user scrolls past the hero. Pass it on pages that
 * open with a dark hero.
 */
const Header = ({ transparentHero = false }: { transparentHero?: boolean }) => {
  return <HeaderClient transparentHero={transparentHero} />;
};

export default Header;
