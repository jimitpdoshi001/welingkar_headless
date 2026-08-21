import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.scss";

const frontliner = localFont({
  src: [
    {
      path: "../assets/fonts/Frontliner-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Frontliner-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Tata Steel",
    template: "%s | Tata Steel",
  },
  description: "Headless Tata Steel website powered by Drupal and Next.js",
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
      className={`${frontliner.className}`}>
      <body>{children}</body>
    </html>
  );
}
