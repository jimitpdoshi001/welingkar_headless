import type { NextConfig } from "next";
import { PROFILE_PREFIX, PUBLIC_PATHS } from "./src/lib/seo/public-paths";

const isDev = process.env.NODE_ENV === "development";

const getDrupalHostname = () => {
  try {
    const url = process.env.DRUPAL_BASE_URL || "https://stage.welingkar.org";
    return new URL(url).hostname;
  } catch {
    return "stage.welingkar.org";
  }
};

const drupalHostname = getDrupalHostname();

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://${drupalHostname} https://welinkar.org https://www.welingkar.org https://i.ytimg.com https://img.youtube.com https://images.unsplash.com;
  font-src 'self';
  connect-src 'self';
  media-src 'self' https://${drupalHostname};
  frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.google.com https://maps.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  worker-src 'self' blob:;
  manifest-src 'self';
  ${isDev ? "" : "upgrade-insecure-requests;"}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig: NextConfig = {
  // Pages that load a lot of Drupal content (e.g. home, /node/2) can take over the default 60s
  // when stage Drupal is slow; give each page up to 3 minutes before the build gives up.
  staticPageGenerationTimeout: 180,
  agentRules: false,
  poweredByHeader: false,
  experimental: {
    // Build cache off: a restored Turbopack cache served stale pages (e.g. the
    // Bengaluru campus page kept old faculty links after the data changed).
    turbopackFileSystemCacheForBuild: false,
    sri: {
      algorithm: "sha256",
    },
  },
  images: {
    // Cut Image Optimization metering: cache optimized images 31 days, limit the
    // number of generated variants (sizes/formats/qualities). Verified keys for Next 16.
    minimumCacheTTL: 2678400, // 31 days
    formats: ["image/webp"],
    qualities: [75],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: drupalHostname,
      },
      {
        protocol: "https",
        hostname: "welinkar.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // SEO: the current welingkar.org addresses serve the matching pages here
  // (the address stays in the browser). beforeFiles: applied before pages and
  // prerendered files, so a Drupal page prerendered at the same address by the
  // [[...slug]] catch-all (e.g. /campus-bengaluru) can never win over ours.
  async rewrites() {
    return {
      beforeFiles: [
        ...PUBLIC_PATHS.map(([source, destination]) => ({ source, destination })),
        { source: `${PROFILE_PREFIX.live}/:slug`, destination: `${PROFILE_PREFIX.internal}/:slug` },
        // Live Bengaluru profiles carry a "banglore/" segment.
        { source: `${PROFILE_PREFIX.live}/banglore/:slug`, destination: `${PROFILE_PREFIX.internal}/:slug` },
      ],
    };
  },
  // Old About Us sub-pages are now sections of Who We Are (/who-we-are).
  async redirects() {
    const section = (slug: string, anchor = "") => ({
      source: `/about-us/${slug}`,
      destination: `/who-we-are${anchor ? `#${anchor}` : ""}`,
      permanent: true,
    });
    return [
      section("spm", "spm"),
      section("managing-council", "managing-council"),
      section("chairman-message", "chairman"),
      section("directors-message"),
      section("academic-advisory-board"),
      section("industry-advisory-board"),
      section("awards", "awards"),
      section("vision-mission", "vision-mission"),
      section("college-development-committee", "college-development-committee"),
      // Old "programme" spellings -> "program" (old prefix and old program segments, one hop).
      { source: "/programmes/full-time-programme-in-mumbai", destination: "/programs/full-time-program-in-mumbai", permanent: true },
      { source: "/programmes/full-time-programme-in-mumbai/:path*", destination: "/programs/full-time-program-in-mumbai/:path*", permanent: true },
      { source: "/programs/full-time-programme-in-mumbai", destination: "/programs/full-time-program-in-mumbai", permanent: true },
      { source: "/programs/full-time-programme-in-mumbai/:path*", destination: "/programs/full-time-program-in-mumbai/:path*", permanent: true },
      { source: "/programmes/full-time-programme-in-bengaluru", destination: "/programs/full-time-program-in-bengaluru", permanent: true },
      { source: "/programmes/full-time-programme-in-bengaluru/:path*", destination: "/programs/full-time-program-in-bengaluru/:path*", permanent: true },
      { source: "/programs/full-time-programme-in-bengaluru", destination: "/programs/full-time-program-in-bengaluru", permanent: true },
      { source: "/programs/full-time-programme-in-bengaluru/:path*", destination: "/programs/full-time-program-in-bengaluru/:path*", permanent: true },
      { source: "/programmes/executive-programme-in-mumbai", destination: "/programs/executive-program-in-mumbai", permanent: true },
      { source: "/programmes/executive-programme-in-mumbai/:path*", destination: "/programs/executive-program-in-mumbai/:path*", permanent: true },
      { source: "/programs/executive-programme-in-mumbai", destination: "/programs/executive-program-in-mumbai", permanent: true },
      { source: "/programs/executive-programme-in-mumbai/:path*", destination: "/programs/executive-program-in-mumbai/:path*", permanent: true },
      { source: "/programmes/phd-programme-in-mumbai", destination: "/programs/phd-program-in-mumbai", permanent: true },
      { source: "/programmes/phd-programme-in-mumbai/:path*", destination: "/programs/phd-program-in-mumbai/:path*", permanent: true },
      { source: "/programs/phd-programme-in-mumbai", destination: "/programs/phd-program-in-mumbai", permanent: true },
      { source: "/programs/phd-programme-in-mumbai/:path*", destination: "/programs/phd-program-in-mumbai/:path*", permanent: true },
      { source: "/programmes/11-month-pg-6-month-certificate-programmes", destination: "/programs/11-month-pg-6-month-certificate-programs", permanent: true },
      { source: "/programmes/11-month-pg-6-month-certificate-programmes/:path*", destination: "/programs/11-month-pg-6-month-certificate-programs/:path*", permanent: true },
      { source: "/programs/11-month-pg-6-month-certificate-programmes", destination: "/programs/11-month-pg-6-month-certificate-programs", permanent: true },
      { source: "/programs/11-month-pg-6-month-certificate-programmes/:path*", destination: "/programs/11-month-pg-6-month-certificate-programs/:path*", permanent: true },
      // Old /programmes addresses -> /programs (same path after the prefix).
      { source: "/programmes", destination: "/programs", permanent: true },
      { source: "/programmes/:path*", destination: "/programs/:path*", permanent: true },
      { source: "/programs/executive", destination: "/programs/executive-program-in-mumbai", permanent: true },
      // Old-site campus event lists -> Events listing with that campus pre-selected.
      { source: "/events/mumbai", destination: "/events?campus=mumbai", permanent: true },
      { source: "/events/bengaluru", destination: "/events?campus=bengaluru", permanent: true },
      // Old live-site URLs -> the matching page here (keeps old links and search results working).
      { source: "/programs/full-time-programme/mumbai", destination: "/programs/full-time-program-in-mumbai", permanent: true },
      { source: "/programs/executive-programme/mumbai", destination: "/programs/executive-program-in-mumbai", permanent: true },
      { source: "/programs/executive-programme/bengaluru", destination: "/programs/mdp/bengaluru", permanent: true },
      { source: "/programs/phd-programme", destination: "/programs/phd-program-in-mumbai", permanent: true },
      { source: "/foreign-trade-management", destination: "/programs/foreign-trade-management", permanent: true },
      { source: "/mediaandentertainment", destination: "/programs/executive-program-in-mumbai/media-and-entertainment-management", permanent: true },
      { source: "/fmb/post-graduate-program-in-entrepreneurship-management", destination: "/programs/executive-program-in-mumbai/entrepreneurship-management", permanent: true },
      { source: "/sitemap.html", destination: "/site-map", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
