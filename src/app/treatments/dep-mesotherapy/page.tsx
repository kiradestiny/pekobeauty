import type { Metadata } from "next";
import DepMesotherapyClient from "./DepMesotherapyClient";

export const metadata: Metadata = {
  title: "DEP 無針水光導入 香港｜電穿孔深層補水 透明質酸導入｜旺角朗豪坊 Peko Beauty",
  description:
    "DEP 無針水光導入香港｜電穿孔（Electroporation）技術無針深導入透明質酸、維他命C、胜肽，媲美水光針效果，完全無痛無針，零恢復期。新客試做 HK$980，含免費 VISIA 皮膚分析。旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "DEP 無針水光",
    "DEP 無針水光 香港",
    "無針水光 香港",
    "電穿孔 香港",
    "Electroporation 香港",
    "無針透明質酸導入",
    "水光針 無針替代",
    "深層補水 香港",
    "皮膚缺水改善 香港",
    "透明質酸導入 香港",
    "無痛水光 香港",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
    "DEP mesotherapy 香港",
    "皮膚暗啞改善",
  ],
  openGraph: {
    title: "DEP 無針水光導入 香港｜電穿孔深層補水無針透明質酸｜Peko Beauty 旺角朗豪坊",
    description:
      "電穿孔技術無針深導入透明質酸，媲美水光針效果，完全無痛零恢復期。新客試做 HK$980，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/dep-mesotherapy",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "DEP 無針水光導入 香港 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEP 無針水光導入 香港｜電穿孔深層補水 HK$980 試做｜Peko Beauty",
    description:
      "電穿孔無針導入透明質酸，完全無痛零恢復期，媲美水光針。Peko Beauty 旺角朗豪坊新客試做 HK$980。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/dep-mesotherapy",
  },
};

export default function DepMesotherapyPage() {
  return <DepMesotherapyClient />;
}
