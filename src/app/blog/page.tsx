import type { Metadata } from "next";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
  title: "醫美專欄 Journal｜護膚知識・療程解析・真實個案 | Peko Beauty",
  description:
    "Peko Beauty 醫美專欄：深度解析 Sylfirm X、BTL Exion™、VISIA 皮膚分析等療程原理，分享真實客戶個案及最新護膚科技資訊。每週更新，由旺角朗豪坊資深醫美團隊撰寫。",
  alternates: {
    canonical: "https://www.peko.com.hk/blog",
  },
  openGraph: {
    title: "醫美專欄 Journal｜護膚知識・療程解析・真實個案 | Peko Beauty",
    description:
      "深度解析醫美療程原理，分享真實客戶個案及最新護膚科技資訊。旺角朗豪坊 Peko Beauty 資深團隊撰寫。",
    url: "https://www.peko.com.hk/blog",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Peko Beauty 醫美專欄 Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "醫美專欄 Journal | Peko Beauty",
    description:
      "深度解析醫美療程原理，分享真實客戶個案及最新護膚科技資訊。",
  },
};

export default function BlogPage() {
  return <BlogListingClient />;
}
