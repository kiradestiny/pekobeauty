import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/thank-you",   // 感謝頁不需 index
          "/api/",        // API 路由不需 index
        ],
      },
    ],
    sitemap: "https://www.peko.com.hk/sitemap.xml",
    host: "https://www.peko.com.hk",
  };
}
