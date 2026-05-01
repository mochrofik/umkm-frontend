import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async rewrites() {
    return [
      {
        source: '/edit-product/:id',
        destination: '/dashboard/products/add?id=:id',
      },
    ];
  },

  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.1.8'],

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
