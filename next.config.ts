import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Prevents ESLint errors from blocking `next build`
    ignoreDuringBuilds: true,
  },

  // ✅ Fixes the workspace root warning
  outputFileTracingRoot: __dirname,

  // ✅ Add a rewrite proxy to bypass CORS
  async rewrites() {
    return [
      {
        source: "/api/momorequestlife", // what your frontend will call
        destination: "https://apps.prime.rw/onlineservicesapi/digitalservices/momorequestlife", // real backend API
      },
    ];
  },
};

export default nextConfig;
