"use client";

import { LightMode, DarkMode } from "@/assets/svg/Icons";
import { useTheme, type Theme } from "@/util/useTheme";

type ThemeSwitchProps = {
  /** Container class from the caller's stylesheet (keeps each header look). */
  className?: string;
};

const OPTIONS: { theme: Theme; label: string; Icon: typeof LightMode }[] = [
  { theme: "light", label: "Light mode", Icon: LightMode },
  { theme: "dark", label: "Dark mode", Icon: DarkMode },
];

/** Sun/moon pair: the active option carries aria-pressed="true" (styled as selected). */
export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const [theme, setTheme] = useTheme();
  return (
    <span className={className} role="group" aria-label="Theme">
      {OPTIONS.map(({ theme: value, label, Icon }) => (
        <span
          key={value}
          role="button"
          tabIndex={0}
          aria-label={label}
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setTheme(value);
            }
          }}>
          <Icon />
        </span>
      ))}
    </span>
  );
}

export default ThemeSwitch;
