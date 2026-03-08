import type { Metadata } from "next";
import BtlExionEyeClient from "./BtlExionEyeClient";

export const metadata: Metadata = {
  title: "BTL Exion 眼袋槍 香港｜無創眼周 +224% 透明質酸激生 魚尾紋淚溝 試做 HK$380 | Peko Beauty 旺角",
  description:
    "BTL Exion 眼袋槍香港｜眼周專用 AI RF + 標靶超聲波，自然激生透明質酸 +224%，改善魚尾紋、淚溝凹陷、眼袋鬆弛及眼下細紋，痛感 1/10，零恢復期，無需注射填充。FDA Class II 認證，新客試做 HK$380，含免費 VISIA 分析，旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "BTL Exion 眼部",
    "BTL Exion 眼部療程 香港",
    "眼周緊緻 香港",
    "魚尾紋改善 香港",
    "淚溝改善 香港",
    "眼袋改善 香港",
    "眼下細紋 香港",
    "無創眼周療程 香港",
    "眼周 RF 射頻 香港",
    "眼部療程 香港",
    "淚溝填充無針",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
    "眼周老化改善",
    "RF 眼周緊緻",
  ],
  openGraph: {
    title: "BTL Exion 眼袋槍 香港｜無創 +224% 透明質酸 魚尾紋淚溝改善 試做 HK$380 | Peko Beauty 旺角朗豪坊",
    description:
      "BTL Exion 眼袋槍｜眼周 AI RF +224% 透明質酸激生，痛感 1/10，零恢復期，改善魚尾紋、淚溝、眼袋鬆弛，FDA Class II。Peko Beauty 旺角朗豪坊。",
    url: "https://www.peko.com.hk/treatments/btl-exion-eye",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "BTL Exion™ 眼部療程 香港 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BTL Exion 眼袋槍 香港｜無創 +224% 透明質酸 魚尾紋淚溝 試做 HK$380 | Peko Beauty",
    description:
      "BTL Exion 眼袋槍｜眼周 +224% 透明質酸激生，痛感 1/10，零恢復期，改善魚尾紋・淚溝・眼袋。Peko Beauty 旺角朗豪坊新客試做 HK$380。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/btl-exion-eye",
  },
};

export default function BtlExionEyePage() {
  return <BtlExionEyeClient />;
}
