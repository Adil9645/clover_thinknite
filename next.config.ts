import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
// next.config.js
module.exports = {
  images: {
    domains: ["a.slack-edge.com"],
  },
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
