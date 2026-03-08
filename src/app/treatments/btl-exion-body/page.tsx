import type { Metadata } from "next";
import BtlExionBodyClient from "./BtlExionBodyClient";

export const metadata: Metadata = {
  title: "BTL Exion Body 香港｜AI 溶脂緊膚 22% 脂肪減少 85% 緊膚 試做 HK$680/部位 | Peko Beauty 旺角朗豪坊",
  description:
    "BTL Exion Body 香港｜全球首創單極RF + 標靶超聲波 + AI Active Cooling 主動冷卻，能量深達脂肪層 5cm，溶解脂肪同時緊膚 85%，臨床實證脂肪減少 22%、透明質酸 +224%。零恢復期，FDA Class II 認證。新客試做 HK$680/部位（原價 HK$1,800），旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "BTL Exion Body",
    "BTL Exion Body 香港",
    "無創身體緊緻 香港",
    "橙皮紋改善 香港",
    "蜂窩組織治療 香港",
    "腹部鬆弛改善 香港",
    "蝴蝶袖改善 香港",
    "大腿緊緻 香港",
    "身體 RF 射頻 香港",
    "產後腹部 香港",
    "無針身體療程",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
    "RF 身體緊緻",
    "橙皮紋 香港",
  ],
  openGraph: {
    title: "BTL Exion Body 香港｜AI 溶脂緊膚 22% 脂肪減少 試做 HK$680/部位 | Peko Beauty 旺角朗豪坊",
    description:
      "BTL Exion Body｜AI Active Cooling 深達 5cm，溶脂 22% + 緊膚 85%，橙皮紋・腹部・蝴蝶袖改善，零恢復期，FDA Class II。新客試做 HK$680/部位（原價 HK$1,800），旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/btl-exion-body",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "BTL Exion Body 無創身體緊緻 香港 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BTL Exion Body 香港｜AI 溶脂緊膚 試做 HK$680/部位 | Peko Beauty",
    description:
      "BTL Exion Body｜AI Active Cooling 溶脂 22%、緊膚 85%，橙皮紋・腹部・蝴蝶袖，零恢復期，FDA Class II。Peko Beauty 旺角朗豪坊新客試做 HK$680/部位。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/btl-exion-body",
  },
};

export default function BtlExionBodyPage() {
  return <BtlExionBodyClient />;
}
