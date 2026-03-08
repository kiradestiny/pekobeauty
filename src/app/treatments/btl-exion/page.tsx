import type { Metadata } from "next";
import BtlExionClient from "./BtlExionClient";

export const metadata: Metadata = {
  title: "BTL Exion 膠原槍 香港｜無針水光 +224% 透明質酸自生 試做 HK$680 | 旺角朗豪坊 Peko Beauty",
  description:
    "BTL Exion 膠原槍香港｜全球首創單極RF + 標靶超聲波 + AI智能溫控，黃金溫度 40–42°C 激生透明質酸 +224%、膠原 +47%、彈力蛋白 +50%。無針無創水光效果，零恢復期，FDA Class II 認證（K211639）。新客試做 HK$680，含免費 VISIA 分析，旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "BTL Exion",
    "BTL Exion 香港",
    "BTL Exion 膠原槍",
    "膠原槍 香港",
    "無創緊膚 香港",
    "RF 緊膚 香港",
    "透明質酸激生",
    "面部提升 香港",
    "法令紋改善",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
    "無創拉提 香港",
  ],
  openGraph: {
    title: "BTL Exion 膠原槍 香港｜無針水光 +224% 透明質酸 試做 HK$680 | Peko Beauty 旺角朗豪坊",
    description:
      "BTL Exion 膠原槍｜AI 智能溫控 40–42°C，激生 +224% 透明質酸、+47% 膠原、+50% 彈力蛋白，零恢復期無針水光。新客試做 HK$680，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/btl-exion",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "BTL Exion 膠原槍 香港 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BTL Exion 膠原槍 香港｜無針水光 +224% 透明質酸 試做 HK$680 | Peko Beauty",
    description:
      "BTL Exion｜AI 溫控 40–42°C，+224% 透明質酸 +47% 膠原 +50% 彈力蛋白，零恢復期。旺角朗豪坊 Peko Beauty 新客試做 HK$680。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/btl-exion",
  },
};

export default function BtlExionPage() {
  return <BtlExionClient />;
}
