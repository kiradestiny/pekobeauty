import type { Metadata } from "next";
import ConcernsClient from "./ConcernsClient";

export const metadata: Metadata = {
  title: "肌膚困擾解決方案 | Peko Beauty 醫學美容旺角朗豪坊",
  description:
    "8 大肌膚困擾分類：凹凸洞、色斑荷爾蒙斑、鬆弛下垂、暗瘡印毛孔、泛紅玫瑰痤瘡、黑眼圈眼袋、瘦身溶脂、私密健康護理。以 VISIA AI 分析配對最適合的醫美療程，旺角朗豪坊 Peko Beauty，絕無 Hard Sell。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns",
  },
  openGraph: {
    title: "肌膚困擾解決方案 | Peko Beauty 醫學美容旺角朗豪坊",
    description:
      "8 大肌膚困擾分類，VISIA AI 分析配對最適合療程。旺角朗豪坊 Peko Beauty，絕無 Hard Sell。",
    url: "https://www.peko.com.hk/concerns",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Peko Beauty 旺角朗豪坊 肌膚困擾解決方案",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "肌膚困擾解決方案 | Peko Beauty 醫學美容",
    description:
      "8 大肌膚困擾分類，VISIA AI 分析配對最適合療程。旺角朗豪坊 Peko Beauty。",
  },
};

export default function ConcernsPage() {
  return <ConcernsClient />;
}
