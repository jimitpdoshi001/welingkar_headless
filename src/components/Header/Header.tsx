import styles from "./Header.module.scss";
import { Logo } from "@/assets/svg/Logos";
import { Search } from "@/assets/svg/Icons";

const navItems = [
  {
    label: "Who We Are",
    href: "/who-we-are",
  },
  {
    label: "Campus",
    href: "/campus",
  },
  {
    label: "Programmes",
    href: "/programmes",
  },
  {
    label: "Corporate",
    href: "/corporate",
  },
  {
    label: "WeResearch",
    href: "/weresearch",
  },
  {
    label: "WeFactor",
    href: "/wefactor",
  },
];

const headerRow1Right = [
  {
    label: "WeGlobal",
    href: "/",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Media",
    href: "/media",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        {/* Row 1 */}
        <div className={styles.headerRow1}>
          <div className={styles.headerRow1Left}>
            <span className={styles.modeButton}>
              <span>
                <Search />
              </span>
              <span>
                <Search />
              </span>
            </span>
          </div>
          <div className={styles.headerRow1Right}>
            {headerRow1Right.map((item) => (
              <a
                className={styles.navItem}
                key={item.href}
                href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        {/* Row 2 */}
        <div className={styles.headerContent}>
          <div className={styles.leftContent}>
            <Logo
              width={300}
              height={90}
            />

            <div className={styles.navItems}>
              {navItems.map((item) => (
                <a
                  className={styles.navItem}
                  key={item.href}
                  href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.rightContent}>
            <span className={styles.searchButton}>
              <Search />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
