import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** 모바일·태블릿에 맞춘 기본 변형 폭 (불필요하게 큰 원본 전송 방지) */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    /** `quality` prop 허용 범위 */
    qualities: [65, 70, 75, 80, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
