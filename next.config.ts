import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.fiktech.my.id",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
