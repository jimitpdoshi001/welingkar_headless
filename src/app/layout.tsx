import type { Metadata } from "next";
import {
  DM_Sans
} from "next/font/google";

import "@/styles/globals.scss";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Welingkar",
    template: "%s | Welingkar",
  },
  description: "Headless Welingkar website powered by Drupal and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`${sans.variable} ${serif.variable}`}
      className={`${sans.className}`}>
      <body>{children}</body>
    </html>
  );
}
