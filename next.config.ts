import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // trailingSlash: true 讓 Next.js 產生 /about/index.html 而非 /about.html
  // Apache 共享主機 (SiteGround) 會自動尋找目錄下的 index.html
  // 這是解決靜態部署 403 錯誤的關鍵設定
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
