import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "2000",
        pathname: "/profile_picture/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "2000",
        pathname: "/product_picture/**",
      },
    ],
  },
};

export default nextConfig;
