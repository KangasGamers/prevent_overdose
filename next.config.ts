import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      // The Events tab became Workshops.
      { source: "/events", destination: "/workshops", permanent: true },
      { source: "/events/:slug", destination: "/workshops/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
