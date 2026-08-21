import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tata.thebetaweb.site",
      },
    ],
  },
};

export default nextConfig;
