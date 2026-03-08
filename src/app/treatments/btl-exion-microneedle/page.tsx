import type { Metadata } from "next";
import BtlExionMicroneedleClient from "./BtlExionMicroneedleClient";

export const metadata: Metadata = {
  title: "BTL Exion 黃金微針 香港｜AI Single Pass 痛感低50% 凹凸洞毛孔 試做 HK$2,980 | Peko Beauty 旺角",
  description:
    "BTL Exion 黃金微針香港｜全球首創 AI Single Pass 單次通過技術，痛感降低 50%，24K 黃金絕緣微針深度 0.5–4.0mm，痘疤改善率 70–85%、毛孔收細 60%。FDA Class II 認證，恢復期 1–3 天。新客試做 HK$2,980，含免費 VISIA 分析，旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "BTL Exion 黃金微針",
    "BTL Exion 黃金微針 香港",
    "RF 微針射頻 香港",
    "黃金微針 香港",
    "凹凸洞改善 香港",
    "凹凸洞治療 香港",
    "粗毛孔改善 香港",
    "暗瘡疤痕治療 香港",
    "微針射頻 香港",
    "RF 微針 香港",
    "皮膚紋理改善",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
    "黃金微針凹凸洞",
    "Exion Prime 香港",
  ],
  openGraph: {
    title: "BTL Exion 黃金微針 香港｜AI Single Pass 痘疤毛孔改善 試做 HK$2,980 | Peko Beauty 旺角朗豪坊",
    description:
      "BTL Exion 黃金微針｜AI Single Pass 技術痛感低 50%，痘疤改善 70–85%、毛孔收細 60%，24K 黃金絕緣針，FDA Class II。新客試做 HK$2,980，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/btl-exion-microneedle",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "BTL Exion™ 黃金微針 香港 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BTL Exion 黃金微針 香港｜AI Single Pass 痘疤改善 70–85% 試做 HK$2,980 | Peko Beauty",
    description:
      "BTL Exion 黃金微針｜AI Single Pass 痛感降低 50%，痘疤改善 70–85%、毛孔收細 60%，24K 黃金絕緣針。Peko Beauty 旺角朗豪坊新客試做 HK$2,980。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/btl-exion-microneedle",
  },
};

export default function BtlExionMicroneedlePage() {
  return <BtlExionMicroneedleClient />;
}
