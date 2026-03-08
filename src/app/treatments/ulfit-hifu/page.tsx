import type { Metadata } from "next";
import UlfitHifuClient from "./UlfitHifuClient";

export const metadata: Metadata = {
  title: "龍捲風 HIFU ULFIT 香港｜TDT技術痛感低70% V面提升 SMAS 4.5mm 試做 HK$1,480 | Peko Beauty 旺角",
  description:
    "龍捲風 HIFU（ULFIT）香港｜韓國 CLASSYS 第四代 MFU+MFCU 雙技術，獨家 TDT 熱點擴散技術（Vortex 旋風式）均勻分散能量至 SMAS 筋膜層 4.5mm，痛感比傳統 HIFU 降低 70%，可瞓著做！面部深度 1.5/3.0/4.5mm，即時 V 面提升，效果維持 12–18 個月。KFDA + 歐盟 CE 認證。新客試做 HK$1,480（500條線），含免費 VISIA，旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "ULFIT HIFU",
    "ULFIT HIFU 香港",
    "HIFU 香港",
    "高強度聚焦超聲波 香港",
    "無創拉提 香港",
    "面部提升 香港",
    "V 面提升",
    "雙下巴改善",
    "法令紋改善",
    "SMAS 緊緻",
    "無創拉皮 香港",
    "CLASSYS ULFIT",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
  ],
  openGraph: {
    title: "龍捲風 HIFU ULFIT 香港｜TDT技術痛感低70% V面提升 試做 HK$1,480 | Peko Beauty 旺角朗豪坊",
    description:
      "龍捲風 HIFU ULFIT｜TDT 技術痛感低 70%，MFU+MFCU 雙模式深達 SMAS 4.5mm，即時 V 面，效果 12–18 個月，KFDA+CE。新客試做 HK$1,480，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/ulfit-hifu",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "ULFIT HIFU 香港 無創拉提緊緻 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "龍捲風 HIFU ULFIT 香港｜TDT技術痛感低70% V面提升 試做 HK$1,480 | Peko Beauty",
    description:
      "龍捲風 HIFU ULFIT｜TDT 技術痛感低 70%，SMAS 4.5mm，V 面提升 12–18 個月，KFDA+CE。Peko Beauty 旺角朗豪坊新客試做 HK$1,480。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/ulfit-hifu",
  },
};

export default function UlfitHifuPage() {
  return <UlfitHifuClient />;
}
