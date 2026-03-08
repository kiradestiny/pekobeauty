import type { Metadata } from "next";
import AcneScarsClient from "./AcneScarsClient";

export const metadata: Metadata = {
  title: "暗瘡印 / 毛孔粗大療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對暗瘡印（紅印/黑印）、毛孔粗大的專業療程推薦。Sylfirm X 矽谷電波修復基底膜，Hollywood Spectra 激光淡化色素印記，立即預約免費諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/acne-scars",
  },
  openGraph: {
    title: "暗瘡印 / 毛孔粗大療程推薦 | Peko Beauty",
    description: "針對暗瘡後遺症，紅印黑印及毛孔粗大，重現平滑均勻肌膚。",
    url: "https://www.peko.com.hk/concerns/acne-scars",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "暗瘡印毛孔粗大療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

export default function AcneScarsPage() {
  return <AcneScarsClient />;
}
