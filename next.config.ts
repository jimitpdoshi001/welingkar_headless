import type { NextConfig } from "next";

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
  agentRules: false,
  poweredByHeader: false,
  experimental: {
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
