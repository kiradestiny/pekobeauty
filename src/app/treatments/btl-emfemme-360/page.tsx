import type { Metadata } from "next";
import BtlEmfemme360Client from "./BtlEmfemme360Client";

export const metadata: Metadata = {
  title: "BTL EMfemme 360「閨蜜電波」香港｜陰道鬆弛改善 114% 8 分鐘完成 試做 HK$3,680 | Peko Beauty 旺角",
  description:
    "BTL EMfemme 360「閨蜜電波」香港｜全球首創 360° 環迴 RF + 標靶超聲波 + AI 溫控，臨床實證陰道鬆弛改善 114%、陰道健康提升 123%、性交疼痛消失率 83%。即棄式探頭 3 種尺寸，8 分鐘完成，零痛零恢復期，FDA Class II（K233604）。新客試做 HK$3,680，全女班私密保密，旺角朗豪坊 Peko Beauty，絕無硬銷。",
  keywords: [
    "BTL EMfemme 360",
    "BTL EMfemme 香港",
    "EMfemme 360 香港",
    "私密緊緻 香港",
    "陰道緊緻 香港",
    "產後私密護理",
    "陰道乾燥改善",
    "漏尿治療 香港",
    "女性私密健康",
    "無創私密護理",
    "更年期私密護理",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
  ],
  openGraph: {
    title: "BTL EMfemme 360「閨蜜電波」香港｜陰道鬆弛 +114% 8分鐘完成 試做 HK$3,680 | Peko Beauty 旺角朗豪坊",
    description:
      "BTL EMfemme 360「閨蜜電波」｜360°環迴RF，陰道鬆弛改善 114%、健康提升 123%、性交疼痛消失 83%，8 分鐘完成，零痛零恢復期，FDA Class II。新客試做 HK$3,680，全女班保密，旺角朗豪坊 Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/btl-emfemme-360",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "BTL EMfemme 360 香港 女性私密健康療程 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BTL EMfemme 360「閨蜜電波」香港｜陰道鬆弛 +114% 8分鐘 試做 HK$3,680 | Peko Beauty",
    description:
      "BTL EMfemme 360「閨蜜電波」｜360°RF，鬆弛改善 114%，8 分鐘，零痛零恢復期，FDA Class II。Peko Beauty 旺角朗豪坊新客試做 HK$3,680，全女班私密保密。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/btl-emfemme-360",
  },
};

export default function BtlEmfemme360Page() {
  return <BtlEmfemme360Client />;
}
