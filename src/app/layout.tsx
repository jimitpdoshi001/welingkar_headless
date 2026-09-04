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

import { Suspense } from "react";
import { NavigationLoader } from "@/components/Loader/NavigationLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.className}`}>
      <body>
        <Suspense fallback={null}>
          <NavigationLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
