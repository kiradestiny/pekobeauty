import type { Metadata } from "next";
import TreatmentsClient from "./TreatmentsClient";

export const metadata: Metadata = {
  title: "全部醫美療程 | Peko Beauty 旺角朗豪坊｜BTL Exion · Sylfirm X · HIFU · 激光",
  description:
    "Peko Beauty 旺角朗豪坊全部醫美療程：Sylfirm X 矽谷電波（HK$1,880）、BTL Exion™ 膠原槍（HK$680）、Ulfit HIFU（HK$1,480）、Hollywood Spectra™ 激光（HK$880）等 15+ 原廠認證療程。免費 VISIA 皮膚分析，全女班，絕無 Hard Sell。",
  alternates: {
    canonical: "https://www.peko.com.hk/treatments",
  },
  openGraph: {
    title: "全部醫美療程 | Peko Beauty 旺角朗豪坊",
    description:
      "15+ 原廠認證醫美療程：矽谷電波、BTL Exion™、Ulfit HIFU、Hollywood Spectra™ 激光等。免費 VISIA 分析，全女班，絕無 Hard Sell。",
    url: "https://www.peko.com.hk/treatments",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Peko Beauty 旺角朗豪坊 全部醫美療程",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "全部醫美療程 | Peko Beauty 旺角朗豪坊",
    description:
      "15+ 原廠認證醫美療程，免費 VISIA 分析，全女班，絕無 Hard Sell。",
  },
};

export default function TreatmentsPage() {
  return <TreatmentsClient />;
}
