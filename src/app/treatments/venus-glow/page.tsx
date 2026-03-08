import type { Metadata } from "next";
import VenusGlowClient from "./VenusGlowClient";

export const metadata: Metadata = {
  title: "Venus Glow 香港｜以色列專利「吸噴注」三合一毛孔水漾護理 FDA Class I 零恢復期｜旺角朗豪坊 Peko Beauty",
  description:
    "Venus Glow 香港｜以色列 Venus Concept 專利「吸、噴、注」三合一微米水漾技術，美國 FDA Class I 認證。即棄治療頭深層清黑頭粉刺，70 微米超細水柱去角質，客製精華直達肌底。比針清更衛生安全，零痛感零恢復期即刻化妝。新客試做 HK$480，旺角朗豪坊 Peko Beauty。",
  keywords: [
    "Venus Glow",
    "Venus Glow 香港",
    "Venus Glow 是什麼",
    "Venus Glow 原理",
    "Venus Glow 黑頭",
    "Venus Glow 副作用",
    "Venus Glow 後遺症",
    "Venus Glow vs 針清",
    "Venus Glow vs HydraFacial",
    "Venus Glow 推薦香港",
    "Venus Glow 評價",
    "Venus Glow 價錢香港",
    "Venus Glow 優惠",
    "Venus Glow 療程香港",
    "Venus Glow 水漾活膚",
    "Venus Glow 頭皮清潔",
    "毛孔吸塵機 香港",
    "士多啤梨鼻改善",
    "深層清潔毛孔 香港",
    "即棄治療頭毛孔護理",
    "FDA Class I 毛孔護理",
    "CE 認證水漾護理",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
  ],
  openGraph: {
    title: "Venus Glow 香港｜「吸噴注」三合一毛孔水漾護理 FDA認證 零恢復期｜Peko Beauty 旺角朗豪坊",
    description:
      "以色列 Venus Concept 專利，即棄治療頭 + 70 微米超細水柱，深清黑頭毛孔 + 客製精華注入，比針清衛生 10 倍，零痛感零恢復期即刻化妝。FDA Class I + CE 認證。新客試做 HK$480，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/venus-glow",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Venus Glow 香港 吸噴注三合一毛孔水漾護理 FDA Class I 零恢復期 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venus Glow 香港｜毛孔吸塵機升級版 吸噴注三合一 HK$480 試做｜Peko Beauty",
    description:
      "以色列 Venus Concept 即棄頭 + 70μm 水柱，深清黑頭毛孔 + 精華注入，比針清更衛生，零痛感零恢復期。FDA Class I 認證。旺角朗豪坊新客試做 HK$480。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/venus-glow",
  },
};

export default function VenusGlowPage() {
  return <VenusGlowClient />;
}
