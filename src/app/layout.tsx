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
  referrer: "strict-origin-when-cross-origin",
  // Stop iOS Safari turning numbers/dates/addresses into blue links.
  formatDetection: { telephone: false, date: false, address: false, email: false },
};

import { Suspense } from "react";
import { NavigationLoader } from "@/components/Loader/NavigationLoader";
import { CityNormalizer } from "@/components/CityNormalizer/CityNormalizer";
import { ImageFallback } from "@/components/ImageFallback/ImageFallback";
import { ScrollAnimationProvider } from "@/components/animations";

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
        <CityNormalizer />
        <ImageFallback />
        <ScrollAnimationProvider>
          {children}
        </ScrollAnimationProvider>
      </body>
    </html>
  );
}
