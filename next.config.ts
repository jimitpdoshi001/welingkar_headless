import type { NextConfig } from "next";

const getDrupalHostname = () => {
  try {
    const url = process.env.DRUPAL_BASE_URL || "https://stage.welingkar.org";
    return new URL(url).hostname;
  } catch {
    return "stage.welingkar.org";
  }
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getDrupalHostname(),
      },
      {
        protocol: "https",
        hostname: "welinkar.org",
      },
    ],
  },
};

export default nextConfig;
