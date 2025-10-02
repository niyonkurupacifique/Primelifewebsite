import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Prevents ESLint errors from blocking `next build`
    ignoreDuringBuilds: true,
  },
  /* you can keep other Next.js config options here */
};

export default nextConfig;
