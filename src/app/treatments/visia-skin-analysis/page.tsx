import type { Metadata } from "next";
import VisiaClient from "./VisiaClient";

export const metadata: Metadata = {
  title: "VISIA 皮膚分析 香港｜第7代 AI 肌齡檢測 8大指標｜旺角朗豪坊 Peko Beauty",
  description:
    "VISIA 第7代皮膚分析香港｜Canfield RBX® Technology 多光譜成像，10秒掃描 8大指標（斑點・毛孔・皺紋・UV斑・棕色斑・紅色區・紫質・紋理），AI 肌齡模擬對比。FDA Class II 認證，美國正貨設備，零痛零恢復期。旺角朗豪坊 Peko Beauty，免費試做，絕無硬銷。",
  keywords: [
    "VISIA 皮膚分析",
    "VISIA 皮膚分析 香港",
    "VISIA 第7代",
    "VISIA 肌齡",
    "VISIA 皮膚分析機",
    "VISIA 副作用",
    "VISIA 原理",
    "VISIA 毛孔分析",
    "VISIA 肝斑檢測",
    "VISIA 前後對比",
    "VISIA 評價",
    "VISIA 推薦香港",
    "VISIA 試做香港",
    "VISIA 優惠",
    "VISIA 皮膚分析價錢香港",
    "VISIA 皮膚分析療程香港",
    "VISIA 肌膚檢測",
    "Canfield RBX Technology",
    "皮膚分析儀香港",
    "AI 皮膚檢測",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
  ],
  openGraph: {
    title: "VISIA 第7代皮膚分析 香港｜AI 肌齡 + 8大指標｜Peko Beauty 旺角朗豪坊",
    description:
      "Canfield RBX® Technology 多光譜成像，10秒掃描 8大指標，AI 肌齡模擬。FDA Class II 認證正貨設備，免費試做，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/visia-skin-analysis",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "VISIA 第7代皮膚分析 香港 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISIA 皮膚分析 香港｜第7代 AI 肌齡 8大指標｜免費試做 Peko Beauty",
    description:
      "VISIA 第7代多光譜成像，10秒量化 8大指標，AI 肌齡模擬，零痛零恢復期。Peko Beauty 旺角朗豪坊免費試做。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/visia-skin-analysis",
  },
};

export default function VisiaPage() {
  return <VisiaClient />;
}
