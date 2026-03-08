import type { Metadata } from "next";
import XeLhaPeelClient from "./XeLhaPeelClient";

export const metadata: Metadata = {
  title: "XE-LHA Peel 香港｜韓國第四代鹼性煥膚 pH9.0 零恢復期｜旺角朗豪坊 Peko Beauty",
  description:
    "XE-LHA Peel 香港｜韓國第四代鹼性煥膚（pH 9.0），美國 FDA 2025 認證。LHA 脂羥基酸逐層溫和溶解角質，改善暗沉、毛孔粗大、黑頭、痘印、玫瑰痤瘡。零痛感、零恢復期，做完即刻化妝返工。新客試做 HK$980，旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "XE-LHA Peel",
    "XE-LHA Peel 香港",
    "XE LHA Peel 敏感肌",
    "XE-LHA Peel 副作用",
    "XE LHA Peel 毛孔",
    "XE-LHA Peel 評價",
    "XE-LHA Peel 價錢香港",
    "XE LHA Peel 試做香港",
    "XE-LHA Peel 療程香港",
    "XE LHA Peel 新娘急救",
    "XE-LHA Peel 即刻化妝",
    "鹼性煥膚香港",
    "鹼性煥膚原理",
    "鹼性煥膚優惠",
    "LHA 脂羥基酸",
    "LHA 換膚 香港",
    "零恢復期換膚",
    "敏感肌換膚香港",
    "玫瑰痤瘡換膚",
    "FDA 認證換膚",
    "毛孔粗大改善 香港",
    "暗瘡印改善 香港",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
    "暗啞膚色改善",
    "XE-LHA Peel vs 果酸煥膚",
  ],
  openGraph: {
    title: "XE-LHA Peel 香港｜韓國第四代鹼性煥膚 FDA認證 零恢復期｜Peko Beauty 旺角朗豪坊",
    description:
      "pH 9.0 鹼性煥膚，美國 FDA 2025 認證。LHA 脂羥基酸逐層溶解角質，零痛感、零恢復期，即刻化妝。改善暗沉、毛孔、痘印、敏感肌。新客試做 HK$980，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/xe-lha-peel",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "XE-LHA Peel 香港 韓國第四代鹼性煥膚 FDA認證 零恢復期 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XE-LHA Peel 香港｜鹼性煥膚 FDA認證 零恢復期即刻化妝 HK$980｜Peko Beauty",
    description:
      "韓國第四代鹼性煥膚 pH 9.0，LHA 滲入皮脂腺改善暗瘡毛孔，零痛感零恢復期。FDA+NMPA 認證。旺角朗豪坊新客試做 HK$980。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/xe-lha-peel",
  },
};

export default function XeLhaPeelPage() {
  return <XeLhaPeelClient />;
}
